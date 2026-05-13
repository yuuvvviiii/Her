console.log("script loaded");

let step = 0;
let starsFound = 0;
let puppyPets = 0;

let openedGift1 = false;
let openedGift2 = false;
let envelopeStep = 0;
let finalGiftUnlocked = false;

const songs = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3"];
let currentSongIndex = 0;

/* UNLOCK */
function unlock() {
    const code = document.getElementById("pw").value;

    if (code === "0623") {
        document.getElementById("step-0").classList.add("hidden");
        document.getElementById("celebration").classList.remove("hidden");
        document.getElementById("next-btn").classList.remove("hidden");

        const audio = document.getElementById("bg-music");
        audio.addEventListener("ended", playNextSong);
    } else {
        alert("Wrong code! Try again ❤️");
    }
}

/* MUSIC */
function toggleMusicMenu() {
    document.getElementById("music-menu").classList.toggle("hidden");
}

function playMusic() {
    document.getElementById("bg-music").play();
}

function pauseMusic() {
    document.getElementById("bg-music").pause();
}

function stopMusic() {
    const audio = document.getElementById("bg-music");
    audio.pause();
    audio.currentTime = 0;
}

function selectSong(el, name, url) {
    const audio = document.getElementById("bg-music");

    currentSongIndex = songs.indexOf(url);
    audio.src = url;
    audio.play();

    const allSongs = document.querySelectorAll(".music-opt");
    allSongs.forEach(function (opt) {
        opt.classList.remove("selected-item");
    });

    el.classList.add("selected-item");
    document.getElementById("confirm-music").classList.remove("hidden");
}

function playNextSong() {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    const audio = document.getElementById("bg-music");
    audio.src = songs[currentSongIndex];
    audio.play();

    const allSongs = document.querySelectorAll(".music-opt");
    allSongs.forEach(function (opt) {
        opt.classList.remove("selected-item");
    });

    if (allSongs[currentSongIndex]) {
        allSongs[currentSongIndex].classList.add("selected-item");
    }
}

function confirmMusic() {
    const musicContainer = document.getElementById("floating-music-container");
    const disc = document.getElementById("music-disc");

    document.body.appendChild(musicContainer);
    musicContainer.classList.add("floating-disc");

    disc.style.display = "block";
    disc.style.visibility = "visible";
    disc.style.opacity = "1";

    document.getElementById("music-screen").classList.add("hidden");
    document.getElementById("confirm-music").classList.add("hidden");
    document.getElementById("music-menu").classList.add("hidden");

    startSparkleQuest();
}

/* QUEST */
function startSparkleQuest() {
    const status = document.getElementById("status");
    const btn = document.getElementById("next-btn");

    status.innerText = "Catch 5 sparkles!!!!✨";
    document.getElementById("quest-tag").classList.remove("hidden");

    for (let i = 0; i < 5; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.innerText = "✨";
        star.style.left = Math.random() * 70 + 15 + "vw";
        star.style.top = Math.random() * 60 + 20 + "vh";

        star.onclick = function () {
            this.remove();
            starsFound++;

            document.getElementById("quest-tag").innerText =
                "Sparkles: " + starsFound + "/5";

            if (starsFound === 5) {
                btn.classList.remove("hidden");
                btn.innerText = "Kuch Cuties Ko Invite Kare??😁";
            }
        };

        document.body.appendChild(star);
    }
}

/* FLOW */
function next() {
    step++;

    const status = document.getElementById("status");
    const btn = document.getElementById("next-btn");
    const stage = document.getElementById("stage");

    if (step === 1) {
        document.body.classList.add("lights-on");
        document.getElementById("main-card").classList.add("cute-ui");

        status.innerText = "The room is glowing... 🌸";
        btn.classList.add("hidden");

        setTimeout(function () {
            document.getElementById("music-screen").classList.remove("hidden");
        }, 1500);
    }

    else if (step === 2) {
        document.getElementById("quest-tag").classList.add("hidden");
        status.innerText = "The puppies want love! ❤️";
        btn.classList.add("hidden");

        stage.innerHTML =
            '<div class="pet-meter-container"><div id="pet-meter-fill"></div></div>' +
            '<div class="puppy" onpointerdown="startPetting(event,this)" onpointerup="stopPetting(this)">🐶</div>' +
            '<div class="puppy" onpointerdown="startPetting(event,this)" onpointerup="stopPetting(this)">🐕</div>';
    }
}

/* PETTING */
function startPetting(e, el) {
    puppyPets++;

    const meter = document.getElementById("pet-meter-fill");
    if (meter) {
        meter.style.width = Math.min((puppyPets / 10) * 100, 100) + "%";
    }

    if (puppyPets >= 10) {
        document.getElementById("status").innerText = "Ye Lo Aapke Liye Cake!!🎂";

        document.getElementById("stage").innerHTML =
            '<div class="cake-container" id="cake-obj">🎂</div>';

        const btn = document.getElementById("next-btn");
        btn.classList.remove("hidden");
        btn.innerText = "See My Gifts 🎁";
        btn.onclick = showGifts;
    }
}

function stopPetting() {}

/* GIFTS */
function showGifts() {
    document.getElementById("status").innerText = "Your Surprises ❤️";
    document.getElementById("next-btn").classList.add("hidden");

    document.getElementById("stage").innerHTML =
        '<div class="polaroid">' +
        '<img src="2344.jpg" alt="Us">' +
        '<p style="margin-top:5px;font-size:0.7rem;color:#888;">Forever</p>' +
        '</div>' +
        '<div class="gift-item" onclick="openGift(1)">🎁 Gift 1: A Letter</div>' +
        '<div class="gift-item" onclick="openGift(2)">🎁 Gift 2: Surprise A</div>' +
        '<div id="countdown-area"></div>';
}

function openGift(id) {
    const overlay = document.getElementById("gift-overlay");
    const display = document.getElementById("gift-display");

    if (id === 1) {
        openedGift1 = true;
        envelopeStep = 0;

        display.innerHTML =
            '<h3>My Letter 💌</h3>' +
            '<div id="envelope" onclick="handleEnvelopeTap()">' +
            '<div id="envelope-flap">✉️</div>' +
            '<div id="letter-paper" class="hidden">Happy birthday! I made this just for you ❤️</div>' +
            '</div>';
    }

    else if (id === 2) {
        openedGift2 = true;

        display.innerHTML =
            '<h3>Surprise A</h3>' +
            '<button class="cute-btn" onclick="window.open(\'https://youtube.com\',\'_blank\')">View Gift ✨</button>';
    }

    else if (id === 3) {
        display.innerHTML =
            '<h3>Final Gift 💖</h3>' +
            '<button class="cute-btn" onclick="window.open(\'https://digibouquet.vercel.app\',\'_blank\')">Open Gift 🎁</button>';
    }

    overlay.classList.remove("hidden");
    setTimeout(function () {
        overlay.classList.add("visible");
    }, 10);
}

function handleEnvelopeTap() {
    envelopeStep++;

    if (envelopeStep === 1) {
        document.getElementById("envelope-flap").innerText = "📩";
    }

    if (envelopeStep === 2) {
        document.getElementById("letter-paper").classList.remove("hidden");
    }
}

function closeGift() {
    document.getElementById("gift-overlay").classList.remove("visible");

    setTimeout(function () {
        document.getElementById("gift-overlay").classList.add("hidden");

        if (openedGift1 && openedGift2 && !finalGiftUnlocked) {
            document.getElementById("countdown-area").innerHTML =
                '<button class="cute-btn" onclick="unlockFinalGift()">One Final Thing 💖</button>';
        }
    }, 500);
}

function unlockFinalGift() {
    finalGiftUnlocked = true;

    let countdown = 5;
    const area = document.getElementById("countdown-area");
    area.innerText = "Opening in 5... ⏳";

    const timer = setInterval(function () {
        countdown--;
        area.innerText = "Opening in " + countdown + "... ⏳";

        if (countdown <= 0) {
            clearInterval(timer);

            area.innerHTML =
                '<div class="gift-item" onclick="openGift(3)">🎁 Final Gift</div>';
        }
    }, 1000);
}
