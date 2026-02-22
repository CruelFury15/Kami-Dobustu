const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class OracleAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async consultOracle(answers) {
    try {
      console.log('🔮 Calling backend at:', `${this.baseURL}/consult-oracle`);
      const response = await fetch(`${this.baseURL}/consult-oracle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers })
      });

      console.log('📡 Backend response status:', response.status);

      if (!response.ok) {
        throw new Error(`Oracle responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Backend data received:', data);
      console.log('📸 Image URL present:', !!data.spiritAnimal?.imageUrl);
      return data;
    } catch (error) {
      console.error('❌ Failed to consult the Oracle:', error);
      console.log('⚠️  Using frontend fallback (no imageUrl)');
      
      return this.fallbackSpiritDetermination();
    }
  }

  async checkOracleHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();
      return { isHealthy: response.ok, message: data.status };
    } catch (error) {
      console.error('Oracle health check failed:', error);
      return { isHealthy: false, message: 'Oracle is sleeping' };
    }
  }

  fallbackSpiritDetermination() {
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
      }
    ];

    const randomIndex = Math.floor(Math.random() * spiritAnimals.length);
    const selectedAnimal = spiritAnimals[randomIndex];

    return {
      success: true,
      spiritAnimal: selectedAnimal,
      message: "The spirits have spoken through ancient wisdom (offline mode)",
      timestamp: new Date().toISOString(),
      source: "fallback"
    };
  }

  formatError(error) {
    if (error.message.includes('fetch')) {
      return "The Oracle's connection to the spirit realm has been interrupted. Please try again.";
    }
    return "The Oracle encountered an unexpected disturbance. Please try again.";
  }
}

const oracleAPI = new OracleAPI();

export const fetchOracleResult = (answers) => oracleAPI.consultOracle(answers);

export default oracleAPI;