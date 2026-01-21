import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                SA
              </div>
              <span className="font-semibold text-lg">Smart Admission</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Official admission portal for undergraduate and postgraduate programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auth" className="text-background/70 hover:text-background transition-colors">
                  New Registration
                </Link>
              </li>
              <li>
                <Link to="/application-status" className="text-background/70 hover:text-background transition-colors">
                  Application Status
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-background/70 hover:text-background transition-colors">
                  Check Results
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-background/70 hover:text-background transition-colors">
                  Admissions Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/admissions" className="text-background/70 hover:text-background transition-colors">
                  Course Details
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-background/70 hover:text-background transition-colors">
                  Fee Structure
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-background/70 hover:text-background transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-background transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>admissions@portal.edu</li>
              <li>+91 22 1234 5678</li>
              <li>123 Education Street</li>
              <li>University Area, City - 400001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <p>© 2025 Smart Admission. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
