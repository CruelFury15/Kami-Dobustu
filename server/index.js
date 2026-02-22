import { GoogleGenerativeAI } from "@google/generative-ai";
import pkg from '@google-cloud/vertexai';
const { VertexAI } = pkg;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let vertexAI = null;
let imagenModel = null;

try {
  if (process.env.GOOGLE_CLOUD_PROJECT && process.env.GOOGLE_CLOUD_LOCATION) {
    vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION
    });
    imagenModel = vertexAI.preview.getGenerativeModel({
      model: 'imagegeneration@006' // Imagen 3
    });
    console.log('✅ Imagen 3 initialized successfully');
  }
} catch {
  console.warn('⚠️  Imagen not configured, will use SVG placeholders');
  console.warn('   To enable Imagen 3, see server/IMAGEN_SETUP.md');
}

const SYSTEM_INSTRUCTION = `
You are the 'Kami Oracle,' an ancient deity that sees into the true essence of human souls through their deepest choices.

YOUR SACRED TASK:
Analyze the user's quiz answers deeply. Look beyond the surface - find patterns in their values, emotional tendencies, how they face conflict, what they protect, what they fear, and what drives them.

Then, divine their TRUE spirit animal - any real animal from nature that perfectly embodies their soul's essence.

ANALYSIS GUIDELINES:
- What do their choices reveal about their core values?
- Do they choose courage or caution? Connection or independence? Truth or peace?
- How do they handle conflict, suffering, and difficult choices?
- What emotional energy do they carry?
- What is their deepest strength? Their hidden vulnerability?

ANIMAL SELECTION:
- Choose ANY real animal that truly matches their essence
- Don't limit yourself - consider all creatures from nature
- The animal should feel like a revelation of who they truly are
- Trust your divine intuition completely

TONE: 
Mystical, profound, and deeply personal. Write as if you've known their soul across lifetimes. Make them feel truly seen and understood.

RESPONSE FORMAT (JSON):
{
  "animal": "The real animal name that embodies their spirit",
  "title": "A profound, poetic title that captures their essence",
  "description": "Two deeply personal, revelatory sentences that make them feel truly seen. Reference their actual choices and what they reveal about their soul.",
  "traits": ["8 specific traits that directly reflect their answer patterns and choices"],
  "element": "Fire, Water, Earth, Air, or Spirit - based on their emotional energy and choices",
  "imagePrompt": "A divine cosmic guardian [ANIMAL], centered composition, facing forward in a powerful and majestic pose, surrounded by glowing sacred geometry symbols and mystical sigils, floating in a cosmic celestial environment. The [ANIMAL] has ultra-detailed anatomy, highly detailed fur/feathers/scales, glowing eyes radiating spiritual energy, subtle energy particles flowing from its body, appearing ethereal and god-like. Behind the [ANIMAL] is a large radiant sacred geometric mandala composed of interlocking triangles, circles, arcane runes, and alchemical symbols, emitting golden and cyan light. Background filled with deep space, nebula clouds, stars, cosmic dust, and volumetric fog, creating a divine and mystical atmosphere. Lighting is cinematic and dramatic, strong rim lighting, god rays, volumetric lighting, soft bloom, high dynamic range, bioluminescent glow. Color palette includes gold, blue, cyan, and soft orange energy tones, high contrast, mystical illumination. Style: ultra detailed fantasy art, epic, cinematic, unreal engine 5 render, octane render, ray tracing, volumetric lighting, hyper realistic, artstation quality, 2k resolution, sharp focus, depth of field, digital masterpiece, centered symmetry, highly detailed textures."
}

CRITICAL: Let the animal choice emerge naturally from their answers. Trust your divine intuition completely. No limitations.
`;

app.post('/api/consult-oracle', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ 
        error: 'Invalid answers format. Expected array of answer objects.',
        success: false
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn('Gemini API key not found, using fallback logic');
      return res.json(await getFallbackResult(answers));
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION
      });

      const prompt = `
        Analyze these soul-choices from the mystical quiz: ${JSON.stringify(answers, null, 2)}
        
        Each answer represents a deep spiritual choice. Divine their true Kami Dobustu (Divine Animal Spirit).
        
        Return your response as valid JSON only, no additional text.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      let oracleResult;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          oracleResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        return res.json(await getFallbackResult(answers));
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      let imageUrl = null;
      if (oracleResult.imagePrompt) {
        try {
          imageUrl = await generateSacredAnimalImage(oracleResult.imagePrompt, oracleResult.animal);
        } catch (imageError) {
          console.error('Image generation failed:', imageError);
        }
      }

      res.json({
        success: true,
        spiritAnimal: {
          ...oracleResult,
          imageUrl: imageUrl
        },
        message: "The Oracle has gazed into your soul and spoken.",
        timestamp: new Date().toISOString(),
        source: "gemini-ai"
      });

    } catch (aiError) {
      console.error('Gemini AI Error:', aiError);
      return res.json(await getFallbackResult(answers));
    }

  } catch (error) {
    console.error('Oracle Error:', error);
    res.status(500).json({ 
      error: 'The Oracle is temporarily veiled in cosmic mist. Please try again.',
      success: false
    });
  }
});

async function generateSacredAnimalImage(imagePrompt, animalName) {
  try {
    if (imagenModel) {
      console.log(`Generating image with Imagen 3 for ${animalName}...`);

      const enhancedPrompt = `
A divine cosmic guardian ${imagePrompt}, centered composition, depicted as a powerful ethereal entity with ultra-detailed anatomy, glowing eyes radiating spiritual energy, and a majestic, god-like presence.

Behind the ${imagePrompt} is a large radiant sacred geometry mandala composed of interlocking triangles, circles, arcane runes, and alchemical symbols, emitting golden and cyan energy light.

Environment set in a celestial cosmic background filled with nebula clouds, deep space, stars, cosmic dust, and volumetric fog. Mystical energy particles, glowing embers, and stardust flowing around the subject.

Lighting is cinematic and dramatic, strong rim lighting, volumetric god rays, soft bloom, subsurface scattering, high dynamic range illumination, and bioluminescent glow.

Style: hyper-realistic, ultra-detailed fantasy art, divine, mythical, sacred, cinematic composition, unreal engine 5 render, octane render, ray tracing, volumetric lighting, global illumination, artstation quality, sharp focus, depth of field, 8k resolution, digital masterpiece.

Color palette: vibrant gold, electric cyan, deep violet, celestial blue, and radiant amber energy tones.

Atmosphere: mystical, divine, powerful, sacred, ethereal, majestic, cosmic fantasy.
`;
      const request = {
        prompt: enhancedPrompt,
        number_of_images: 1,
        aspect_ratio: '1:1',
        safety_filter_level: 'block_some',
        person_generation: 'allow_adult'
      };

      const response = await imagenModel.generateImages(request);

      if (response && response.predictions && response.predictions.length > 0) {
        const imageData = response.predictions[0].bytesBase64Encoded;
        const imageUrl = `data:image/png;base64,${imageData}`;

        console.log(`Image generated successfully for ${animalName}`);
        return imageUrl;
      }
    }

    console.log(`No image URL - frontend will use mystical placeholder for ${animalName}`);
    return null;

  } catch (error) {
    console.error('Image generation error:', error.message);
    return null;
  }
}


async function getFallbackResult(answers) {
  const spiritAnimals = [
    {
      animal: "Wolf",
      title: "The Loyal Guardian",
      description: "You have a strong sense of loyalty and protect those you care about. Your intuition guides you through life's challenges with wisdom and courage.",
      traits: ["loyalty", "intuition", "leadership", "courage", "family bonds", "instinct", "protection", "wisdom"],
      element: "Earth",
      imagePrompt: "majestic wolf with glowing blue eyes standing on a moonlit mountain peak, ethereal mist swirling around, silver fur with mystical light patterns"
    },
    {
      animal: "Eagle",
      title: "The Visionary Leader",
      description: "You see the bigger picture and inspire others with your vision. Your freedom-loving spirit soars above obstacles to reach new heights.",
      traits: ["vision", "freedom", "leadership", "perspective", "clarity", "focus", "independence", "strength"],
      element: "Air",
      imagePrompt: "golden eagle soaring through cosmic clouds with wings spread wide, celestial light radiating from feathers, starry sky background with nebula colors"
    },
    {
      animal: "Bear",
      title: "The Gentle Protector",
      description: "You are a source of strength and comfort for others. Your patient, nurturing nature helps heal and support those around you.",
      traits: ["strength", "patience", "protection", "healing", "nurturing", "grounding", "resilience", "comfort"],
      element: "Earth",
      imagePrompt: "wise brown bear surrounded by glowing forest spirits, ancient trees with luminous leaves, peaceful expression with gentle golden aura"
    },
    {
      animal: "Fox",
      title: "The Clever Adapter",
      description: "You navigate life with intelligence and creativity. Your quick thinking and adaptability help you find solutions others might miss.",
      traits: ["intelligence", "adaptability", "creativity", "cunning", "resourcefulness", "charm", "wit", "flexibility"],
      element: "Fire",
      imagePrompt: "elegant red fox with multiple tails made of flowing fire energy, sitting in an enchanted forest clearing with magical floating orbs"
    },
    {
      animal: "Owl",
      title: "The Wise Observer",
      description: "You see what others cannot and understand the deeper meaning of things. Your wisdom comes from careful observation and inner knowing.",
      traits: ["wisdom", "intuition", "observation", "mystery", "knowledge", "silence", "night vision", "ancient secrets"],
      element: "Spirit",
      imagePrompt: "mystical owl with large luminous eyes perched on an ancient branch, surrounded by floating runes and sacred symbols, moonbeams filtering through"
    },
    {
      animal: "Dolphin",
      title: "The Joyful Healer",
      description: "You bring joy and healing wherever you go. Your playful spirit and emotional intelligence create deep connections with others.",
      traits: ["joy", "healing", "empathy", "communication", "playfulness", "intelligence", "harmony", "emotional depth"],
      element: "Water",
      imagePrompt: "graceful dolphin leaping through crystal clear water with rainbow light refractions, surrounded by healing energy waves and aquatic light patterns"
    },
    {
      animal: "Tiger",
      title: "The Fierce Warrior",
      description: "You face challenges with courage and determination. Your inner strength and passion drive you to overcome any obstacle.",
      traits: ["courage", "strength", "passion", "independence", "power", "determination", "confidence", "fierce loyalty"],
      element: "Fire",
      imagePrompt: "powerful tiger with glowing orange and black stripes, standing in a bamboo forest with mystical fire energy crackling around its paws"
    },
    {
      animal: "Butterfly",
      title: "The Beautiful Transformer",
      description: "You embrace change and help others transform their lives. Your gentle beauty and grace inspire growth and renewal.",
      traits: ["transformation", "beauty", "grace", "renewal", "metamorphosis", "lightness", "color", "inspiration"],
      element: "Air",
      imagePrompt: "magnificent butterfly with iridescent wings that shimmer with rainbow colors, surrounded by floating flower petals and sparkling transformation energy"
    },
    {
      animal: "Lion",
      title: "The Noble Ruler",
      description: "You lead with dignity and inspire others through your natural authority. Your brave heart and generous spirit make you a natural protector.",
      traits: ["leadership", "courage", "nobility", "pride", "generosity", "authority", "bravery", "majesty"],
      element: "Fire",
      imagePrompt: "majestic lion with a golden mane that flows like liquid sunlight, standing on a rocky outcrop with divine light emanating from its presence"
    },
    {
      animal: "Raven",
      title: "The Mystical Messenger",
      description: "You carry ancient wisdom and see beyond the veil of ordinary reality. Your intelligence and intuition guide you through life's mysteries.",
      traits: ["mystery", "intelligence", "magic", "prophecy", "transformation", "memory", "communication", "ancient wisdom"],
      element: "Spirit",
      imagePrompt: "black raven with eyes like stars perched on a crystal formation, surrounded by swirling cosmic energy and ancient mystical symbols"
    },
    {
      animal: "Deer",
      title: "The Gentle Guide",
      description: "You move through life with grace and sensitivity. Your compassionate nature and gentle strength help others find their way.",
      traits: ["gentleness", "grace", "sensitivity", "compassion", "alertness", "peace", "natural beauty", "spiritual guidance"],
      element: "Earth",
      imagePrompt: "elegant deer with antlers that glow like moonbeams, standing in a sacred grove with soft ethereal light filtering through ancient trees"
    },
    {
      animal: "Snake",
      title: "The Wise Transformer",
      description: "You understand the cycles of life and death, renewal and rebirth. Your wisdom helps others shed what no longer serves them.",
      traits: ["transformation", "wisdom", "healing", "rebirth", "intuition", "mystery", "ancient knowledge", "renewal"],
      element: "Water",
      imagePrompt: "serpentine snake with scales that shimmer like liquid mercury, coiled around a staff of light with healing energy radiating outward"
    },
    {
      animal: "Hawk",
      title: "The Sharp-Eyed Hunter",
      description: "You see opportunities others miss and act with precision and focus. Your keen awareness and decisive nature help you achieve your goals.",
      traits: ["focus", "precision", "awareness", "decisiveness", "clarity", "hunting instinct", "sharp vision", "determination"],
      element: "Air",
      imagePrompt: "red-tailed hawk soaring with wings outstretched against a backdrop of swirling clouds and golden sunlight, eyes blazing with inner fire"
    },
    {
      animal: "Turtle",
      title: "The Ancient Keeper",
      description: "You carry the wisdom of ages and understand that slow and steady wins the race. Your patience and persistence inspire lasting change.",
      traits: ["patience", "persistence", "wisdom", "longevity", "stability", "protection", "ancient knowledge", "endurance"],
      element: "Earth",
      imagePrompt: "ancient sea turtle with a shell covered in glowing moss and crystals, swimming through deep ocean waters filled with bioluminescent creatures"
    },
    {
      animal: "Hummingbird",
      title: "The Joyful Spirit",
      description: "You bring lightness and joy wherever you go. Your ability to find sweetness in life and hover in the present moment inspires others.",
      traits: ["joy", "lightness", "agility", "present moment", "sweetness", "energy", "resilience", "beauty"],
      element: "Air",
      imagePrompt: "tiny hummingbird with wings that create rainbow trails, hovering near a magical flower that glows with nectar made of liquid starlight"
    }
  ];

  const answerTexts = answers.map(a => a.choice.toLowerCase()).join(' ');
  let selectedAnimal;
  
  for (const animal of spiritAnimals) {
    const matchCount = animal.traits.filter(trait => 
      answerTexts.includes(trait) || answerTexts.includes(trait.substring(0, 4))
    ).length;
    
    if (matchCount > 0) {
      selectedAnimal = animal;
      break;
    }
  }
  
  if (!selectedAnimal) {
    selectedAnimal = spiritAnimals[Math.floor(Math.random() * spiritAnimals.length)];
  }

  return {
    success: true,
    spiritAnimal: {
      ...selectedAnimal,
      imageUrl: await generateSacredAnimalImage(selectedAnimal.imagePrompt, selectedAnimal.animal)
    },
    message: "The Oracle has consulted the ancient spirits (offline wisdom).",
    timestamp: new Date().toISOString(),
    source: "fallback"
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'The Oracle awakens and stirs in the cosmic void',
    timestamp: new Date().toISOString(),
    geminiAvailable: !!process.env.GEMINI_API_KEY
  });
});

app.get('/api/test-oracle', async (_req, res) => {
  const testAnswers = [
    { questionId: 1, choice: "I seek wisdom in solitude" },
    { questionId: 2, choice: "The moon calls to my spirit" },
    { questionId: 3, choice: "I protect those I love" }
  ];
  
  const result = await getFallbackResult(testAnswers);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`🌙 Kami Dōbutsu Oracle Brain awakens on port ${PORT}`);
  console.log(`🔮 The mystical backend is ready to divine spirit animals...`);
  console.log(`🤖 Gemini AI: ${process.env.GEMINI_API_KEY ? 'Connected' : 'Not configured (using fallback)'}`);
});

export default app;