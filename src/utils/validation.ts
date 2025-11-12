import { Service } from "../types/service";

export const validateServiceForm = (data: Service): string | null => {
  if (!data.service_name.trim()) return "Please enter a service name.";
  if (data.service_price_initial <= 0)
    return "Please enter a valid service price.";
  if (data.services_gst < 0) return "GST cannot be negative.";
  return null;
};
