let step = 0;
let starsFound = 0;
let puppyPets = 0;
let selectedSong = ""; 

// Reference to the audio player
const player = new Audio();

/**
 * MUSIC LOGIC
 * Allows her to preview songs. The "Confirm" button only appears after a selection.
 */
function playSong(file, displayName) {
    selectedSong = file;
    player.src = file;
    player.volume = 0.5;
    player.loop = true;
    player.play().catch(e => console.log("Playback interaction handled."));

    const status = document.getElementById('status');
    status.innerText = `Listening to: ${displayName} 🎵`;

    // Show the Confirm button once she taps a song
    const confirmBtn = document.getElementById('confirm-music-btn');
    if (confirmBtn) confirmBtn.classList.remove('hidden');
}

/**
 * CONFIRM LOGIC
 * Locks in the song and starts the sparkle game.
 */
function confirmMusic() {
    const status = document.getElementById('status');
    status.innerText = "Great choice! Now, catch 5 sparkles ✨";
    
    // Hide the music menu
    const menu = document.getElementById('music-menu');
    if(menu) menu.style.display = 'none';
    
    // Start the next game phase
    startSparkleGame();
}

/**
 * UNLOCK LOGIC
 */
function unlock() {
    // Current password: 0623
    if(document.getElementById('pw').value === "0623") {
        document.getElementById('step-0').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        alert("Wrong code! Try again ❤️");
    }
}

/**
 * MAIN GAME FLOW
 */
function next() {
    step++;
    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');
    const stage = document.getElementById('stage');

    if (step === 1) {
        // Transition to "Lights On"
        document.body.classList.add('lights-on');
        document.getElementById('main-card').classList.add('cute-ui');
        status.innerText = "The room is glowing... 🌸";
        btn.classList.add('hidden');
        
        // Inject the Music Selection Interface
        stage.innerHTML = `
            <div id="music-menu" style="margin-top:20px; animation: fadeIn 0.8s;">
                <p class="dark-text" style="font-size: 0.9rem; margin-bottom: 12px;">Tap to preview, then confirm your vibe: 🎵</p>
                <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                    <button class="cute-btn small" onclick="playSong('song1.mp3', 'Sweet 🌸')">Song 1</button>
                    <button class="cute-btn small" onclick="playSong('song2.mp3', 'Romantic ✨')">Song 2</button>
                    <button class="cute-btn small" onclick="playSong('song3.mp3', 'Our Fav 💖')">Song 3</button>
                </div>
                <br>
                <button id="confirm-music-btn" class="cute-btn hidden" 
                        style="background: #4caf50; margin-top: 15px; width: 80%;" 
                        onclick="confirmMusic()">Confirm & Continue ✅</button>
            </div>
        `;
    } 
    else if (step === 2) {
        // Transition to Puppies
        document.getElementById('quest-tag').classList.add('hidden');
        status.innerText = "The puppies want love! Pet them! ❤️";
        btn.classList.add('hidden');
        stage.innerHTML = `
            <div class="pet-meter-container" style="width:100%; background:#eee; height:10px; border-radius:5px; margin-bottom:10px;">
                <div id="pet-meter-fill" style="width:0%; background:#ff85a2; height:100%; border-radius:5px; transition:0.3s;"></div>
            </div>
            <div class="puppy" onpointerdown="startPetting(event, this)" onpointerup="stopPetting(this)">🐶</div>
            <div class="puppy" onpointerdown="startPetting(event, this)" onpointerup="stopPetting(this)">🐕</div>
        `;
    }
}

/**
 * SPARKLE GAME LOGIC
 */
function startSparkleGame() {
    const btn = document.getElementById('next-btn');
    document.getElementById('quest-tag').classList.remove('hidden');
    
    for(let i=0; i<5; i++) {
        const s = document.createElement('div');
        s.className = 'star'; 
        s.innerText = '✨';
        s.style.left = Math.random()*70+15 + 'vw'; 
        s.style.top = Math.random()*60+20 + 'vh';
        s.onclick = function() {
            this.remove(); 
            starsFound++;
            document.getElementById('quest-tag').innerText = `Sparkles: ${starsFound}/5`;
            if(starsFound === 5) {
                btn.classList.remove('hidden');
                btn.innerText = "Call the Puppies! 🐶";
            }
        };
        document.body.appendChild(s);
    }
}

/**
 * PUPPY PETTING LOGIC
 */
function startPetting(e, el) {
    el.style.transform = "scale(1.2)";
    if (el.innerText === "🐶") el.innerText = "🤩";
    if (el.innerText === "🐕") el.innerText = "🥰";
    petPuppy(e, el);
}

function stopPetting(el) {
    el.style.transform = "scale(1)";
    setTimeout(() => {
        if (el.innerText === "🤩") el.innerText = "🐶";
        if (el.innerText === "🥰") el.innerText = "🐕";
    }, 300);
}

function petPuppy(e, el) {
    puppyPets++;
    const meter = document.getElementById('pet-meter-fill');
    if (meter) meter.style.width = Math.min((puppyPets / 10) * 100, 100) + "%";

    if(puppyPets >= 10) {
        setTimeout(() => {
            document.getElementById('status').innerText = "They love you! Here is your cake! 🎂";
            document.getElementById('stage').innerHTML = `
                <div class="cake-container" id="cake-obj" style="font-size:4rem; cursor:pointer;">
                    <span id="flame" class="hidden">🔥</span>🎂
                </div>`;
            const btn = document.getElementById('next-btn');
            btn.classList.remove('hidden');
            btn.innerText = "Light the Candle";
            btn.onclick = () => {
                document.getElementById('flame').classList.remove('hidden');
                document.getElementById('status').innerText = "Make a wish! Hold the button.";
                btn.innerText = "HOLD TO WISH ✨";
                document.getElementById('meter-container').classList.remove('hidden');
                startWish();
            };
        }, 500);
    }
}

/**
 * WISH LOGIC
 */
function startWish() {
    let progress = 0; 
    let timer;
    const btn = document.getElementById('next-btn');
    btn.onpointerdown = () => {
        timer = setInterval(() => {
            progress += 2;
            document.getElementById('meter-fill').style.width = progress + "%";
            if(progress >= 100) { 
                clearInterval(timer); 
                btn.classList.add('hidden');
                finishWish(); 
            }
        }, 50);
    };
    btn.onpointerup = () => clearInterval(timer);
}

function finishWish() {
    document.getElementById('meter-container').classList.add('hidden');
    document.getElementById('status').innerText = "Wish Sent! Slice the cake!";
    document.getElementById('cake-obj').onclick = () => {
        document.getElementById('cake-obj').innerHTML = "🍰";
        const btn = document.getElementById('next-btn');
        btn.classList.remove('hidden');
        btn.innerText = "See My Gifts 🎁";
        btn.onclick = showGifts;
    };
}

/**
 * GIFT LOGIC
 */
function showGifts() {
    document.getElementById('status').innerText = "Your Surprises ❤️";
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('stage').innerHTML = `
        <div class="gift-item" style="cursor:pointer; margin:10px; padding:10px; border:1px solid #ffb7c5; border-radius:10px;" onclick="openGift(1)">🎁 Gift 1: A Letter</div>
        <div class="gift-item" style="cursor:pointer; margin:10px; padding:10px; border:1px solid #ffb7c5; border-radius:10px;" onclick="openGift(2)">🎁 Gift 2: Surprise A</div>
        <div class="gift-item" style="cursor:pointer; margin:10px; padding:10px; border:1px solid #ffb7c5; border-radius:10px;" onclick="openGift(3)">🎁 Gift 3: Surprise B</div>
    `;
}

function openGift(id) {
    const overlay = document.getElementById('gift-overlay');
    const display = document.getElementById('gift-display');
    if(id === 1) display.innerHTML = `<h3>My Letter</h3><p>Happy birthday! I made this just for you.</p>`;
    else if(id === 2) display.innerHTML = `<h3>Surprise A</h3><button class="cute-btn" onclick="window.open('URL_HERE')">View Surprise</button>`;
    else if(id === 3) display.innerHTML = `<h3>Surprise B</h3><p>You're the best!</p>`;
    
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('visible'), 10);
}

function closeGift() {
    document.getElementById('gift-overlay').classList.remove('visible');
    setTimeout(() => document.getElementById('gift-overlay').classList.add('hidden'), 500);
}

