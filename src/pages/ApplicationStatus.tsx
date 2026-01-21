import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/safeClient";
import { Search, Loader2, FileText, Clock, CheckCircle, XCircle, AlertCircle, Lock } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Application = Database['public']['Tables']['applications']['Row'];

const statusConfig = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: FileText, description: "Application started but not submitted" },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800", icon: Clock, description: "Application submitted, awaiting review" },
  under_review: { label: "Under Review", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle, description: "Application is being reviewed" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: CheckCircle, description: "Congratulations! Your application has been approved" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle, description: "Application was not approved" },
};

const ApplicationStatus = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Require authentication
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Load user's own applications only
  useEffect(() => {
    const loadApplications = async () => {
      if (!user) return;
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from("applications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setApplications(data || []);
        if (data && data.length > 0) {
          setSelectedApp(data[0]);
        }
      } catch {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Unable to load your applications.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, [user, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="py-12 text-center">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Authentication Required</h3>
              <p className="text-muted-foreground mb-4">
                Please sign in to view your application status.
              </p>
              <Button onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">My Application Status</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Track the status of your admission applications
          </p>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : applications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Applications Found</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't submitted any applications yet.
                </p>
                <Button onClick={() => navigate("/register")}>
                  Start Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Application Selector if multiple */}
              {applications.length > 1 && (
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {applications.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            selectedApp?.id === app.id 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{app.application_number}</span>
                            <Badge className={statusConfig[app.status].color}>
                              {statusConfig[app.status].label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{app.course_name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Selected Application Details */}
              {selectedApp && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedApp.application_number}</CardTitle>
                        <CardDescription>{selectedApp.course_name}</CardDescription>
                      </div>
                      <Badge className={statusConfig[selectedApp.status].color}>
                        {statusConfig[selectedApp.status].label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Status Message */}
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      {(() => {
                        const StatusIcon = statusConfig[selectedApp.status].icon;
                        return <StatusIcon className="h-8 w-8 text-primary" />;
                      })()}
                      <div>
                        <p className="font-medium">{statusConfig[selectedApp.status].label}</p>
                        <p className="text-sm text-muted-foreground">
                          {statusConfig[selectedApp.status].description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h3 className="font-medium mb-4">Application Timeline</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-3 w-3 rounded-full bg-primary" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Application Created</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(selectedApp.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {selectedApp.submitted_at && (
                          <div className="flex items-center gap-4">
                            <div className="h-3 w-3 rounded-full bg-blue-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Application Submitted</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(selectedApp.submitted_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
                        {selectedApp.reviewed_at && (
                          <div className="flex items-center gap-4">
                            <div className={`h-3 w-3 rounded-full ${
                              selectedApp.status === "approved" ? "bg-green-500" : "bg-red-500"
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Application Reviewed</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(selectedApp.reviewed_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Remarks - only show general status, not detailed remarks */}
                    {selectedApp.remarks && selectedApp.status !== "draft" && (
                      <div>
                        <h3 className="font-medium mb-2">Remarks</h3>
                        <p className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                          {selectedApp.remarks}
                        </p>
                      </div>
                    )}

                    {/* Application Details */}
                    <div>
                      <h3 className="font-medium mb-2">Application Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Course</p>
                          <p className="font-medium">{selectedApp.course_name}</p>
                        </div>
                        {selectedApp.preferred_college && (
                          <div>
                            <p className="text-muted-foreground">Preferred College</p>
                            <p className="font-medium">{selectedApp.preferred_college}</p>
                          </div>
                        )}
                        {selectedApp.stream && (
                          <div>
                            <p className="text-muted-foreground">Stream</p>
                            <p className="font-medium">{selectedApp.stream}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationStatus;
