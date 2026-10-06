export interface Lead {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  farm_name?: string;
  daily_liters?: number;
  herd_size?: number;
  status?: "new" | "contacted" | "qualified" | "converted" | "archived";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}
