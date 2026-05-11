let step = 0;
let starsFound = 0;
let puppyPets = 0;
let currentSongIndex = 1;
const totalSongs = 4;
const audio = document.getElementById('bg-music');
const disc = document.getElementById('music-disc');

function unlock() {
    if(document.getElementById('pw').value === "0623") {
        document.getElementById('step-0').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
    } else { alert("Wrong code! Try again ❤️"); }
}

// --- MUSIC ENGINE ---
function selectSong(el, name, url) {
    currentSongIndex = parseInt(url.replace('song', '').replace('.mp3', ''));
    playTrack(url);
    document.querySelectorAll('.music-opt').forEach(opt => opt.classList.remove('selected-item'));
    el.classList.add('selected-item');
    document.getElementById('confirm-music').classList.remove('hidden');
}

function playTrack(url) {
    audio.src = url;
    audio.play();
    disc.classList.add('disc-rotating');
}

// Auto-Play Next logic
audio.onended = function() {
    currentSongIndex++;
    if (currentSongIndex > totalSongs) currentSongIndex = 1;
    playTrack(`song${currentSongIndex}.mp3`);
};

function changeSong(url) {
    currentSongIndex = parseInt(url.replace('song', '').replace('.mp3', ''));
    playTrack(url);
    toggleMusicMenu();
}

function stopMusic() {
    audio.pause();
    disc.classList.remove('disc-rotating');
    toggleMusicMenu();
}

function toggleMusicMenu() {
    document.getElementById('mini-menu').classList.toggle('menu-hidden');
}

// --- NAVIGATION ---
function next() {
    step++;
    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');
    const stage = document.getElementById('stage');

    if (step === 1) {
        document.body.classList.add('lights-on');
        document.getElementById('main-card').classList.add('cute-ui');
        status.innerText = "The room is glowing... 🌸";
        btn.classList.add('hidden');
        setTimeout(() => {
            document.getElementById('music-screen').classList.remove('hidden');
            document.getElementById('music-player-container').classList.remove('hidden');
        }, 1500);
    } 
    else if (step === 2) {
        document.getElementById('quest-tag').classList.add('hidden');
        status.innerText = "The puppies want love! ❤️";
        btn.classList.add('hidden');
        stage.innerHTML = `
            <div class="pet-meter-container"><div id="pet-meter-fill"></div></div>
            <div class="puppy" onpointerdown="startPetting(event, this)" onpointerup="stopPetting(this)">🐶</div>
            <div class="puppy" onpointerdown="startPetting(event, this)" onpointerup="stopPetting(this)">🐕</div>`;
    }
}

// --- GAME LOGIC ---
function startSparkleQuest() {
    const btn = document.getElementById('next-btn');
    document.getElementById('status').innerText = "Catch 5 sparkles!!!!✨";
    document.getElementById('quest-tag').classList.remove('hidden');
    for(let i=0; i<5; i++) {
        const s = document.createElement('div');
        s.className = 'star'; s.innerText = '✨';
        s.style.left = Math.random()*70+15 + 'vw'; s.style.top = Math.random()*60+20 + 'vh';
        s.onclick = function() {
            this.remove(); starsFound++;
            document.getElementById('quest-tag').innerText = `Sparkles: ${starsFound}/5`;
            if(starsFound === 5) { btn.classList.remove('hidden'); btn.innerText = "Invite the Cuties??😁"; }
        };
        document.body.appendChild(s);
    }
}

function startPetting(e, el) {
    el.classList.add('active-pet');
    puppyPets++;
    document.getElementById('pet-meter-fill').style.width = Math.min((puppyPets / 10) * 100, 100) + "%";
    if(puppyPets >= 10) {
        setTimeout(() => {
            document.getElementById('status').innerText = "Ye Lo Aapke Liye Cake!!🎂";
            document.getElementById('stage').innerHTML = `<div class="cake-container" id="cake-obj"><span id="flame" class="candle-flame hidden">🔥</span>🎂</div>`;
            document.getElementById('next-btn').classList.remove('hidden');
            document.getElementById('next-btn').innerText = "Light the Candle";
        }, 500);
    }
}
function stopPetting(el) { el.classList.remove('active-pet'); }

function confirmMusic() { document.getElementById('music-screen').classList.add('hidden'); startSparkleQuest(); }

window.onclick = function(e) {
    const container = document.getElementById('music-player-container');
    if (container && !container.contains(e.target)) {
        document.getElementById('mini-menu').classList.add('menu-hidden');
    }
}

