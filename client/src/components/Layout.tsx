 
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <Zap className="w-6 h-6" />
              <span className="hidden sm:inline">CRMPulse</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/leads"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Leads
              </Link>
              <Link
                to="/activities"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Activities
              </Link>
              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <User className="w-4 h-4" />
                        {user?.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem disabled className="cursor-default">
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem disabled className="cursor-default">
                        <span className="text-xs">Role: {user?.role}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => logout()}
                        className="text-destructive cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary-600"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-foreground hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/leads"
                    className="text-sm font-medium text-foreground hover:text-primary"
                  >
                    Leads
                  </Link>
                  <Link
                    to="/activities"
                    className="text-sm font-medium text-foreground hover:text-primary"
                  >
                    Activities
                  </Link>
                </>
              )}
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2">
                      <p className="text-xs font-semibold text-muted-foreground">
                        {user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.role}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start text-destructive hover:text-destructive"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start w-full"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary-600 justify-start w-full"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg text-primary mb-4">CRMPulse</h3>
              <p className="text-sm text-muted-foreground">
                Next-generation CRM for modern sales teams
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 CRMPulse. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
