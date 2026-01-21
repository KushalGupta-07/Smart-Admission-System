import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

const importantDates = [
  {
    event: "Application Start Date",
    date: "December 1, 2025",
    time: "10:00 AM",
    status: "active"
  },
  {
    event: "Last Date for Registration",
    date: "December 15, 2025",
    time: "11:59 PM",
    status: "upcoming"
  },
  {
    event: "Admit Card Release",
    date: "January 5, 2026",
    time: "12:00 PM",
    status: "upcoming"
  },
  {
    event: "Entrance Examination",
    date: "January 15-20, 2026",
    time: "Various Slots",
    status: "upcoming"
  },
  {
    event: "Result Declaration",
    date: "February 1, 2026",
    time: "5:00 PM",
    status: "upcoming"
  },
  {
    event: "Counselling Begins",
    date: "February 10, 2026",
    time: "10:00 AM",
    status: "upcoming"
  }
];

export const ImportantDatesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Schedule
          </span>
          <h2 className="text-3xl font-bold text-foreground mt-2 mb-3">
            Important Dates
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mark your calendar with these crucial admission milestones to ensure you don't miss any deadline.
          </p>
        </div>

        {/* Dates Grid */}
        <div className="max-w-4xl mx-auto grid gap-4">
          {importantDates.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-5 hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-card">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-3 sm:w-32">
                    <Badge 
                      variant={item.status === "active" ? "default" : "secondary"}
                      className={`capitalize ${item.status === "active" ? "bg-secondary text-secondary-foreground" : ""}`}
                    >
                      {item.status === "active" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white mr-1.5 animate-pulse" />
                      )}
                      {item.status === "active" ? "Active Now" : "Upcoming"}
                    </Badge>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.event}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {item.time}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
