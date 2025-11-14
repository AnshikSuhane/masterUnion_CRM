import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
} from "recharts";
import {
  TrendingUp,
  Users,
  Target,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function Dashboard() {
  // Sample data for charts
  const pipelineData = [
    { name: "Jan", leads: 400, converted: 120 },
    { name: "Feb", leads: 520, converted: 150 },
    { name: "Mar", leads: 680, converted: 200 },
    { name: "Apr", leads: 750, converted: 280 },
    { name: "May", leads: 820, converted: 320 },
    { name: "Jun", leads: 950, converted: 400 },
  ];

  const conversionData = [
    { name: "Contacted", value: 2500 },
    { name: "Qualified", value: 1800 },
    { name: "Proposal", value: 1200 },
    { name: "Negotiation", value: 800 },
    { name: "Closed", value: 450 },
  ];

  const teamPerformance = [
    { name: "Alex", closed: 28, pipeline: 85 },
    { name: "Sarah", closed: 35, pipeline: 92 },
    { name: "Mike", closed: 22, pipeline: 68 },
    { name: "Emma", closed: 31, pipeline: 78 },
    { name: "David", closed: 26, pipeline: 82 },
  ];

  const funnelData = [
    { name: "Leads", value: 2500 },
    { name: "Contacted", value: 2100 },
    { name: "Qualified", value: 1500 },
    { name: "Proposal", value: 900 },
    { name: "Closed", value: 450 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "lead_created",
      description: "New lead created: Acme Corporation",
      time: "2 hours ago",
      user: "Sarah Chen",
    },
    {
      id: 2,
      type: "deal_updated",
      description: "Deal moved to Proposal stage: TechScale Inc",
      time: "4 hours ago",
      user: "Alex Rodriguez",
    },
    {
      id: 3,
      type: "meeting_scheduled",
      description: "Meeting scheduled with GrowthCo",
      time: "6 hours ago",
      user: "Emma Thompson",
    },
    {
      id: 4,
      type: "note_added",
      description: "Note added to InnovateLabs lead",
      time: "1 day ago",
      user: "Mike Johnson",
    },
  ];

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

  const metrics = [
    {
      label: "Total Leads",
      value: "2,450",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Closed Deals",
      value: "180",
      change: "+8.2%",
      trend: "up",
      icon: Target,
      color: "text-accent",
    },
    {
      label: "Conversion Rate",
      value: "18.2%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      label: "Avg. Sales Cycle",
      value: "32 days",
      change: "-4.3%",
      trend: "down",
      icon: Clock,
      color: "text-accent",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights into your sales pipeline
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.label}
                className="p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                      {metric.label}
                    </p>
                    <p className="text-3xl font-bold mb-2">{metric.value}</p>
                    <div className="flex items-center gap-1">
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-accent" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-accent" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          metric.trend === "up" ? "text-accent" : "text-primary"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${metric.color} opacity-20`}>
                    <Icon className="w-10 h-10" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Pipeline Over Time */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Pipeline Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pipelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    name="Total Leads"
                  />
                  <Line
                    type="monotone"
                    dataKey="converted"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Converted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Lead Distribution */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Lead Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {conversionData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {conversionData.map((item, idx) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Team Performance and Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Team Performance */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Team Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="closed"
                  fill="#4f46e5"
                  name="Closed Deals"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="pipeline"
                  fill="#10b981"
                  name="Pipeline"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Conversion Funnel */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Funnel</h2>
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart>
                <Tooltip />
                <Funnel
                  data={funnelData}
                  dataKey="value"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                >
                  {funnelData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {funnelData.map((item, idx) => {
                const prevValue =
                  idx === 0
                    ? 100
                    : (funnelData[idx - 1].value / funnelData[0].value) * 100;
                const curValue = (item.value / funnelData[0].value) * 100;
                const conversion =
                  idx === 0 ? 100 : Math.round((curValue / prevValue) * 100);
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{item.value}</span>
                      <span className="text-muted-foreground">
                        {conversion === 100 ? "—" : `${conversion}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {activity.user}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="capitalize whitespace-nowrap"
                >
                  {activity.type.replace(/_/g, " ")}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
