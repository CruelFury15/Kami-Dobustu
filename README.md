# 🌙 Kami Dōbutsu (神 動 物)

**Discover Your Spirit Animal Through Ancient Mystical Rituals**

A beautifully crafted interactive web experience that guides users through a mystical journey to discover their spirit animal. Built with React 19 and featuring stunning cosmic animations, atmospheric audio, AI-powered personality analysis with Google Gemini, AI-generated spirit animal imagery with Imagen 3, and traditional Japanese temple aesthetics.


## ✨ Features

### 🎨 Visual Experience
- **Cosmic Background Animations**: Dynamic stars, moon, volumetric clouds, and god rays using HTML5 Canvas
- **3D Spirit Animal Display**: Interactive 3D animated spirit animal with glowing effects and corner sparkles
- **Torii Temple Gate**: Traditional Japanese temple pillars with ethereal purple gradients
- **Smooth Transitions**: Framer Motion animations for seamless page transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Scrollable Results Page**: Beautiful custom gold scrollbar for exploring detailed insights
- **Mystical Loading Screens**: Beautiful Oracle loader with animated moon and mystical symbols
- **Floating Particles**: Atmospheric particle effects throughout the experience

### 🔊 Audio Experience
- **Background Music**: Atmospheric looping soundtrack that plays throughout the experience
- **Button Sound Effects**: Satisfying audio feedback on interactions
- **Auto-play with User Consent**: Polite audio alert that auto-dismisses after 5 seconds
- **Howler.js Integration**: Professional audio management with preloading

### 🤖 AI-Powered Oracle Backend
- **Express.js Server**: RESTful API for spirit animal determination
- **Gemini AI Integration**: Advanced AI analysis of user responses for personalized results
- **Deep Personality Analysis**: Full paragraph analyzing decision-making patterns and emotional landscape
- **Photorealistic 3D Images**: High-quality mystical artwork with cinematic lighting
- **Environment Variables**: Secure API key management
- **Fallback Logic**: Works offline with local algorithms and beautiful animated placeholders
- **Mystical Loading**: Beautiful loading screens during AI consultation
- **CORS Enabled**: Secure cross-origin requests

### 🔮 Enhanced Quiz Experience
- **8 Deep Questions**: Carefully selected from a pool of 60 philosophical questions
- **No Passive Options**: Every choice forces decisive action with real consequences
- **Moral Dilemmas**: Questions create genuine internal conflict and self-reflection
- **Visual Progress Tracker**: Numbered circles showing current question progress
- **Smooth Question Transitions**: Animated question changes with fade effects
- **Analysis Page**: Intermediate page showing elemental breakdown and journey stats
- **Interactive Results Page**: 4 detailed tabs with comprehensive personality insights

### 📊 Detailed Results Page
- **Overview Tab**: Spirit essence, element, traits count, and all sacred traits
- **Deep Analysis Tab**: Full AI-generated personality paragraph and life philosophy
- **Strengths & Challenges Tab**: 4 strengths, 4 growth areas, and spirit compatibility
- **Spiritual Guidance Tab**: Mystical guidance and 4 practice recommendations
- **Scroll Indicator**: Animated prompt to explore more content
- **Custom Scrollbar**: Beautiful gold gradient scrollbar matching the cosmic theme

### 🏗️ Technical Stack
- **React 19**: Modern React with hooks and latest features
- **React Router DOM**: Client-side routing with smooth transitions
- **Framer Motion**: Advanced animations and transitions
- **Howler.js**: Professional audio management
- **Tailwind CSS 4**: Utility-first styling with latest features
- **Vite 7**: Lightning-fast build tool and HMR
- **HTML5 Canvas**: Custom background animations with Simplex noise
- **Google Generative AI**: Gemini 1.5 Flash for spirit animal analysis
- **Google Vertex AI**: Imagen 3 for mystical image generation
- **Express.js**: Backend API server
- **Node.js**: Runtime environment

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kami-dobutsu
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install server dependencies:
```bash
cd server
npm install
cd ..
```

4. Set up environment variables (optional - for AI features):
```bash
cd server
cp .env.example .env


5. Start both frontend and backend:
```bash
# From root directory
npm run dev & cd server && npm start
```

Or start them separately:
```bash
npm run dev

cd server
npm start
```

## 🔑 API Configuration

### Gemini AI (Required for AI-powered results)
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `server/.env`: `GEMINI_API_KEY=your_key_here`

### Imagen 3 (Optional - for AI-generated images)
1. Set up Google Cloud Project with Vertex AI enabled
2. Configure authentication (see `server/IMAGEN_SETUP.md`)
3. Add to `server/.env`:
   ```
   GOOGLE_CLOUD_PROJECT=your_project_id
   GOOGLE_CLOUD_LOCATION=us-central1
   ```

## 📁 Project Structure

```
kami-dobutsu/
├── server/              # 🔮 The Oracle Brain (AI Backend)
│   ├── .env            # API Keys (create from .env.example)
│   ├── .env.example    # Environment template
│   ├── index.js        # Express server with Gemini AI integration
│   ├── package.json    # Server dependencies
│   └── IMAGEN_SETUP.md # Imagen 3 configuration guide
├── public/
│   ├── assets/         # Public assets
│   └── audios/         # Audio files (mystery.mp3, lalaland.mp3, etc.)
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable React components
│   │   ├── Clouds.jsx          # Animated cloud background
│   │   ├── OracleLoader.jsx    # 🔮 Mystical loading screen
│   │   └── SpiritAnimal3D.jsx  # 3D animated spirit animal display
│   ├── data/           # Question data
│   │   └── question.js # 60 philosophical questions
│   ├── pages/          # Page components
│   │   ├── Home.jsx        # Landing page with temple gate
│   │   ├── Questions.jsx   # Enhanced quiz with 8 questions
│   │   ├── Analysis.jsx    # Analysis page with stats and loading
│   │   └── Results.jsx     # Interactive results with 4 tabs
│   ├── utils/          # Utility functions
│   │   ├── audioManager.js # Audio management
│   │   └── api.js          # 🌐 Backend API integration
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with custom scrollbar
├── test-oracle.js      # Backend testing utility
├── index.html          # HTML template with canvas animations
└── package.json        # Frontend dependencies and scripts
```

## 🎮 How It Works

1. **Landing Page**: Users are greeted with a mystical cosmic scene featuring the title "Kami Dōbutsu" and a glowing button between temple pillars
2. **Audio Alert**: A friendly notification appears asking users to enable sound
3. **Enhanced Quiz Journey**: Users answer 8 carefully selected questions that create moral dilemmas and force decisive choices
4. **Progress Tracking**: Visual circles show progress through the quiz
5. **Analysis Page**: Intermediate page showing elemental breakdown, journey stats, and mystical loading animations
6. **AI Oracle Consultation**: Gemini AI analyzes responses to determine the perfect spirit animal match
7. **Interactive Results**: Users discover their spirit animal with 4 detailed tabs:
   - **Overview**: Spirit essence, element, and sacred traits
   - **Deep Analysis**: Full personality paragraph and life philosophy
   - **Strengths & Challenges**: Personal strengths, growth areas, and compatibility
   - **Spiritual Guidance**: Mystical guidance and practice recommendations
8. **3D Spirit Display**: Interactive 3D animated spirit animal with glowing effects
9. **Scrollable Experience**: Beautiful custom scrollbar for exploring all content

## 🧠 AI-Powered Features

### Gemini AI Analysis
- Analyzes user responses for patterns in values, emotional tendencies, and decision-making
- Considers how users handle conflict, suffering, and difficult choices
- Determines core personality traits and spiritual essence
- Generates detailed personality analysis (5-7 sentences)
- Creates personalized life philosophy and spiritual guidance
- Identifies strengths and growth challenges
- Determines spirit animal compatibility
- Selects from any real animal in nature (no limitations)


### Enhanced AI Response Format
```json
{
  "animal": "Spirit animal name",
  "title": "Profound poetic title",
  "description": "Two revelatory sentences",
  "detailedAnalysis": "Full personality paragraph (5-7 sentences)",
  "traits": ["8 specific traits"],
  "strengths": ["4 specific strengths"],
  "challenges": ["4 growth areas"],
  "element": "Fire/Water/Earth/Air/Spirit",
  "lifePhilosophy": "Core life philosophy statement",
  "spiritualGuidance": "Mystical guidance for the journey",
  "compatibility": {
    "highCompatibility": ["2 compatible animals"],
    "lowCompatibility": ["2 challenging animals"]
  }
}
```

### Question Design Philosophy
- 60 deep philosophical questions covering existential themes
- No passive options - every choice forces immediate decisive action
- Creates genuine internal conflict and moral dilemmas
- Explores themes of sacrifice, identity, truth, love, and transformation

## 🎨 Design Philosophy

The design combines traditional Japanese aesthetics with modern cosmic mysticism:
- **Purple & Gold Color Palette**: Represents spirituality and enlightenment
- **Torii Gate**: Symbolizes the threshold between the mundane and sacred
- **Cosmic Elements**: Stars, moon, and clouds create an otherworldly atmosphere
- **Smooth Animations**: Everything flows naturally to maintain immersion

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern UI framework with hooks
- **React Router DOM** - Client-side navigation
- **Framer Motion** - Smooth animations and transitions
- **Howler.js** - Professional audio management
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **ESLint** - Code quality and consistency

### Backend
- **Express.js** - Web server framework
- **Google Generative AI** - Gemini 1.5 Flash for spirit analysis
- **Google Vertex AI** - Imagen 3 for mystical image generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **Git** - Version control
- **npm** - Package management
- **Node.js** - Runtime environment

## 📝 Available Scripts

### Frontend (from root directory)
- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (from server directory)
- `npm start` - Start backend server (port 3001)
- `npm run dev` - Start with nodemon for development

### Testing
- `node test-oracle.js` - Test backend API functionality

## 🎵 Audio Files

The project includes atmospheric audio files in `public/audios/`:
- `lalaland.mp3` - Dreamy background music
- `mystery.mp3` - Mystical button click sound effect
- `Moonlight.mp3` - Alternative background track
- `death_whistle_pib2.mp3` - Atmospheric sound effect

## 🔧 Environment Variables

Create a `.env` file in the `server` directory:

```env
# Required for AI-powered results
GEMINI_API_KEY=your_gemini_api_key_here

# Optional for AI-generated images
GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_CLOUD_LOCATION=us-central1

# Server configuration
PORT=3001
```

## 🌟 Key Features Implementation

### 3D Spirit Animal Display
- Interactive 3D component with hover effects
- Pulsing glow animation around the image
- Corner sparkles that fade in and out
- Element-based color theming
- Animated emoji placeholders when no image is available
- Smooth entrance animations with spring physics

### AI-Powered Spirit Analysis
- Gemini AI processes user responses to identify personality patterns
- Analyzes decision-making style, values, and emotional tendencies
- Generates detailed personality analysis paragraph
- Creates personalized life philosophy
- Provides spiritual guidance for the journey
- Identifies strengths and growth challenges
- Determines spirit animal compatibility
- Matches users with any real animal from nature

### Interactive Results Page
- **4 Tab Navigation**: Overview, Analysis, Strengths, Guidance
- **Smooth Tab Switching**: Animated transitions between tabs
- **Scrollable Content**: Custom gold gradient scrollbar
- **Scroll Indicator**: Animated prompt that auto-hides after scrolling
- **Floating Particles**: 20 animated particles in gold, purple, and blue
- **Responsive Grid Layouts**: Adapts to all screen sizes
- **Glass-morphism Effects**: Backdrop blur and transparency

### Analysis Page
- **Elemental Breakdown**: Shows Fire, Water, Earth, Air percentages
- **Animated Progress Bars**: Smooth fill animations
- **Journey Stats**: Choices made and paths revealed
- **Mystical Orb**: Rotating and pulsing crystal ball animation
- **Phase Transitions**: 4 phases of analysis text
- **Auto-navigation**: Proceeds to results after 4.5 seconds

### Enhanced Question System
- 60 carefully crafted philosophical questions
- Dynamic selection of 8 questions per session
- No passive options - forces decisive action choices
- Creates genuine moral dilemmas and internal conflict
- Visual progress tracker with numbered circles
- Smooth question transitions with fade effects

### Mystical Image Generation
- Simplified prompts for better Imagen 3 results
- Photorealistic 3D rendered animals
- Cosmic space environments (purple, gold, nebula)
- Soft glowing moonlight and ethereal mist
- Stardust particles and magical atmosphere
- Cinematic lighting for depth and realism

### Background Animations
Custom HTML5 Canvas implementation with:
- Simplex noise for cloud generation
- Parallax mouse tracking
- Multiple layered clouds with depth
- Volumetric lighting effects
- God rays emanating from the moon

### Audio Management
Singleton pattern audio manager that:
- Preloads audio files on app start
- Handles browser autoplay restrictions
- Manages background music looping
- Triggers sound effects on user interactions

### Quiz Logic
- Smart question selection algorithm
- State management with React hooks
- Progress tracking with visual feedback
- Answer collection for AI analysis

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load on demand
- **Audio Preloading**: Smooth audio experience
- **Fallback Systems**: Works without internet/API keys
- **Responsive Design**: Optimized for all screen sizes
- **Clean Code**: Comment-free, linted codebase

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style
- Follow existing code patterns
- Use meaningful variable names
- Keep functions small and focused
- Add comments only when necessary for complex logic


## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by traditional Japanese spiritual practices and Shinto beliefs
- Cosmic design influenced by mystical and astronomical aesthetics
- Built with modern web technologies for optimal performance
- AI integration powered by Google's advanced language and image models
- Special thanks to the open-source community for amazing tools and libraries

---

**Experience the mystical journey and discover your spirit animal companion** ✨

*"Where ancient wisdom meets modern technology, and spirits dance among the stars"* 🌙
