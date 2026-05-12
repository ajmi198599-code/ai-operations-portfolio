import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  Building2,
  Camera,
  ClipboardCheck,
  Cpu,
  DatabaseZap,
  Fingerprint,
  GitBranch,
  MonitorDot,
  Network,
  RadioTower,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
  Zap
} from "lucide-react";

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Workflow", href: "#workflow" },
  { label: "Demo", href: "#demo" },
  { label: "Contact", href: "#contact" }
];

export const capabilityStats = [
  { value: "24/7", label: "Operations Mindset" },
  { value: "AI", label: "Workflow Automation" },
  { value: "BIL", label: "Arabic / English" },
  { value: "SOC", label: "Security Coordination" }
];

export const timeline = [
  {
    year: "01",
    title: "Operational Leadership",
    body: "Coordinating people, shifts, vendors, and incident response with executive-level clarity and calm decision paths.",
    icon: UsersRound
  },
  {
    year: "02",
    title: "Security Systems",
    body: "Designing security workflows across CCTV, access control, visitor operations, reporting, and escalation routines.",
    icon: ShieldCheck
  },
  {
    year: "03",
    title: "AI-Assisted Workflows",
    body: "Turning manual reporting, triage, and communication into structured AI-supported operational systems.",
    icon: BrainCircuit
  },
  {
    year: "04",
    title: "Infrastructure Coordination",
    body: "Connecting technical, facilities, and management teams around deployable plans, dependencies, and readiness checks.",
    icon: Network
  }
];

export const projects = [
  {
    title: "Smart Security Command Platform",
    category: "Command Center",
    summary:
      "A unified control surface for monitoring incidents, assets, access events, and emergency escalations across facilities.",
    tags: ["SOC", "Next.js", "AI Triage", "Access Control"],
    icon: MonitorDot,
    accent: "gold",
    metrics: ["94% visibility", "Live escalation", "Multi-site"],
    workflow:
      "The platform receives security events, classifies urgency, maps the affected zone, assigns the responsible shift role, and prepares executive-ready summaries for escalation.",
    screens: ["Incident Matrix", "Zone Intelligence", "Executive Brief"]
  },
  {
    title: "AI Incident Reporting Dashboard",
    category: "AI Workflow",
    summary:
      "A reporting cockpit that converts raw notes into consistent incident narratives, severity labels, and action logs.",
    tags: ["LLM Workflow", "Reports", "Analytics", "Automation"],
    icon: DatabaseZap,
    accent: "cyan",
    metrics: ["3 min reports", "Auto summaries", "Audit-ready"],
    workflow:
      "Operators enter field notes, attachments, and timestamps. AI organizes the sequence, drafts bilingual summaries, highlights missing evidence, and routes the case to the correct reviewer.",
    screens: ["AI Draft", "Evidence Timeline", "Review Queue"]
  },
  {
    title: "Visitor & Gate Operations System",
    category: "Facility Flow",
    summary:
      "A structured gate management concept for visitor pre-clearance, check-ins, host notifications, and daily movement logs.",
    tags: ["Visitors", "QR Access", "Shift Ops", "Notifications"],
    icon: Fingerprint,
    accent: "silver",
    metrics: ["Fast check-in", "Host alerts", "Daily logs"],
    workflow:
      "Pre-approved visits generate access records, gate teams verify identity, hosts receive arrival notifications, and movement logs stay searchable for security review.",
    screens: ["Gate Desk", "Visitor Queue", "Movement Log"]
  },
  {
    title: "CCTV Analytics Concept",
    category: "Computer Vision",
    summary:
      "A concept layer for camera health, scene monitoring, unusual activity alerts, and incident-linked playback references.",
    tags: ["CCTV", "Vision AI", "Alerts", "Coverage"],
    icon: Camera,
    accent: "cyan",
    metrics: ["Camera health", "Scene alerts", "Coverage map"],
    workflow:
      "Camera feeds publish health and event signals. The analytics layer detects anomalies, links clips to zones, and gives operators confidence scores before escalation.",
    screens: ["Camera Grid", "Alert Lens", "Playback Link"]
  },
  {
    title: "Emergency Coordination Interface",
    category: "Crisis Response",
    summary:
      "A high-clarity interface for emergency roles, response timelines, contact trees, and command decisions.",
    tags: ["Emergency", "Comms", "Roles", "Timeline"],
    icon: RadioTower,
    accent: "gold",
    metrics: ["Role clarity", "Live timeline", "Rapid briefs"],
    workflow:
      "During critical events, the interface anchors roles, tracks decisions, records time-sensitive actions, and produces concise updates for leadership and field teams.",
    screens: ["Command Roles", "Event Clock", "Action Board"]
  }
];

export const workflowSteps = [
  {
    title: "Idea",
    body: "Identify operational friction, recurring risk, and decision delays.",
    icon: Sparkles
  },
  {
    title: "Planning",
    body: "Define owners, data points, constraints, governance, and success signals.",
    icon: ClipboardCheck
  },
  {
    title: "System Design",
    body: "Map dashboards, workflows, handoffs, alerts, and reporting logic.",
    icon: GitBranch
  },
  {
    title: "AI Integration",
    body: "Add summarization, classification, triage, routing, and bilingual support.",
    icon: Cpu
  },
  {
    title: "Deployment",
    body: "Launch with training, metrics, feedback loops, and continuous improvement.",
    icon: Zap
  }
];

export const dashboardMetrics = [
  { label: "Open Incidents", value: "18", delta: "-12%", tone: "gold", icon: AlertTriangle },
  { label: "Access Events", value: "2,847", delta: "+8%", tone: "cyan", icon: Fingerprint },
  { label: "AI Alerts Reviewed", value: "126", delta: "+31%", tone: "silver", icon: BrainCircuit },
  { label: "Shift Readiness", value: "97%", delta: "+4%", tone: "green", icon: Activity }
];

export const accessLogs = [
  { time: "08:42", zone: "North Gate", event: "Contractor pass verified", status: "Cleared" },
  { time: "09:17", zone: "Data Hall B", event: "Badge mismatch flagged", status: "Review" },
  { time: "10:05", zone: "Loading Dock", event: "Delivery window confirmed", status: "Cleared" },
  { time: "10:38", zone: "Admin Tower", event: "Visitor escort assigned", status: "Assigned" },
  { time: "11:12", zone: "Parking P3", event: "Camera health degraded", status: "AI Alert" }
];

export const shiftTeams = [
  { name: "Alpha Shift", readiness: 96, role: "Main SOC" },
  { name: "Gate Team", readiness: 91, role: "Visitor Flow" },
  { name: "Mobile Patrol", readiness: 88, role: "Zone Response" },
  { name: "Facilities Link", readiness: 94, role: "Infrastructure" }
];

export const alertFeed = [
  "AI summarized 6 related access exceptions near Data Hall B.",
  "Camera cluster 14 reports intermittent packet loss.",
  "Incident INC-2047 is ready for executive review.",
  "Visitor volume forecast is 18% above Tuesday baseline."
];

export const toolchain = [
  "Security Operations",
  "AI Workflow Design",
  "Digital Dashboards",
  "Incident Reporting",
  "Infrastructure Planning",
  "Bilingual Communication",
  "Executive Briefing",
  "Vercel Ready"
];

export const contactLinks = {
  linkedin: "https://www.linkedin.com/",
  email: "mailto:hello@example.com"
};

export type Project = (typeof projects)[number];
