let step = 0, starsFound = 0, puppyPets = 0, currentSongIndex = 1;
const audio = document.getElementById('bg-music'), disc = document.getElementById('music-disc');

function unlock() {
    if(document.getElementById('pw').value === "0623") {
        document.getElementById('step-0').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
    } else { alert("Wrong code! ❤️"); }
}

function selectSong(el, url) {
    currentSongIndex = parseInt(url.replace('song', ''));
    playTrack(url);
    document.querySelectorAll('.music-opt').forEach(opt => opt.classList.remove('selected-item'));
    el.classList.add('selected-item');
    document.getElementById('confirm-music').classList.remove('hidden');
}

function playTrack(url) {
    audio.src = url; audio.play();
    disc.classList.add('disc-rotating');
}

audio.onended = function() {
    currentSongIndex = currentSongIndex < 4 ? currentSongIndex + 1 : 1;
    playTrack(`song${currentSongIndex}.mp3`);
};

function toggleMusicMenu() { document.getElementById('mini-menu').classList.toggle('menu-hidden'); }
function stopMusic() { audio.pause(); disc.classList.remove('disc-rotating'); toggleMusicMenu(); }
function changeSong(url) { currentSongIndex = parseInt(url.replace('song', '')); playTrack(url); toggleMusicMenu(); }

function next() {
    step++;
    const status = document.getElementById('status'), btn = document.getElementById('next-btn'), stage = document.getElementById('stage');
    if (step === 1) {
        document.body.classList.add('lights-on');
        document.getElementById('main-card').classList.add('cute-ui');
        status.innerText = "The room is glowing... 🌸";
        btn.classList.add('hidden');
        setTimeout(() => {
            document.getElementById('music-screen').classList.remove('hidden');
            document.getElementById('music-player-container').classList.remove('hidden');
        }, 1500);
    } else if (step === 2) {
        document.getElementById('quest-tag').classList.add('hidden');
        status.innerText = "The puppies want love! ❤️";
        btn.classList.add('hidden');
        stage.innerHTML = `<div class="pet-meter-container"><div id="pet-meter-fill"></div></div>
            <div class="puppy" onpointerdown="startPetting(this)">🐶</div>
            <div class="puppy" onpointerdown="startPetting(this)">🐕</div>`;
    }
}

function confirmMusic() { document.getElementById('music-screen').classList.add('hidden'); startSparkleQuest(); }

function startSparkleQuest() {
    const btn = document.getElementById('next-btn');
    document.getElementById('status').innerText = "Catch 5 sparkles!!!!✨";
    document.getElementById('quest-tag').classList.remove('hidden');
    for(let i=0; i<5; i++) {
        const s = document.createElement('div'); s.className = 'star'; s.innerText = '✨';
        s.style.left = Math.random()*70+15+'vw'; s.style.top = Math.random()*60+20+'vh';
        s.onclick = function() { this.remove(); starsFound++;
            document.getElementById('quest-tag').innerText = `Sparkles: ${starsFound}/5`;
            if(starsFound === 5) { btn.classList.remove('hidden'); btn.innerText = "Invite Cuties??😁"; }
        }; document.body.appendChild(s);
    }
}

function startPetting(el) {
    el.classList.add('active-pet'); puppyPets++;
    document.getElementById('pet-meter-fill').style.width = Math.min((puppyPets/10)*100, 100) + "%";
    if(puppyPets >= 10) {
        setTimeout(() => {
            document.getElementById('status').innerText = "Ye Lo Aapke Liye Cake!!🎂";
            stage.innerHTML = `<div class="cake-container" id="cake-obj"><span id="flame" class="candle-flame hidden">🔥</span>🎂</div>`;
            document.getElementById('next-btn').classList.remove('hidden');
            document.getElementById('next-btn').innerText = "Light the Candle";
            document.getElementById('next-btn').onclick = function() {
                document.getElementById('flame').classList.remove('hidden');
                this.innerText = "HOLD TO WISH ✨";
                document.getElementById('meter-container').classList.remove('hidden');
                startWish();
            };
        }, 500);
    }
    setTimeout(() => el.classList.remove('active-pet'), 200);
}

function startWish() {
    let progress = 0, timer, btn = document.getElementById('next-btn');
    btn.onpointerdown = () => { timer = setInterval(() => { progress += 2;
        document.getElementById('meter-fill').style.width = progress + "%";
        if(progress >= 100) { clearInterval(timer); btn.classList.add('hidden'); finishWish(); }
    }, 50); };
    btn.onpointerup = () => clearInterval(timer);
}

function finishWish() {
    document.getElementById('meter-container').classList.add('hidden');
    document.getElementById('status').innerText = "Wish Sent! Ab Cake Kaate?? 🎂";
    document.getElementById('cake-obj').onclick = () => {
        document.getElementById('cake-obj').innerHTML = "🍰";
        document.getElementById('status').innerText = "Yummy 😋";
        document.getElementById('next-btn').classList.remove('hidden');
        document.getElementById('next-btn').innerText = "See My Gifts 🎁";
        document.getElementById('next-btn').onpointerdown = null; // Clear old events
        document.getElementById('next-btn').onclick = showGifts;
    };
}

function showGifts() {
    document.getElementById('status').innerText = "Your Surprises ❤️";
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('stage').innerHTML = `<div class="polaroid"><img src="2344.jpg" alt="Us"></div>
        <div class="gift-item" onclick="openGift(1)">🎁 A Letter</div>
        <div class="gift-item" onclick="openGift(2)">🎁 Surprise A</div>
        <div class="gift-item" onclick="openGift(3)">🎁 Surprise B</div>`;
}

function openGift(id) {
    const overlay = document.getElementById('gift-overlay'), display = document.getElementById('gift-display');
    if(id === 1) display.innerHTML = `<h3>My Letter</h3><div class="letter-box">"Happy birthday! I made this just for you. "</div>`;
    else if(id === 2) display.innerHTML = `<h3>Surprise A</h3><button class="gift-link-btn" onclick="window.open('https://youtube.com/shorts/zQTIBAcK_mo', '_blank')">View ✨</button>`;
    else if(id === 3) display.innerHTML = `<h3>Surprise B</h3><button class="gift-link-btn" onclick="window.open('https://youtu.be/QDia3e12czc', '_blank')">View 💖</button>`;
    overlay.classList.remove('hidden'); setTimeout(() => overlay.classList.add('visible'), 10);
}

function closeGift() { document.getElementById('gift-overlay').classList.remove('visible'); setTimeout(() => document.getElementById('gift-overlay').classList.add('hidden'), 500); }

window.onclick = function(e) { if (!document.getElementById('music-player-container').contains(e.target)) document.getElementById('mini-menu').classList.add('menu-hidden'); }
