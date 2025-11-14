import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BarChart3,
  Clock,
  Users,
  Zap,

  Bell,
  Workflow,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Users,
      title: "Lead Management",
      description:
        "Organize and track all your leads in one place. Assign ownership, track history, and never lose a sales opportunity.",
      color: "text-primary",
    },
    {
      icon: BarChart3,
      title: "Analytics & Dashboard",
      description:
        "Real-time insights into your sales pipeline. Track metrics, conversion rates, and team performance at a glance.",
      color: "text-accent",
    },
    {
      icon: Clock,
      title: "Activity Timeline",
      description:
        "Complete audit trail of all interactions. Track calls, meetings, notes, and status changes for every lead.",
      color: "text-primary",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description:
        "Stay connected with instant WebSocket notifications. Get alerts on lead updates, assignments, and important events.",
      color: "text-accent",
    },
    {
      icon: Workflow,
      title: "Role-Based Access",
      description:
        "Flexible permission system with Admin, Manager, and Sales Executive roles. Control who sees what.",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "Automations",
      description:
        "Set up email triggers and automated workflows. Save time with intelligent lead routing and follow-ups.",
      color: "text-accent",
    },
  ];

  const stats = [
    { label: "Lead Conversion", value: "+45%" },
    { label: "Time Saved", value: "20 hrs/week" },
    { label: "Team Satisfaction", value: "98%" },
  ];

  const testimonials = [
    {
      quote:
        "CRMPulse transformed how we manage our sales pipeline. We're closing deals 30% faster.",
      author: "Sarah Chen",
      role: "VP Sales",
      company: "TechScale",
    },
    {
      quote:
        "The real-time notifications keep our team perfectly aligned. No missed opportunities.",
      author: "Michael Rodriguez",
      role: "Sales Manager",
      company: "GrowthCo",
    },
    {
      quote:
        "The analytics dashboard gives us insights we never had before. It's a game-changer for strategy.",
      author: "Emma Thompson",
      role: "CEO",
      company: "InnovateLabs",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200/30 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent-200/30 dark:bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <Badge
              className="mb-4 bg-primary-100 text-primary hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-100 border-primary-200 dark:border-primary-700"
              variant="outline"
            >
              <Zap className="w-3 h-3 mr-1" />
              Next-Generation CRM
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Sales Without Limits
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Modern CRM designed for fast-scaling startups. Real-time
              collaboration, powerful analytics, and intelligent automations in
              one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-600 text-lg h-12 px-8 group"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Start for Free"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-12 px-8 border-primary text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything you need to win
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features designed for modern sales teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary hover:shadow-lg transition-all group"
                >
                  <div className={`${feature.color} mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 border-b border-border bg-secondary/50 dark:bg-primary-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, powerful workflow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes, not months
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Add Your Leads",
                description:
                  "Import leads from any source or add them manually. Organize them into pipelines and stages.",
              },
              {
                step: "02",
                title: "Collaborate & Track",
                description:
                  "Assign leads to team members, add notes, schedule activities, and track every interaction.",
              },
              {
                step: "03",
                title: "Close More Deals",
                description:
                  "Use insights and automations to nurture leads intelligently and accelerate your sales cycle.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-bold text-primary mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted by leading sales teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 border-b border-border bg-secondary/50 dark:bg-primary-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for testing",
                features: [
                  "Up to 100 leads",
                  "Basic analytics",
                  "1 user",
                  "Email support",
                ],
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                description: "For growing teams",
                features: [
                  "Unlimited leads",
                  "Advanced analytics",
                  "Up to 5 users",
                  "Priority support",
                  "Automations",
                  "Integrations",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Everything in Pro",
                  "Unlimited users",
                  "Custom integrations",
                  "Dedicated support",
                  "SSO & compliance",
                  "Advanced security",
                ],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg border p-8 ${
                  plan.highlighted
                    ? "border-primary bg-linear-to-br from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 ring-2 ring-primary transform scale-105"
                    : "border-border bg-card"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  )}
                </div>
                <Link
                  to={isAuthenticated ? "/dashboard" : "/signup"}
                  className="w-full"
                >
                  <Button
                    className={`w-full mb-8 ${
                      plan.highlighted
                        ? "bg-primary hover:bg-primary-600"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Link>
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your sales?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that are already closing more deals with
            CRMPulse.
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-lg h-12 px-8 group"
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Free Trial"}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
