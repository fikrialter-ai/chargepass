export const spkluLocations = [
  {
    id: "spklu-pakuwon-mall-surabaya",
    name: "PLN SPKLU Pakuwon Mall Surabaya",
    address: "Pakuwon Mall, Jl. Puncak Indah Lontar No. 2, Surabaya",
    distance: "1.4 km",
    pricePerKwh: 2475,
    availableChargers: 5,
    totalChargers: 8,
    connectorTypes: ["CCS2", "Type 2"],
    status: "Available",
    estimatedCost: 74250
  },
  {
    id: "spklu-ciputra-world-surabaya",
    name: "PLN SPKLU Ciputra World Surabaya",
    address: "Ciputra World, Jl. Mayjen Sungkono No. 89, Surabaya",
    distance: "2.8 km",
    pricePerKwh: 2550,
    availableChargers: 3,
    totalChargers: 6,
    connectorTypes: ["CCS2", "Type 2", "DC Charger"],
    status: "Available",
    estimatedCost: 76500
  },
  {
    id: "spklu-tunjungan-plaza",
    name: "PLN SPKLU Tunjungan Plaza",
    address: "Tunjungan Plaza, Jl. Basuki Rahmat No. 8-12, Surabaya",
    distance: "3.6 km",
    pricePerKwh: 2500,
    availableChargers: 2,
    totalChargers: 6,
    connectorTypes: ["CCS2", "CHAdeMO", "Type 2"],
    status: "Limited",
    estimatedCost: 87500
  },
  {
    id: "spklu-galaxy-mall",
    name: "PLN SPKLU Galaxy Mall",
    address: "Galaxy Mall, Jl. Dharmahusada Indah Timur No. 35-37, Surabaya",
    distance: "5.1 km",
    pricePerKwh: 2466,
    availableChargers: 4,
    totalChargers: 4,
    connectorTypes: ["CCS2", "Type 2"],
    status: "Available",
    estimatedCost: 86200
  },
  {
    id: "spklu-uc-surabaya",
    name: "PLN SPKLU UC Surabaya",
    address: "Universitas Ciputra, CitraLand CBD Boulevard, Surabaya",
    distance: "7.9 km",
    pricePerKwh: 2650,
    availableChargers: 0,
    totalChargers: 4,
    connectorTypes: ["CCS2", "Type 2"],
    status: "Full",
    estimatedCost: 92750
  }
];

export const chargingSessions = [
  {
    id: "CP-2506-1184",
    date: "2026-06-12 09:42",
    location: "PLN SPKLU Pakuwon Mall Surabaya",
    vehicle: "L 2187 EV",
    driver: "Raka Pratama",
    kWh: 24.8,
    duration: "38 min",
    cost: 61380,
    paymentStatus: "Paid by fleet billing",
    receiptStatus: "Receipt sent"
  },
  {
    id: "CP-2506-1176",
    date: "2026-06-11 18:05",
    location: "PLN SPKLU Ciputra World Surabaya",
    vehicle: "L 7731 EVD",
    driver: "Dimas Arya",
    kWh: 31.2,
    duration: "46 min",
    cost: 79560,
    paymentStatus: "Pending invoice",
    receiptStatus: "Auto-generated"
  },
  {
    id: "CP-2506-1169",
    date: "2026-06-11 17:18",
    location: "PLN SPKLU Galaxy Mall",
    vehicle: "L 1049 EVC",
    driver: "Maya Lestari",
    kWh: 18.4,
    duration: "54 min",
    cost: 45374,
    paymentStatus: "Paid by fleet billing",
    receiptStatus: "Expensed to fleet"
  },
  {
    id: "CP-2506-1158",
    date: "2026-06-10 13:27",
    location: "PLN SPKLU UC Surabaya",
    vehicle: "L 9002 EVF",
    driver: "Nadia Putri",
    kWh: 27.6,
    duration: "41 min",
    cost: 73140,
    paymentStatus: "Pending invoice",
    receiptStatus: "Receipt sent"
  },
  {
    id: "CP-2506-1142",
    date: "2026-06-09 08:54",
    location: "PLN SPKLU Tunjungan Plaza",
    vehicle: "L 5518 EV",
    driver: "Andi Wibowo",
    kWh: 21.9,
    duration: "1 hr 08 min",
    cost: 54750,
    paymentStatus: "Paid by fleet billing",
    receiptStatus: "Receipt sent"
  }
];

export const vehicles = [
  {
    vehicleId: "EV-001",
    plateNumber: "L 2187 EV",
    model: "Hyundai Ioniq 5 Signature",
    assignedDriver: "Raka Pratama",
    totalKwh: 328.4,
    totalCost: 814240,
    lastCharging: "2026-06-12 09:42",
    status: "Charging"
  },
  {
    vehicleId: "EV-002",
    plateNumber: "L 1049 EVC",
    model: "Wuling Air EV Long Range",
    assignedDriver: "Maya Lestari",
    totalKwh: 214.2,
    totalCost: 531760,
    lastCharging: "2026-06-11 17:18",
    status: "Available"
  },
  {
    vehicleId: "EV-003",
    plateNumber: "L 7731 EVD",
    model: "BYD Atto 3 Extended Range",
    assignedDriver: "Dimas Arya",
    totalKwh: 402.6,
    totalCost: 998120,
    lastCharging: "2026-06-11 18:05",
    status: "On route"
  },
  {
    vehicleId: "EV-004",
    plateNumber: "L 9002 EVF",
    model: "Hyundai Ioniq 6",
    assignedDriver: "Nadia Putri",
    totalKwh: 176.8,
    totalCost: 436832,
    lastCharging: "2026-06-10 13:27",
    status: "Available"
  },
  {
    vehicleId: "EV-005",
    plateNumber: "L 5518 EV",
    model: "BYD Dolphin Premium",
    assignedDriver: "Andi Wibowo",
    totalKwh: 289.5,
    totalCost: 716025,
    lastCharging: "2026-06-09 08:54",
    status: "Maintenance"
  }
];

export const drivers = [
  {
    name: "Raka Pratama",
    assignedVehicle: "L 2187 EV",
    totalSessions: 18,
    totalKwh: 328.4,
    totalCost: 814240,
    receiptStatus: "All receipts submitted"
  },
  {
    name: "Maya Lestari",
    assignedVehicle: "L 1049 EVC",
    totalSessions: 14,
    totalKwh: 214.2,
    totalCost: 531760,
    receiptStatus: "All receipts submitted"
  },
  {
    name: "Dimas Arya",
    assignedVehicle: "L 7731 EVD",
    totalSessions: 22,
    totalKwh: 402.6,
    totalCost: 998120,
    receiptStatus: "1 receipt pending review"
  },
  {
    name: "Nadia Putri",
    assignedVehicle: "L 9002 EVF",
    totalSessions: 11,
    totalKwh: 176.8,
    totalCost: 436832,
    receiptStatus: "All receipts submitted"
  },
  {
    name: "Andi Wibowo",
    assignedVehicle: "L 5518 EV",
    totalSessions: 16,
    totalKwh: 289.5,
    totalCost: 716025,
    receiptStatus: "All receipts submitted"
  }
];

export const monthlyInvoice = {
  companyName: "PT Nusantara Logistics Surabaya",
  billingPeriod: "June 2026",
  totalSessions: 81,
  totalKwh: 1411.5,
  totalChargingCost: 3496977,
  serviceFee: 349698,
  grandTotal: 3846675
};

export const weeklyChargingCost = [
  { day: "Mon", cost: 418000, sessions: 10, kwh: 168.4 },
  { day: "Tue", cost: 522000, sessions: 13, kwh: 211.2 },
  { day: "Wed", cost: 486000, sessions: 11, kwh: 196.6 },
  { day: "Thu", cost: 617000, sessions: 15, kwh: 249.8 },
  { day: "Fri", cost: 554000, sessions: 14, kwh: 224.1 },
  { day: "Sat", cost: 332000, sessions: 9, kwh: 134.3 },
  { day: "Sun", cost: 568000, sessions: 9, kwh: 227.1 }
];

export const stations = spkluLocations.map((location) => ({
  id: location.id,
  name: location.name,
  area: location.address.split(",").slice(-2).join(",").trim(),
  distance: location.distance,
  price: location.pricePerKwh,
  availability: `${location.availableChargers} of ${location.totalChargers} ports`,
  power: location.connectorTypes.includes("CCS2") ? "DC fast charging" : "AC charging",
  operator: location.name.includes("PLN") ? "PLN" : "Partner",
  status: location.status
}));

export const receipts = chargingSessions.map((session) => ({
  id: session.id,
  station: session.location,
  date: session.date,
  vehicle: session.vehicle,
  driver: session.driver,
  kwh: session.kWh,
  total: session.cost,
  status: session.receiptStatus
}));

export const fleetMetrics = [
  { label: "Monthly charging cost", value: "Rp 3.5M", change: "81 sessions", tone: "good" },
  { label: "Fleet kWh used", value: "1,411.5", change: "+12.1% utilization", tone: "info" },
  { label: "Active drivers", value: "5", change: "100% assigned vehicles", tone: "good" },
  { label: "Open invoices", value: "1", change: "June pending approval", tone: "warn" }
];

export const usageByDepartment = [
  { department: "Surabaya Sales", cost: 814240, kwh: 328.4, limit: 1200000 },
  { department: "Surabaya Operations", cost: 1247785, kwh: 503.7, limit: 1500000 },
  { department: "East Java Field Service", cost: 998120, kwh: 402.6, limit: 1300000 },
  { department: "Executive Pool", cost: 436832, kwh: 176.8, limit: 750000 }
];

export const activity = [
  { time: "10:24", event: "Driver started charging", detail: "Raka at PLN SPKLU Pakuwon Mall Surabaya" },
  { time: "09:58", event: "Receipt auto-generated", detail: "CP-2506-1184 sent to Finance" },
  { time: "09:10", event: "Policy limit checked", detail: "Surabaya Sales daily cap still available" },
  { time: "08:46", event: "Invoice line updated", detail: "June 2026 consolidated bill refreshed" }
];

export const invoices = [
  {
    id: "INV-CP-2026-06",
    period: monthlyInvoice.billingPeriod,
    amount: monthlyInvoice.grandTotal,
    status: "Pending approval"
  },
  { id: "INV-CP-2026-05", period: "May 2026", amount: 4820000, status: "Paid" },
  { id: "INV-CP-2026-04", period: "April 2026", amount: 4419000, status: "Paid" }
];
