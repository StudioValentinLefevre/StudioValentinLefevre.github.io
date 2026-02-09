document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeIcons = document.querySelectorAll('.mode-icon');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');
    const scrollContainer = document.getElementById('main-scroll');

    // --- 1. HP AUTO-HINT SCROLL (Desktop only) ---
    if (scrollContainer && window.innerWidth > 768) {
        setTimeout(() => {
            scrollContainer.scrollTo({ left: 60, behavior: 'smooth' });
            setTimeout(() => {
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            }, 600);
        }, 1000);
    }

    // --- 2. HP Filtering Logic ---
    let currentMode = 'traditional';
    let currentSub = 'all';

    function updateHP() {
        projects.forEach(p => {
            const categories = p.getAttribute('data-category').split(' ');
            const isMode = categories.includes(currentMode);
            const isSub = currentSub === 'all' || p.getAttribute('data-sub') === currentSub;
            p.classList.toggle('hidden', !(isMode && isSub));
        });
        if (scrollContainer) scrollContainer.scrollLeft = 0;
    }

    modeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            currentMode = icon.getAttribute('data-mode');
            body.className = (currentMode === 'ai') ? 'mode-ai' : 'mode-traditional';
            modeIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
            updateHP();
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentSub = btn.getAttribute('data-sub');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateHP();
        });
    });

    // --- 3. Overlay Controls ---
    const aboutOverlay = document.getElementById('about-overlay');
    const infoOverlay = document.getElementById('info-overlay');

    document.getElementById('open-about')?.addEventListener('click', () => aboutOverlay.classList.add('active'));
    document.getElementById('close-about')?.addEventListener('click', () => aboutOverlay.classList.remove('active'));
    document.getElementById('open-info')?.addEventListener('click', () => infoOverlay.classList.add('active'));
    document.getElementById('close-info')?.addEventListener('click', () => infoOverlay.classList.remove('active'));

    // --- 4. Carousel Logic (Project Pages) ---
    const items = document.querySelectorAll('.carousel-item');
    if (items.length > 0) {
        let currentIdx = 0;
        
        const updateCarousel = (index) => {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
                const vids = item.querySelectorAll('video');
                if (i === index) {
                    vids.forEach(v => v.play());
                } else {
                    vids.forEach(v => { v.pause(); v.currentTime = 0; });
                }
            });
        };
        
        const nextSlide = () => {
            currentIdx = (currentIdx + 1) % items.length;
            updateCarousel(currentIdx);
        };

        const prevSlide = () => {
            currentIdx = (currentIdx - 1 + items.length) % items.length;
            updateCarousel(currentIdx);
        };

        document.getElementById('next')?.addEventListener('click', nextSlide);
        document.getElementById('prev')?.addEventListener('click', prevSlide);

        // Keyboard Navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
    }

    // --- 5. Mouse Wheel Scroll ---
    window.addEventListener('wheel', (e) => {
        if (scrollContainer && (!aboutOverlay || !aboutOverlay.classList.contains('active'))) {
            scrollContainer.scrollLeft += e.deltaY;
        }
    }, { passive: true });

    // --- 6. Global Sound Logic ---
    let globalMuted = true;
    document.querySelectorAll('.naked-speaker').forEach(spk => {
        spk.onclick = (e) => {
            e.stopPropagation();
            globalMuted = !globalMuted;
            document.querySelectorAll('video').forEach(v => v.muted = globalMuted);
            document.querySelectorAll('.mute-line').forEach(l => {
                l.style.opacity = globalMuted ? "1" : "0";
            });
            document.querySelectorAll('.naked-speaker').forEach(s => {
                s.style.opacity = globalMuted ? "0.7" : "1";
            });
        };
    });
});