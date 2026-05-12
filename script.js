let step = 0;
let starsFound = 0;
let puppyPets = 0;

function unlock() {
    if(document.getElementById('pw').value === "0623") {
        document.getElementById('step-0').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        alert("Wrong code! Try again ❤️");
    }
}

/* MUSIC FUNCTIONS */

function toggleMusicMenu() {
    const menu = document.getElementById('music-menu');
    menu.classList.toggle('hidden');
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

    document.querySelectorAll('.music-opt').forEach(opt =>
        opt.classList.remove('selected-item')
    );

    el.classList.add('selected-item');
    document.getElementById('confirm-music').classList.remove('hidden');
}

function confirmMusic() {
    document.getElementById('confirm-music').classList.add('hidden');

    const musicText = document.querySelector('#music-screen p');
    if (musicText) musicText.classList.add('hidden');

    document
        .getElementById('floating-music-container')
        .classList.add('floating-disc');

    document.getElementById('music-menu').classList.add('hidden');

    startSparkleQuest();
}
/* SPARKLE QUEST */

function startSparkleQuest() {
    const status = document.getElementById('status');
    const btn = document.getElementById('next-btn');

    status.innerText = "Catch 5 sparkles!!!!✨";
    document.getElementById('quest-tag').classList.remove('hidden');

    for(let i = 0; i < 5; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.innerText = '✨';
        s.style.left = Math.random() * 70 + 15 + 'vw';
        s.style.top = Math.random() * 60 + 20 + 'vh';

        s.onclick = function() {
            this.remove();
            starsFound++;
            document.getElementById('quest-tag').innerText = `Sparkles: ${starsFound}/5`;

            if(starsFound === 5) {
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

    if (step === 1) {
        document.body.classList.add('lights-on');
        document.getElementById('main-card').classList.add('cute-ui');
        status.innerText = "The room is glowing... 🌸";
        btn.classList.add('hidden');

        setTimeout(() => {
            document.getElementById('music-screen').classList.remove('hidden');
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

            <div class="puppy"
                onpointerdown="startPetting(event, this)"
                onpointerup="stopPetting(this)">🐶</div>

            <div class="puppy"
                onpointerdown="startPetting(event, this)"
                onpointerup="stopPetting(this)">🐕</div>
        `;
    }
}

/* PETTING */

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
    if (meter) meter.style.width = Math.min((puppyPets / 10) * 100, 100) + "%";

    for(let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-pop';
        heart.innerText = ['❤️','💖','💗','💓'][Math.floor(Math.random()*4)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';

        const tx = (Math.random() - 0.5) * 200 + 'px';
        const ty = (Math.random() - 1) * 200 + 'px';

        heart.style.setProperty('--tx', tx);
        heart.style.setProperty('--ty', ty);

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    if(puppyPets >= 10) {
        setTimeout(() => {
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
        }, 500);
    }
}

/* WISH */

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

/* GIFTS */

function showGifts() {
    document.getElementById('status').innerText = "Your Surprises ❤️";
    document.getElementById('next-btn').classList.add('hidden');

    document.getElementById('stage').innerHTML = `
        <div class="polaroid">
            <img src="2344.jpg" alt="Us">
            <p style="margin-top:5px; font-size:0.7rem; color:#888;">Forever</p>
        </div>

        <div class="gift-item" onclick="openGift(1)">🎁 Gift 1: A Letter</div>
        <div class="gift-item" onclick="openGift(2)">🎁 Gift 2: Surprise A</div>
        <div class="gift-item" onclick="openGift(3)">🎁 Gift 3: Surprise B</div>
    `;
}

function openGift(id) {
    const overlay = document.getElementById('gift-overlay');
    const display = document.getElementById('gift-display');

    if(id === 1) {
        display.innerHTML = `<h3>My Letter</h3><div class="letter-box">"Happy birthday! I made this just for you."</div>`;
    } else if(id === 2) {
        display.innerHTML = `<h3>Surprise A</h3>
        <button class="gift-link-btn"
        onclick="window.open('https://youtube.com/shorts/zQTIBAcK_mo?si=rj0GtJZGowUsFfrJ','_blank')">
        View Gift ✨</button>`;
    } else if(id === 3) {
        display.innerHTML = `<h3>Surprise B</h3>
        <button class="gift-link-btn"
        onclick="window.open('https://digibouquet.vercel.app/bouquet/eb3be969-0562-4a09-b4b9-917916dfd044','_blank')">
        View Gift 💖</button>`;
    }

    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('visible'), 10);
}

function closeGift() {
    document.getElementById('gift-overlay').classList.remove('visible');
    setTimeout(() => {
        document.getElementById('gift-overlay').classList.add('hidden');
    }, 500);
}
