/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle2,
  Loader,
  Mail,
  Lock,
  User,
  Zap,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Sales Executive");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await signup(name, email, password, role);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      value: "Sales Executive",
      label: "Sales Executive",
      description: "Manage leads and close deals",
    },
    {
      value: "Manager",
      label: "Manager",
      description: "Oversee team and sales pipeline",
    },
    {
      value: "Admin",
      label: "Admin",
      description: "Full system access and configuration",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-accent to-accent-700 text-white flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8" />
          <span className="text-2xl font-bold">CRMPulse</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6">Join Your Team</h1>
          <p className="text-lg text-accent-100 mb-8">
            Create your CRM account and start managing your sales pipeline more
            efficiently.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Fast Setup</h3>
                <p className="text-sm text-accent-100">
                  Get started in minutes, not hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Flexible Roles</h3>
                <p className="text-sm text-accent-100">
                  Choose the right role for your position
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">No Credit Card</h3>
                <p className="text-sm text-accent-100">
                  Start your free trial today
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-accent-100">
          © 2024 CRMPulse. All rights reserved.
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Zap className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold">CRMPulse</span>
            </Link>
            <h1 className="text-3xl font-bold">Create Account</h1>
          </div>

          {/* Form Card */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Role
                </label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="focus:ring-accent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        <div>
                          <div className="font-medium">{r.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {r.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground text-xs"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  At least 6 characters
                </p>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground text-xs"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-600 h-10 font-semibold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Agreement */}
              <p className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-accent hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-accent hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-accent hover:text-accent-600"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
