// utils/generateNextDocID.ts
export const generateNextDocID = (
  totalDoctors: number,
  sessionUserId: string,
  sessionOrgId?: string
): string => {
  // Simulate count (would come from backend ideally)
  const count = totalDoctors + 1;

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  // Prefix
  const prefix = "D";

  // Construct the ID (e.g., D202511110004)
  const id = `${prefix}${year}${month}${day}${String(count).padStart(4, "0")}`;

  return id;
};
