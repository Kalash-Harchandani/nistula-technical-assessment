const classifyQuery = (messageText) => {

  const text = messageText.toLowerCase();


  if (
    text.includes("available") ||
    text.includes("availability") ||
    text.includes("vacant")
  ) {
    return "pre_sales_availability";
  }

  if (
    text.includes("price") ||
    text.includes("rate") ||
    text.includes("cost")
  ) {
    return "pre_sales_pricing";
  }

if (
    text.includes("airport transfer") ||
    text.includes("pickup") ||
    text.includes("early check-in")
  ) {
    return "special_request";
  }


  if (
    text.includes("check-in") ||
    text.includes("wifi") ||
    text.includes("password")
  ) {
    return "post_sales_checkin";
  }


  if (
    text.includes("not working") ||
    text.includes("unacceptable") ||
    text.includes("refund") ||
    text.includes("complaint") ||
    text.includes("bad")
  ) {
    return "complaint";
  }


  return "general_enquiry";
};

export default classifyQuery;