import { Howl } from 'howler';

class AudioManager {
  constructor() {
    this.backgroundMusic = null;
    this.buttonSound = null;
    this.initialized = false;
    this.userInteracted = false;
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
    }
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
  }
}

const audioManager = new AudioManager();

audioManager.init();

export default audioManager;
