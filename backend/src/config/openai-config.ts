import OpenAI from "openai"; // Default import instead of named imports

export const configureOpenAI = () => {
  return new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPENAI_ORGANIZATION_ID, // (Note: Fixed typo "ORAGANIZATION_ID" → "ORGANIZATION_ID")
  });
};
