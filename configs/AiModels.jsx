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
            {text: " Based on Logo of type Mordern Moscot logo Generate a text prompt to create Logo for indian spice Brand name : {logoTitle} with decription: indian restaurant  and refering to prompt:A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I am sorry, I can't generate images directly. The capability to generate images is only enabled for the \"Gemini 2.0 Flash Experimental\" model when the selected output format is \"Images and text\".\n\nHowever, I can provide you with text prompts to help you create your Indian spice brand logo. Here are 5 logo ideas for a brand named \"{logoTitle}\" with the description \"Indian restaurant\", referring to the provided prompt, in JSON format:\n\n```json\n[\n  {\n    \"idea\": \"Spicy Chef Mascot\",\n    \"prompt\": \"A vibrant logo featuring a friendly chef character, wearing a traditional Indian chef hat. He holds a bowl of colorful spices. Bold, curved text: '{logoTitle}'. Decorative spice swirls.\"\n  },\n  {\n    \"idea\": \"Curry Leaf Character\",\n    \"prompt\": \"An animated curry leaf character with a playful expression, wearing a tiny turban. He holds a mortar and pestle filled with spices. '{logoTitle}' in stylized, curved font. Natural leaf accents.\"\n  },\n  {\n    \"idea\": \"Spice Jar Buddy\",\n    \"prompt\": \"A cute, animated spice jar character, wearing a playful spice label as a hat. He holds a small spoon filled with turmeric. '{logoTitle}' in bold lettering. Circular background with spice patterns.\"\n  },\n  {\n    \"idea\": \"Masala Box Mascot\",\n    \"prompt\": \"Friendly masala box character with a smiling face, wearing a small, decorated lid as a hat. He holds a pinch of chili powder. '{logoTitle}' in a slightly curved font. Decorative Indian patterns.\"\n  },\n  {\n    \"idea\": \"Saffron Strand Pal\",\n    \"prompt\": \"A cheerful saffron strand character with big eyes, wearing a tiny crown. He holds a small cup of chai. '{logoTitle}' in stylized text. Subtle saffron color accents.\"\n  }\n]\n```\n\nThese prompts are designed to evoke a fun, welcoming, and character-driven style for your Indian spice brand logo. You can use these prompts as a starting point and adjust them to your specific preferences and brand identity. Remember to replace \"{logoTitle}\" with the actual name of your brand.\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
