import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/safeClient";
import { Loader2, FileText, Clock, CheckCircle, XCircle, AlertCircle, Plus, CreditCard, Download } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { generateAdmitCardPDF } from "@/lib/admitCardPdf";

type ApplicationRow = Database['public']['Tables']['applications']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];
type AdmitCardRow = Database['public']['Tables']['admit_cards']['Row'];

type Application = ApplicationRow & {
  admit_card?: AdmitCardRow | null;
};

const statusConfig = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: FileText },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800", icon: Clock },
  under_review: { label: "Under Review", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const [profileRes, applicationsRes, admitCardsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("admit_cards").select("*").eq("user_id", user.id),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (applicationsRes.data) {
        const appsWithAdmitCards = applicationsRes.data.map(app => ({
          ...app,
          admit_card: admitCardsRes.data?.find(ac => ac.application_id === app.id) || null
        }));
        setApplications(appsWithAdmitCards);
      }
      setLoading(false);
    };

    if (user) fetchData();
  }, [user]);

  const handleDownloadAdmitCard = (app: Application) => {
    if (!app.admit_card) return;
    
    generateAdmitCardPDF({
      admitCardNumber: app.admit_card.admit_card_number,
      applicationNumber: app.application_number,
      studentName: profile?.full_name || "N/A",
      courseName: app.course_name,
      preferredCollege: app.preferred_college,
      stream: app.stream,
      generatedAt: app.admit_card.generated_at,
      studentEmail: profile?.email || undefined,
      studentPhone: profile?.phone || undefined,
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {profile?.full_name || "Student"}
          </h1>
          <p className="text-muted-foreground">Manage your admission applications</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{applications.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-600">
                {applications.filter(a => a.status === "submitted" || a.status === "under_review").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">
                {applications.filter(a => a.status === "approved").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Applications</CardTitle>
              <CardDescription>Track the status of your admission applications</CardDescription>
            </div>
            <Button asChild>
              <Link to="/register">
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-4">Start your admission journey by creating a new application</p>
                <Button asChild>
                  <Link to="/register">Create Application</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => {
                  const status = statusConfig[app.status];
                  const StatusIcon = status.icon;
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <StatusIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{app.application_number}</p>
                          <p className="text-sm text-muted-foreground">{app.course_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={status.color}>{status.label}</Badge>
                        <p className="text-sm text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                        {app.status === "draft" && (
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/register?edit=${app.id}`}>Continue</Link>
                          </Button>
                        )}
                        {app.status === "approved" && app.admit_card && (
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => handleDownloadAdmitCard(app)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Admit Card
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
