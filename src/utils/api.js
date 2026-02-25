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
        imagePrompt: "majestic wolf with glowing blue eyes standing on a moonlit mountain peak, ethereal mist swirling around, silver fur with mystical light patterns",
        detailedAnalysis: "As a Wolf spirit, you embody the perfect balance between independence and community. Your natural leadership emerges not from dominance but from deep loyalty and protective instincts toward your pack. You possess an uncanny intuition that allows you to sense danger and opportunity long before others, making you a trusted guide in uncertain times. Your strength lies in your ability to maintain fierce independence while fostering deep, meaningful connections with those you consider family. You understand that true power comes from unity, and you're willing to sacrifice for the greater good of your community.",
        strengths: ["Deep loyalty and commitment to loved ones", "Strong intuitive abilities and instincts", "Natural leadership through example", "Ability to balance independence with teamwork"],
        challenges: ["Tendency to be overly protective", "Difficulty trusting outsiders", "Can become isolated when hurt", "May struggle with vulnerability"],
        lifePhilosophy: "True strength is found not in solitude, but in the bonds we forge and protect with unwavering loyalty.",
        spiritualGuidance: "Trust your instincts—they are the whispers of ancient wisdom flowing through your veins. Remember that showing vulnerability to your pack is not weakness but the ultimate expression of trust. Your path is to teach others that loyalty and freedom are not opposites but complementary forces.",
        compatibility: {
          highCompatibility: ["Eagle", "Bear"],
          lowCompatibility: ["Fox", "Butterfly"]
        }
      },
      {
        animal: "Eagle",
        title: "The Visionary Leader",
        description: "You see the bigger picture and inspire others with your vision. Your freedom-loving spirit soars above obstacles to reach new heights.",
        traits: ["vision", "freedom", "leadership", "perspective", "clarity", "focus", "independence", "strength"],
        element: "Air",
        imagePrompt: "golden eagle soaring through cosmic clouds with wings spread wide, celestial light radiating from feathers, starry sky background with nebula colors",
        detailedAnalysis: "The Eagle spirit within you grants the rare gift of perspective—you naturally rise above chaos to see patterns and possibilities others miss. Your vision extends far beyond the immediate, allowing you to chart courses toward distant horizons with confidence and clarity. You inspire others not through force but through the sheer power of your conviction and the clarity of your purpose. Freedom is not just a desire for you; it's a fundamental need, as essential as breathing. You thrive in spaces where you can spread your wings and explore new territories, whether physical, intellectual, or spiritual.",
        strengths: ["Exceptional ability to see the big picture", "Natural strategic thinking and planning", "Inspiring presence that motivates others", "Strong sense of personal freedom and independence"],
        challenges: ["Can seem distant or aloof to others", "May overlook important details", "Difficulty with routine or mundane tasks", "Tendency to be overly critical from your high vantage point"],
        lifePhilosophy: "From great heights come great insights—rise above the storms to see the sunshine beyond.",
        spiritualGuidance: "Your gift of vision comes with responsibility. Share your insights with compassion, remembering that not everyone can see what you see. Ground your lofty ideals with practical action, and teach others to spread their own wings. Your purpose is to be a beacon of possibility in a world that often forgets to look up.",
        compatibility: {
          highCompatibility: ["Wolf", "Owl"],
          lowCompatibility: ["Bear", "Dolphin"]
        }
      },
      {
        animal: "Bear",
        title: "The Gentle Protector",
        description: "You are a source of strength and comfort for others. Your patient, nurturing nature helps heal and support those around you.",
        traits: ["strength", "patience", "protection", "healing", "nurturing", "grounding", "resilience", "comfort"],
        element: "Earth",
        imagePrompt: "wise brown bear surrounded by glowing forest spirits, ancient trees with luminous leaves, peaceful expression with gentle golden aura",
        detailedAnalysis: "Your Bear spirit embodies the beautiful paradox of immense strength tempered with gentle compassion. You are a natural healer and protector, creating safe spaces where others can rest, recover, and grow. Your patience is legendary—you understand that true growth cannot be rushed and that healing happens in its own time. Grounded in the earth's wisdom, you possess an innate understanding of natural cycles and the importance of rest and renewal. People are drawn to your calming presence and find comfort in your steady, reliable nature. You teach others that true power lies not in aggression but in the courage to be gentle.",
        strengths: ["Immense inner strength and resilience", "Natural healing and nurturing abilities", "Patience and understanding with others", "Grounding presence that calms chaos"],
        challenges: ["Can be overly protective or smothering", "Tendency to neglect own needs for others", "Slow to anger but fierce when provoked", "May resist necessary change"],
        lifePhilosophy: "True strength is gentle, true power is patient, and true courage is knowing when to rest.",
        spiritualGuidance: "Honor your need for solitude and hibernation—these are not signs of weakness but essential for your renewal. Remember that you cannot pour from an empty cup; nurture yourself as generously as you nurture others. Your path is to show the world that gentleness and strength are not opposites but two sides of the same powerful force.",
        compatibility: {
          highCompatibility: ["Wolf", "Dolphin"],
          lowCompatibility: ["Tiger", "Eagle"]
        }
      },
      {
        animal: "Fox",
        title: "The Clever Adapter",
        description: "You navigate life with intelligence and creativity. Your quick thinking and adaptability help you find solutions others might miss.",
        traits: ["intelligence", "adaptability", "creativity", "cunning", "resourcefulness", "charm", "wit", "flexibility"],
        element: "Fire",
        imagePrompt: "elegant red fox with multiple tails made of flowing fire energy, sitting in an enchanted forest clearing with magical floating orbs",
        detailedAnalysis: "The Fox spirit gifts you with remarkable mental agility and creative problem-solving abilities. You dance through life's challenges with grace and wit, finding unconventional solutions where others see only obstacles. Your adaptability is your superpower—you can thrive in almost any environment by quickly assessing situations and adjusting your approach. Charm and intelligence combine in you to create a magnetic personality that opens doors and wins allies. You understand that there are many paths to any destination, and you're not afraid to take the scenic route if it serves your purpose. Your playful nature masks a sharp, strategic mind always working several steps ahead.",
        strengths: ["Quick thinking and mental agility", "Exceptional adaptability to change", "Creative problem-solving abilities", "Charming and persuasive communication"],
        challenges: ["Can be seen as manipulative or untrustworthy", "Tendency to overthink situations", "May struggle with commitment", "Sometimes too clever for your own good"],
        lifePhilosophy: "Life is a game of strategy and adaptation—the wise player knows when to be bold and when to be subtle.",
        spiritualGuidance: "Your cleverness is a gift, but remember that true wisdom includes knowing when to be straightforward. Use your adaptability to help others navigate change, not just to serve yourself. Trust is earned through consistency, so let others see the loyal heart beneath your playful exterior. Your purpose is to teach that intelligence without integrity is merely cunning, but combined, they become wisdom.",
        compatibility: {
          highCompatibility: ["Raven", "Butterfly"],
          lowCompatibility: ["Wolf", "Lion"]
        }
      },
      {
        animal: "Owl",
        title: "The Wise Observer",
        description: "You see what others cannot and understand the deeper meaning of things. Your wisdom comes from careful observation and inner knowing.",
        traits: ["wisdom", "intuition", "observation", "mystery", "knowledge", "silence", "night vision", "ancient secrets"],
        element: "Spirit",
        imagePrompt: "mystical owl with large luminous eyes perched on an ancient branch, surrounded by floating runes and sacred symbols, moonbeams filtering through",
        detailedAnalysis: "Your Owl spirit connects you to ancient wisdom and hidden knowledge. You possess the rare ability to see through darkness—both literal and metaphorical—perceiving truths that remain hidden to others. Your observant nature means you notice the subtle details, the unspoken words, the patterns beneath the surface. Silence is your ally, and in quiet contemplation, you access deep wells of intuitive knowing. You are comfortable with mystery and understand that not everything needs to be explained or illuminated. Your wisdom comes not from books alone but from patient observation and the courage to sit with the unknown. Others seek you out for guidance, sensing your connection to deeper truths.",
        strengths: ["Deep wisdom and intuitive insight", "Exceptional observational skills", "Comfort with solitude and reflection", "Ability to see through deception"],
        challenges: ["Can be overly secretive or withdrawn", "May intimidate others with your intensity", "Tendency toward isolation", "Sometimes paralyzed by seeing too many perspectives"],
        lifePhilosophy: "In silence and shadow, truth reveals itself to those patient enough to watch and wise enough to listen.",
        spiritualGuidance: "Your gift of sight is meant to be shared, but remember to speak in ways others can understand. Not everyone is ready for the full truth at once—learn to illuminate gradually. Balance your love of solitude with meaningful connection, for even the wisest owl needs a tree to call home. Your path is to be a bridge between the seen and unseen worlds.",
        compatibility: {
          highCompatibility: ["Eagle", "Raven"],
          lowCompatibility: ["Dolphin", "Butterfly"]
        }
      },
      {
        animal: "Dolphin",
        title: "The Joyful Healer",
        description: "You bring joy and healing wherever you go. Your playful spirit and emotional intelligence create deep connections with others.",
        traits: ["joy", "healing", "empathy", "communication", "playfulness", "intelligence", "harmony", "emotional depth"],
        element: "Water",
        imagePrompt: "graceful dolphin leaping through crystal clear water with rainbow light refractions, surrounded by healing energy waves and aquatic light patterns",
        detailedAnalysis: "The Dolphin spirit blesses you with extraordinary emotional intelligence and a natural gift for healing through joy. You understand that laughter and play are not frivolous but essential medicines for the soul. Your empathic abilities allow you to sense the emotional currents around you, and you navigate these waters with grace and compassion. Communication comes naturally to you—you have a gift for expressing complex emotions and helping others articulate their own feelings. Your playful nature is not childish but wise, recognizing that joy is a choice and a practice. You create harmony wherever you go, bringing people together and healing rifts with your warm, inclusive energy.",
        strengths: ["High emotional intelligence and empathy", "Natural healing abilities through joy", "Excellent communication skills", "Ability to create harmony in groups"],
        challenges: ["Can absorb others' emotions too deeply", "May use playfulness to avoid serious issues", "Tendency to overextend yourself helping others", "Difficulty setting emotional boundaries"],
        lifePhilosophy: "Joy is not the absence of depth but the celebration of life in all its complexity—healing happens through connection and play.",
        spiritualGuidance: "Your empathy is a superpower, but you must learn to protect your own energy. Not every emotional wave is yours to ride. Remember that you can't heal everyone, and trying to do so will only deplete you. Set boundaries with love, and teach others that joy is a practice, not a destination. Your purpose is to remind the world that healing and happiness are intertwined.",
        compatibility: {
          highCompatibility: ["Bear", "Butterfly"],
          lowCompatibility: ["Tiger", "Eagle"]
        }
      },
      {
        animal: "Tiger",
        title: "The Fierce Warrior",
        description: "You face challenges with courage and determination. Your inner strength and passion drive you to overcome any obstacle.",
        traits: ["courage", "strength", "passion", "independence", "power", "determination", "confidence", "fierce loyalty"],
        element: "Fire",
        imagePrompt: "powerful tiger with glowing orange and black stripes, standing in a bamboo forest with mystical fire energy crackling around its paws",
        detailedAnalysis: "Your Tiger spirit burns with fierce determination and unshakeable courage. You approach life with passionate intensity, fully committing to whatever you pursue. Obstacles that would stop others merely fuel your fire—you thrive on challenges and grow stronger through adversity. Your independence is absolute; you walk your own path with confidence, unbowed by others' opinions or expectations. Yet beneath your fierce exterior lies a deeply loyal heart that will fight to the death for those you love. Your presence commands respect, and your confidence inspires others to find their own inner strength. You understand that true power comes from self-mastery and the courage to face your own shadows.",
        strengths: ["Exceptional courage and bravery", "Powerful determination and willpower", "Passionate commitment to goals", "Natural confidence and presence"],
        challenges: ["Can be overly aggressive or domineering", "Tendency toward impatience", "May struggle with collaboration", "Sometimes too intense for others"],
        lifePhilosophy: "Courage is not the absence of fear but the decision that something else matters more—face life with fierce passion.",
        spiritualGuidance: "Your fire is meant to warm and inspire, not to burn and destroy. Learn to temper your intensity with patience and your strength with gentleness. True warriors know when to fight and when to rest. Channel your passion into purposeful action, and remember that the greatest battles are often won within. Your path is to show others that courage is a choice available to everyone.",
        compatibility: {
          highCompatibility: ["Lion", "Eagle"],
          lowCompatibility: ["Bear", "Dolphin"]
        }
      },
      {
        animal: "Butterfly",
        title: "The Beautiful Transformer",
        description: "You embrace change and help others transform their lives. Your gentle beauty and grace inspire growth and renewal.",
        traits: ["transformation", "beauty", "grace", "renewal", "metamorphosis", "lightness", "color", "inspiration"],
        element: "Air",
        imagePrompt: "magnificent butterfly with iridescent wings that shimmer with rainbow colors, surrounded by floating flower petals and sparkling transformation energy",
        detailedAnalysis: "The Butterfly spirit within you embodies the profound truth that transformation is not only possible but natural and beautiful. You have lived through your own metamorphosis and emerged with wisdom about the process of change. Your presence reminds others that endings are also beginnings, and that periods of darkness and struggle can lead to breathtaking beauty. You move through life with grace and lightness, not because you haven't known hardship, but because you've learned to carry your experiences without being weighed down by them. Your colorful, authentic self-expression inspires others to embrace their own uniqueness. You understand that true beauty comes from the courage to transform.",
        strengths: ["Embraces change and transformation", "Inspires others through authentic expression", "Graceful navigation of life transitions", "Ability to find beauty in all experiences"],
        challenges: ["Can be seen as flighty or inconsistent", "May struggle with grounding and stability", "Tendency to avoid necessary confrontation", "Sometimes changes too quickly for others"],
        lifePhilosophy: "Transformation is the soul's natural state—embrace change as the universe's invitation to become who you truly are.",
        spiritualGuidance: "Your journey of transformation is ongoing, and that's exactly as it should be. Don't let others pressure you to stay in a cocoon when you're ready to fly, but also honor the necessary periods of stillness and integration. Your lightness is not superficiality but hard-won wisdom. Share your story of transformation to give others hope. Your purpose is to be living proof that change, though difficult, leads to beauty.",
        compatibility: {
          highCompatibility: ["Fox", "Dolphin"],
          lowCompatibility: ["Wolf", "Owl"]
        }
      },
      {
        animal: "Lion",
        title: "The Noble Ruler",
        description: "You lead with dignity and inspire others through your natural authority. Your brave heart and generous spirit make you a natural protector.",
        traits: ["leadership", "courage", "nobility", "pride", "generosity", "authority", "bravery", "majesty"],
        element: "Fire",
        imagePrompt: "majestic lion with a golden mane that flows like liquid sunlight, standing on a rocky outcrop with divine light emanating from its presence",
        detailedAnalysis: "Your Lion spirit radiates natural authority and noble bearing. You lead not through force but through the sheer magnetism of your presence and the integrity of your character. Dignity and honor guide your actions—you hold yourself to high standards and inspire others to rise to theirs. Your courage is legendary; you face challenges head-on with a brave heart and unwavering confidence. Yet your strength is tempered with generosity and a protective instinct toward those in your care. You understand that true leadership is service, and that authority comes with responsibility. Your pride is not arrogance but a healthy self-respect that refuses to compromise your values. You create kingdoms of possibility wherever you go.",
        strengths: ["Natural leadership and authority", "Courageous and brave in adversity", "Generous and protective of others", "Strong sense of honor and integrity"],
        challenges: ["Can be overly proud or stubborn", "May struggle to show vulnerability", "Tendency to be controlling", "Sometimes expects too much from others"],
        lifePhilosophy: "True nobility is measured not by the crown you wear but by the lives you uplift and the integrity you maintain.",
        spiritualGuidance: "Your roar is powerful, but remember that silence can be equally commanding. Lead with your heart as much as your strength, and show others that vulnerability is the ultimate courage. Your pride should inspire, not intimidate. Share your throne by empowering others to lead in their own domains. Your path is to demonstrate that true kingship is about service, not dominion.",
        compatibility: {
          highCompatibility: ["Tiger", "Eagle"],
          lowCompatibility: ["Fox", "Butterfly"]
        }
      },
      {
        animal: "Raven",
        title: "The Mystical Messenger",
        description: "You carry ancient wisdom and see beyond the veil of ordinary reality. Your intelligence and intuition guide you through life's mysteries.",
        traits: ["mystery", "intelligence", "magic", "prophecy", "transformation", "memory", "communication", "ancient wisdom"],
        element: "Spirit",
        imagePrompt: "black raven with eyes like stars perched on a crystal formation, surrounded by swirling cosmic energy and ancient mystical symbols",
        detailedAnalysis: "The Raven spirit marks you as a walker between worlds, comfortable in the liminal spaces where magic and reality intersect. Your intelligence is sharp and multifaceted, capable of understanding complex systems and hidden connections. You possess prophetic insight—an ability to sense what's coming and read the signs others miss. Memory is your gift; you carry the wisdom of the past and understand how it shapes the future. You're drawn to mysteries and are not afraid of the shadow side of existence, knowing that darkness and light are both necessary. Your communication skills are powerful—you speak truths that others need to hear, even when they're uncomfortable. You are a messenger of transformation, helping others navigate their own dark nights of the soul.",
        strengths: ["Sharp intelligence and analytical ability", "Prophetic insight and intuition", "Comfortable with mystery and the unknown", "Powerful communicator of difficult truths"],
        challenges: ["Can be seen as dark or ominous", "May become obsessed with mysteries", "Tendency toward cynicism", "Sometimes delivers truths too harshly"],
        lifePhilosophy: "Magic lives in the spaces between—embrace mystery, honor memory, and speak the truths that transform.",
        spiritualGuidance: "Your connection to the mystical is a gift, but remember to stay grounded in the physical world. Not every mystery needs solving, and not every truth needs speaking. Use your prophetic abilities to guide and warn, not to frighten. Your darkness is not evil but depth—teach others to embrace their own shadows. Your purpose is to be a bridge between the mundane and the magical, showing that both are real and necessary.",
        compatibility: {
          highCompatibility: ["Owl", "Fox"],
          lowCompatibility: ["Lion", "Dolphin"]
        }
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