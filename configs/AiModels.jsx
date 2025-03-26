const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const AIDesignIdea = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.Give me a 4/5 Suggestion of logo idea (each idea with maximum 4-5 words),Result in JSON Format  with ideas feild\n\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"ideas\": [\n    \"Chef character, whisk, playful\",\n    \"Gardener gnome, watering can\",\n    \"Friendly robot, gear, approachable\",\n    \"Animated painter, brush, vibrant\"\n  ]\n}\n```\n"},
        ],
      },
    ],
  });
   export const AILogoPrompt = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a text prompt to create Logo for Logo Title/Brand name : mn bnm mnb nm ,with description:  mnb mb, with Color combination of Ocean Blues, also include the  and include Black And White Line Logos design idea and Referring to this Logo Prompt:Create a minimalist and modern logo design that is clean, simple, and visually appealing. The logo should be easy to recognize and remember, and it should be versatile enough to be used in a variety of contexts. Use a combination of typography and simple geometric shapes to create a visually striking and memorable design. The logo should be timeless and elegant, and it should convey a sense of professionalism and sophistication.  Give me result in JSON portal with prompt field only\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"prompt\": \"Create a minimalist and modern logo design for the brand \\\"mn bnm mnb nm\\\". The description for the brand is \\\"mnb mb\\\". The logo should incorporate Ocean Blues in its color palette. It should be clean, simple, and visually appealing, easy to recognize and remember. Design should be versatile for various contexts.  Utilize a combination of typography and simple geometric shapes to create a visually striking and memorable design. Explore Black and White line logo designs as a key concept. Aim for a timeless and elegant aesthetic, conveying professionalism and sophistication.\"\n}\n```\n"},
        ],
      },
    ],
  });

