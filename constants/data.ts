import { Location, Profile, Tool, ToolEvent } from "./types";

export const TAB_ICONS = [
  {
    name: "index",
    title: "Home",
    icon: "home",
  },
  {
    name: "inventory",
    title: "Inventory",
    icon: "box",
  },
  {
    name: "account",
    title: "Account",
    icon: "home",
  },
  {
    name: "settings",
    title: "Settings",
    icon: "gear",
  },
];

export const HOME_USER = {
  name: "Colin Billingsley",
  role: "admin",
};

/* -------------------------------------------------------------------------- */
/*                                   USERS                                    */
/* -------------------------------------------------------------------------- */

export const profiles: Profile[] = [
  {
    id: "user-1",
    full_name: "John Carter",
    email: "john@example.com",
    created_at: "2026-05-20T08:00:00Z",
  },
  {
    id: "user-2",
    full_name: "Sarah Miller",
    email: "sarah@example.com",
    created_at: "2026-05-20T08:10:00Z",
  },
  {
    id: "user-3",
    full_name: "Mike Rodriguez",
    email: "mike@example.com",
    created_at: "2026-05-20T08:20:00Z",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 LOCATIONS                                  */
/* -------------------------------------------------------------------------- */

export const locations: Location[] = [
  {
    id: "loc-warehouse",
    name: "Main Warehouse",
    address: "1200 Industrial Blvd",
    latitude: 36.1627,
    longitude: -86.7816,
    created_at: "2026-05-20T09:00:00Z",
  },
  {
    id: "loc-jobsite-a",
    name: "Job Site Alpha",
    address: "742 River Rd",
    latitude: 36.174,
    longitude: -86.767,
    created_at: "2026-05-20T09:05:00Z",
  },
  {
    id: "loc-maintenance",
    name: "Maintenance Room",
    address: "1200 Industrial Blvd",
    latitude: 36.1627,
    longitude: -86.7816,
    created_at: "2026-05-20T09:10:00Z",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    TOOLS                                   */
/* -------------------------------------------------------------------------- */

export const tools: Tool[] = [
  {
    id: "tool-1",
    name: "Milwaukee Hammer Drill",
    description: "18V cordless hammer drill",
    serial_number: "MIL-DRILL-001",
    image_url: "https://images.unsplash.com/photo-1504148455328-c376907d081c",
    status: "available",
    current_location_id: "loc-warehouse",
    checked_out_by: null,
    assignedToUser: "user-1",
    created_at: "2026-05-20T10:00:00Z",
    updated_at: "2026-05-20T10:00:00Z",
  },

  {
    id: "tool-2",
    name: "DeWalt Circular Saw",
    description: "20V MAX circular saw",
    serial_number: "DEW-SAW-204",
    image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    status: "unavailable",
    current_location_id: "loc-jobsite-a",
    checked_out_by: "user-2",
    assignedToUser: "user-1",
    created_at: "2026-05-20T10:05:00Z",
    updated_at: "2026-05-20T13:10:00Z",
  },

  {
    id: "tool-3",
    name: "Bosch Laser Measure",
    description: "Digital laser distance measurer",
    serial_number: "BOS-LASER-888",
    image_url: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b",
    status: "out_of_order",
    current_location_id: "loc-maintenance",
    checked_out_by: null,
    assignedToUser: "user-3",
    created_at: "2026-05-20T10:20:00Z",
    updated_at: "2026-05-20T14:00:00Z",
  },

  {
    id: "tool-4",
    name: "Makita Impact Driver",
    description: "Brushless impact driver",
    serial_number: "MAK-IMP-432",
    image_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    status: "available",
    current_location_id: "loc-warehouse",
    checked_out_by: null,
    assignedToUser: "user-2",
    created_at: "2026-05-20T11:00:00Z",
    updated_at: "2026-05-20T11:00:00Z",
  },
  {
    id: "tool-5",
    name: "Ryobi Impact Driver",
    description: "Brushless impact driver",
    serial_number: "RYO-IMP-432",
    image_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    status: "available",
    current_location_id: "loc-warehouse",
    checked_out_by: null,
    assignedToUser: "user-2",
    created_at: "2026-05-20T11:00:00Z",
    updated_at: "2026-05-20T11:00:00Z",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 TOOL EVENTS                                */
/* -------------------------------------------------------------------------- */

export const toolEvents: ToolEvent[] = [
  {
    id: "event-1",
    tool_id: "tool-1",
    user_id: "user-1",
    event_type: "created",
    to_location_id: "loc-warehouse",
    to_status: "available",
    notes: "Tool added to inventory",
    created_at: "2026-05-20T10:00:00Z",
  },

  {
    id: "event-2",
    tool_id: "tool-2",
    user_id: "user-1",
    event_type: "created",
    to_location_id: "loc-warehouse",
    to_status: "available",
    notes: "Initial inventory import",
    created_at: "2026-05-20T10:05:00Z",
  },

  {
    id: "event-3",
    tool_id: "tool-2",
    user_id: "user-2",
    event_type: "check_out",
    from_location_id: "loc-warehouse",
    to_location_id: "loc-jobsite-a",
    from_status: "available",
    to_status: "unavailable",
    notes: "Checked out for framing work",
    created_at: "2026-05-20T13:10:00Z",
  },

  {
    id: "event-4",
    tool_id: "tool-3",
    user_id: "user-3",
    event_type: "created",
    to_location_id: "loc-warehouse",
    to_status: "available",
    notes: "Laser measure added",
    created_at: "2026-05-20T10:20:00Z",
  },

  {
    id: "event-5",
    tool_id: "tool-3",
    user_id: "user-3",
    event_type: "status_change",
    from_location_id: "loc-warehouse",
    to_location_id: "loc-maintenance",
    from_status: "available",
    to_status: "out_of_order",
    notes: "Display malfunction reported",
    created_at: "2026-05-20T14:00:00Z",
  },

  {
    id: "event-6",
    tool_id: "tool-4",
    user_id: "user-2",
    event_type: "created",
    to_location_id: "loc-warehouse",
    to_status: "available",
    notes: "Brand new impact driver",
    created_at: "2026-05-20T11:00:00Z",
  },
];
