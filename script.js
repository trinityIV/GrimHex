// Animation de toile d'araignée en arrière-plan
class SpiderWebAnimation {
    constructor() {
        this.canvas = document.getElementById('spider-web-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mousePosition = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createNodes();
        this.setupEventListeners();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createNodes() {
        const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        this.nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            // Mouvement des nœuds
            node.x += node.vx;
            node.y += node.vy;
            
            // Rebond sur les bords
            if (node.x < 0 || node.x > this.canvas.width) {
                node.vx *= -1;
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.vy *= -1;
            }
            
            // Garder les nœuds dans les limites
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            
            // Effet d'attraction vers la souris
            const dx = this.mousePosition.x - node.x;
            const dy = this.mousePosition.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                node.vx += dx * force * 0.0001;
                node.vy += dy * force * 0.0001;
            }
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(78, 205, 196, ${node.opacity})`;
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        const maxDistance = 120;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (maxDistance - distance) / maxDistance;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.strokeStyle = `rgba(78, 205, 196, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawMouseConnections() {
        const maxDistance = 150;
        
        this.nodes.forEach(node => {
            const dx = this.mousePosition.x - node.x;
            const dy = this.mousePosition.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (maxDistance - distance) / maxDistance;
                this.ctx.beginPath();
                this.ctx.moveTo(node.x, node.y);
                this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
                this.ctx.strokeStyle = `rgba(255, 107, 107, ${opacity * 0.6})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateNodes();
        this.drawConnections();
        this.drawNodes();
        this.drawMouseConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createNodes();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
        
        // Effet de pulsation lors de la lecture de musique
        if (audio) {
            audio.addEventListener('play', () => {
                this.addMusicVisualization();
            });
            
            audio.addEventListener('pause', () => {
                this.removeMusicVisualization();
            });
        }
    }
    
    addMusicVisualization() {
        // Augmenter l'activité des nœuds pendant la lecture
        this.nodes.forEach(node => {
            node.vx *= 1.5;
            node.vy *= 1.5;
            node.opacity = Math.min(1, node.opacity * 1.3);
        });
    }
    
    removeMusicVisualization() {
        // Réduire l'activité des nœuds
        this.nodes.forEach(node => {
            node.vx *= 0.7;
            node.vy *= 0.7;
            node.opacity = Math.max(0.3, node.opacity * 0.8);
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialiser l'animation de toile d'araignée
let spiderWebAnimation;

// Configuration des pistes audio
const tracks = [
    {
        title: "Dans ton Drake",
        artist: "TRASHGANG",
        src: "musique/Dans ton Drake.mp3",
        duration: "3:45"
    },
    {
        title: "Dirty Trsh (Remastered)",
        artist: "TRASHGANG", 
        src: "musique/Dirty Trsh (Remastered).mp3",
        duration: "4:12"
    },
    {
        title: "le Carrack Organisé (Trinity - Requiem and the corps)",
        artist: "TRASHGANG",
        src: "musique/le Carrack Organisé (Trinity - Requiem and the corps).mp3",
        duration: "5:23"
    },
    {
        title: "le Carrack Organisé",
        artist: "TRASHGANG",
        src: "musique/le Carrack Organisé.mp3",
        duration: "4:01"
    },
    {
        title: "TRASHGANG – LES CHASSEURS DE TANA",
        artist: "TRASHGANG",
        src: "musique/TRASHGANG – LES CHASSEURS DE TANA.mp3",
        duration: "3:55"
    },
    {
        title: "trshgang – Bienvenue dans la piraterie",
        artist: "TRASHGANG",
        src: "musique/trshgang – Bienvenue dans la piraterie.mp3",
        duration: "4:18"
    },
    {
        title: "trshgang –Viens pull up sur mon Javelin",
        artist: "TRASHGANG",
        src: "musique/trshgang –Viens pull up sur mon Javelin.mp3",
        duration: "3:37"
    }
];

// Variables globales
let currentTrackIndex = 0;
let isPlaying = false;
let audio = document.getElementById('audio-player');

// Éléments DOM
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const volumeSlider = document.getElementById('volume-slider');
const currentTrackTitle = document.getElementById('current-track-title');
const currentTrackArtist = document.getElementById('current-track-artist');
const trackList = document.getElementById('track-list');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'animation de toile d'araignée
    spiderWebAnimation = new SpiderWebAnimation();
    
    createPlaylist();
    loadTrack(0);
    setupEventListeners();
    
    // Définir le volume initial
    audio.volume = volumeSlider.value / 100;
});

// Créer la playlist
function createPlaylist() {
    tracks.forEach((track, index) => {
        const trackItem = document.createElement('div');
        trackItem.className = 'track-item';
        trackItem.innerHTML = `
            <div class="track-number">${String(index + 1).padStart(2, '0')}</div>
            <div class="track-info">
                <div class="track-title">${track.title}</div>
                <div class="track-duration">${track.duration}</div>
            </div>
            <div class="play-icon">
                <i class="fas fa-play"></i>
            </div>
        `;
        
        trackItem.addEventListener('click', () => {
            playTrack(index);
        });
        
        trackList.appendChild(trackItem);
    });
}

// Charger une piste
function loadTrack(index) {
    if (index >= 0 && index < tracks.length) {
        currentTrackIndex = index;
        const track = tracks[index];
        
        audio.src = track.src;
        currentTrackTitle.textContent = track.title;
        currentTrackArtist.textContent = track.artist;
        
        // Mettre à jour la playlist visuelle
        updatePlaylistDisplay();
        
        // Réinitialiser la barre de progression
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    }
}

// Jouer une piste
function playTrack(index) {
    if (index !== currentTrackIndex) {
        loadTrack(index);
    }
    togglePlayPause();
}

// Toggle play/pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.error('Erreur lors de la lecture:', error);
            alert('Impossible de lire ce fichier audio. Vérifiez que le fichier existe et est accessible.');
        });
    }
}

// Piste précédente
function previousTrack() {
    const newIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
    playTrack(newIndex);
}

// Piste suivante
function nextTrack() {
    const newIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
    playTrack(newIndex);
}

// Mettre à jour l'affichage de la playlist
function updatePlaylistDisplay() {
    const trackItems = document.querySelectorAll('.track-item');
    trackItems.forEach((item, index) => {
        if (index === currentTrackIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Formater le temps
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

// Configuration des événements
function setupEventListeners() {
    // Contrôles du lecteur
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', previousTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    // Contrôle du volume
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });
    
    // Barre de progression cliquable
    document.querySelector('.progress-bar').addEventListener('click', (e) => {
        const progressContainer = e.currentTarget;
        const clickX = e.offsetX;
        const width = progressContainer.offsetWidth;
        const percentage = clickX / width;
        
        if (audio.duration) {
            audio.currentTime = percentage * audio.duration;
        }
    });
    
    // Événements audio
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percentage + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    });
    
    audio.addEventListener('ended', () => {
        // Passer à la piste suivante automatiquement
        nextTrack();
    });
    
    audio.addEventListener('error', (e) => {
        console.error('Erreur audio:', e);
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // Contrôles clavier
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousTrack();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextTrack();
                break;
            case 'ArrowUp':
                e.preventDefault();
                volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
                audio.volume = volumeSlider.value / 100;
                break;
            case 'ArrowDown':
                e.preventDefault();
                volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
                audio.volume = volumeSlider.value / 100;
                break;
        }
    });
}

// Fonction utilitaire pour vérifier si un fichier existe
function checkFileExists(url) {
    const http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    try {
        http.send();
        return http.status !== 404;
    } catch (error) {
        return false;
    }
}

// Animation de la pochette pendant la lecture
function animateAlbumCover() {
    const albumCover = document.getElementById('album-cover');
    const trackImage = document.getElementById('current-track-image');
    const musicPlayer = document.querySelector('.music-player');
    
    if (isPlaying) {
        albumCover.style.animation = 'pulse 2s infinite';
        trackImage.style.animation = 'pulse 2s infinite';
        musicPlayer.classList.add('playing');
        
        // Intensifier l'animation de la toile d'araignée
        if (spiderWebAnimation) {
            spiderWebAnimation.addMusicVisualization();
        }
    } else {
        albumCover.style.animation = 'none';
        trackImage.style.animation = 'none';
        musicPlayer.classList.remove('playing');
        
        // Réduire l'animation de la toile d'araignée
        if (spiderWebAnimation) {
            spiderWebAnimation.removeMusicVisualization();
        }
    }
}

// Mettre à jour l'animation lors des changements d'état
audio.addEventListener('play', animateAlbumCover);
audio.addEventListener('pause', animateAlbumCover);

// Gestion des raccourcis media (si supportés par le navigateur)
if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
        if (!isPlaying) togglePlayPause();
    });
    
    navigator.mediaSession.setActionHandler('pause', () => {
        if (isPlaying) togglePlayPause();
    });
    
    navigator.mediaSession.setActionHandler('previoustrack', previousTrack);
    navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    
    // Mettre à jour les métadonnées media session
    function updateMediaSession() {
        const track = tracks[currentTrackIndex];
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: 'GrimHex',
            artwork: [
                { src: '../img/cover.png', sizes: '200x200', type: 'image/png' }
            ]
        });
    }
    
    // Appeler lors du changement de piste
    audio.addEventListener('loadstart', updateMediaSession);
}
