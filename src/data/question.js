let ritualQuestions = [
  {
    id: 1,
    text: "The path ahead splits in four. Where does your spirit pull you?",
    options: [
      { text: "Toward the whispering canopy of the Great Woods", traits: { earth: 2, calm: 1 } },
      { text: "Into the mist of the Endless Shore", traits: { water: 2, mystery: 1 } },
      { text: "Up the jagged peaks toward the stars", traits: { air: 2, ambition: 1 } },
      { text: "Through the glowing embers of the Volcanic Pass", traits: { fire: 2, power: 1 } }
    ]
  },
  {
    id: 2,
    text: "A stranger approaches in the silence. What is your first instinct?",
    options: [
      { text: "Observe from the shadows", traits: { cunning: 2, mystery: 1 } },
      { text: "Stand tall and offer a greeting", traits: { bravery: 2, social: 1 } },
      { text: "Offer a gift of peace", traits: { wisdom: 2, calm: 1 } },
      { text: "Prepare for a challenge", traits: { fire: 1, strength: 2 } }
    ]
  },
  {
    id: 3,
    text: "Which celestial body governs your internal rhythm?",
    options: [
      { text: "The Pale Moon (Intuition)", traits: { mystery: 2, water: 1 } },
      { text: "The Burning Sun (Vitality)", traits: { fire: 2, strength: 1 } },
      { text: "The Constant North Star (Guidance)", traits: { air: 1, wisdom: 2 } },
      { text: "The Deep Earth (Stability)", traits: { earth: 2, calm: 1 } }
    ]
  },
  {
    id: 4,
    text: "You find an ancient mirror in the forest. It does not show your face, but your essence. What do you see?",
    options: [
      { text: "A flickering flame that refuses to die.", traits: { fire: 2, persistence: 1 } },
      { text: "A vast, cloudless sky.", traits: { air: 2, clarity: 2 } },
      { text: "A tangled thicket of thorns and roses.", traits: { earth: 1, protection: 2 } },
      { text: "A deep well of ink-black water.", traits: { water: 1, mystery: 2 } }
    ]
  },
  {
    id: 5,
    text: "The Great Spirit speaks without words. How do you hear the message?",
    options: [
      { text: "As a sudden vibration in my chest.", traits: { strength: 2, fire: 1 } },
      { text: "As a whisper carried by the wind.", traits: { air: 2, intuition: 1 } },
      { text: "As a pattern in the falling leaves.", traits: { earth: 2, wisdom: 1 } },
      { text: "As a ripple on a silent pond.", traits: { water: 2, calm: 1 } }
    ]
  },
  {
    id: 6,
    text: "If your soul was a sound, what would it be?",
    options: [
      { text: "The roar of a distant storm.", traits: { power: 2, bravery: 1 } },
      { text: "The soft chime of silver bells.", traits: { grace: 2, air: 1 } },
      { text: "The low hum of the mountain.", traits: { stability: 2, earth: 1 } },
      { text: "The silence between heartbeats.", traits: { mystery: 2, wisdom: 1 } }
    ]
  },
  {
    id: 7,
    text: "You are offered a gift that you must never lose. Which do you take?",
    options: [
      { text: "The Sight to see through any lie.", traits: { wisdom: 2, air: 1 } },
      { text: "The Fang to defend the weak.", traits: { bravery: 2, strength: 1 } },
      { text: "The Wing to leave the earth behind.", traits: { freedom: 2, air: 2 } },
      { text: "The Root to always belong somewhere.", traits: { loyalty: 2, earth: 1 } }
    ]
  },
  {
    id: 8,
    text: "A dragon sleeps across the only path. How do you proceed?",
    options: [
      { text: "Step over its coils with silent grace.", traits: { air: 2, grace: 1 } },
      { text: "Wake the beast to ask for passage.", traits: { fire: 2, bravery: 2 } },
      { text: "Find a hidden trail through the brush.", traits: { earth: 2, cunning: 1 } },
      { text: "Sing a melody to deepen its slumber.", traits: { water: 2, wisdom: 1 } }
    ]
  },
  {
    id: 9,
    text: "You are given a lantern that burns without oil. What fuels the flame?",
    options: [
      { text: "The heat of my strongest memories.", traits: { fire: 2, persistence: 1 } },
      { text: "The breath of the world around me.", traits: { air: 2, freedom: 1 } },
      { text: "The weight of my ancestors' promises.", traits: { earth: 2, loyalty: 2 } },
      { text: "The tears I have shed for others.", traits: { water: 2, empathy: 2 } }
    ]
  },
  {
    id: 10,
    text: "The Great Hunter pursues you in a dream. Where do you hide?",
    options: [
      { text: "I do not hide; I turn to face the chase.", traits: { fire: 2, bravery: 2 } },
      { text: "In the reflection of a frozen lake.", traits: { water: 2, mystery: 2 } },
      { text: "High within the branches of the Elder Tree.", traits: { earth: 2, protection: 1 } },
      { text: "I become the wind and vanish entirely.", traits: { air: 2, freedom: 2 } }
    ]
  },
  {
    id: 11,
    text: "Which of these ancient laws do you value most?",
    options: [
      { text: "The law of Change: Nothing stays the same.", traits: { water: 2, wisdom: 1 } },
      { text: "The law of Balance: For every rise, a fall.", traits: { air: 2, calm: 2 } },
      { text: "The law of Strength: The root must hold.", traits: { earth: 2, stability: 1 } },
      { text: "The law of Hunger: The fire must be fed.", traits: { fire: 2, ambition: 2 } }
    ]
  },
  {
    id: 12,
    text: "You find a wounded predator on your porch. What is your reaction?",
    options: [
      { text: "Mend its wounds with quiet patience.", traits: { water: 1, empathy: 2 } },
      { text: "End its suffering with a swift strike.", traits: { fire: 1, bravery: 1 } },
      { text: "Leave food and watch from a distance.", traits: { earth: 1, wisdom: 1 } },
      { text: "Open the gate and let nature decide.", traits: { air: 1, freedom: 2 } }
    ]
  },
  {
    id: 13,
    text: "The sky turns the color of bruised violets. A storm is coming. Do you:",
    options: [
      { text: "Dance in the first strike of lightning.", traits: { fire: 2, chaos: 2 } },
      { text: "Listen to the secrets in the thunder.", traits: { air: 1, mystery: 2 } },
      { text: "Build a hearth to keep the cold away.", traits: { earth: 2, protection: 2 } },
      { text: "Collect the rainwater in silver bowls.", traits: { water: 2, grace: 1 } }
    ]
  },
  {
    id: 14,
    text: "If you could drink from one of the Four Wells, which would you choose?",
    options: [
      { text: "The Well of Infinite Sight.", traits: { air: 1, wisdom: 2 } },
      { text: "The Well of Unstoppable Might.", traits: { fire: 2, power: 1 } },
      { text: "The Well of Eternal Youth.", traits: { water: 2, grace: 1 } },
      { text: "The Well of Forgotten Stone.", traits: { earth: 2, mystery: 1 } }
    ]
  },
  {
    id: 15,
    text: "A ghost asks you for a single word to sum up your journey. What is it?",
    options: [
      { text: "Discovery.", traits: { air: 2, freedom: 1 } },
      { text: "Victory.", traits: { fire: 2, bravery: 1 } },
      { text: "Home.", traits: { earth: 2, loyalty: 1 } },
      { text: "Peace.", traits: { water: 2, calm: 1 } }
    ]
  },
  {
    id: 16,
    text: "You are a bridge. What travels across you most often?",
    options: [
      { text: "The heavy wagons of trade and toil.", traits: { earth: 2, stability: 2 } },
      { text: "The fleeting footsteps of lovers.", traits: { water: 2, grace: 1 } },
      { text: "The whispers of travelers from afar.", traits: { air: 2, mystery: 1 } },
      { text: "The marching boots of an army.", traits: { fire: 2, power: 1 } }
    ]
  },
  {
    id: 17,
    text: "The Rite is almost complete. How do you feel in the final moments?",
    options: [
      { text: "A burning itch to begin the hunt.", traits: { fire: 2, ambition: 1 } },
      { text: "A lightness, as if my bones were hollow.", traits: { air: 2, freedom: 2 } },
      { text: "A heaviness that feels like belonging.", traits: { earth: 2, loyalty: 2 } },
      { text: "A flow, like a river reaching the sea.", traits: { water: 2, calm: 2 } }
    ]
  },
  {
    id: 18,
    text: "Your shadow detaches itself and begins to walk away. How do you react?",
    options: [
      { text: "I chase it down; we are one and the same.", traits: { fire: 2, persistence: 1 } },
      { text: "I let it go; it deserves its own journey.", traits: { air: 2, freedom: 2 } },
      { text: "I call it back using a secret name.", traits: { water: 1, mystery: 2 } },
      { text: "I wait for nightfall; it will return to its source.", traits: { earth: 2, patience: 1 } }
    ]
  },
  {
    id: 19,
    text: "You are wandering a city made entirely of salt. You are thirsty. What do you do?",
    options: [
      { text: "Climb the highest spire to look for the sea.", traits: { air: 2, ambition: 1 } },
      { text: "Dig deep into the ground to find a hidden spring.", traits: { earth: 2, persistence: 2 } },
      { text: "Offer a prayer to the clouds for a single drop of rain.", traits: { water: 2, empathy: 1 } },
      { text: "Burn the salt to see if it turns to glass.", traits: { fire: 2, chaos: 1 } }
    ]
  },
  {
    id: 20,
    text: "A voice from the void asks: 'What is the price of wisdom?'",
    options: [
      { text: "A lifetime of solitude and silence.", traits: { air: 1, wisdom: 2 } },
      { text: "The scars earned from a thousand mistakes.", traits: { fire: 1, bravery: 2 } },
      { text: "The heavy burden of keeping others' secrets.", traits: { earth: 2, loyalty: 1 } },
      { text: "The ability to forget who I used to be.", traits: { water: 2, mystery: 1 } }
    ]
  },
  {
    id: 21,
    text: "You find a clock that stopped at the exact moment of your birth. Do you wind it?",
    options: [
      { text: "Yes, let time resume its relentless march.", traits: { fire: 2, action: 1 } },
      { text: "No, that moment is sacred and must remain still.", traits: { water: 2, calm: 2 } },
      { text: "I turn the hands backward to see what was.", traits: { air: 1, mystery: 2 } },
      { text: "I bury it in the garden to let it grow into something new.", traits: { earth: 2, stability: 1 } }
    ]
  },
  {
    id: 22,
    text: "The Great Spirit offers you a final choice: To be the Hunter or the Forest?",
    options: [
      { text: "The Hunter: Always moving, always seeking.", traits: { fire: 2, ambition: 2 } },
      { text: "The Forest: Providing life and holding ancient secrets.", traits: { earth: 2, protection: 2 } },
      { text: "The Breeze: Moving between the leaves, belonging to none.", traits: { air: 2, freedom: 2 } },
      { text: "The Rain: Washing the world clean after the struggle.", traits: { water: 2, empathy: 2 } }
    ]
  },
  {
    id: 23,
    text: "You reach the Gate of Silence. To pass, you must leave a piece of yourself behind. What do you surrender?",
    options: [
      { text: "My Voice: I no longer need to speak to be understood.", traits: { air: 1, wisdom: 2 } },
      { text: "My Name: I will walk the world as a stranger to all.", traits: { water: 2, mystery: 2 } },
      { text: "My Fear: I will never feel the safety of caution again.", traits: { fire: 2, bravery: 2 } },
      { text: "My Past: I forget everyone I have ever loved.", traits: { earth: 1, stability: 2 } }
    ]
  },
  {
    id: 24,
    text: "A mirror image of yourself steps out from the dark. It holds a blade and looks at you with hatred. What is your move?",
    options: [
      { text: "Strike first; there can be only one.", traits: { fire: 2, power: 2 } },
      { text: "Drop my weapon and embrace the shadow.", traits: { water: 2, empathy: 2 } },
      { text: "Shatter the mirror and end the illusion.", traits: { earth: 2, decisiveness: 1 } },
      { text: "Close my eyes and wait for the blow to fall.", traits: { air: 2, calm: 2 } }
    ]
  },
  {
    id: 25,
    text: "The world is ending in a Great Reset. You can save only one thing from the fire. Which is it?",
    options: [
      { text: "A single seed to plant a new forest.", traits: { earth: 2, protection: 2 } },
      { text: "The memory of how it felt to be human.", traits: { water: 2, loyalty: 1 } },
      { text: "The spark of light to guide those who come after.", traits: { fire: 2, ambition: 1 } },
      { text: "The silence that follows the scream.", traits: { air: 2, mystery: 1 } }
    ]
  },
  {
    id: 26,
    text: "A Great Hunger plagues the land. To end it, the Kami demand the thing you love most. What do you lay upon the altar?",
    options: [
      { text: "My freedom: I will serve the shrine forever.", traits: { earth: 2, loyalty: 2 } },
      { text: "My voice: I will never speak another word of love.", traits: { water: 1, wisdom: 2 } },
      { text: "My pride: I will become the lowest of the low.", traits: { air: 1, humility: 2 } },
      { text: "My fire: I will live the rest of my days in cold peace.", traits: { fire: -1, calm: 2 } }
    ]
  },
  {
    id: 27,
    text: "Two spirits are drowning in a sea of mercury. One is a cruel king who keeps order; the other is a kind child who brings chaos. You can only save one.",
    options: [
      { text: "The King: The world needs structure to survive.", traits: { earth: 2, stability: 2 } },
      { text: "The Child: Kindness is worth more than a kingdom.", traits: { water: 2, empathy: 2 } },
      { text: "Neither: I will not play judge with souls.", traits: { air: 2, detachment: 2 } },
      { text: "Both: I will dive in and likely perish with them.", traits: { fire: 2, bravery: 2 } }
    ]
  },
  {
    id: 28,
    text: "You enter a hall of infinite silence where your name is forgotten. Without your history, what remains of you?",
    options: [
      { text: "A hunger that can never be satisfied.", traits: { fire: 2, ambition: 1 } },
      { text: "A quiet observation of the stillness.", traits: { air: 2, wisdom: 1 } },
      { text: "The physical weight of my own breathing.", traits: { earth: 2, presence: 1 } },
      { text: "A feeling of dissolving into the dark.", traits: { water: 2, mystery: 2 } }
    ]
  },
  {
    id: 29,
    text: "You find the 'Tree of All Possible Lives.' You must chop down the branch representing the life you currently lead to see the others. Do you swing the axe?",
    options: [
      { text: "Yes, I am more than this one story.", traits: { fire: 2, change: 2 } },
      { text: "No, I honor the path that brought me here.", traits: { earth: 2, loyalty: 2 } },
      { text: "I lay the axe down and walk away from all paths.", traits: { air: 2, detachment: 1 } },
      { text: "I water the tree with my own blood instead.", traits: { water: 2, sacrifice: 2 } }
    ]
  },
  {
    id: 30,
    text: "The ritual demands your physical form. As you dissolve into light to become a Kami, what is the last sensation you cling to?",
    options: [
      { text: "The stinging heat of a final breath.", traits: { fire: 2, vitality: 1 } },
      { text: "The cold, unmoving pull of the earth.", traits: { earth: 2, stability: 1 } },
      { text: "The feeling of a weight being lifted.", traits: { air: 2, freedom: 2 } },
      { text: "The memory of a single drop of rain.", traits: { water: 2, grace: 1 } }
    ]
  }
];

export {ritualQuestions};