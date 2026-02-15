# 🌙 Kami Dōbutsu (神 動 物)

**Discover Your Spirit Animal Through Ancient Mystical Rituals**

A beautifully crafted interactive web experience that guides users through a mystical journey to discover their spirit animal. Built with React and featuring stunning cosmic animations, atmospheric audio, and traditional Japanese temple aesthetics.

## ✨ Features

### 🎨 Visual Experience
- **Cosmic Background Animations**: Dynamic stars, moon, volumetric clouds, and god rays using HTML5 Canvas
- **Torii Temple Gate**: Traditional Japanese temple pillars with ethereal purple gradients
- **Smooth Transitions**: Framer Motion animations for seamless page transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **No Scrolling**: Content perfectly fits viewport for immersive experience

### 🔊 Audio Experience
- **Background Music**: Atmospheric looping soundtrack that plays throughout the experience
- **Button Sound Effects**: Satisfying audio feedback on interactions
- **Auto-play with User Consent**: Polite audio alert that auto-dismisses after 5 seconds
- **Howler.js Integration**: Professional audio management with preloading

### 🎯 Quiz Functionality
- **7 Random Questions**: Dynamically selected from a pool of 30 ritual questions
- **Visual Progress Tracker**: Numbered circles showing current question progress
- **Smooth Question Transitions**: Animated question changes with fade effects
- **Results Page**: Personalized spirit animal reveal based on answers

### 🏗️ Technical Stack
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations and transitions
- **Howler.js**: Professional audio management
- **Tailwind CSS**: Utility-first styling
- **Vite**: Lightning-fast build tool
- **HTML5 Canvas**: Custom background animations with Simplex noise

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

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
kami-dobutsu/
├── public/
│   └── assets/          # Public assets
├── src/
│   ├── assets/          # Images and icons
│   ├── audios/          # Background music and sound effects
│   ├── components/      # Reusable React components
│   ├── data/            # Question data
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Landing page
│   │   ├── Questions.jsx # Quiz page
│   │   ├── QuizProgress.jsx # Progress indicator
│   │   └── Results.jsx  # Results page
│   ├── utils/           # Utility functions
│   │   └── audioManager.js # Audio management
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template with canvas animations
└── package.json         # Dependencies and scripts
```

## 🎮 How It Works

1. **Landing Page**: Users are greeted with a mystical cosmic scene featuring the title "Kami Dōbutsu" and a glowing button between temple pillars
2. **Audio Alert**: A friendly notification appears asking users to enable sound
3. **Quiz Journey**: Users answer 7 randomly selected questions about their preferences and personality
4. **Progress Tracking**: Visual circles show progress through the quiz
5. **Spirit Animal Reveal**: Based on answers, users discover their spirit animal companion

## 🎨 Design Philosophy

The design combines traditional Japanese aesthetics with modern cosmic mysticism:
- **Purple & Gold Color Palette**: Represents spirituality and enlightenment
- **Torii Gate**: Symbolizes the threshold between the mundane and sacred
- **Cosmic Elements**: Stars, moon, and clouds create an otherworldly atmosphere
- **Smooth Animations**: Everything flows naturally to maintain immersion

## 🛠️ Technologies Used

- **React** - UI framework
- **React Router DOM** - Navigation
- **Framer Motion** - Animations
- **Howler.js** - Audio management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **ESLint** - Code linting

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎵 Audio Files

The project includes atmospheric audio files:
- `lalaland.mp3` - Background music
- `mystery.mp3` - Button click sound effect

## 🌟 Key Features Implementation

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
- Random question selection using Fisher-Yates shuffle
- State management with React hooks
- Progress tracking with visual feedback
- Answer collection for results calculation

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by traditional Japanese spiritual practices
- Cosmic design influenced by mystical aesthetics
- Built with modern web technologies for optimal performance

---

**Experience the mystical journey at [Your Demo URL]**

*"Where spirits drift among the stars"* ✨
