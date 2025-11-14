import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  User,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage:
    | "New"
    | "Contacted"
    | "Qualified"
    | "Proposal"
    | "Negotiation"
    | "Won"
    | "Lost";
  value: number;
  owner: string;
  lastContact: string;
  probability: number;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Smith",
      company: "Acme Corporation",
      email: "john@acme.com",
      phone: "+1 (555) 123-4567",
      stage: "Proposal",
      value: 50000,
      owner: "Sarah Chen",
      lastContact: "2 hours ago",
      probability: 75,
    },
    {
      id: "2",
      name: "Emily Johnson",
      company: "TechScale Inc",
      email: "emily@techscale.com",
      phone: "+1 (555) 234-5678",
      stage: "Qualified",
      value: 75000,
      owner: "Alex Rodriguez",
      lastContact: "1 day ago",
      probability: 60,
    },
    {
      id: "3",
      name: "Michael Chen",
      company: "GrowthCo",
      email: "michael@growthco.com",
      phone: "+1 (555) 345-6789",
      stage: "Negotiation",
      value: 120000,
      owner: "Emma Thompson",
      lastContact: "3 days ago",
      probability: 85,
    },
    {
      id: "4",
      name: "Jessica Martinez",
      company: "InnovateLabs",
      email: "jessica@innovatelabs.com",
      phone: "+1 (555) 456-7890",
      stage: "New",
      value: 40000,
      owner: "Mike Johnson",
      lastContact: "5 days ago",
      probability: 30,
    },
    {
      id: "5",
      name: "David Wilson",
      company: "DataDrive Solutions",
      email: "david@datadrive.com",
      phone: "+1 (555) 567-8901",
      stage: "Contacted",
      value: 85000,
      owner: "Sarah Chen",
      lastContact: "1 week ago",
      probability: 45,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
    stage: Lead["stage"];
    value: string;
    owner: string;
  }>({
    name: "",
    company: "",
    email: "",
    phone: "",
    stage: "New",
    value: "",
    owner: "Sarah Chen",
  });

  const stages = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal",
    "Negotiation",
    "Won",
    "Lost",
  ];

  const stageColors: Record<string, string> = {
    New: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100",
    Contacted:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Qualified:
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    Proposal:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    Negotiation:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Won: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    Lost: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage = !filterStage || lead.stage === filterStage;

    return matchesSearch && matchesStage;
  });

  const handleAddLead = () => {
    if (
      formData.name &&
      formData.company &&
      formData.email &&
      formData.phone &&
      formData.value
    ) {
      const newLead: Lead = {
        id: String(leads.length + 1),
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        stage: formData.stage,
        value: parseInt(formData.value),
        owner: formData.owner,
        lastContact: "Just now",
        probability: 30,
      };

      setLeads([...leads, newLead]);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        stage: "New",
        value: "",
        owner: "Sarah Chen",
      });
      setOpenDialog(false);
    }
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  const handleUpdateStage = (id: string, newStage: string) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id ? { ...lead, stage: newStage as Lead["stage"] } : lead,
      ),
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leads</h1>
            <p className="text-muted-foreground">
              Manage and track all your sales leads
            </p>
          </div>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-600 gap-2">
                <Plus className="w-4 h-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Create a new lead to start tracking potential customers
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Stage
                    </label>
                    <Select
                      value={formData.stage}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          stage: value as Lead["stage"],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Deal Value
                    </label>
                    <input
                      type="number"
                      placeholder="50000"
                      value={formData.value}
                      onChange={(e) =>
                        setFormData({ ...formData, value: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddLead}
                  className="w-full bg-primary hover:bg-primary-600"
                >
                  Create Lead
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={filterStage || "all"}
                onValueChange={(value) =>
                  setFilterStage(value === "all" ? null : value)
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Leads Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <p className="font-medium text-sm">{lead.name}</p>
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{lead.company}</td>
                      <td className="px-6 py-4">
                        <Select
                          value={lead.stage}
                          onValueChange={(value) =>
                            handleUpdateStage(lead.id, value)
                          }
                        >
                          <SelectTrigger
                            className={`w-32 ${stageColors[lead.stage]}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage} value={stage}>
                                {stage}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-accent" />
                          {(lead.value / 1000).toFixed(0)}k
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          {lead.owner}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule Activity
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteLead(lead.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-muted-foreground"
                    >
                      No leads found. Create your first lead to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
