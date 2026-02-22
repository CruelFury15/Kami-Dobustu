let ritualQuestions = [
  {
    id: 1,
    text: "A loved one is dying. They beg you to lie about their past to protect their legacy. The truth would destroy how they're remembered.",
    options: [
      { text: "Honor their final wish and carry their secret to your grave.", traits: { water: 2, loyalty: 2 } },
      { text: "Expose the truth because history deserves honesty.", traits: { fire: 2, integrity: 2 } },
      { text: "Tell only their family, letting them decide what to reveal.", traits: { air: 2, delegation: 2 } },
      { text: "Destroy all evidence so no one can ever know.", traits: { earth: 2, protection: 2 } }
    ]
  },
  {
    id: 2,
    text: "You discover your greatest achievement was built on someone else's stolen work. Confessing destroys your life. Staying silent destroys your soul.",
    options: [
      { text: "Confess publicly and face complete ruin.", traits: { fire: 2, honor: 2 } },
      { text: "Track down the original creator and give them everything.", traits: { earth: 2, justice: 2 } },
      { text: "Give all credit to the original creator anonymously.", traits: { water: 2, redemption: 2 } },
      { text: "Sabotage your own work so no one benefits from the theft.", traits: { air: 2, destruction: 2 } }
    ]
  },
  {
    id: 3,
    text: "A stranger will die unless you sacrifice something that defines who you are. No one will ever know what you gave up.",
    options: [
      { text: "Sacrifice it immediately without hesitation.", traits: { water: 2, selflessness: 2 } },
      { text: "Let them die to preserve who you are.", traits: { fire: 2, selfPreservation: 2 } },
      { text: "Offer your life instead of your identity.", traits: { air: 2, martyrdom: 2 } },
      { text: "Force someone else to make the choice for you.", traits: { earth: 2, avoidance: 2 } }
    ]
  },
  {
    id: 4,
    text: "Your child asks why you let them suffer when you could have prevented it. You stayed silent to teach them strength.",
    options: [
      { text: "Defend your choice - suffering made them stronger.", traits: { fire: 2, conviction: 2 } },
      { text: "Apologize and admit you were wrong to let them suffer.", traits: { water: 2, remorse: 2 } },
      { text: "Explain that you suffered more watching them struggle.", traits: { air: 2, vulnerability: 2 } },
      { text: "Promise to protect them from all future pain.", traits: { earth: 2, overprotection: 2 } }
    ]
  },
  {
    id: 5,
    text: "You can save your soulmate or save a hundred strangers. Your soulmate begs you to save the strangers.",
    options: [
      { text: "Save your soulmate against their wishes.", traits: { water: 2, possessiveness: 2 } },
      { text: "Honor their wish and let them die for the strangers.", traits: { fire: 2, sacrifice: 2 } },
      { text: "Kill yourself so they must choose to live.", traits: { air: 2, manipulation: 2 } },
      { text: "Force them to save themselves by threatening the strangers.", traits: { earth: 2, coercion: 2 } }
    ]
  },
  {
    id: 6,
    text: "Someone you deeply respect has become someone you fear. They haven't changed—you finally see who they always were.",
    options: [
      { text: "Confront them. They deserve to know how I feel.", traits: { fire: 2, courage: 2 } },
      { text: "Distance myself quietly. Some truths don't need words.", traits: { water: 2, selfProtection: 2 } },
      { text: "Expose their true nature to everyone who trusts them.", traits: { air: 2, revelation: 2 } },
      { text: "Become exactly like them to understand their power.", traits: { earth: 2, transformation: 2 } }
    ]
  },
  {
    id: 7,
    text: "You must choose between being loved for who you pretend to be, or feared for who you truly are.",
    options: [
      { text: "Be loved, even if it's a lie. Connection matters most.", traits: { water: 2, belonging: 2 } },
      { text: "Be feared, but remain authentic. Truth over comfort.", traits: { fire: 2, authenticity: 2 } },
      { text: "Reject both. I'll find those who see me fully.", traits: { air: 2, independence: 2 } },
      { text: "Withdraw entirely. Neither role is worth the cost.", traits: { earth: 2, solitude: 2 } }
    ]
  },
  {
    id: 8,
    text: "Your greatest strength exists only because of your deepest wound. Healing means losing what makes you powerful.",
    options: [
      { text: "Heal the wound. I'd rather be whole than strong.", traits: { water: 2, healing: 2 } },
      { text: "Keep the wound. Power serves a purpose.", traits: { fire: 2, pragmatism: 2 } },
      { text: "Weaponize the wound to hurt those who caused it.", traits: { air: 2, vengeance: 2 } },
      { text: "Merge both into something entirely new and dangerous.", traits: { earth: 2, evolution: 2 } }
    ]
  },
  {
    id: 9,
    text: "A child will grow up believing a beautiful lie, or learn a devastating truth. You must decide for them.",
    options: [
      { text: "Shatter their innocence with the truth now.", traits: { water: 2, brutality: 2 } },
      { text: "Tell the truth. They deserve reality, not fantasy.", traits: { fire: 2, honesty: 2 } },
      { text: "Let them discover it naturally when they're ready.", traits: { air: 2, patience: 2 } },
      { text: "Give them pieces of truth they can handle now.", traits: { earth: 2, gradual: 2 } }
    ]
  },
  {
    id: 10,
    text: "You realize the person you've become is someone your younger self would despise. What do you protect?",
    options: [
      { text: "Who I am now. Survival changed me for good reason.", traits: { fire: 2, evolution: 2 } },
      { text: "Who I was. I refuse to lose that innocence.", traits: { water: 2, purity: 2 } },
      { text: "Neither. Both versions are incomplete truths.", traits: { air: 2, perspective: 2 } },
      { text: "Both. Even if they can never reconcile.", traits: { earth: 2, acceptance: 2 } }
    ]
  },
   {
    id: 11,
    text: "Which ancient law feels most true to you?",
    options: [
      { text: "The law of Change: Everything flows and transforms.", traits: { water: 2, wisdom: 1 } },
      { text: "The law of Balance: Every action has its equal.", traits: { air: 2, calm: 2 } },
      { text: "The law of Strength: True power stands firm.", traits: { earth: 2, stability: 1 } },
      { text: "The law of Hunger: Power must always grow.", traits: { fire: 2, ambition: 2 } }
    ]
  },
  {
    id: 12,
    text: "You find an injured predator nearby. What do you do?",
    options: [
      { text: "Care for it patiently until it heals.", traits: { water: 1, empathy: 2 } },
      { text: "End its suffering quickly and without fear.", traits: { fire: 1, bravery: 1 } },
      { text: "Capture it and force it to heal in captivity.", traits: { earth: 1, control: 2 } },
      { text: "Open the way and let it choose its fate.", traits: { air: 1, freedom: 2 } }
    ]
  },
  {
    id: 13,
    text: "The sky darkens as a storm approaches. What do you do?",
    options: [
      { text: "Step forward and embrace its raw power.", traits: { fire: 2, chaos: 2 } },
      { text: "Challenge the storm to strike you down.", traits: { air: 1, defiance: 2 } },
      { text: "Prepare shelter and protect what matters.", traits: { earth: 2, protection: 2 } },
      { text: "Dance wildly in the coming rain.", traits: { water: 2, celebration: 1 } }
    ]
  },
  {
    id: 14,
    text: "You are offered a drink from one of four sacred wells. Which do you choose?",
    options: [
      { text: "The Well of Infinite Vision.", traits: { air: 1, wisdom: 2 } },
      { text: "The Well of Unbreakable Strength.", traits: { fire: 2, power: 1 } },
      { text: "The Well of Eternal Renewal.", traits: { water: 2, grace: 1 } },
      { text: "The Well of Ancient Memory.", traits: { earth: 2, mystery: 1 } }
    ]
  },
  {
    id: 15,
    text: "A spirit asks you to describe your journey in one word. What do you say?",
    options: [
      { text: "Discovery.", traits: { air: 2, freedom: 1 } },
      { text: "Victory.", traits: { fire: 2, bravery: 1 } },
      { text: "Conquest.", traits: { earth: 2, dominance: 1 } },
      { text: "Peace.", traits: { water: 2, calm: 1 } }
    ]
  },
  {
    id: 16,
    text: "Imagine you are a bridge. What crosses you most often?",
    options: [
      { text: "Heavy travelers carrying responsibility.", traits: { earth: 2, stability: 2 } },
      { text: "Gentle souls seeking connection.", traits: { water: 2, grace: 1 } },
      { text: "Wanderers searching for meaning.", traits: { air: 2, mystery: 1 } },
      { text: "Warriors driven by purpose.", traits: { fire: 2, power: 1 } }
    ]
  },
  {
    id: 17,
    text: "The sacred transformation is almost complete. How do you feel?",
    options: [
      { text: "Ready and eager to act.", traits: { fire: 2, ambition: 1 } },
      { text: "Light and free, without limits.", traits: { air: 2, freedom: 2 } },
      { text: "Grounded and deeply connected.", traits: { earth: 2, loyalty: 2 } },
      { text: "Calm and flowing with destiny.", traits: { water: 2, calm: 2 } }
    ]
  },
  {
    id: 18,
    text: "Your shadow separates and walks away. What do you do?",
    options: [
      { text: "Follow it — it is part of me.", traits: { fire: 2, persistence: 1 } },
      { text: "Let it go — it must find its own path.", traits: { air: 2, freedom: 2 } },
      { text: "Call it back with quiet understanding.", traits: { water: 1, mystery: 2 } },
      { text: "Force it to return by any means necessary.", traits: { earth: 2, dominance: 1 } }
    ]
  },
  {
    id: 19,
    text: "You are lost in a city of salt and feel deep thirst. What do you do?",
    options: [
      { text: "Break through the salt walls with your bare hands.", traits: { air: 2, determination: 1 } },
      { text: "Dig deep to find hidden strength.", traits: { earth: 2, persistence: 2 } },
      { text: "Ask the sky for guidance and mercy.", traits: { water: 2, empathy: 1 } },
      { text: "Set the city ablaze to create a new path.", traits: { fire: 2, destruction: 1 } }
    ]
  },
  {
    id: 20,
    text: "A voice asks you: 'What must be given to gain true wisdom?'",
    options: [
      { text: "Time alone to understand deeply.", traits: { air: 1, wisdom: 2 } },
      { text: "The courage to face pain and failure.", traits: { fire: 1, bravery: 2 } },
      { text: "The strength to carry responsibility.", traits: { earth: 2, loyalty: 1 } },
      { text: "The willingness to transform completely.", traits: { water: 2, mystery: 1 } }
    ]
  },
  {
    id: 21,
    text: "You find a clock frozen at the moment of your birth. What do you do?",
    options: [
      { text: "Wind it, and let time move forward again.", traits: { fire: 2, action: 1 } },
      { text: "Leave it untouched. That moment is sacred.", traits: { water: 2, calm: 2 } },
      { text: "Turn the hands backward to explore the past.", traits: { air: 1, mystery: 2 } },
      { text: "Smash it completely and forge your own time.", traits: { earth: 2, rebellion: 1 } }
    ]
  },
  {
    id: 22,
    text: "The Great Spirit offers you a final form. What do you choose?",
    options: [
      { text: "The Hunter: Always searching and moving forward.", traits: { fire: 2, ambition: 2 } },
      { text: "The Forest: Strong, ancient, and protective.", traits: { earth: 2, protection: 2 } },
      { text: "The Breeze: Free and belonging nowhere.", traits: { air: 2, freedom: 2 } },
      { text: "The Rain: Healing and renewing the world.", traits: { water: 2, empathy: 2 } }
    ]
  },
  {
    id: 23,
    text: "To pass the Gate of Silence, you must give up something. What do you release?",
    options: [
      { text: "My voice. I no longer need words.", traits: { air: 1, wisdom: 2 } },
      { text: "My memories. I choose to forget everything.", traits: { water: 2, rebirth: 2 } },
      { text: "My fear. I accept all risks.", traits: { fire: 2, bravery: 2 } },
      { text: "My past. I become someone new.", traits: { earth: 1, stability: 2 } }
    ]
  },
  {
    id: 24,
    text: "A dark reflection of yourself appears and threatens you. What do you do?",
    options: [
      { text: "Fight it without hesitation.", traits: { fire: 2, power: 2 } },
      { text: "Accept it as part of myself.", traits: { water: 2, empathy: 2 } },
      { text: "Break the illusion completely.", traits: { earth: 2, decisiveness: 1 } },
      { text: "Merge with it to become whole.", traits: { air: 2, integration: 2 } }
    ]
  },
  {
    id: 25,
    text: "The world is ending. You can save only one thing. What do you choose?",
    options: [
      { text: "A seed to grow new life.", traits: { earth: 2, protection: 2 } },
      { text: "The memory of human connection.", traits: { water: 2, loyalty: 1 } },
      { text: "A spark to guide the future.", traits: { fire: 2, ambition: 1 } },
      { text: "The power to reshape what comes next.", traits: { air: 2, transformation: 1 } }
    ]
  },
  {
    id: 26,
    text: "To save the land, you must sacrifice something precious. What do you offer?",
    options: [
      { text: "My freedom. I will serve forever.", traits: { earth: 2, loyalty: 2 } },
      { text: "My voice. I will never speak love again.", traits: { water: 1, wisdom: 2 } },
      { text: "My pride. I will live with humility.", traits: { air: 1, humility: 2 } },
      { text: "My inner fire. I accept a quiet life.", traits: { fire: -1, calm: 2 } }
    ]
  },
  {
    id: 27,
    text: "Two souls are drowning. You can save only one. Who do you choose?",
    options: [
      { text: "The ruler who brings order.", traits: { earth: 2, stability: 2 } },
      { text: "The child who brings kindness.", traits: { water: 2, empathy: 2 } },
      { text: "Neither. I refuse to choose.", traits: { air: 2, detachment: 2 } },
      { text: "Both. I risk myself to save them.", traits: { fire: 2, bravery: 2 } }
    ]
  },
  {
    id: 28,
    text: "You enter a place where your identity disappears. What remains?",
    options: [
      { text: "A deep desire to become more.", traits: { fire: 2, ambition: 1 } },
      { text: "A calm awareness of existence.", traits: { air: 2, wisdom: 1 } },
      { text: "The physical presence of being alive.", traits: { earth: 2, presence: 1 } },
      { text: "A feeling of becoming one with everything.", traits: { water: 2, mystery: 2 } }
    ]
  },
  {
    id: 29,
    text: "You find the Tree of All Possible Lives. Do you leave your current path to explore others?",
    options: [
      { text: "Yes. I am meant for more.", traits: { fire: 2, change: 2 } },
      { text: "No. I honor my chosen path.", traits: { earth: 2, loyalty: 2 } },
      { text: "I walk away from all paths.", traits: { air: 2, detachment: 1 } },
      { text: "I burn the tree so no one else can be tempted.", traits: { water: 2, protection: 2 } }
    ]
  },
  {
    id: 30,
    text: "As you transform into a higher being, what feeling do you hold onto last?",
    options: [
      { text: "The warmth of being alive.", traits: { fire: 2, vitality: 1 } },
      { text: "The strength of being grounded.", traits: { earth: 2, stability: 1 } },
      { text: "The freedom of release.", traits: { air: 2, freedom: 2 } },
      { text: "The peace of gentle existence.", traits: { water: 2, grace: 1 } }
    ]
  },
  {
    id: 31,
    text: "You discover a painful truth about someone you love. Telling them will break them. Staying silent will break you. What do you protect?",
    options: [
      { text: "Protect them. I carry the burden alone.", traits: { water: 2, sacrifice: 2 } },
      { text: "Protect myself. Truth must be spoken.", traits: { fire: 2, truth: 2 } },
      { text: "Protect neither. Truth will reveal itself.", traits: { air: 2, detachment: 2 } },
      { text: "Destroy the truth entirely so neither suffers.", traits: { earth: 2, elimination: 2 } }
    ]
  },
  {
    id: 32,
    text: "You can become the person you always wanted — but everyone you love will forget you ever existed.",
    options: [
      { text: "Become that person. My existence must be real to me.", traits: { fire: 2, identity: 2 } },
      { text: "Remain remembered. Connection defines me.", traits: { water: 2, belonging: 2 } },
      { text: "Neither version would truly be me.", traits: { air: 2, existential: 2 } },
      { text: "Endure who I am. Roots matter more than dreams.", traits: { earth: 2, loyalty: 2 } }
    ]
  },
  {
    id: 33,
    text: "Someone weaker than you will suffer unless you sacrifice something that defines you.",
    options: [
      { text: "Sacrifice it. I cannot live with their suffering.", traits: { water: 2, empathy: 2 } },
      { text: "Refuse. Losing myself helps no one.", traits: { fire: 2, selfPreserve: 2 } },
      { text: "Search for another path, even if none exists.", traits: { air: 2, resistance: 2 } },
      { text: "Accept suffering is part of order.", traits: { earth: 2, realism: 2 } }
    ]
  },
  {
    id: 34,
    text: "You realize your greatest achievement was built on a lie only you know.",
    options: [
      { text: "Confess and lose everything.", traits: { fire: 2, integrity: 2 } },
      { text: "Protect it. It still changed lives.", traits: { earth: 2, justification: 2 } },
      { text: "Live with the truth silently.", traits: { water: 2, guilt: 2 } },
      { text: "Question whether truth even matters.", traits: { air: 2, detachment: 2 } }
    ]
  },
  {
    id: 35,
    text: "You can save one: your past self from pain, or your future self from regret.",
    options: [
      { text: "Save my past self.", traits: { water: 2, healing: 2 } },
      { text: "Save my future self.", traits: { fire: 2, forward: 2 } },
      { text: "Neither should be interfered with.", traits: { earth: 2, acceptance: 2 } },
      { text: "Both must suffer to remain real.", traits: { air: 2, existential: 2 } }
    ]
  },
  {
    id: 36,
    text: "You must choose between being loved for who you are not, or feared for who you truly are.",
    options: [
      { text: "Be loved, even falsely.", traits: { water: 2, belonging: 2 } },
      { text: "Be feared, but remain real.", traits: { fire: 2, authenticity: 2 } },
      { text: "Reject both roles entirely.", traits: { air: 2, independence: 2 } },
      { text: "Withdraw so neither can touch me.", traits: { earth: 2, isolation: 2 } }
    ]
  },
  {
    id: 37,
    text: "You can undo one moment of suffering in your life — but it will erase something beautiful that came from it.",
    options: [
      { text: "Undo the suffering.", traits: { water: 2, relief: 2 } },
      { text: "Keep the suffering.", traits: { fire: 2, meaning: 2 } },
      { text: "Neither defines me.", traits: { air: 2, detachment: 2 } },
      { text: "Destroy both the suffering and the beauty.", traits: { earth: 2, elimination: 2 } }
    ]
  },
  {
    id: 38,
    text: "You realize someone you trust is slowly becoming your enemy.",
    options: [
      { text: "Confront them now.", traits: { fire: 2, confrontation: 2 } },
      { text: "Stay and hope they return.", traits: { water: 2, loyalty: 2 } },
      { text: "Leave before the truth settles.", traits: { air: 2, avoidance: 2 } },
      { text: "Prepare quietly for what comes.", traits: { earth: 2, readiness: 2 } }
    ]
  },
  {
    id: 39,
    text: "You must choose between inner peace and becoming who you were meant to be.",
    options: [
      { text: "Choose peace.", traits: { water: 2, calm: 2 } },
      { text: "Choose becoming.", traits: { fire: 2, ambition: 2 } },
      { text: "Reject the idea of destiny.", traits: { air: 2, freedom: 2 } },
      { text: "Accept the weight of both.", traits: { earth: 2, endurance: 2 } }
    ]
  },
  {
    id: 40,
    text: "You can finally understand yourself completely — but you will lose the person you are now.",
    options: [
      { text: "Understand everything.", traits: { air: 2, truth: 2 } },
      { text: "Remain who I am.", traits: { earth: 2, identity: 2 } },
      { text: "Risk transformation.", traits: { fire: 2, evolution: 2 } },
      { text: "Accept never knowing.", traits: { water: 2, surrender: 2 } }
    ]
  },
  {
    id: 41,
    text: "You must choose between saving yourself or saving the person who once saved you.",
    options: [
      { text: "Save them.", traits: { water: 2, loyalty: 2 } },
      { text: "Save myself.", traits: { fire: 2, survival: 2 } },
      { text: "Refuse to choose.", traits: { air: 2, resistance: 2 } },
      { text: "Accept fate’s decision.", traits: { earth: 2, acceptance: 2 } }
    ]
  },
  {
    id: 42,
    text: "You realize your greatest fear is also your deepest desire.",
    options: [
      { text: "Chase it anyway.", traits: { fire: 2, courage: 2 } },
      { text: "Run from it.", traits: { water: 2, fear: 2 } },
      { text: "Confront it directly and demand answers.", traits: { air: 2, confrontation: 2 } },
      { text: "Suppress it forever.", traits: { earth: 2, control: 2 } }
    ]
  },
  {
    id: 43,
    text: "You must choose between knowing the painful truth or living a peaceful lie.",
    options: [
      { text: "Know the truth.", traits: { fire: 2, truth: 2 } },
      { text: "Live the lie.", traits: { water: 2, peace: 2 } },
      { text: "Question both.", traits: { air: 2, doubt: 2 } },
      { text: "Accept what is given.", traits: { earth: 2, acceptance: 2 } }
    ]
  },
  {
    id: 44,
    text: "You can protect your heart or open it fully. Both paths will wound you differently.",
    options: [
      { text: "Protect it.", traits: { earth: 2, defense: 2 } },
      { text: "Open it.", traits: { water: 2, vulnerability: 2 } },
      { text: "Balance both carefully.", traits: { air: 2, caution: 2 } },
      { text: "Break it myself first.", traits: { fire: 2, control: 2 } }
    ]
  },
  {
    id: 45,
    text: "You must lose either who you were or who you could become.",
    options: [
      { text: "Lose who I was.", traits: { fire: 2, transformation: 2 } },
      { text: "Lose who I could become.", traits: { earth: 2, preservation: 2 } },
      { text: "Neither truly exists.", traits: { air: 2, detachment: 2 } },
      { text: "Accept losing both.", traits: { water: 2, surrender: 2 } }
    ]
  },
  {
    id: 46,
    text: "You realize the person you have become is someone your younger self would fear. What do you protect?",
    options: [
      { text: "Protect who I am now. Survival changed me for a reason.", traits: { fire: 2, survival: 2 } },
      { text: "Protect who I was. I refuse to lose that innocence.", traits: { water: 2, purity: 2 } },
      { text: "Protect neither. Both versions are incomplete.", traits: { air: 2, detachment: 2 } },
      { text: "Destroy both versions and become something entirely new.", traits: { earth: 2, rebirth: 2 } }
    ]
  },
  {
    id: 47,
    text: "Someone truly sees you — every flaw, every weakness — and does not look away. What do you fear most?",
    options: [
      { text: "That they will eventually leave.", traits: { water: 2, abandonment: 2 } },
      { text: "That they now have power over me.", traits: { fire: 2, control: 2 } },
      { text: "That I no longer control how I am seen.", traits: { air: 2, identityLoss: 2 } },
      { text: "That I cannot hide from myself anymore.", traits: { earth: 2, confrontation: 2 } }
    ]
  },
  {
    id: 48,
    text: "You can finally let go of the thing that has defined you — but without it, you may become no one.",
    options: [
      { text: "Let it go. I will rebuild myself.", traits: { fire: 2, rebirth: 2 } },
      { text: "Keep it. It is part of my soul.", traits: { water: 2, attachment: 2 } },
      { text: "Question whether identity was ever real.", traits: { air: 2, existential: 2 } },
      { text: "Carry it quietly without letting it control me.", traits: { earth: 2, endurance: 2 } }
    ]
  },
  {
    id: 49,
    text: "You must choose: become someone you respect, or remain someone others love.",
    options: [
      { text: "Become someone I respect.", traits: { fire: 2, selfRespect: 2 } },
      { text: "Remain someone others love.", traits: { water: 2, belonging: 2 } },
      { text: "Respect and love are both illusions.", traits: { air: 2, detachment: 2 } },
      { text: "Endure being neither for now.", traits: { earth: 2, resilience: 2 } }
    ]
  },
  {
    id: 50,
    text: "You discover your greatest strength exists because of your deepest wound. What do you choose?",
    options: [
      { text: "Heal the wound, even if I lose the strength.", traits: { water: 2, healing: 2 } },
      { text: "Keep the wound. It made me powerful.", traits: { fire: 2, power: 2 } },
      { text: "Weaponize the wound against those who caused it.", traits: { air: 2, vengeance: 2 } },
      { text: "Merge both into something entirely new and dangerous.", traits: { earth: 2, transformation: 2 } }
    ]
  },
  {
    id: 51,
    text: "You realize the person you love most has become the greatest obstacle to who you must become. What do you destroy?",
    options: [
      { text: "Destroy my future. I choose love, even if it costs my purpose.", traits: { water: 3, sacrifice: 2 } },
      { text: "Destroy the bond. I choose who I must become, even if I lose them forever.", traits: { fire: 3, selfDestiny: 2 } },
      { text: "Destroy my desire. I will become neither.", traits: { air: 3, detachment: 2 } },
      { text: "Destroy nothing. I will endure the slow fracture of both.", traits: { earth: 3, endurance: 2 } }
    ]
  },
  {
    id: 52,
    text: "You can save everyone who ever trusted you — but they will never know it was you. You will live and die as a failure in their eyes.",
    options: [
      { text: "Save them. Their lives matter more than my truth.", traits: { water: 3, selfErase: 2 } },
      { text: "Refuse. My existence must mean something.", traits: { fire: 3, identity: 2 } },
      { text: "Question whether their perception ever mattered.", traits: { air: 3, existential: 2 } },
      { text: "Accept being forgotten. Meaning exists beyond recognition.", traits: { earth: 3, acceptance: 2 } }
    ]
  },
  {
    id: 53,
    text: "You discover your entire identity was shaped by a lie. Removing it will leave nothing certain. What do you preserve?",
    options: [
      { text: "Preserve the lie. It made me who I am.", traits: { earth: 3, stability: 2 } },
      { text: "Destroy the lie. I would rather be nothing than false.", traits: { fire: 3, truth: 3 } },
      { text: "Preserve only what I can prove.", traits: { air: 3, clarity: 2 } },
      { text: "Preserve the feeling, even if the truth is gone.", traits: { water: 3, emotionalTruth: 2 } }
    ]
  },
  {
    id: 54,
    text: "You must choose: live knowing your life has no meaning, or die believing it did.",
    options: [
      { text: "Live without meaning. Existence itself is enough.", traits: { earth: 3, endurance: 3 } },
      { text: "Die believing in meaning. Belief defines reality.", traits: { fire: 3, conviction: 3 } },
      { text: "Reject the premise. Meaning cannot be measured.", traits: { air: 3, transcendence: 3 } },
      { text: "Live searching, even if I never find it.", traits: { water: 3, longing: 3 } }
    ]
  },
  {
    id: 55,
    text: "You realize becoming your true self will cost you every relationship you have ever known. What do you abandon?",
    options: [
      { text: "Abandon myself. I cannot exist alone.", traits: { water: 3, belonging: 3 } },
      { text: "Abandon them. I cannot betray who I am.", traits: { fire: 3, authenticity: 3 } },
      { text: "Abandon the idea of a true self entirely.", traits: { air: 3, egoDeath: 3 } },
      { text: "Abandon the need to choose, and live divided.", traits: { earth: 3, duality: 3 } }
    ]
  }, 
  {
    id: 56,
    text: "You realize that every version of yourself you have ever been is watching who you are now — some with pride, some with disappointment, some with fear. Which version do you betray?",
    options: [
      { text: "Betray who I was, and become someone they would not recognize.", traits: { fire: 3, selfEvolution: 3 } },
      { text: "Betray who I am now, and return to who I once understood.", traits: { water: 3, selfReturn: 3 } },
      { text: "Betray who I could become, and remain suspended between both.", traits: { earth: 3, selfPreservation: 3 } },
      { text: "Betray all versions, and accept that none were ever truly me.", traits: { air: 3, egoDissolution: 3 } }
    ]
  },
  {
    id: 57,
    text: "You discover that your deepest fear and your greatest potential are the same thing. What part of yourself do you silence?",
    options: [
      { text: "Silence the fear, and risk losing control of what I become.", traits: { fire: 3, internalRisk: 3 } },
      { text: "Silence the potential, and remain safely incomplete.", traits: { water: 3, selfProtection: 3 } },
      { text: "Silence neither, and endure their constant conflict.", traits: { earth: 3, innerBurden: 3 } },
      { text: "Silence the need to define either one.", traits: { air: 3, selfTranscendence: 3 } }
    ]
  },
  {
    id: 58,
    text: "You realize the person you believe yourself to be exists only because you chose not to confront something within you. What do you protect now?",
    options: [
      { text: "Protect the person I became, even if it was built on avoidance.", traits: { earth: 3, identityStability: 3 } },
      { text: "Destroy that version, and face what I avoided.", traits: { fire: 3, selfConfrontation: 3 } },
      { text: "Protect the avoidance. Some truths would fracture me.", traits: { water: 3, emotionalDefense: 3 } },
      { text: "Shatter everything and rebuild from the fragments.", traits: { air: 3, totalRebirth: 3 } }
    ]
  },
  {
    id: 59,
    text: "You reach a moment where you can no longer tell whether you are becoming yourself or losing yourself. What do you trust?",
    options: [
      { text: "Trust the part of me that keeps moving forward.", traits: { fire: 3, internalMomentum: 3 } },
      { text: "Trust the part of me that resists change.", traits: { earth: 3, internalAnchor: 3 } },
      { text: "Trust the part of me that feels uncertain.", traits: { water: 3, emotionalTruth: 3 } },
      { text: "Trust nothing, and allow myself to dissolve.", traits: { air: 3, identityRelease: 3 } }
    ]
  },
  {
    id: 60,
    text: "You realize that the meaning you have been searching for may never exist — and that you alone are responsible for becoming someone anyway. What do you abandon?",
    options: [
      { text: "Abandon the need for meaning, and become through will alone.", traits: { fire: 3, selfCreation: 3 } },
      { text: "Abandon the struggle, and accept what I already am.", traits: { earth: 3, selfAcceptance: 3 } },
      { text: "Abandon certainty, and continue searching without promise.", traits: { water: 3, existentialEndurance: 3 } },
      { text: "Abandon the idea of a fixed self entirely.", traits: { air: 3, egoTranscendence: 3 } }
    ]
  }
];

export {ritualQuestions};