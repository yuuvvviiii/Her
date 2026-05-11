let step = 0;
let starsFound = 0;
let puppyPets = 0;
let currentSongIndex = 0;

const songData = [
    { name: 'KUKKAD 😸', url: 'song1.mp3' },
    { name: 'I WANNA BE YOURS 🌸', url: 'song2.mp3' },
    { name: 'TUM HO TOH 🌷', url: 'song3.mp3' },
    { name: 'CHAUDHARY 🎀', url: 'song4.mp3' }
];

const audio = document.getElementById('bg-music');
const disc = document.getElementById('spinning-disc');

function unlock() {
    if(document.getElementById('pw').value === "0623") {
        document.getElementById('step-0').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        alert("Wrong code! Try again ❤️");
    }
}

function selectSong(el, name, url) {
    currentSongIndex = songData.findIndex(s => s.url === url);
    audio.src = url;
    audio.play();
    disc.classList.add('playing');
    
    if(el) {
        document.querySelectorAll('.music-opt').forEach(opt => opt.classList.remove('selected-item'));
        el.classList.add('selected-item');
        document.getElementById('confirm-music').classList.remove('hidden');
    }
}

// Function to stop music completely
function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    disc.classList.remove('playing');
    document.getElementById('mini-menu').classList.remove('show');
}

// Autoplay Logic: When song finishes, play next
audio.addEventListener('ended', function() {
    currentSongIndex++;
    if (currentSongIndex >= songData.length) currentSongIndex = 0;
    const nextSong = songData[currentSongIndex];
    selectSong(null, nextSong.name, nextSong.url);
});

function toggleMiniMenu() {
    const menu = document.getElementById('mini-menu');
    const list = document.getElementById('dynamic-song-list');
    menu.classList.toggle('show');
    
    // Always refresh list to keep stop button at top
    list.innerHTML = `<button class="stop-btn" onclick="stopMusic()">Stop Music ⏹️</button>`;
    
    songData.forEach(song => {
        const item = document.createElement('div');
        item.className = 'menu-song-item';
        item.innerText = song.name;
        item.onclick = () => {
            selectSong(null, song.name, song.url);
            menu.classList.remove('show');
        };
        list.appendChild(item);
    });
}

function confirmMusic() {
    document.getElementById('music-screen').classList.add('hidden');
    startSparkleQuest();
}

function startSparkleQuest() {
    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');
    status.innerText = "Catch 5 sparkles!!!!✨";
    document.getElementById('quest-tag').classList.remove('hidden');
    
    for(let i=0; i<5; i++) {
        const s = document.createElement('div');
        s.className = 'star'; s.innerText = '✨';
        s.style.left = Math.random()*70+15 + 'vw'; s.style.top = Math.random()*60+20 + 'vh';
        s.onclick = function() {
            this.remove(); starsFound++;
            document.getElementById('quest-tag').innerText = `Sparkles: ${starsFound}/5`;
            if(starsFound === 5) {
                btn.classList.remove('hidden');
                btn.innerText = "Kuch Cuties Ko Invite Kare??😁";
            }
        };
        document.body.appendChild(s);
    }
}

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
        setTimeout(() => { document.getElementById('music-screen').classList.remove('hidden'); }, 1500);
    } 
    else if (step === 2) {
        document.getElementById('quest-tag').classList.add('hidden');
        status.innerText = "The puppies want love! Pet them! ❤️";
        btn.classList.add('hidden');
        stage.innerHTML = `
            <div class="pet-meter-container"><div id="pet-meter-fill"></div></div>
            <div class="puppy" onpointerdown="startPetting(event, this)" onpointerup="stopPetting(this)">🐶</div>
            <div class="puppy" onpointerdown="startPetting(event, this)" onpointerup="stopPetting(this)">🐕</div>
        `;
    }
}

function startPetting(e, el) {
    el.classList.add('active-pet');
    petPuppy(e, el);
}
function stopPetting(el) { el.classList.remove('active-pet'); }

function petPuppy(e, el) {
    puppyPets++;
    const meter = document.getElementById('pet-meter-fill');
    if (meter) meter.style.width = Math.min((puppyPets / 10) * 100, 100) + "%";
    if(puppyPets >= 10) {
        document.getElementById('status').innerText = "Ye Lo Aapke Liye Cake!!🎂";
        document.getElementById('stage').innerHTML = `<div class="cake-container" id="cake-obj"><span id="flame" class="candle-flame hidden">🔥</span>🎂</div>`;
        const btn = document.getElementById('next-btn');
        btn.classList.remove('hidden');
        btn.innerText = "Light the Candle";
        btn.onclick = () => {
            document.getElementById('flame').classList.remove('hidden');
            btn.innerText = "HOLD TO WISH ✨";
            document.getElementById('meter-container').classList.remove('hidden');
            startWish();
        };
    }
}

function startWish() {
    let progress = 0; let timer;
    const btn = document.getElementById('next-btn');
    btn.onpointerdown = () => {
        timer = setInterval(() => {
            progress += 2;
            document.getElementById('meter-fill').style.width = progress + "%";
            if(progress >= 100) { clearInterval(timer); finishWish(); }
        }, 50);
    };
    btn.onpointerup = () => clearInterval(timer);
}

function finishWish() {
    document.getElementById('meter-container').classList.add('hidden');
    document.getElementById('status').innerText = "Ab Cake Kaate?? 🎂";
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('cake-obj').onclick = () => {
        document.getElementById('cake-obj').innerHTML = "🍰";
        const btn = document.getElementById('next-btn');
        btn.classList.remove('hidden');
        btn.innerText = "See My Gifts 🎁";
        btn.onclick = showGifts;
    };
}

function showGifts() {
    document.getElementById('status').innerText = "Your Surprises ❤️";
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('stage').innerHTML = `
        <div class="polaroid"><img src="2344.jpg" alt="Us"></div>
        <div class="gift-item" onclick="openGift(1)">🎁 Gift 1: A Letter</div>
        <div class="gift-item" onclick="openGift(2)">🎁 Gift 2: Surprise A</div>
        <div class="gift-item" onclick="openGift(3)">🎁 Gift 3: Surprise B</div>
    `;
}

function openGift(id) {
    const overlay = document.getElementById('gift-overlay');
    const display = document.getElementById('gift-display');
    if(id === 1) display.innerHTML = `<h3>My Letter</h3><div class="letter-box">Happy birthday! You are the best thing that ever happened to me.</div>`;
    else if(id === 2) display.innerHTML = `<h3>Gift A</h3><button class="gift-link-btn" onclick="window.open('https://youtube.com/shorts/zQTIBAcK_mo', '_blank')">Watch ✨</button>`;
    else if(id === 3) display.innerHTML = `<h3>Gift B</h3><button class="gift-link-btn" onclick="window.open('https://youtu.be/QDia3e12czc', '_blank')">Watch 💖</button>`;
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('visible'), 10);
}

function closeGift() {
    document.getElementById('gift-overlay').classList.remove('visible');
    setTimeout(() => document.getElementById('gift-overlay').classList.add('hidden'), 500);
}