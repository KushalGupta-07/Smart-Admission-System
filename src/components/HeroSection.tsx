import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNewRegistration = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const handleCheckStatus = () => {
    navigate("/application-status");
  };

  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary/5 to-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Admissions Open for 2025–26
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Shape Your Future{" "}
              <span className="text-gradient">With Excellence</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              The official portal for undergraduate and postgraduate admissions.
              Streamlined, secure, and paperless application process.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="rounded-full px-6 gap-2 shadow-lg shadow-primary/25"
                onClick={handleNewRegistration}
              >
                Start Application
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 gap-2"
                onClick={handleCheckStatus}
              >
                <CheckCircle2 className="h-4 w-4" />
                Check Status
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Applicants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">120+</div>
                <div className="text-sm text-muted-foreground">Institutes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">99%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Decorative Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Decorative circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] rounded-full border-2 border-dashed border-border/50" />
              <div className="absolute w-[300px] h-[300px] rounded-full border border-border/30" />
            </div>

            {/* Verified Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-10 right-10 glass-card rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">Verified</div>
                <div className="text-xs text-muted-foreground">Documents approved instantly</div>
              </div>
            </motion.div>

            {/* Application Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-20 left-10 glass-card rounded-2xl p-5 min-w-[240px]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-foreground">Application Status</span>
                <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                  In Progress
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Personal Info</span>
                    <span className="text-foreground font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
