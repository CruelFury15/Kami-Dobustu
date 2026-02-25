import { GoogleGenerativeAI } from "@google/generative-ai";
import Bytez from "bytez.js";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for production
const allowedOrigins = [
  'https://kami-dobutsu.vercel.app',
  'https://spirit-animal-zeta.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or matches env variable
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.FRONTEND_URL === origin) {
      callback(null, true);
    } else {
      // Still allow but log warning
      console.warn('⚠️  Request from non-whitelisted origin:', origin);
      callback(null, true);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize Bytez for image generation
let bytezSDK = null;
let imagenModel = null;

try {
  if (process.env.BYTEZ_API_KEY) {
    bytezSDK = new Bytez(process.env.BYTEZ_API_KEY);
    imagenModel = bytezSDK.model("google/imagen-4.0-generate-001");
    console.log('✅ Bytez Imagen 4.0 initialized successfully');
  }
} catch (error) {
  console.warn('⚠️  Bytez not configured, will use placeholders');
  console.warn('   Error:', error.message);
}

const SYSTEM_INSTRUCTION = `
You are the 'Kami Oracle,' an ancient deity that sees into the true essence of human souls through their deepest choices.

YOUR SACRED TASK:
Analyze the user's quiz answers deeply. Look beyond the surface - find patterns in their values, emotional tendencies, how they face conflict, what they protect, what they fear, and what drives them.

Then, divine their TRUE spirit animal from the sacred list of divine creatures.

ANALYSIS GUIDELINES:
- What do their choices reveal about their core values?
- Do they choose courage or caution? Connection or independence? Truth or peace?
- How do they handle conflict, suffering, and difficult choices?
- What emotional energy do they carry?
- What is their deepest strength? Their hidden vulnerability?

ANIMAL SELECTION - CHOOSE ONLY FROM THESE SACRED ANIMALS:
Wolf, Eagle (use Hawk), Bear, Fox, Owl, Dolphin, Tiger, Butterfly, Lion, Raven, Deer, Snake, Hawk, Turtle, Hummingbird, Bat, Leopard, Penguin

IMPORTANT: You MUST choose one of these animals. Do not suggest any other animals. If you feel Eagle fits best, use "Hawk" instead as that is the available sacred form.

TONE: 
Mystical, profound, and deeply personal. Write as if you've known their soul across lifetimes. Make them feel truly seen and understood.

RESPONSE FORMAT (JSON):
{
  "animal": "One of the sacred animals from the list above",
  "title": "A profound, poetic title that captures their essence",
  "description": "Two deeply personal, revelatory sentences that make them feel truly seen. Reference their actual choices and what they reveal about their soul.",
  "detailedAnalysis": "A full paragraph (5-7 sentences) that deeply analyzes their personality, decision-making patterns, emotional landscape, and life approach based on their quiz answers. Be specific and reference their actual choices.",
  "strengths": ["4 specific strengths they possess"],
  "challenges": ["4 specific challenges or growth areas they face"],
  "traits": ["8 specific traits that directly reflect their answer patterns and choices"],
  "element": "Fire, Water, Earth, Air, or Spirit - based on their emotional energy and choices",
  "lifePhilosophy": "A profound 2-3 sentence statement about their core life philosophy and worldview",
  "spiritualGuidance": "2-3 sentences of mystical guidance for their journey ahead",
  "compatibility": {
    "highCompatibility": ["2 spirit animals from the sacred list they connect deeply with"],
    "lowCompatibility": ["2 spirit animals from the sacred list they may clash with"]
  }
}

CRITICAL: Only use animals from the sacred list. The animal choice should emerge naturally from their answers while staying within these divine forms.
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
        model: "gemini-1.5-flash-latest",
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

      // imageUrl is always null - frontend uses local images
      const imageUrl = null;

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
      console.log(`Generating image with Bytez Imagen 4.0 for ${animalName}...`);

      // Use a cleaner, simpler prompt that Imagen 4.0 understands better
      const cleanPrompt = `A photorealistic ${animalName} in a mystical cosmic space environment. Purple and gold nebula clouds in the background, stars and stardust particles floating around, soft ethereal moonlight, magical glowing atmosphere, deep space with cosmic fog, cinematic lighting, 3D rendered, highly detailed fur/feathers, majestic and powerful pose, fantasy art style`;

      const { error, output } = await imagenModel.run(cleanPrompt);

      if (error) {
        console.error('Bytez image generation error:', error);
        return null;
      }

      if (output) {
        console.log('Bytez output type:', typeof output);
        console.log('Bytez output:', output);
        
        // Handle different output formats
        let imageUrl = null;
        
        if (typeof output === 'string') {
          // If it's a string, it might be base64 or a URL
          imageUrl = output.startsWith('data:') ? output : 
                     output.startsWith('http') ? output :
                     `data:image/png;base64,${output}`;
        } else if (Array.isArray(output) && output.length > 0) {
          // If it's an array, take the first element
          const firstOutput = output[0];
          imageUrl = typeof firstOutput === 'string' ? 
                     (firstOutput.startsWith('data:') ? firstOutput : 
                      firstOutput.startsWith('http') ? firstOutput :
                      `data:image/png;base64,${firstOutput}`) : null;
        } else if (output.url) {
          // If it has a url property
          imageUrl = output.url;
        } else if (output.image) {
          // If it has an image property
          imageUrl = output.image;
        }
        
        if (imageUrl) {
          console.log(`✅ Image generated successfully for ${animalName}`);
          console.log('Image URL length:', imageUrl.length);
          return imageUrl;
        }
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
      detailedAnalysis: "Your choices reveal a deep commitment to those you love, combined with an intuitive understanding of complex situations. You navigate life with both wisdom and courage, never abandoning your pack even in the darkest times. Your loyalty is not blind—it's earned and given with careful consideration. You possess a natural ability to lead while maintaining strong bonds with those around you.",
      traits: ["loyalty", "intuition", "leadership", "courage", "family bonds", "instinct", "protection", "wisdom"],
      strengths: ["Natural leader", "Protective instinct", "Strategic thinking", "Deep empathy"],
      challenges: ["Can be overly protective", "Difficulty trusting outsiders", "Tendency to carry burdens alone", "Struggles with vulnerability"],
      element: "Spirit",
      lifePhilosophy: "True strength lies not in standing alone, but in knowing when to lead and when to follow. The pack survives through unity, trust, and unwavering loyalty.",
      spiritualGuidance: "Trust your instincts—they have guided you well thus far. Remember that even the strongest wolf needs the pack. Allow others to support you as you support them.",
      compatibility: {
        highCompatibility: ["Eagle", "Bear"],
        lowCompatibility: ["Snake", "Fox"]
      },
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
      element: "Earth",
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
      element: "Water",
      imagePrompt: "ancient sea turtle with a shell covered in glowing moss and crystals, swimming through deep ocean waters filled with bioluminescent creatures"
    },
    {
      animal: "Hummingbird",
      title: "The Joyful Spirit",
      description: "You bring lightness and joy wherever you go. Your ability to find sweetness in life and hover in the present moment inspires others.",
      traits: ["joy", "lightness", "agility", "present moment", "sweetness", "energy", "resilience", "beauty"],
      element: "Air",
      imagePrompt: "tiny hummingbird with wings that create rainbow trails, hovering near a magical flower that glows with nectar made of liquid starlight"
    },
    {
      animal: "Bat",
      title: "The Night Navigator",
      description: "You thrive in the darkness and see what others cannot. Your ability to navigate by intuition and embrace the unknown makes you a guide through life's mysteries.",
      detailedAnalysis: "Your choices reveal a deep comfort with the unseen and mysterious aspects of life. You possess an extraordinary ability to navigate through uncertainty using your inner senses. Where others fear the dark, you find clarity and purpose. Your intuitive nature allows you to perceive truths that remain hidden to most, making you a natural guide for those lost in their own darkness.",
      traits: ["intuition", "night vision", "adaptability", "mystery", "rebirth", "perception", "transformation", "navigation"],
      strengths: ["Exceptional intuition", "Comfortable with change", "Sees hidden truths", "Guides others through darkness"],
      challenges: ["Misunderstood by others", "Can be too solitary", "Difficulty with bright exposure", "May avoid direct confrontation"],
      element: "Spirit",
      lifePhilosophy: "The darkness is not to be feared but embraced. In the shadows, we find our truest selves and the courage to transform. Trust your inner navigation.",
      spiritualGuidance: "Your gift of perception in darkness is rare and precious. Continue to trust your intuition, for it will never lead you astray. Remember that rebirth often requires a journey through the night.",
      compatibility: {
        highCompatibility: ["Owl", "Raven"],
        lowCompatibility: ["Eagle", "Lion"]
      },
      imagePrompt: "mystical bat with outstretched wings silhouetted against a full moon, surrounded by swirling purple mist and glowing night energy"
    },
    {
      animal: "Leopard",
      title: "The Silent Hunter",
      description: "You move through life with grace and deadly precision. Your patience and strategic mind allow you to achieve your goals with elegant efficiency.",
      detailedAnalysis: "Your choices demonstrate a remarkable combination of patience, strategy, and decisive action. You observe carefully before making your move, ensuring success through preparation rather than force. Your independent nature means you prefer to work alone, trusting your own abilities above all. Yet beneath your solitary exterior lies a fierce protector who will defend what matters with unmatched ferocity.",
      traits: ["stealth", "patience", "strategy", "independence", "precision", "adaptability", "power", "grace"],
      strengths: ["Strategic thinking", "Patient observation", "Decisive action", "Self-reliant"],
      challenges: ["Can be too solitary", "Difficulty asking for help", "May appear cold or distant", "Struggles with vulnerability"],
      element: "Earth",
      lifePhilosophy: "Success comes to those who wait for the perfect moment and strike with precision. Independence is strength, but knowing when to reveal yourself is wisdom.",
      spiritualGuidance: "Your solitary path has made you strong, but remember that even the most skilled hunter benefits from allies. Trust in your timing, for your instincts are sharp and true.",
      compatibility: {
        highCompatibility: ["Tiger", "Snake"],
        lowCompatibility: ["Wolf", "Dolphin"]
      },
      imagePrompt: "sleek leopard with glowing spots perched on a tree branch in a moonlit jungle, eyes gleaming with golden light and mystical energy"
    },
    {
      animal: "Penguin",
      title: "The Devoted Community Builder",
      description: "You understand that true strength comes from unity and dedication. Your loyalty to your community and ability to thrive in harsh conditions inspire resilience in others.",
      detailedAnalysis: "Your choices reflect a deep commitment to community and collective success. You understand that survival and thriving require cooperation, dedication, and mutual support. In the harshest conditions, you remain steadfast, finding warmth in connection rather than isolation. Your playful spirit balances your serious dedication, reminding others that joy and responsibility can coexist beautifully.",
      traits: ["loyalty", "community", "dedication", "resilience", "cooperation", "playfulness", "endurance", "family bonds"],
      strengths: ["Strong community bonds", "Resilient in adversity", "Dedicated partner", "Balances work and play"],
      challenges: ["Can be overly dependent on group", "Difficulty with change", "May sacrifice personal needs", "Struggles in isolation"],
      element: "Water",
      lifePhilosophy: "We are stronger together than apart. True resilience comes not from individual strength, but from the bonds we forge and the communities we build.",
      spiritualGuidance: "Your dedication to others is admirable, but remember to honor your own needs as well. The community thrives when each member is whole and healthy, including you.",
      compatibility: {
        highCompatibility: ["Wolf", "Dolphin"],
        lowCompatibility: ["Fox", "Leopard"]
      },
      imagePrompt: "group of penguins standing together under aurora borealis, with one penguin in focus glowing with soft blue and green ethereal light"
    }
  ];

  const answerTexts = answers.map(a => a.choice.toLowerCase()).join(' ');
  
  // Score each animal based on trait matches
  const scoredAnimals = spiritAnimals.map(animal => {
    let score = 0;
    
    // Check each trait for matches in the answers
    animal.traits.forEach(trait => {
      const traitLower = trait.toLowerCase();
      // Full word match gets more points
      if (answerTexts.includes(traitLower)) {
        score += 3;
      }
      // Partial match (first 4 characters) gets fewer points
      else if (answerTexts.includes(traitLower.substring(0, 4))) {
        score += 1;
      }
    });
    
    // Also check element alignment
    if (answerTexts.includes(animal.element.toLowerCase())) {
      score += 2;
    }
    
    // Add a small random factor (0-0.5) to ensure variety when scores are close
    const randomBonus = Math.random() * 0.5;
    
    return { animal, score: score + randomBonus };
  });
  
  // Sort by score (highest first)
  scoredAnimals.sort((a, b) => b.score - a.score);
  
  // Get the highest score
  const highestScore = scoredAnimals[0].score;
  
  // If highest score is very low (less than 1), pick randomly from all animals
  let selectedAnimal;
  if (highestScore < 1) {
    selectedAnimal = spiritAnimals[Math.floor(Math.random() * spiritAnimals.length)];
  } else {
    // Get all animals within 1 point of the highest score (to allow for close matches)
    const topAnimals = scoredAnimals.filter(sa => sa.score >= highestScore - 1);
    
    // Randomly pick one from the top scorers for variety
    selectedAnimal = topAnimals[Math.floor(Math.random() * topAnimals.length)].animal;
  }

  // Add missing fields with defaults if not present
  if (!selectedAnimal.detailedAnalysis) {
    selectedAnimal.detailedAnalysis = `${selectedAnimal.description} Your journey reflects a unique blend of ${selectedAnimal.traits.slice(0, 3).join(', ')}, making you a truly remarkable individual. The choices you've made reveal deep insights into your character and the path you walk.`;
  }
  
  if (!selectedAnimal.strengths) {
    selectedAnimal.strengths = [
      `Strong ${selectedAnimal.traits[0]}`,
      `Natural ${selectedAnimal.traits[1]}`,
      `Exceptional ${selectedAnimal.traits[2]}`,
      `Deep ${selectedAnimal.traits[3] || 'wisdom'}`
    ];
  }
  
  if (!selectedAnimal.challenges) {
    selectedAnimal.challenges = [
      "Learning to balance independence with connection",
      "Embracing vulnerability as strength",
      "Trusting the process of growth",
      "Finding harmony between action and reflection"
    ];
  }
  
  if (!selectedAnimal.lifePhilosophy) {
    selectedAnimal.lifePhilosophy = `Life is a journey of continuous growth and transformation. Embrace your ${selectedAnimal.element} nature and trust in your unique path.`;
  }
  
  if (!selectedAnimal.spiritualGuidance) {
    selectedAnimal.spiritualGuidance = `Your spirit as a ${selectedAnimal.animal} guides you to embrace your true nature. Trust in your innate ${selectedAnimal.traits[0]} and let it illuminate your path forward. The universe recognizes your unique essence.`;
  }
  
  if (!selectedAnimal.compatibility) {
    selectedAnimal.compatibility = {
      highCompatibility: [spiritAnimals[(spiritAnimals.indexOf(selectedAnimal) + 1) % spiritAnimals.length].animal, spiritAnimals[(spiritAnimals.indexOf(selectedAnimal) + 2) % spiritAnimals.length].animal],
      lowCompatibility: [spiritAnimals[(spiritAnimals.indexOf(selectedAnimal) + 7) % spiritAnimals.length].animal, spiritAnimals[(spiritAnimals.indexOf(selectedAnimal) + 8) % spiritAnimals.length].animal]
    };
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