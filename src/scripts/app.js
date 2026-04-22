// --- DANE I ZMIENNE GLOBALNE ---
const rawData = document.getElementById('gallery-data').textContent;
const allPlantsData = JSON.parse(rawData);

const lightbox = document.getElementById('custom-lightbox');
const clImage = document.querySelector('#cl-image');
const clSidebar = document.getElementById('cl-sidebar');
let currentIndex = -1;

// --- 1. LOGIKA ZEGARA DOBOWEGO ---
function applyTimeTheme() {
    const hour = new Date().getHours();
    document.body.classList.remove('theme-morning', 'theme-golden', 'theme-night');
    if (hour >= 5 && hour < 9) document.body.classList.add('theme-morning');
    else if (hour >= 17 && hour < 20) document.body.classList.add('theme-golden');
    else if (hour >= 20 || hour < 5) document.body.classList.add('theme-night');
}

// --- 2. GENEROWANIE TREŚCI SIDEBARA ---
function generateSidebarHTML(plant) {
    let relatedHTML = '';
    if (plant.relatedData && plant.relatedData.length > 0) {
        relatedHTML = `
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px dashed #444;">
          <p style="font-size: 0.75rem; text-transform: uppercase; color: #888; margin-bottom: 0.8rem;">Inne z rodziny ${plant.family}:</p>
          <div style="display: flex; flex-direction: column; gap: 0.8rem;">
            ${plant.relatedData.map(rel => `
              <button onclick="window.openPlant(${rel.index})" style="background:transparent; border:none; padding:0; text-align:left; color:#4ade80; font-size:0.9rem; display:flex; align-items:center; gap:12px; cursor:pointer; width:100%;">
                <img src="${rel.thumb}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px;">
                <span>${rel.title}</span>
              </button>
            `).join('')}
          </div>
        </div>`;
    }

    return `
    <h2 style="margin: 0 0 0.2rem 0; font-size: 1.6rem; color: #ffffff;">${plant.caption}</h2>
    <em style="color: #888; font-size: 1rem; display: block; margin-bottom: 1.5rem;">${plant.latina}</em>
    <div style="font-size: 0.9rem; line-height: 1.4;">
        <p style="margin: 0.4rem 0;"><strong style="color: #aaa; text-transform: uppercase; font-size: 0.75rem;">Rodzina:</strong> ${plant.family}</p>
        <p style="margin: 0.4rem 0;"><strong style="color: #aaa; text-transform: uppercase; font-size: 0.75rem;">Kwitnienie:</strong> ${plant.flowering}</p>
        <p style="margin: 0.4rem 0;"><strong style="color: #aaa; text-transform: uppercase; font-size: 0.75rem;">Siedlisko:</strong> ${plant.habitat}</p>
    </div>
    <hr style="border: 0; border-top: 1px solid #333; margin: 1.5rem 0;">
    <p style="line-height: 1.6; color: #ddd; font-style: italic;">${plant.description}</p>
    ${relatedHTML}`;
}

// --- 3. OBSŁUGA LIGHTBOXA (FUNKCJE GLOBALNE) ---
window.openPlant = (index) => {
    currentIndex = index;
    const plant = allPlantsData[index];
    if (!plant) return;

    clImage.classList.add('loading');
    // Ustawiamy źródło zdjęcia (upewnij się, że w galleryData masz pole 'src')
    clImage.src = plant.src; 
    clSidebar.innerHTML = generateSidebarHTML(plant);
    
    lightbox.classList.remove('hidden');
    document.body.classList.add('lightbox-open');

    clImage.onload = () => clImage.classList.remove('loading');
};

window.closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.classList.remove('lightbox-open');
    setTimeout(() => { clImage.src = ''; }, 300);
};

window.nextPlant = (e) => {
    if (e) e.stopPropagation();
    let next = currentIndex + 1;
    if (next >= allPlantsData.length) next = 0;
    window.openPlant(next);
};

window.prevPlant = (e) => {
    if (e) e.stopPropagation();
    let prev = currentIndex - 1;
    if (prev < 0) prev = allPlantsData.length - 1;
    window.openPlant(prev);
};

// --- 4. AUDIO, WIATR I BŁYSK ---
function initInteractions() {
    // Błysk (Glossy Print)
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            item.style.setProperty('--mouse-x', `${x}%`);
            item.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Audio
    const audioBtn = document.getElementById('audio-toggle-btn');
    const audio = document.getElementById('forest-audio');
    if (audioBtn && audio) {
        audio.volume = 0.4;
        audioBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                audioBtn.classList.add('is-playing');
                audioBtn.querySelector('.icon-muted').classList.add('hidden');
                audioBtn.querySelector('.icon-playing').classList.remove('hidden');
            } else {
                audio.pause();
                audioBtn.classList.remove('is-playing');
                audioBtn.querySelector('.icon-muted').classList.remove('hidden');
                audioBtn.querySelector('.icon-playing').classList.add('hidden');
            }
        });
    }
}

// --- 5. INICJALIZACJA ---
document.addEventListener('DOMContentLoaded', () => {
    applyTimeTheme();
    initInteractions();
    setInterval(applyTimeTheme, 60000);

    // Obsługa klawiatury dla Lightboxa
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === "Escape") window.closeLightbox();
            if (e.key === "ArrowRight") window.nextPlant();
            if (e.key === "ArrowLeft") window.prevPlant();
        }
    });
});