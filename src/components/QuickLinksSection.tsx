import { Card } from "@/components/ui/card";
import { 
  UserPlus, 
  FileSearch, 
  Download, 
  Award, 
  CreditCard, 
  FileText, 
  BookOpen, 
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const quickLinks = [
  {
    icon: UserPlus,
    title: "New Registration",
    description: "Start application",
    href: "/auth",
    color: "bg-primary"
  },
  {
    icon: FileSearch,
    title: "Track Status",
    description: "View application progress",
    href: "/application-status",
    color: "bg-secondary"
  },
  {
    icon: Download,
    title: "Admit Card",
    description: "Download for exam",
    href: "/dashboard",
    color: "bg-primary"
  },
  {
    icon: Award,
    title: "Results",
    description: "Check your scores",
    href: "/results",
    color: "bg-secondary"
  },
  {
    icon: CreditCard,
    title: "Fee Payment",
    description: "Secure online payment",
    href: "/dashboard",
    color: "bg-primary"
  },
  {
    icon: FileText,
    title: "Documents",
    description: "Requirements checklist",
    href: "/admissions",
    color: "bg-secondary"
  },
  {
    icon: BookOpen,
    title: "Courses",
    description: "Browse academic programs",
    href: "/admissions",
    color: "bg-primary"
  },
  {
    icon: HelpCircle,
    title: "Support",
    description: "Get assistance",
    href: "/contact",
    color: "bg-secondary"
  }
];

export const QuickLinksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Quick Actions
          </span>
          <h2 className="text-3xl font-bold text-foreground mt-2 mb-3">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access essential services and information instantly with our simplified dashboard
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link to={link.href}>
                  <Card className="p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-sm bg-card h-full">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-xl ${link.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                          {link.title}
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
