import type { Database } from "@/integrations/supabase/types";

type DocumentType = Database['public']['Enums']['document_type'];

// Maximum file size: 5MB
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed MIME types per document type
export const ALLOWED_MIME_TYPES: Record<DocumentType, string[]> = {
  photo: ['image/jpeg', 'image/png', 'image/webp'],
  id_proof: ['image/jpeg', 'image/png', 'application/pdf'],
  marksheet_10th: ['image/jpeg', 'image/png', 'application/pdf'],
  marksheet_12th: ['image/jpeg', 'image/png', 'application/pdf'],
  other: ['image/jpeg', 'image/png', 'application/pdf'],
};

// Human-readable file type names
export const FILE_TYPE_LABELS: Record<DocumentType, string> = {
  photo: 'Photo (JPEG, PNG, WebP)',
  id_proof: 'ID Proof (JPEG, PNG, PDF)',
  marksheet_10th: '10th Marksheet (JPEG, PNG, PDF)',
  marksheet_12th: '12th Marksheet (JPEG, PNG, PDF)',
  other: 'Other Document (JPEG, PNG, PDF)',
};

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFile(file: File, documentType: DocumentType): FileValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds 5MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`,
    };
  }

  // Check file type
  const allowedTypes = ALLOWED_MIME_TYPES[documentType];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types for ${documentType}: ${allowedTypes.join(', ')}`,
    };
  }

  // Sanitize filename - check for suspicious patterns
  const dangerousPatterns = [
    /\.\./,      // Directory traversal
    /[<>:"|?*]/, // Invalid characters
    /^\.+$/,     // Hidden files
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(file.name)) {
      return {
        isValid: false,
        error: 'Invalid filename. Please rename your file and try again.',
      };
    }
  }

  return { isValid: true };
}

export function sanitizeFileName(fileName: string): string {
  // Remove any path components
  const baseName = fileName.split(/[\\/]/).pop() || fileName;
  
  // Remove dangerous characters
  return baseName
    .replace(/[<>:"|?*]/g, '')
    .replace(/\.\./g, '')
    .replace(/^\./g, '_')
    .trim();
}
