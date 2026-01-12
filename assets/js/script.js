document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeIcons = document.querySelectorAll('.mode-icon');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');
    const scrollContainer = document.getElementById('main-scroll');

    // 1. HP Mode & Filter Logic (Updated for Multi-Tagging)
    let currentMode = 'traditional';
    let currentSub = 'all';

    function updateHP() {
        projects.forEach(p => {
            // Get categories as an array (split by space) to allow dual-tagging
            const categories = p.getAttribute('data-category').split(' ');
            
            // Check if current mode exists in the project's categories
            const isMode = categories.includes(currentMode);
            
            // Check sub-filter (Fashion, Jewellery, etc.)
            const isSub = currentSub === 'all' || p.getAttribute('data-sub') === currentSub;
            
            // Show if both match
            p.classList.toggle('hidden', !(isMode && isSub));
        });

        // Reset scroll position to start when filter changes
        if (scrollContainer) scrollContainer.scrollLeft = 0;
    }

    // Mode Switcher (Traditional vs AI)
    modeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            currentMode = icon.getAttribute('data-mode');
            body.className = (currentMode === 'ai') ? 'mode-ai' : 'mode-traditional';
            
            modeIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
            
            updateHP();
        });
    });

    // Sub-Navigation Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentSub = btn.getAttribute('data-sub');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateHP();
        });
    });

    // 2. Overlay Triggers (About and Info)
    const openAbout = document.getElementById('open-about');
    const closeAbout = document.getElementById('close-about');
    const aboutOverlay = document.getElementById('about-overlay');

    const openInfo = document.getElementById('open-info');
    const closeInfo = document.getElementById('close-info');
    const infoOverlay = document.getElementById('info-overlay');

    if(openAbout) openAbout.onclick = () => aboutOverlay.classList.add('active');
    if(closeAbout) closeAbout.onclick = () => aboutOverlay.classList.remove('active');
    
    if(openInfo) openInfo.onclick = () => infoOverlay.classList.add('active');
    if(closeInfo) closeInfo.onclick = () => infoOverlay.classList.remove('active');

    // 3. Carousel Logic (Standard Project Pages)
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
                    vids.forEach(v => {
                        v.pause();
                        v.currentTime = 0;
                    });
                }
            });
        };
        
        document.getElementById('next')?.addEventListener('click', () => {
            currentIdx = (currentIdx + 1) % items.length;
            updateCarousel(currentIdx);
        });
        
        document.getElementById('prev')?.addEventListener('click', () => {
            currentIdx = (currentIdx - 1 + items.length) % items.length;
            updateCarousel(currentIdx);
        });
    }

    // 4. Mouse Wheel HP Scroll
    // Disabled when "About" overlay is active to prevent background scrolling
    window.addEventListener('wheel', (e) => {
        if (scrollContainer && (!aboutOverlay || !aboutOverlay.classList.contains('active'))) {
            scrollContainer.scrollLeft += e.deltaY;
        }
    }, { passive: true });

    // 5. Sound Logic (Global Mute Toggle)
    let globalMuted = true;
    document.querySelectorAll('.naked-speaker').forEach(spk => {
        spk.onclick = (e) => {
            e.stopPropagation(); // Don't trigger carousel next/prev
            globalMuted = !globalMuted;
            
            document.querySelectorAll('video').forEach(v => v.muted = globalMuted);
            
            // Toggle Mute Line visibility
            document.querySelectorAll('.mute-line').forEach(l => {
                l.style.opacity = globalMuted ? "1" : "0";
            });
            
            // Dim icon when muted
            document.querySelectorAll('.naked-speaker').forEach(s => {
                s.style.opacity = globalMuted ? "0.7" : "1";
            });
        };
    });
});