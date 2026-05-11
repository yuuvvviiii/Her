let step = 0;
let starsFound = 0;
let puppyPets = 0;
const player = new Audio();

function unlock() {
    if(document.getElementById('pw').value === "0623") {
        document.getElementById('step-0').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        alert("Wrong code! ❤️");
    }
}

function playSong(file, name) {
    player.src = file;
    player.volume = 0.5;
    player.loop = true;
    player.play();
    document.getElementById('status').innerText = `Vibe: ${name} 🎵`;
    document.getElementById('confirm-btn').classList.remove('hidden');
}

function confirmMusic() {
    document.getElementById('stage').innerHTML = '';
    document.getElementById('status').innerText = "Now, catch 5 sparkles! ✨";
    startSparkles();
}

function next() {
    step++;
    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');
    const stage = document.getElementById('stage');

    if (step === 1) {
        document.body.classList.add('lights-on');
        document.getElementById('main-card').classList.add('cute-ui');
        btn.classList.add('hidden');
        stage.innerHTML = `
            <div id="music-menu">
                <p>Pick a song, then confirm! 🎵</p>
                <button class="cute-btn small" onclick="playSong('song1.mp3', 'Sweet')">Song 1</button>
                <button class="cute-btn small" onclick="playSong('song2.mp3', 'Romantic')">Song 2</button>
                <button class="cute-btn small" onclick="playSong('song3.mp3', 'Our Fav')">Song 3</button>
                <br><br>
                <button id="confirm-btn" class="cute-btn hidden" style="background:#4caf50" onclick="confirmMusic()">Confirm ✅</button>
            </div>`;
    } else if (step === 2) {
        document.getElementById('quest-tag').classList.add('hidden');
        status.innerText = "Pet the puppies! ❤️";
        btn.classList.add('hidden');
        stage.innerHTML = `
            <div id="meter-container"><div id="meter-fill"></div></div>
            <div style="font-size:3rem" onpointerdown="pet()">🐶</div>
            <div style="font-size:3rem" onpointerdown="pet()">🐕</div>`;
    }
}

function startSparkles() {
    for(let i=0; i<5; i++) {
        let s = document.createElement('div');
        s.className = 'star'; s.innerText = '✨';
        s.style.left = Math.random()*80+10 + 'vw'; s.style.top = Math.random()*70+15 + 'vh';
        s.onclick = () => {
            s.remove(); starsFound++;
            document.getElementById('quest-tag').classList.remove('hidden');
            document.getElementById('quest-tag').innerText = `Sparkles: ${starsFound}/5`;
            if(starsFound === 5) {
                const btn = document.getElementById('next-btn');
                btn.classList.remove('hidden');
                btn.innerText = "Call Puppies! 🐶";
            }
        };
        document.body.appendChild(s);
    }
}

function pet() {
    puppyPets++;
    document.getElementById('meter-fill').style.width = (puppyPets*10) + "%";
    if(puppyPets >= 10) {
        document.getElementById('status').innerText = "Make a wish! 🎂";
        document.getElementById('stage').innerHTML = `<div style="font-size:4rem"><span id="flame" class="hidden">🔥</span>🎂</div>`;
        const btn = document.getElementById('next-btn');
        btn.classList.remove('hidden'); btn.innerText = "Light Candle";
        btn.onclick = () => {
            document.getElementById('flame').classList.remove('hidden');
            btn.innerText = "HOLD TO WISH ✨";
            btn.onclick = null;
            document.getElementById('meter-container').classList.remove('hidden');
            handleWish();
        };
    }
}

function handleWish() {
    let progress = 0; let timer;
    const btn = document.getElementById('next-btn');
    const fill = document.getElementById('meter-fill');
    fill.style.width = "0%";

    btn.onpointerdown = () => {
        timer = setInterval(() => {
            progress += 2;
            fill.style.width = progress + "%";
            if(progress >= 100) {
                clearInterval(timer); btn.classList.add('hidden');
                document.getElementById('status').innerText = "Slice the cake! 🍰";
                document.getElementById('stage').onclick = showGifts;
            }
        }, 50);
    };
    btn.onpointerup = () => clearInterval(timer);
}

function showGifts() {
    document.getElementById('status').innerText = "Your Surprises ❤️";
    document.getElementById('stage').innerHTML = `
        <div class="cute-btn small" onclick="openGift('Happy Birthday!')">🎁 Letter</div>
        <div class="cute-btn small" onclick="window.open('URL_HERE')">🎁 Surprise A</div>`;
}

function openGift(text) {
    document.getElementById('gift-display').innerText = text;
    document.getElementById('gift-overlay').classList.remove('hidden');
}

function closeGift() { document.getElementById('gift-overlay').classList.add('hidden'); }

