let step = 0;
let starsFound = 0;
let puppyPets = 0;
let whackScore = 0;
let whackActive = false;
let whackSpeed = 1000;

let openedGift1 = false;
let openedGift2 = false;
let envelopeStep = 0;
let finalGiftUnlocked = false;

const songs = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3"];
let currentSongIndex = 0;

/* UNLOCK FUNCTION */
function unlock() {
    if (document.getElementById('pw').value === "0623") {
        document.getElementById('step-0').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');

        document
            .getElementById('bg-music')
            .addEventListener('ended', playNextSong);
    } else {
        alert("Wrong code! Try again ❤️");
    }
}

/* MUSIC MENU FUNCTIONS */
function toggleMusicMenu() {
    document.getElementById('music-menu').classList.toggle('hidden');
}

function playMusic() {
    document.getElementById('bg-music').play();
}

function pauseMusic() {
    document.getElementById('bg-music').pause();
}

function stopMusic() {
    const audio = document.getElementById('bg-music');
    audio.pause();
    audio.currentTime = 0;
}

function selectSong(el, name, url) {
    const audio = document.getElementById('bg-music');
    audio.src = url;
    audio.play();

    currentSongIndex = songs.indexOf(url);

    document.querySelectorAll('.music-opt').forEach(opt => {
        opt.classList.remove('selected-item');
    });

    el.classList.add('selected-item');
    document.getElementById('confirm-music').classList.remove('hidden');
}

function playNextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    const audio = document.getElementById('bg-music');
    audio.src = songs[currentSongIndex];
    audio.play();

    document.querySelectorAll('.music-opt').forEach(opt => {
        opt.classList.remove('selected-item');
    });

    const options = document.querySelectorAll('.music-opt');
    if (options[currentSongIndex]) {
        options[currentSongIndex].classList.add('selected-item');
    }
}

function confirmMusic() {
    document.getElementById('music-screen').classList.add('hidden');
    document.getElementById('confirm-music').classList.add('hidden');

    const container = document.getElementById('floating-music-container');
    const disc = document.getElementById('music-disc');

    document.body.appendChild(container);
    container.classList.add('floating-disc');

    disc.style.display = "block";
    disc.style.visibility = "visible";
    disc.style.opacity = "1";

    document.getElementById('music-menu').classList.add('hidden');

    startSparkleQuest();
}

/* SPARKLE QUEST */
function startSparkleQuest() {
    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');

    status.innerText = "Catch 5 sparkles!!!!✨";
    document.getElementById('quest-tag').classList.remove('hidden');

    for (let i = 0; i < 5; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.innerText = '✨';
        s.style.left = Math.random() * 70 + 15 + 'vw';
        s.style.top = Math.random() * 60 + 20 + 'vh';

        s.onclick = function () {
            this.remove();
            starsFound++;

            document.getElementById('quest-tag').innerText = `Sparkles: ${starsFound}/5`;

            if (starsFound === 5) {
                btn.classList.remove('hidden');
                btn.innerText = "Kuch Cuties Ko Invite Kare??😁";
            }
        };

        document.body.appendChild(s);
    }
}

/* MAIN FLOW */
function next() {
    step++;

    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');
    const stage = document.getElementById('stage');

    if (step >= 2) {
        document.getElementById('music-screen').classList.add('hidden');
        document.getElementById('confirm-music').classList.add('hidden');
    }

    if (step === 1) {
        document.body.classList.add('lights-on');
        document.getElementById('main-card').classList.add('cute-ui');

        status.innerText = "The room is glowing... 🌸";
        btn.classList.add('hidden');

        setTimeout(() => {
            if (!document.getElementById('floating-music-container').classList.contains('floating-disc')) {
                document.getElementById('music-screen').classList.remove('hidden');
            }
        }, 1500);
    }

    else if (step === 2) {
        document.getElementById('quest-tag').classList.add('hidden');
        status.innerText = "The puppies want love! Pet them until they're happy! ❤️";
        btn.classList.add('hidden');

        stage.innerHTML = `
            <div class="pet-meter-container">
                <div id="pet-meter-fill"></div>
            </div>
            <div class="puppy" onpointerdown="startPetting(event,this)" onpointerup="stopPetting(this)">🐶</div>
            <div class="puppy" onpointerdown="startPetting(event,this)" onpointerup="stopPetting(this)">🐕</div>
        `;
    }
}

/* PETTING LOGIC */
function startPetting(e, el) {
    el.classList.add('active-pet');
    if (el.innerText === "🐶") el.innerText = "🤩";
    if (el.innerText === "🐕") el.innerText = "🥰";
    petPuppy(e, el);
}

function stopPetting(el) {
    el.classList.remove('active-pet');
    setTimeout(() => {
        if (el.innerText === "🤩") el.innerText = "🐶";
        if (el.innerText === "🥰") el.innerText = "🐕";
    }, 300);
}

function petPuppy(e, el) {
    puppyPets++;

    const meter = document.getElementById('pet-meter-fill');
    if (meter) {
        meter.style.width = Math.min((puppyPets / 10) * 100, 100) + "%";
    }

    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-pop';
        heart.innerText = ['❤️', '💖', '💗', '💓'][Math.floor(Math.random() * 4)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        heart.style.setProperty('--ty', (Math.random() - 1) * 200 + 'px');
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    if (puppyPets >= 10) {
        const btn = document.getElementById('next-btn');
        btn.classList.remove('hidden');
        btn.innerText = "Shall we move to the next thing? ✨";
        btn.onclick = startWhackGame;
    }
}

/* WHACK GAME (HARD MODE) */
function startWhackGame() {
    whackScore = 0;
    whackSpeed = 1000;
    whackActive = true;
    
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('status').innerText = "Catch 10 Hearts! ❤️";
    
    document.getElementById('stage').innerHTML = `
        <div class="whack-grid" id="whack-board">
            ${'<div class="hole"><span class="heart-target" onclick="whack(this)">❤️</span></div>'.repeat(6)}
        </div>
    `;
    peep();
}

function peep() {
    if (!whackActive) return;
    const holes = document.querySelectorAll('.hole');
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const heart = randomHole.querySelector('.heart-target');
    
    heart.classList.add('up');
    
    // Disappears faster than the next one pops up
    const stayTime = Math.max(300, whackSpeed - 100); 
    
    setTimeout(() => {
        heart.classList.remove('up');
        if (whackActive) peep();
    }, stayTime);
}

function whack(el) {
    if (!el.classList.contains('up')) {
        document.getElementById('whack-board').classList.add('shake-effect');
        setTimeout(() => {
            document.getElementById('whack-board').classList.remove('shake-effect');
        }, 200);
        return;
    }

    whackScore++;
    el.classList.remove('up');
    
    // Aggressive speed: Drops 75ms every point. Floor is 300ms.
    whackSpeed = Math.max(300, 1000 - (whackScore * 75));
    document.getElementById('status').innerText = `Hearts Caught: ${whackScore}/10`;
    
    if (whackScore >= 10) {
        whackActive = false;
        const btn = document.getElementById('next-btn');
        btn.classList.remove('hidden');
        btn.innerText = "Claim Your Reward! 🎁";
        btn.onclick = showGameReward;
    }
}

/* ROMANTIC REWARD STAGE */
function showGameReward() {
    document.getElementById('status').innerText = "For Being A Pro Gamer! ❤️";
    document.getElementById('stage').innerHTML = `
        <div class="reward-photo">
            <img src="reward_photo.jpg" alt="Romantic Moment">
            <p class="romantic-words">Yawwrrr Itni Aasani Se Kaise Kr Liya Aapne 😭.</p>
        </div>
    `;
    const btn = document.getElementById('next-btn');
    btn.innerText = "Ready for the Cake? 🎂";
    btn.onclick = showCakeStage;
}

/* CAKE STAGE */
function showCakeStage() {
    document.getElementById('status').innerText = "Ye Lo Aapke Liye Cake!!🎂";
    document.getElementById('stage').innerHTML = `
        <div class="cake-container" id="cake-obj">
            <span id="flame" class="candle-flame hidden">🔥</span>
            🎂
        </div>
    `;

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
}

/* WISH STAGE */
function startWish() {
    let progress = 0;
    let timer;
    const btn = document.getElementById('next-btn');

    btn.onpointerdown = () => {
        timer = setInterval(() => {
            progress += 2;
            document.getElementById('meter-fill').style.width = progress + "%";
            if (progress >= 100) {
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
    document.getElementById('status').innerText = "Wish Sent! Ab Cake Kaate?? 🎂";

    document.getElementById('cake-obj').onclick = () => {
        document.getElementById('cake-obj').innerHTML = "🍰";
        document.getElementById('status').innerText = "Yummy 😋";

        const btn = document.getElementById('next-btn');
        btn.classList.remove('hidden');
        btn.innerText = "See My Gifts 🎁";
        btn.onclick = showGifts;
    };
}

/* GIFT STAGE */
function showGifts() {
    document.getElementById('status').innerText = "Your Surprises ❤️";
    document.getElementById('next-btn').classList.add('hidden');

    document.getElementById('stage').innerHTML = `
        <div class="polaroid">
            <img src="2344.jpg" alt="Us">
            <p style="margin-top:5px;font-size:0.7rem;color:#888;">Forever</p>
        </div>
        <div id="gift-list">
            <div class="gift-item" onclick="openGift(1)">🎁 Gift 1: A Letter</div>
            <div class="gift-item" onclick="openGift(2)">🎁 Gift 2: Surprise A</div>
        </div>
        <div id="countdown-area"></div>
    `;
}

function openGift(id) {
    const overlay = document.getElementById('gift-overlay');
    const display = document.getElementById('gift-display');

    if (id === 1) {
        openedGift1 = true;
        envelopeStep = 0;
        display.innerHTML = `
            <h3>My Letter 💌</h3>
            <div id="envelope" onclick="handleEnvelopeTap()">
                <div id="envelope-flap">✉️</div>
                <div id="letter-paper" class="hidden">
                    Happy birthday! I made this just for you ❤️
                </div>
            </div>
        `;
    } else if (id === 2) {
        openedGift2 = true;
        display.innerHTML = `
            <h3>Surprise A</h3>
            <button class="cute-btn" onclick="window.open('https://youtube.com/shorts/zQTIBAcK_mo?si=rj0GtJZGowUsFfrJ','_blank')">
                View Gift ✨
            </button>
        `;
    } else if (id === 3) {
        display.innerHTML = `
            <h3>Surprise B</h3>
            <button class="cute-btn" onclick="window.open('https://digibouquet.vercel.app/bouquet/eb3be969-0562-4a09-b4b9-917916dfd044','_blank')">
                View Gift 💖
            </button>
        `;
    }

    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('visible'), 10);
    checkGiftProgress();
}

function handleEnvelopeTap() {
    envelopeStep++;
    if (envelopeStep === 1) {
        document.getElementById('envelope-flap').innerText = "📩";
    }
    if (envelopeStep === 2) {
        document.getElementById('letter-paper').classList.remove('hidden');
        document.getElementById('letter-paper').classList.add('slide-letter');
    }
}

function checkGiftProgress() {
    if (openedGift1 && openedGift2 && !finalGiftUnlocked) {
        document.getElementById('countdown-area').innerHTML = `
            <button class="cute-btn" onclick="unlockFinalGift()">
                One Final Thing 💖
            </button>
        `;
    }
}

function unlockFinalGift() {
    finalGiftUnlocked = true;
    let countdown = 5;
    const area = document.getElementById('countdown-area');

    const timer = setInterval(() => {
        area.innerHTML = `Opening in ${countdown}... ⏳`;
        countdown--;
        if (countdown < 0) {
            clearInterval(timer);
            area.innerHTML = `
                <div class="gift-item" onclick="openGift(3)">
                    🎁 Gift 3: Surprise B
                </div>
            `;
        }
    }, 1000);
}

function closeGift() {
    const overlay = document.getElementById('gift-overlay');
    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 500);
}
