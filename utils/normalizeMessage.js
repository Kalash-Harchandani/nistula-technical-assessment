import { v4 as uuidv4 } from "uuid";

const normalizeMessage = (payload) => {

  return {
    message_id: uuidv4(),
    source: payload.source,
    guest_name: payload.guest_name,
    message_text: payload.message,
    timestamp: payload.timestamp || new Date().toISOString(),
    booking_ref: payload.booking_ref || null,
    property_id: payload.property_id || null,
    query_type: "general_enquiry"
  };
};

export default normalizeMessage;