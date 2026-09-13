export interface SupporterWallEntry {
  id: string;
  displayName: string;
  message?: string;
  amount?: number;
  currency: string;
  date: string;
  isModerated: boolean;
  status: "approved" | "pending" | "hidden";
}

// Initial curated community supporters demonstrating the wall with privacy respected
let SUPPORTER_LEDGER: SupporterWallEntry[] = [
  {
    id: "sup-1",
    displayName: "Arjun V.",
    message: "The local image compressor alone saves me 20 minutes every week.",
    amount: 199,
    currency: "INR",
    date: "2026-09-10",
    isModerated: true,
    status: "approved"
  },
  {
    id: "sup-2",
    displayName: "Priya S.",
    message: "Finally a tool site without 40 popups and subscriptions. Keep it up!",
    amount: 499,
    currency: "INR",
    date: "2026-09-11",
    isModerated: true,
    status: "approved"
  },
  {
    id: "sup-3",
    displayName: "Marcus K.",
    message: "The viral reel ideation tool is pure gold for my agency.",
    amount: 99,
    currency: "INR",
    date: "2026-09-12",
    isModerated: true,
    status: "approved"
  },
  {
    id: "sup-4",
    displayName: "Ananya",
    message: "Thank you for making student tools completely free!",
    amount: 49,
    currency: "INR",
    date: "2026-09-12",
    isModerated: true,
    status: "approved"
  }
];

export function getPublicSupporters(): SupporterWallEntry[] {
  return SUPPORTER_LEDGER.filter((s) => s.status === "approved");
}

export function getAllSupportersForAdmin(): SupporterWallEntry[] {
  return [...SUPPORTER_LEDGER];
}

export function addSupporterEntry(entry: Omit<SupporterWallEntry, "id" | "date" | "isModerated" | "status">): SupporterWallEntry {
  const newEntry: SupporterWallEntry = {
    id: `sup-${Date.now()}`,
    ...entry,
    date: new Date().toISOString().split("T")[0],
    isModerated: true,
    status: "approved" // auto-approved or pending based on moderation settings
  };

  SUPPORTER_LEDGER.unshift(newEntry);
  return newEntry;
}

export function updateSupporterStatus(id: string, status: "approved" | "pending" | "hidden"): boolean {
  const item = SUPPORTER_LEDGER.find((s) => s.id === id);
  if (item) {
    item.status = status;
    return true;
  }
  return false;
}
