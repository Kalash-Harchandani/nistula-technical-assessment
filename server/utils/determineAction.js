const determineAction = (
  confidenceScore,
  queryType
) => {

  // Complaints always escalate
  if (queryType === "complaint") {
    return "escalate";
  }

  if (confidenceScore > 0.85) {
    return "auto_send";
  }

  if (confidenceScore >= 0.60) {
    return "agent_review";
  }

  return "escalate";
};

export default determineAction;