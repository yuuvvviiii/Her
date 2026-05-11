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
    const pw = document.getElementById('pw').value;
    if(pw === "0623") {
        document.getElementById('step-0').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        alert("Wrong code! ❤️");
    }
}

function selectSong(el, name, url) {
    currentSongIndex = songData.findIndex(s => s.url === url);
    audio.src = url;
    audio.play();
    disc.classList.add('playing');
    
    if(el) {
        document.querySelectorAll('.music-opt').forEach(opt => opt.style.borderColor = "#eee");
        el.style.borderColor = "#ff80ab";
        document.getElementById('confirm-music').classList.remove('hidden');
    }
}

function stopMusic() {
    audio.pause();
    disc.classList.remove('playing');
    document.getElementById('mini-menu').classList.remove('show');
}

// Autoplay logic
audio.addEventListener('ended', function() {
    currentSongIndex = (currentSongIndex + 1) % songData.length;
    const nextSong = songData[currentSongIndex];
    selectSong(null, nextSong.name, nextSong.url);
});

function toggleMiniMenu() {
    const menu = document.getElementById('mini-menu');
    const list = document.getElementById('dynamic-song-list');
    menu.classList.toggle('show');
    
    list.innerHTML = `<button class="stop-btn" onclick="stopMusic()">Stop Music ⏹️</button>`;
    songData.forEach(song => {
        const item = document.createElement('div');
        item.className = 'menu-song-item';
        item.innerText = song.name;
        item.onclick = () => { selectSong(null, song.name, song.url); menu.classList.remove('show'); };
        list.appendChild(item);
    });
}

function confirmMusic() {
    document.getElementById('music-screen').classList.add('hidden');
    document.getElementById('status').innerText = "Catch 5 sparkles!!!!✨";
    document.getElementById('quest-tag').classList.remove('hidden');
    
    for(let i=0; i<5; i++) {
        const s = document.createElement('div');
        s.className = 'star'; s.innerText = '✨';
        s.style.left = Math.random()*80 + 'vw';
        s.style.top = Math.random()*80 + 'vh';
        s.onclick = function() {
            this.remove();
            starsFound++;
            document.getElementById('quest-tag').innerText = `Sparkles: ${starsFound}/5`;
            if(starsFound === 5) {
                document.getElementById('next-btn').classList.remove('hidden');
                document.getElementById('next-btn').innerText = "Invite Cuties? 😁";
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
        setTimeout(() => { document.getElementById('music-screen').classList.remove('hidden'); }, 1000);
    } 
    else if (step === 2) {
        document.getElementById('quest-tag').classList.add('hidden');
        status.innerText = "The puppies want love! Pet them! ❤️";
        btn.classList.add('hidden');
        stage.innerHTML = `<div class="puppy" onclick="petPuppy()">🐶</div><div class="puppy" onclick="petPuppy()">🐕</div>`;
    }
}

function petPuppy() {
    puppyPets++;
    if(puppyPets >= 10) {
        status.innerText = "Cake Time!! 🎂";
        stage.innerHTML = `<div id="cake-obj" style="font-size:5rem; cursor:pointer;" onclick="cutCake()">🎂</div>`;
    }
}

function cutCake() {
    document.getElementById('cake-obj').innerText = "🍰";
    const btn = document.getElementById('next-btn');
    btn.classList.remove('hidden');
    btn.innerText = "See My Gifts 🎁";
    btn.onclick = showGifts;
}

function showGifts() {
    document.getElementById('status').innerText = "Your Surprises ❤️";
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('stage').innerHTML = `
        <div class="gift-item" onclick="openGift('Happy birthday! You are the absolute best.')">🎁 A Letter</div>
        <div class="gift-item" onclick="window.open('https://youtube.com/shorts/zQTIBAcK_mo')">🎁 Surprise A</div>
    `;
}

function openGift(text) {
    const overlay = document.getElementById('gift-overlay');
    document.getElementById('gift-display').innerText = text;
    overlay.classList.remove('hidden');
}

function closeGift() {
    document.getElementById('gift-overlay').classList.add('hidden');
}

