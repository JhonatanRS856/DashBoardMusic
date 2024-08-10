var swiper = new Swiper(".slider-container", {
    slidesPerView: 1,
    spaceBetween: 0,
    centerSlide: true,
    fade: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
});

//Funcionalidades de la navegacion

const abrirNav = document.getElementById('btnAbrir');
const closeBtn = document.getElementById('closeIcon');
const nav = document.getElementById('navContainer');
const botones = nav.querySelectorAll('button');

abrirNav.addEventListener('click', () => {
    nav.classList.add('visible');

    window.addEventListener('scroll',() => {
        if (window.scrollY > 30) {
            nav.classList.remove('h-[100vh]');
            nav.classList.add('bottom-0');
        } else {
            nav.classList.add('h-[100vh]');
            nav.classList.remove('bottom-0');
        }
    });
});

closeBtn.addEventListener('click', () => {

    nav.classList.remove('visible');
});

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        botones.forEach(b => b.classList.remove('active'));
        boton.classList.add('active');
        setTimeout(() => {
            boton.classList.remove('active');
        }, 1500);
    });
});

//
const audio = document.getElementById('audioPlayer');
const contenedorSongs = document.getElementById('containerSongs');
let songLinks = document.querySelectorAll('.song-link');
const currentTimeElement = document.getElementById('currentTime');
const imgSong = document.getElementById('imgSong');
const divGirar = document.getElementById('divGirar');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const progressThumb = document.getElementById('progressThumb');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const repeatIcon = document.getElementById('repeatIcon');

const randomButton = document.getElementById('randomBtn');
const repeatButton = document.getElementById('repeatButton');

let isDragging = false;
let currentSongIndex = 0;
let isRandom = false;
let isRepeating = false;

const songs = [
    {
        src: '../music/monsters.mp3',
        title: 'Monsters',
        artist: 'NOA',
        duration: '04:11',
        bannerImg: '../img/monsters.jpg'
    },
    {
        src: '../music/getyourWish.mp3',
        title: 'Get Your Wish',
        artist: 'Porter Robinson',
        duration: '03:37',
        bannerImg: '../img/GetYourWish.jpg'
    },
    {
        src: '../music/SomeKind.mp3',
        title: 'Some Kind of Magic',
        artist: 'LVTHER',
        duration: '03:15',
        bannerImg: '../img/somekind.jpg'
    },
    {
        src: '../music/psycho.mp3',
        title: 'Psycho',
        artist: 'Red Velvet',
        duration: '03:30',
        bannerImg: '../img/psycho.jpg'
    },
    {
        src: '../music/makememove.mp3',
        title: 'Make Me Move',
        artist: 'Culture Code',
        duration: '03:16',
        bannerImg: '../img/makememove.jpg'
    },
    {
        src: '../music/superhero.mp3',
        title: 'Superhero',
        artist: 'Unknown Brain',
        duration: '03:02',
        bannerImg: '../img/superhero.jpg'
    },
    {
        src: '../music/sweater.mp3',
        title: 'Sweater Weather',
        artist: 'The Neighbourhood',
        duration: '03:50',
        bannerImg: '../img/sw-song.jpg'
    },
    {
        src: '../music/SayGoodbye.mp3',
        title: 'Say Goodbye',
        artist: 'Unknown Brain',
        duration: '03:50',
        bannerImg: '../img/saygoodbye.jpg'
    },
    {
        src: '../music/lifesux.mp3',
        title: 'Life Sux (Sped Up Ver.)',
        artist: 'Leah Kate',
        duration: '02:36',
        bannerImg: '../img/lifesux.jpg'
    },
    {
        src: '../music/running.mp3',
        title: 'Running With The Wild Things',
        artist: 'Against The Current',
        duration: '01:16',
        bannerImg: '../img/running.jpg'
    },
    {
        src: '../music/masfuerte.mp3',
        title: 'Mas Fuerte',
        artist: 'Greeicy',
        duration: '03:18',
        bannerImg: '../img/FuerteBG.jpg'
    },
    {
        src: '../music/suck.mp3',
        title: 'You Suck At Love',
        artist: 'Simple Plan',
        duration: '01:20',
        bannerImg: '../img/suck.png'
    },
    {
        src: '../music/dadada.mp3',
        title: 'Talking Body',
        artist: 'Love To',
        duration: '02:50',
        bannerImg: '../img/bodies.png'
    },
    {
        src: '../music/redlips.mp3',
        title: 'Red Lips (Mendus Remix)',
        artist: 'GTA feat. Sam Bruno',
        duration: '03:25',
        bannerImg: '../img/redlips.png'
    },
    {
        src: '../music/bringme.mp3',
        title: 'Bring Me To Life',
        artist: 'Evanescence',
        duration: '03:55',
        bannerImg: '../img/bringme.png'
    },
    {
        src: '../music/goldenlove.mp3',
        title: 'Golden Love (Mr. Frenkie Remix)',
        artist: 'Guru Groove Foundation',
        duration: '04:59',
        bannerImg: '../img/goldenlove.jpg'
    }
];

function cargarSongs() {
    contenedorSongs.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.classList.add('song-link');
        a.classList.add('select-none');
        a.classList.add('cursor-pointer');
        a.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="songs-img-c">
                    <img src="${song.bannerImg}" alt="${song.title}" class="img-cover transition-img">
                </div>
                <div>
                    <h2 class="font-medium text-white">${song.title}</h2>
                    <span class="text-text-color">${song.artist}</span>
                </div>
            </div>
            <div>
                <span class="font-medium text-white">${song.duration}</span>
            </div>
        `;

        // Asignar el evento de clic al enlace
        a.addEventListener('click', (event) => {
            event.preventDefault();
            currentSongIndex = index;
            changeSong(song.src, a);
        });

        li.appendChild(a);
        contenedorSongs.appendChild(li);
    });

    // Actualizar la referencia a los enlaces después de cargarlos
    songLinks = document.querySelectorAll('.song-link');
}

cargarSongs();

function updateInfo(songs) {
    document.querySelectorAll('.name-song').forEach(element => {
        element.innerText = songs.title;
    });
    document.querySelectorAll('.artist-name').forEach(element => {
        element.innerText = songs.artist;
    });

    document.querySelectorAll('.duracionTotal').forEach(element => {
        element.innerText = songs.duration;
    });

    imgSong.src = songs.bannerImg;
}




function changeSong(songPath, songElement) {
   
    const song = songs.find(s => s.src === songPath);
    if (song) {
        audio.src = song.src;
        audio.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        repeatIcon.classList.add('hidden');
        updateInfo(song);
        

        songLinks.forEach(link => link.classList.remove('active'));
        if (songElement) {
            songElement.classList.add('active');
            divGirar.classList.add('active');
        }
    }
}

// Función para manejar la repetición de la canción
repeatButton.addEventListener('click', () => {
    isRepeating = !isRepeating;

    if (isRepeating) {
        repeatButton.classList.add('active');
        repeatButton.classList.add('shufle-btn');
        audio.loop = true;
        if (isRandom) {
            isRandom = false;
            randomButton.classList.remove('active');
            randomButton.classList.remove('shufle-btn');
        }
    } else {
        repeatButton.classList.remove('active');
        audio.loop = false;
        repeatButton.classList.remove('shufle-btn');
    }
});


// Función para manejar la reproducción aleatoria de la canción
randomButton.addEventListener('click', () => {
    isRandom = !isRandom;

    if (isRandom) {
        randomButton.classList.add('active');
        randomButton.classList.add('shufle-btn');
        if (isRepeating) {
            isRepeating = false;
            randomButton.classList.remove('active');
            repeatButton.classList.remove('shufle-btn');
            audio.loop = false;
        }
    } else {
        randomButton.classList.remove('active');
        randomButton.classList.remove('shufle-btn');
    }
});






// Evento para reproducir la siguiente canción en modo aleatorio
audio.addEventListener('ended', () => {
    if (!isRepeating && isRandom) {
        playRandomSong();
    }
});

// Función para reproducir una canción aleatoria
function playRandomSong() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    currentSongIndex = randomIndex;
    changeSong(songs[randomIndex].src, songLinks[currentSongIndex]);
}







function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[currentSongIndex];
    changeSong(prevSong.src, songLinks[currentSongIndex]);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[currentSongIndex];
    changeSong(nextSong.src, songLinks[currentSongIndex]);
}

audio.addEventListener('timeupdate', () => {
    currentTimeElement.innerText = formatTime(audio.currentTime);
});


audio.addEventListener('ended', () => {
    playIcon.classList.add('hidden');
    pauseIcon.classList.add('hidden');
    divGirar.classList.remove('active');

    if (!audio.paused) {
        repeatIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
   
        
    } else {
        repeatIcon.classList.remove('hidden');
    }
    
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const paddedSeconds = secs < 10 ? '0' + secs : secs;
    return `${paddedMinutes}:${paddedSeconds}`;
}

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setAudioProgress);
 progressThumb.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
 document.addEventListener('mousemove', (e) => {
     if (isDragging) {
        setAudioProgressByDrag(e);
    }
 });


function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        repeatIcon.classList.add('hidden');
        divGirar.classList.add('active');
    } else {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        repeatIcon.classList.add('hidden');
        divGirar.classList.remove('active');
    }
}

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    const thumbOffset = 5;
    progressBar.style.width = `${progressPercent}%`;
    progressThumb.style.left = `calc(${progressPercent}% - ${10 - thumbOffset}px)`; // Center the thumb
}

function setAudioProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
    updateProgress(); 
}

function setAudioProgressByDrag(e) {
    const width = progressContainer.clientWidth;
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    if (offsetX >= 0 && offsetX <= width) {
        const duration = audio.duration;
        audio.currentTime = (offsetX / width) * duration;
        updateProgress();
    }
}

// Event listeners for drag functionality
progressThumb.addEventListener('mousedown', () => {
    isDragging = true;
});


document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        audio.play(); // Resume playback after dragging ends
    }
});