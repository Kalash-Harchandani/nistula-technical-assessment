const calculateConfidenceScore = (
  queryType,
  draftedReply
) => {

  let score = 0.5;

  if (queryType !== "general_enquiry") {
    score += 0.2;
  }

  if (
    draftedReply &&
    draftedReply.length > 20
  ) {
    score += 0.2;
  }
    if (
    draftedReply === "Our team will get back to you shortly."
    ) {
    score -= 0.3;
    }

  if (queryType === "complaint") {
    score -= 0.3;
  }


  score = Math.max(0, Math.min(score, 1));

  return Number(score.toFixed(2));
};

export default calculateConfidenceScore;