import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  MessageSquare,
  Phone,
  Calendar,
  Edit2,
  Trash2,
  Filter,
} from "lucide-react";
import { useState } from "react";

interface Activity {
  id: string;
  type: "note" | "call" | "meeting" | "status_change" | "email";
  title: string;
  description: string;
  lead: string;
  user: string;
  timestamp: string;
  date: string;
  status?: string;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "call",
      title: "Call with John Smith",
      description:
        "Discussed project requirements and timeline. Customer interested in proposal stage.",
      lead: "John Smith (Acme Corporation)",
      user: "Sarah Chen",
      timestamp: "2 hours ago",
      date: "Today at 2:30 PM",
    },
    {
      id: "2",
      type: "note",
      title: "Follow-up note",
      description:
        "Send proposal by Friday. Customer prefers weekly check-ins.",
      lead: "John Smith (Acme Corporation)",
      user: "Sarah Chen",
      timestamp: "3 hours ago",
      date: "Today at 1:15 PM",
    },
    {
      id: "3",
      type: "meeting",
      title: "Product Demo",
      description:
        "Scheduled demo session with executive team to showcase key features.",
      lead: "Emily Johnson (TechScale Inc)",
      user: "Alex Rodriguez",
      timestamp: "5 hours ago",
      date: "Today at 11:00 AM",
    },
    {
      id: "4",
      type: "status_change",
      title: "Stage Updated",
      description: "Lead moved from Contacted to Qualified",
      lead: "Michael Chen (GrowthCo)",
      user: "Emma Thompson",
      timestamp: "1 day ago",
      date: "Yesterday at 4:45 PM",
    },
    {
      id: "5",
      type: "email",
      title: "Email sent",
      description:
        "Sent proposal document to customer for review and feedback.",
      lead: "Jessica Martinez (InnovateLabs)",
      user: "Mike Johnson",
      timestamp: "2 days ago",
      date: "Dec 10 at 10:30 AM",
    },
    {
      id: "6",
      type: "call",
      title: "Initial Contact",
      description:
        "First outreach call. Customer expressed strong interest in our solution.",
      lead: "David Wilson (DataDrive Solutions)",
      user: "Sarah Chen",
      timestamp: "1 week ago",
      date: "Dec 5 at 3:00 PM",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    type: Activity["type"];
    title: string;
    description: string;
    lead: string;
  }>({
    type: "note",
    title: "",
    description: "",
    lead: "John Smith (Acme Corporation)",
  });

  const activityTypes = [
    {
      value: "note",
      label: "Note",
      icon: MessageSquare,
      color: "text-blue-500",
    },
    { value: "call", label: "Call", icon: Phone, color: "text-green-500" },
    {
      value: "meeting",
      label: "Meeting",
      icon: Calendar,
      color: "text-purple-500",
    },
    {
      value: "status_change",
      label: "Status Change",
      icon: Edit2,
      color: "text-orange-500",
    },
    {
      value: "email",
      label: "Email",
      icon: MessageSquare,
      color: "text-indigo-500",
    },
  ];

  const leads = [
    "John Smith (Acme Corporation)",
    "Emily Johnson (TechScale Inc)",
    "Michael Chen (GrowthCo)",
    "Jessica Martinez (InnovateLabs)",
    "David Wilson (DataDrive Solutions)",
  ];

  const filteredActivities = activities.filter((activity) => {
    if (!filterType) return true;
    return activity.type === filterType;
  });

  const handleAddActivity = () => {
    if (formData.title && formData.description) {
      const newActivity: Activity = {
        id: String(activities.length + 1),
        type: formData.type,
        title: formData.title,
        description: formData.description,
        lead: formData.lead,
        user: "Current User",
        timestamp: "Just now",
        date: new Date().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      };

      setActivities([newActivity, ...activities]);
      setFormData({
        type: "note",
        title: "",
        description: "",
        lead: "John Smith (Acme Corporation)",
      });
      setOpenDialog(false);
    }
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const getActivityIcon = (type: string) => {
    const typeConfig = activityTypes.find((t) => t.value === type);
    if (!typeConfig) return null;
    const Icon = typeConfig.icon;
    return <Icon className={`w-5 h-5 ${typeConfig.color}`} />;
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "note":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
      case "call":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "meeting":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
      case "email":
        return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300";
      case "status_change":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Activities</h1>
            <p className="text-muted-foreground">
              Track all interactions and activities across your leads
            </p>
          </div>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-600 gap-2">
                <Plus className="w-4 h-4" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log New Activity</DialogTitle>
                <DialogDescription>
                  Record an activity or interaction with a lead
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Activity Type
                  </label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        type: value as Activity["type"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Lead</label>
                  <Select
                    value={formData.lead}
                    onValueChange={(value) =>
                      setFormData({ ...formData, lead: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {leads.map((lead) => (
                        <SelectItem key={lead} value={lead}>
                          {lead}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Activity title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Notes/Description
                  </label>
                  <textarea
                    placeholder="Add details about this activity..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  onClick={handleAddActivity}
                  className="w-full bg-primary hover:bg-primary-600"
                >
                  Log Activity
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <Card className="p-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filterType || "all"}
              onValueChange={(value) =>
                setFilterType(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Activities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                {activityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Timeline */}
        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, idx) => (
              <Card
                key={activity.id}
                className="p-6 hover:shadow-lg transition-all"
              >
                <div className="flex gap-4">
                  {/* Timeline Connector */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-border bg-card">
                      {getActivityIcon(activity.type)}
                    </div>
                    {idx < filteredActivities.length - 1 && (
                      <div className="w-0.5 h-16 bg-border mt-2" />
                    )}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {activity.lead}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getActivityColor(activity.type)}>
                          {activityTypes.find((t) => t.value === activity.type)
                            ?.label || activity.type}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-foreground mb-4">
                      {activity.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
                      <div>
                        <p>
                          by{" "}
                          <span className="font-medium">{activity.user}</span>
                        </p>
                        <p>{activity.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteActivity(activity.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No activities found. Log your first activity to get started.
              </p>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
