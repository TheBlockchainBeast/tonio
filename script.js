const MEME_COUNT = 58;
const MEMES_PATH = 'assets/meme_photos/';

// Fun Loader
function initLoader() {
  const loader = document.getElementById('loader');
  
  // Simulate loading time with some randomness
  const loadingTime = Math.random() * 2000 + 1500; // 1.5 to 3.5 seconds
  
  setTimeout(() => {
    loader.classList.add('hidden');
    
    // Remove loader from DOM after animation
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, loadingTime);
}

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  setupEventListeners();
  loadMemeGallery();
  
// Tonio face wiggle on hover
  const tonio = document.querySelector('#tonio-mascot');
if (tonio) {
  tonio.addEventListener('mouseenter', () => {
    tonio.style.transition = 'transform 0.3s ease';
    tonio.style.transform = 'rotate(-5deg) scale(1.05)';
  });
  tonio.addEventListener('mouseleave', () => {
    tonio.style.transform = 'rotate(0deg) scale(1)';
  });
}
});

// Fallback: hide loader if page takes too long
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 1000);
  }
});


// Event Listeners
function setupEventListeners() {
  // Random Meme Button
  document.getElementById('random-meme-btn').addEventListener('click', showRandomMeme);
  
  // Tonio Dance Button
  document.getElementById('tonio-dance-btn').addEventListener('click', makeTonioDance);
  
  // Shuffle Memes Button
  document.getElementById('shuffle-memes').addEventListener('click', shuffleMemeGallery);
}

// Meme Gallery
function loadMemeGallery() {
  const gallery = document.getElementById('meme-gallery');
  if (!gallery) {
    console.error('Meme gallery element not found!');
    return;
  }
  
  gallery.innerHTML = '';
  console.log('Loading meme gallery...');
  
  // Show a random selection of memes
  const memeIndices = getRandomMemeIndices(24, MEME_COUNT);
  console.log('Meme indices:', memeIndices);
  
  memeIndices.forEach((memeId, index) => {
    const img = document.createElement('img');
    img.src = `${MEMES_PATH}${memeId}.jpg`;
    img.alt = `Tonio Meme ${memeId}`;
    img.className = 'meme-img';
    img.dataset.memeId = memeId;
    
    // Add error handling for images
    img.onerror = () => {
      console.error(`Failed to load meme ${memeId}.jpg`);
      img.style.display = 'none';
    };
    
    img.onload = () => {
      console.log(`Successfully loaded meme ${memeId}.jpg`);
    };
    
    img.addEventListener('click', () => handleMemeClick(img, memeId));
    gallery.appendChild(img);
  });
}

function getRandomMemeIndices(count, max) {
  const indices = new Set();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }
  return Array.from(indices);
}

function handleMemeClick(img, memeId) {
  // Expand the meme
  if (img.classList.contains('expanded')) {
    img.classList.remove('expanded');
  } else {
    img.classList.add('expanded');
  }
}

// Random Meme Feature
function showRandomMeme() {
  const randomMemeId = Math.floor(Math.random() * MEME_COUNT);
  const memeSrc = `${MEMES_PATH}${randomMemeId}.jpg`;
  
  // Create a modal to show the random meme
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.9)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '1000';
  modal.style.cursor = 'pointer';
  
  const img = document.createElement('img');
  img.src = memeSrc;
  img.style.maxWidth = '90vw';
  img.style.maxHeight = '90vh';
  img.style.borderRadius = '15px';
  img.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
  
  modal.appendChild(img);
  document.body.appendChild(modal);
  
  modal.addEventListener('click', () => {
    modal.remove();
  });
}

// Tonio Dance Feature
function makeTonioDance() {
  const tonio = document.getElementById('tonio-mascot');
  
  tonio.classList.add('tonio-dancing');
  
  setTimeout(() => {
    tonio.classList.remove('tonio-dancing');
  }, 3000);
}

// Shuffle Meme Gallery
function shuffleMemeGallery() {
  loadMemeGallery();
}

// Fun effects
function createConfetti() {
  const colors = ['#1da1f2', '#0099e5', '#4CAF50', '#FF9800', '#f44336'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Chart refresh function
function refreshChart() {
  const chartIframe = document.querySelector('.dex-chart');
  if (chartIframe) {
    // Add a small delay to show the refresh animation
    chartIframe.style.opacity = '0.5';
    chartIframe.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      // Reload the iframe by changing its src
      const currentSrc = chartIframe.src;
      chartIframe.src = '';
      setTimeout(() => {
        chartIframe.src = currentSrc;
        chartIframe.style.opacity = '1';
      }, 100);
    }, 300);
  }
}

// Copy contract address from chart section
function copyContractAddress() {
  const address = 'EQCHGfuD-j40y6KxTmyCC4ultuz0K3PEvgRnr8UydGtg_E74';
  
  // Try to use the modern clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(address).then(() => {
      showContractCopySuccess();
    }).catch(() => {
      fallbackCopyContract(address);
    });
  } else {
    fallbackCopyContract(address);
  }
}

function fallbackCopyContract(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showContractCopySuccess();
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
  
  document.body.removeChild(textArea);
}

function showContractCopySuccess() {
  const contractCard = document.querySelector('.contract-card');
  const contractAddress = document.querySelector('.contract-address');
  const copyIcon = contractCard.querySelector('.copy-icon i');
  const originalText = contractAddress.textContent;
  const originalIcon = copyIcon.className;
  
  // Show success state
  contractAddress.textContent = 'Copied!';
  contractAddress.style.color = 'var(--success)';
  copyIcon.className = 'fas fa-check';
  contractCard.style.borderColor = 'var(--success)';
  contractCard.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
  
  // Reset after 2 seconds
  setTimeout(() => {
    contractAddress.textContent = originalText;
    contractAddress.style.color = '';
    copyIcon.className = originalIcon;
    contractCard.style.borderColor = '';
    contractCard.style.boxShadow = '';
  }, 2000);
}

// Copy contract address function
function copyAddress() {
  const address = 'EQCHGfuD-j40y6KxTmyCC4ultuz0K3PEvgRnr8UydGtg_E74';
  
  // Try to use the modern clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(address).then(() => {
      showCopySuccess();
    }).catch(() => {
      fallbackCopy(address);
    });
  } else {
    fallbackCopy(address);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showCopySuccess();
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
  
  document.body.removeChild(textArea);
}

function showCopySuccess() {
  const copyBtn = document.querySelector('.copy-btn');
  const originalText = copyBtn.innerHTML;
  
  copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
  copyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  copyBtn.style.color = '#fff';
  
  setTimeout(() => {
    copyBtn.innerHTML = originalText;
    copyBtn.style.background = '';
    copyBtn.style.color = '';
  }, 2000);
}

// Meme Collector Game
class MemeCollectorGame {
  constructor() {
    this.gameOverlay = document.getElementById('game-overlay');
    this.gameArea = document.querySelector('.game-area');
    this.gameMascot = document.getElementById('game-mascot');
    this.fallingMemes = document.getElementById('falling-memes');
    this.scoreElement = document.getElementById('game-score');
    this.timeElement = document.getElementById('game-time');
    this.collectedElement = document.getElementById('collected-count');
    
    this.gameRunning = false;
    this.score = 0;
    this.timeLeft = 30;
    this.collected = 0;
    this.mascotPosition = 50; // percentage
    this.memeSpawnInterval = null;
    this.gameTimer = null;
    this.keys = {};
    
    this.memeEmojis = ['🎭', '😂', '🤪', '🎉', '🚀', '💎', '🔥', '⭐', '🎯', '🏆'];
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
    
    // Mouse/touch controls
    this.gameArea.addEventListener('click', (e) => {
      if (this.gameRunning) {
        const rect = this.gameArea.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        this.moveMascot(percentage);
      }
    });
    
    // Game buttons
    document.getElementById('start-game-btn').addEventListener('click', () => {
      this.startGame();
    });
    
    document.getElementById('close-game').addEventListener('click', () => {
      this.stopGame();
    });
    
    document.getElementById('restart-game').addEventListener('click', () => {
      this.restartGame();
    });
  }
  
  startGame() {
    this.gameOverlay.classList.add('active');
    this.gameRunning = true;
    this.score = 0;
    this.timeLeft = 30;
    this.collected = 0;
    this.mascotPosition = 50;
    
    this.updateUI();
    this.moveMascot(this.mascotPosition);
    
    // Start spawning memes
    this.memeSpawnInterval = setInterval(() => {
      this.spawnMeme();
    }, 1000);
    
    // Start game timer
    this.gameTimer = setInterval(() => {
      this.timeLeft--;
      this.updateUI();
      
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);
    
    // Start game loop
    this.gameLoop();
  }
  
  stopGame() {
    this.gameOverlay.classList.remove('active');
    this.gameRunning = false;
    this.clearIntervals();
    this.clearMemes();
  }
  
  restartGame() {
    this.clearIntervals();
    this.clearMemes();
    this.startGame();
  }
  
  clearIntervals() {
    if (this.memeSpawnInterval) {
      clearInterval(this.memeSpawnInterval);
      this.memeSpawnInterval = null;
    }
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
  }
  
  clearMemes() {
    this.fallingMemes.innerHTML = '';
  }
  
  spawnMeme() {
    if (!this.gameRunning) return;
    
    const meme = document.createElement('div');
    meme.className = 'falling-meme';
    meme.textContent = this.memeEmojis[Math.floor(Math.random() * this.memeEmojis.length)];
    meme.style.left = Math.random() * 80 + 10 + '%'; // 10% to 90%
    
    this.fallingMemes.appendChild(meme);
    
    // Remove meme after animation
    setTimeout(() => {
      if (meme.parentNode) {
        meme.remove();
      }
    }, 3000);
  }
  
  moveMascot(percentage) {
    this.mascotPosition = Math.max(10, Math.min(90, percentage));
    this.gameMascot.style.left = this.mascotPosition + '%';
  }
  
  checkCollisions() {
    const mascotRect = this.gameMascot.getBoundingClientRect();
    const gameAreaRect = this.gameArea.getBoundingClientRect();
    
    const memes = this.fallingMemes.querySelectorAll('.falling-meme:not(.collected)');
    
    memes.forEach(meme => {
      const memeRect = meme.getBoundingClientRect();
      
      if (this.isColliding(mascotRect, memeRect)) {
        this.collectMeme(meme);
      }
    });
  }
  
  isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
  }
  
  collectMeme(meme) {
    meme.classList.add('collected');
    this.collected++;
    this.score += 10;
    
    // Bonus points for quick collection
    if (this.collected % 5 === 0) {
      this.score += 50;
    }
    
    this.updateUI();
    
    // Remove meme after collection animation
    setTimeout(() => {
      if (meme.parentNode) {
        meme.remove();
      }
    }, 500);
  }
  
  updateUI() {
    this.scoreElement.textContent = this.score;
    this.timeElement.textContent = this.timeLeft;
    this.collectedElement.textContent = this.collected;
  }
  
  gameLoop() {
    if (!this.gameRunning) return;
    
    // Handle keyboard input
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
      this.moveMascot(this.mascotPosition - 5);
    }
    if (this.keys['ArrowRight'] || this.keys['KeyD']) {
      this.moveMascot(this.mascotPosition + 5);
    }
    
    this.checkCollisions();
    requestAnimationFrame(() => this.gameLoop());
  }
  
  endGame() {
    this.gameRunning = false;
    this.clearIntervals();
    
    // Show custom game over alert
    setTimeout(() => {
      this.showCustomAlert();
    }, 500);
  }
  
  showCustomAlert() {
    const alertOverlay = document.getElementById('game-alert-overlay');
    const alertIcon = document.getElementById('alert-icon');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');
    const restartBtn = document.getElementById('alert-restart-btn');
    const closeBtn = document.getElementById('alert-close-btn');
    
    // Set alert content based on performance
    if (this.collected >= 10) {
      alertIcon.textContent = '🏆';
      alertTitle.textContent = 'Amazing Victory!';
      alertMessage.textContent = `🎉 Incredible! You collected ${this.collected} memes and scored ${this.score} points! You're a meme collecting master!`;
    } else if (this.collected >= 5) {
      alertIcon.textContent = '🎯';
      alertTitle.textContent = 'Great Job!';
      alertMessage.textContent = `👍 Well done! You collected ${this.collected} memes and scored ${this.score} points. Keep practicing!`;
    } else {
      alertIcon.textContent = '💪';
      alertTitle.textContent = 'Good Try!';
      alertMessage.textContent = `You collected ${this.collected} memes and scored ${this.score} points. Don't give up, try again!`;
    }
    
    // Show alert
    alertOverlay.classList.add('active');
    
    // Event listeners for alert buttons
    const handleRestart = () => {
      alertOverlay.classList.remove('active');
      this.restartGame();
    };
    
    const handleClose = () => {
      alertOverlay.classList.remove('active');
      this.stopGame();
    };
    
    restartBtn.onclick = handleRestart;
    closeBtn.onclick = handleClose;
    
    // Also close on overlay click
    alertOverlay.onclick = (e) => {
      if (e.target === alertOverlay) {
        handleClose();
      }
    };
  }
}

// Initialize game
let memeGame;

// Add game initialization to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  setupParticles();
  setupEventListeners();
  loadMemeGallery();
  
  // Initialize the game
  memeGame = new MemeCollectorGame();
});

 