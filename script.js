let step = 0;
let starsFound = 0;
let puppyPets = 0;
let envelopeStage = 0;
let openedGifts = [];

/* ========================= UNLOCK ========================= */
function unlock() {
    if (document.getElementById('pw').value === "0623") {

        document.getElementById('step-0').classList.add('hidden');

        document.getElementById('celebration').classList.remove('hidden');

        document.getElementById('status').innerText =
            "Checking memories... 💭";

        setTimeout(() => {
            document.getElementById('status').innerText =
                "Access granted ✨ Welcome...";
            document.getElementById('next-btn').classList.remove('hidden');
        }, 1800);

    } else {
        alert("Wrong code! Try again ❤️");
    }
}

/* ========================= MUSIC ========================= */
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

    document.querySelectorAll('.music-opt').forEach(opt => {
        opt.classList.remove('selected-item');
    });

    el.classList.add('selected-item');

    document.getElementById('confirm-music').classList.remove('hidden');
}

/* ========================= DISC FIXED ========================= */
function confirmMusic() {

    document.getElementById('music-screen').classList.add('hidden');
    document.getElementById('confirm-music').classList.add('hidden');
    document.getElementById('music-menu').classList.add('hidden');

    const disc = document.getElementById('music-disc');

    // cinematic lift out effect
    document.body.appendChild(disc);
    disc.classList.add('floating-disc');

    setTimeout(() => {
        disc.style.transform = "scale(1.1) rotate(360deg)";
    }, 300);

    startSparkleQuest();
}

/* ========================= SPARKLES ========================= */
function startSparkleQuest() {

    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');

    status.innerText = "Catch 5 sparkles floating around ✨";

    document.getElementById('quest-tag').classList.remove('hidden');

    for (let i = 0; i < 5; i++) {

        const s = document.createElement('div');
        s.className = 'star';
        s.innerText = '✨';

        s.style.left = Math.random() * 75 + 10 + 'vw';
        s.style.top = Math.random() * 65 + 15 + 'vh';

        s.style.fontSize = (1.5 + Math.random()) + 'rem';

        s.onclick = function () {
            this.remove();
            starsFound++;

            document.getElementById('quest-tag').innerText =
                `Sparkles: ${starsFound}/5`;

            if (starsFound === 5) {
                btn.classList.remove('hidden');
                btn.innerText = "Invite the chaos 😁";
            }
        };

        document.body.appendChild(s);
    }
}

/* ========================= FLOW ========================= */
function next() {
    step++;

    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');
    const stage = document.getElementById('stage');

    if (step === 1) {

        document.body.classList.add('lights-on');
        document.getElementById('main-card').classList.add('cute-ui');

        status.innerText = "Something is changing... 🌸";
        btn.classList.add('hidden');

        setTimeout(() => {
            document.getElementById('music-screen').classList.remove('hidden');
        }, 1200);
    }

    else if (step === 2) {

        document.getElementById('quest-tag').classList.add('hidden');

        status.innerText = "The puppies are waiting for love 🐶💗";
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

/* ========================= PETTING ========================= */
function startPetting(e, el) {
    el.classList.add('active-pet');

    if (el.innerText === "🐶") el.innerText = "🤩";
    if (el.innerText === "🐕") el.innerText = "🥰";

    petPuppy(e);
}

function stopPetting(el) {
    el.classList.remove('active-pet');

    setTimeout(() => {
        if (el.innerText === "🤩") el.innerText = "🐶";
        if (el.innerText === "🥰") el.innerText = "🐕";
    }, 300);
}

function petPuppy(e) {

    puppyPets++;

    const meter = document.getElementById('pet-meter-fill');

    if (meter) {
        meter.style.width = Math.min((puppyPets / 10) * 100, 100) + "%";
    }

    // floating hearts
    for (let i = 0; i < 3; i++) {

        const heart = document.createElement('div');
        heart.className = 'heart-pop';
        heart.innerText = "💖";

        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';

        heart.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        heart.style.setProperty('--ty', (Math.random() - 1) * 200 + 'px');

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1200);
    }

    if (puppyPets >= 10) {

        setTimeout(() => {

            document.getElementById('status').innerText =
                "A surprise appears... 🎂✨";

            document.getElementById('stage').innerHTML = `
                <div class="cake-container" id="cake-obj">
                    <span id="flame" class="candle-flame hidden">🔥</span>
                    🎂
                </div>
            `;

            const btn = document.getElementById('next-btn');

            btn.classList.remove('hidden');
            btn.innerText = "Light Candle";

            btn.onclick = () => {
                document.getElementById('flame').classList.remove('hidden');

                document.getElementById('status').innerText =
                    "Make a wish... hold the magic ✨";

                btn.innerText = "HOLD TO WISH";

                document.getElementById('meter-container').classList.remove('hidden');

                startWish();
            };

        }, 700);
    }
}

/* ========================= WISH ========================= */
function startWish() {

    let progress = 0;
    let timer;

    const btn = document.getElementById('next-btn');

    btn.onpointerdown = () => {

        timer = setInterval(() => {

            progress += 2;

            document.getElementById('meter-fill').style.width =
                progress + "%";

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

    document.getElementById('status').innerText =
        "Wish received ✨ now cut the cake 🎂";

    document.getElementById('cake-obj').onclick = () => {

        document.getElementById('cake-obj').innerHTML = "🍰";

        const btn = document.getElementById('next-btn');

        btn.classList.remove('hidden');
        btn.innerText = "Open Gifts 🎁";

        btn.onclick = showGifts;
    };
}

/* ========================= GIFTS ========================= */
function showGifts() {

    openedGifts = [];

    document.getElementById('status').innerText =
        "Your memories are ready ❤️";

    document.getElementById('next-btn').classList.add('hidden');

    document.getElementById('stage').innerHTML = `
        <div class="polaroid">
            <img src="2344.jpg">
            <p>Forever ✨</p>
        </div>

        <div class="gift-item" onclick="openGift(1)">🎁 Letter</div>
        <div class="gift-item" onclick="openGift(2)">🎁 Surprise A</div>

        <div id="final-gift-slot"></div>
    `;
}

/* ========================= ENVELOPE ========================= */
function openGift(id) {

    const overlay = document.getElementById('gift-overlay');
    const display = document.getElementById('gift-display');

    if (id === 1) {

        display.innerHTML = `
            <div onclick="openEnvelopeStep()" style="font-size:6rem; cursor:pointer;">✉️</div>

            <div id="hidden-letter"
                style="opacity:0; transition:0.8s; background:white; padding:15px;">
                Happy Birthday ❤️<br><br>
                This is your little universe ✨
            </div>

            <p>Tap twice 💌</p>
        `;
    }

    else if (id === 2) {
        display.innerHTML = `
            <h3>Surprise A</h3>
            <button class="cute-btn"
            onclick="window.open('https://youtube.com','_blank')">
                Open ✨
            </button>
        `;
    }

    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('visible'), 10);
}

function openEnvelopeStep() {

    envelopeStage++;

    const letter = document.getElementById('hidden-letter');

    if (envelopeStage === 2) {
        letter.style.opacity = "1";
    }
}

/* ========================= CLOSE ========================= */
function closeGift() {
    document.getElementById('gift-overlay').classList.remove('visible');

    setTimeout(() => {
        document.getElementById('gift-overlay').classList.add('hidden');
    }, 500);
                   }
