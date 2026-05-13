/**
 * BIRTHDAY UNIVERSE - CORE APPLICATION ENGINE
 * Version: 2.0.4
 * Description: A state-managed interactive experience featuring 
 * dynamic DOM manipulation, audio synthesis, and event-driven transitions.
 */

// Global Application State
const AppConfig = {
    settings: {
        requiredSparkles: 5,
        requiredPets: 10,
        unlockCode: "0623",
        transitionDelay: 1200,
        wishIncrement: 1.5
    },
    state: {
        isUnlocked: false,
        activeStep: 0,
        sparklesFound: 0,
        petCount: 0,
        letterPhase: 0,
        giftsOpened: new Set(),
        isMusicFloating: false
    }
};

/**
 * UTILITY MODULE
 * Helpers for DOM and Animations
 */
const Utils = {
    hide: (id) => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    },
    show: (id) => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    },
    setText: (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    },
    getRandom: (min, max) => Math.random() * (max - min) + min
};

/**
 * AUDIO CONTROLLER MODULE
 */
const MusicPlayer = {
    player: document.getElementById('bg-music'),
    menu: document.getElementById('music-menu'),
    
    toggleMenu: function() {
        this.menu.classList.toggle('hidden');
    },
    
    loadAndPlay: function(element, source) {
        this.player.src = source;
        this.player.play().catch(err => console.log("Autoplay blocked: ", err));

        // Visual State Update
        const allOpts = document.querySelectorAll('.music-opt');
        allOpts.forEach(opt => {
            opt.style.borderColor = '#f0f0f0';
            opt.style.background = '#fcfcfc';
        });
        
        element.style.borderColor = 'var(--magic-pink)';
        element.style.background = 'var(--soft-pink)';
        Utils.show('confirm-music');
    },

    control: function(action) {
        if (action === 'play') this.player.play();
        if (action === 'pause') this.player.pause();
        if (action === 'stop') {
            this.player.pause();
            this.player.currentTime = 0;
        }
    },

    detachToFloat: function() {
        const container = document.getElementById('floating-music-container');
        Utils.hide('music-screen');
        document.body.appendChild(container);
        container.className = 'floating-disc';
        this.menu.classList.add('hidden');
        AppConfig.state.isMusicFloating = true;
        
        // Initiate the next sequence
        QuestEngine.init();
    }
};

/**
 * SPARKLE QUEST ENGINE
 */
const QuestEngine = {
    init: function() {
        Utils.setText('status', "The universe is waking up... Catch 5 sparkles ✨");
        Utils.show('quest-tag');
        this.spawnBatch();
    },

    spawnBatch: function() {
        for (let i = 0; i < AppConfig.settings.requiredSparkles; i++) {
            this.createSparkle();
        }
    },

    createSparkle: function() {
        const s = document.createElement('div');
        s.className = 'star';
        s.innerHTML = '✨';
        
        // Complex positioning logic
        const x = Utils.getRandom(10, 85);
        const y = Utils.getRandom(15, 80);
        
        s.style.left = `${x}vw`;
        s.style.top = `${y}vh`;
        
        s.addEventListener('click', () => {
            s.remove();
            AppConfig.state.sparklesFound++;
            this.updateUI();
        });
        
        document.body.appendChild(s);
    },

    updateUI: function() {
        const tag = document.getElementById('quest-tag');
        tag.innerText = `Captured: ${AppConfig.state.sparklesFound}/${AppConfig.settings.requiredSparkles}`;
        
        if (AppConfig.state.sparklesFound >= AppConfig.settings.requiredSparkles) {
            const nextBtn = document.getElementById('next-btn');
            nextBtn.classList.remove('hidden');
            nextBtn.innerText = "Step into the Light 🕯️";
            nextBtn.onclick = () => AppManager.nextStep();
        }
    }
};

/**
 * INTERACTION PHYSICS (PETTING & PARTICLES)
 */
const InteractionPhysics = {
    handlePet: function(event, element) {
        element.classList.add('active-pet');
        
        // Toggle Emojis
        const isPuppy1 = element.innerText === "🐶" || element.innerText === "🤩";
        element.innerText = isPuppy1 ? "🤩" : "🥰";
        
        AppConfig.state.petCount++;
        this.updateMeter();
        this.burstHearts(event.clientX, event.clientY);

        if (AppConfig.state.petCount >= AppConfig.settings.requiredPets) {
            setTimeout(() => CakeModule.render(), 800);
        }
    },

    resetEmoji: function(element) {
        element.classList.remove('active-pet');
        setTimeout(() => {
            const current = element.innerText;
            element.innerText = (current === "🤩") ? "🐶" : "🐕";
        }, 400);
    },

    updateMeter: function() {
        const fill = document.getElementById('pet-meter-fill');
        const percent = (AppConfig.state.petCount / AppConfig.settings.requiredPets) * 100;
        if (fill) fill.style.width = `${Math.min(percent, 100)}%`;
    },

    burstHearts: function(x, y) {
        for (let i = 0; i < 4; i++) {
            const h = document.createElement('div');
            h.className = 'heart-pop';
            h.innerText = "💖";
            h.style.left = `${x}px`;
            h.style.top = `${y}px`;
            
            const tx = (Math.random() - 0.5) * 250;
            const ty = (Math.random() - 1) * 250;
            
            h.style.setProperty('--tx', `${tx}px`);
            h.style.setProperty('--ty', `${ty}px`);
            
            document.body.appendChild(h);
            setTimeout(() => h.remove(), 1200);
        }
    }
};

/**
 * CAKE & WISH MODULE
 */
const CakeModule = {
    render: function() {
        Utils.setText('status', "A sweet surprise appeared... 🎂");
        const stage = document.getElementById('stage');
        stage.innerHTML = `
            <div class="cake-container" id="cake-obj" style="font-size:5.5rem; cursor:pointer;">
                <span id="flame" class="candle-flame hidden">🔥</span>🎂
            </div>
        `;
        
        const btn = document.getElementById('next-btn');
        btn.classList.remove('hidden');
        btn.innerText = "Light the Candle";
        btn.onclick = () => this.light();
    },

    light: function() {
        Utils.show('flame');
        Utils.setText('status', "Make a wish and hold the button tight... ✨");
        Utils.show('meter-container');
        
        const btn = document.getElementById('next-btn');
        btn.innerText = "HOLD TO WISH";
        this.bindWishEvents(btn);
    },

    bindWishEvents: function(btn) {
        let progress = 0;
        let interval;

        const start = () => {
            interval = setInterval(() => {
                progress += AppConfig.settings.wishIncrement;
                document.getElementById('meter-fill').style.width = `${progress}%`;
                if (progress >= 100) {
                    clearInterval(interval);
                    this.complete();
                }
            }, 50);
        };

        const stop = () => clearInterval(interval);

        btn.onpointerdown = start;
        btn.onpointerup = stop;
        btn.onmouseleave = stop;
    },

    complete: function() {
        Utils.hide('meter-container');
        Utils.setText('status', "Wish sent! Now cut the cake... 🎂");
        Utils.hide('next-btn');
        
        const cake = document.getElementById('cake-obj');
        cake.onclick = () => {
            cake.innerHTML = "🍰";
            setTimeout(() => {
                const btn = document.getElementById('next-btn');
                btn.classList.remove('hidden');
                btn.innerText = "Open Your Gifts 🎁";
                btn.onclick = () => GiftManager.init();
            }, 800);
        };
    }
};

/**
 * GIFT & ENVELOPE MANAGER
 */
const GiftManager = {
    init: function() {
        Utils.setText('status', "Your memory box is open ❤️");
        Utils.hide('next-btn');
        
        const stage = document.getElementById('stage');
        stage.innerHTML = `
            <div class="polaroid" style="background:#fff; padding:10px; box-shadow:0 10px 20px rgba(0,0,0,0.1); margin-bottom:20px;">
                <img src="2344.jpg" style="width:100%; border-radius:5px;">
                <p style="color:#666; font-size:0.8rem; margin-top:8px;">Forever Memories ✨</p>
            </div>
            <div class="gift-item" onclick="GiftManager.open(1)">🎁 A Special Letter</div>
            <div class="gift-item" onclick="GiftManager.open(2)">🎁 Surprise Reveal</div>
            <div id="countdown-area"></div>
        `;
    },

    open: function(id) {
        const overlay = document.getElementById('gift-overlay');
        const display = document.getElementById('gift-display');
        
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('visible'), 50);

        if (id === 1) {
            AppConfig.state.letterPhase = 0;
            display.innerHTML = `
                <div id="letter-wrapper" onclick="GiftManager.animateLetter()">
                    <div id="the-letter">
                        <strong>My Dearest,</strong><br><br>
                        Happy Birthday! You make every day feel like magic. 
                        I'm so lucky to have you. ❤️
                    </div>
                    <div id="envelope-icon">✉️</div>
                </div>
                <p id="letter-hint" style="font-size:0.9rem; color:#888;">Tap the envelope 💌</p>
            `;
        } else if (id === 2) {
            display.innerHTML = `<h3>Surprise A</h3><p>Your next journey starts here...</p><br>
            <button class="cute-btn small" onclick="window.open('https://youtube.com','_blank')">Explore ✨</button>`;
        } else if (id === 3) {
            display.innerHTML = `<h3>The Grand Finale 👑</h3><p>You've completed the journey! You are the best thing in my life. ❤️</p>`;
        }

        AppConfig.state.giftsOpened.add(id);
    },

    animateLetter: function() {
        AppConfig.state.letterPhase++;
        const letter = document.getElementById('the-letter');
        const hint = document.getElementById('letter-hint');

        if (AppConfig.state.letterPhase === 1) {
            letter.classList.add('peek-stage');
            hint.innerText = "Almost there... one more tap!";
        } else if (AppConfig.state.letterPhase === 2) {
            letter.classList.add('full-out-stage');
            hint.innerText = "With all my love ❤️";
        }
    },

    close: function() {
        const overlay = document.getElementById('gift-overlay');
        overlay.classList.remove('visible');
        setTimeout(() => {
            overlay.classList.add('hidden');
            this.checkFinalReveal();
        }, 500);
    },

    checkFinalReveal: function() {
        if (AppConfig.state.giftsOpened.has(1) && AppConfig.state.giftsOpened.has(2)) {
            this.startFinalCountdown();
        }
    },

    startFinalCountdown: function() {
        const area = document.getElementById('countdown-area');
        if (area.innerHTML !== "") return;

        let timeLeft = 5;
        area.innerHTML = `<p class="dark-text">Final Surprise in <span id="time-left">${timeLeft}</span>...</p>`;
        
        const timer = setInterval(() => {
            timeLeft--;
            const label = document.getElementById('time-left');
            if (label) label.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                area.innerHTML = `
                    <div class="gift-item" style="border:3px solid gold; background:#fffcf0; color:#b8860b;" onclick="GiftManager.open(3)">
                        👑 THE FINAL GIFT 👑
                    </div>
                `;
                Utils.setText('status', "The experience is complete! 🎀");
            }
        }, 1000);
    }
};

/**
 * MAIN APPLICATION MANAGER
 */
const AppManager = {
    unlock: function() {
        const input = document.getElementById('pw');
        if (input.value === AppConfig.settings.unlockCode) {
            Utils.hide('step-0');
            Utils.show('celebration');
            Utils.setText('status', "Initializing Universe... 💭");
            setTimeout(() => {
                Utils.setText('status', "Access Granted ✨");
                Utils.show('next-btn');
            }, 1800);
        } else {
            alert("Security Error: Invalid Access Date.");
            input.value = "";
        }
    },

    nextStep: function() {
        AppConfig.state.activeStep++;
        const status = document.getElementById('status');
        const btn = document.getElementById('next-btn');
        const stage = document.getElementById('stage');

        if (AppConfig.state.activeStep === 1) {
            document.body.classList.add('lights-on');
            document.getElementById('main-card').classList.add('cute-ui');
            status.innerText = "Atmosphere shifting... 🌸";
            btn.classList.add('hidden');
            setTimeout(() => Utils.show('music-screen'), AppConfig.settings.transitionDelay);
        } 
        else if (AppConfig.state.activeStep === 2) {
            Utils.hide('quest-tag');
            status.innerText = "Friendly puppies appeared! Give them love 🐶";
            btn.classList.add('hidden');
            stage.innerHTML = `
                <div class="pet-meter-container"><div id="pet-meter-fill"></div></div>
                <div class="puppy" onpointerdown="InteractionPhysics.handlePet(event, this)" onpointerup="InteractionPhysics.resetEmoji(this)">🐶</div>
                <div class="puppy" onpointerdown="InteractionPhysics.handlePet(event, this)" onpointerup="InteractionPhysics.resetEmoji(this)">🐕</div>
            `;
        }
    }
};

// Global Exposure for HTML onclick attributes
window.unlock = AppManager.unlock;
window.next = AppManager.nextStep;
window.closeGift = () => GiftManager.close();
window.toggleMusicMenu = () => MusicPlayer.toggleMenu();
window.selectSong = (el, src) => MusicPlayer.loadAndPlay(el, src);
window.confirmMusicChoice = () => MusicPlayer.detachToFloat();
window.playMusic = () => MusicPlayer.control('play');
window.pauseMusic = () => MusicPlayer.control('pause');
window.stopMusic = () => MusicPlayer.control('stop');

