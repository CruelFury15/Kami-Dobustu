import { Howl } from 'howler';

class AudioManager {
  constructor() {
    this.backgroundMusic = null;
    this.buttonSound = null;
    this.initialized = false;
    this.userInteracted = false;
    this.isPlaying = false;
    this.isPaused = false;
    this.setupVisibilityListener();
  }

  setupVisibilityListener() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page is hidden, pause music
        if (this.backgroundMusic && this.backgroundMusic.playing()) {
          this.backgroundMusic.pause();
          this.isPaused = true;
        }
      } else {
        // Page is visible again, resume if it was playing
        if (this.backgroundMusic && this.isPaused && this.isPlaying) {
          this.backgroundMusic.play();
          this.isPaused = false;
        }
      }
    });

    // Handle page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  init() {
    if (this.initialized) return;
    this.backgroundMusic = new Howl({
      src: [new URL('../audios/lalaland.mp3', import.meta.url).href],
      html5: false,
      loop: true,
      volume: 0.8,
      preload: true,
      onload: () => {
        console.log('Background music loaded');
      },
      onloaderror: (_id, error) => {
        console.error('Failed to load background music:', error);
      }
    });
    this.buttonSound = new Howl({
      src: [new URL('../audios/mystery.mp3', import.meta.url).href],
      html5: false,
      volume: 0.5,
      preload: true,
      onload: () => {
        console.log('Button sound loaded');
      },
      onloaderror: (_id, error) => {
        console.error('Failed to load button sound:', error);
      }
    });

    this.initialized = true;
  }

  playBackgroundMusic() {
    if (!this.initialized) this.init();
    if (this.backgroundMusic && !this.backgroundMusic.playing()) {
      this.backgroundMusic.play();
      this.isPlaying = true;
      this.isPaused = false;
    }
  }

  pauseBackgroundMusic() {
    if (this.backgroundMusic && this.backgroundMusic.playing()) {
      this.backgroundMusic.pause();
      this.isPaused = true;
    }
  }

  resumeBackgroundMusic() {
    if (this.backgroundMusic && this.isPaused) {
      this.backgroundMusic.play();
      this.isPaused = false;
    }
  }

  toggleBackgroundMusic() {
    if (!this.initialized) this.init();
    
    if (this.backgroundMusic) {
      if (this.backgroundMusic.playing() || this.isPlaying) {
        this.stopBackgroundMusic();
        return false;
      } else {
        this.playBackgroundMusic();
        return true;
      }
    }
    return false;
  }

  isMusicPlaying() {
    return this.isPlaying && !this.isPaused;
  }

  playButtonSound() {
    if (!this.initialized) this.init();
    if (!this.userInteracted) {
      this.userInteracted = true;
      this.playBackgroundMusic();
    }
    
    if (this.buttonSound) {
      this.buttonSound.play();
    }
  }

  enableAudio() {
    if (!this.userInteracted) {
      this.userInteracted = true;
      this.playBackgroundMusic();
    }
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
      this.isPlaying = false;
      this.isPaused = false;
    }
  }

  cleanup() {
    if (this.backgroundMusic) {
      this.backgroundMusic.unload();
    }
    if (this.buttonSound) {
      this.buttonSound.unload();
    }
    this.initialized = false;
    this.isPlaying = false;
    this.isPaused = false;
  }
}

const audioManager = new AudioManager();

audioManager.init();

export default audioManager;
