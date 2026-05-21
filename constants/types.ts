export type ToolStatus = "available" | "checked_out" | "out_of_service";

export type ToolEventType =
  | "created"
  | "check_out"
  | "check_in"
  | "move"
  | "status_change";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
};

export type Location = {
  id: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
};

export type Tool = {
  id: string;

  name: string;
  description?: string;

  serial_number?: string;

  image_url?: string;

  status: ToolStatus;

  current_location_id?: string | null;

  checked_out_by?: string | null;

  assignedToUser?: string | null;

  created_at: string;
  updated_at: string;
};

export type ToolEvent = {
  id: string;

  tool_id: string;

  user_id?: string | null;

  event_type: ToolEventType;

  from_location_id?: string | null;
  to_location_id?: string | null;

  from_status?: ToolStatus | null;
  to_status?: ToolStatus | null;

  notes?: string;

  created_at: string;
};
