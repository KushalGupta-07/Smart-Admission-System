import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const notices = [
  {
    id: 1,
    title: "Last Date Extended for Online Application",
    date: "November 30, 2025",
    type: "important",
    description: "The last date for submitting online applications has been extended to December 15, 2025."
  },
  {
    id: 2,
    title: "Entrance Exam Schedule Released",
    date: "November 27, 2025",
    type: "new",
    description: "Check the detailed schedule for entrance examinations scheduled in January 2026."
  },
  {
    id: 3,
    title: "Document Verification Dates Announced",
    date: "November 24, 2025",
    type: "update",
    description: "Document verification will be conducted from January 20-25, 2026 at designated centers."
  },
  {
    id: 4,
    title: "Revised Merit List Published",
    date: "November 19, 2025",
    type: "important",
    description: "The revised merit list for first-year admissions has been published on the portal."
  }
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "important":
      return "destructive";
    case "new":
      return "default";
    default:
      return "secondary";
  }
};

export const NoticesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Important Notices</h2>
            <p className="text-muted-foreground">
              Stay updated with latest announcements from the university
            </p>
          </div>
          <Button variant="ghost" className="gap-2 text-primary hover:text-primary">
            View All Notices
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Notices Grid */}
        <div className="grid gap-4">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-sm bg-card">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Badge variant={getBadgeVariant(notice.type)} className="uppercase text-xs font-medium">
                      {notice.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{notice.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {notice.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
