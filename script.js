//accueil

document.addEventListener('DOMContentLoaded', function() {
    const lignes = document.querySelectorAll('.ligne');
    const repetitions = 5;
    
    lignes.forEach(ligne => {
        // Cloner les projets pour créer un effet de défilement infini
        const projets = Array.from(ligne.children);
        for (let i = 0; i < repetitions; i++) {
            projets.forEach(projet => ligne.appendChild(projet.cloneNode(true)));
        }

        let scrollAmount = 0;
        const speed = 1;
        let isScrolling = window.innerWidth > 480;
        let animationFrameId;
        let isManualScroll = false;
        let manualScrollPosition = 0;
        let touchStartX = 0;
        let touchMoveX = 0;

        const startScroll = () => {
            if (isScrolling && !isManualScroll) {
                scrollAmount += speed;
                if (scrollAmount >= ligne.scrollWidth / 2) {
                    scrollAmount = 0;
                }
                ligne.scrollLeft = scrollAmount;
                animationFrameId = requestAnimationFrame(startScroll);
            }
        };

        // Démarrer le défilement automatique si nécessaire


        // Événement pour le défilement avec la molette de la souris
        ligne.addEventListener('wheel', function(event) {
            if (event.deltaY > 0) { // Autoriser uniquement le défilement vers la droite
                isManualScroll = true; // Indique que le défilement est manuel
                manualScrollPosition = ligne.scrollLeft; // Stocker la position de défilement
        
                ligne.scrollBy({
                    left: event.deltaY * 7, // Utilise scrollBy pour un défilement smooth
                    behavior: 'smooth'
                });
        
                // Arrêter le défilement automatique pendant le défilement manuel
                isScrolling = false;
                cancelAnimationFrame(animationFrameId);
        
                // Réactiver le défilement automatique après une courte pause
                clearTimeout(window.scrollTimeout);
                window.scrollTimeout = setTimeout(() => {
                    isManualScroll = false;
                    isScrolling = window.innerWidth > 480;
                    if (isScrolling) {
                        // Reprendre le défilement automatique à partir de la position de défilement manuel
                        scrollAmount = ligne.scrollLeft;
                        startScroll();
                    }
                }, 100); // Ajustez la durée si nécessaire
            }
            event.preventDefault(); // Empêche le défilement dans l'autre direction
        });

        // Événements pour le défilement tactile
        ligne.addEventListener('touchstart', function(event) {
            isManualScroll = true; // Indique que le défilement est manuel
            manualScrollPosition = ligne.scrollLeft; // Stocker la position de défilement
            touchStartX = event.touches[0].clientX;
            cancelAnimationFrame(animationFrameId);
        });

        ligne.addEventListener('touchmove', function(event) {
            touchMoveX = event.touches[0].clientX;
            const touchDeltaX = touchStartX - touchMoveX;

            if (touchDeltaX > 0) { // Autoriser uniquement le défilement vers la droite
                ligne.scrollLeft += touchDeltaX;
            }

            touchStartX = touchMoveX; // Réinitialiser la position de départ pour un défilement fluide
            event.preventDefault(); // Empêcher les événements par défaut comme le défilement vertical de la page
        });

        ligne.addEventListener('touchend', function() {
            isManualScroll = false;
            isScrolling = window.innerWidth > 480;
            if (isScrolling) {
                scrollAmount = ligne.scrollLeft;
                startScroll();
            }
        });

        // Ajouter un événement de clic sur chaque .projet pour accéder au lien
        ligne.querySelectorAll('.projet').forEach(projet => {
            projet.addEventListener('click', function() {
                const lien = projet.getAttribute('data-link'); // Récupérer le lien depuis un attribut data-link
                if (lien) {
                    window.location.href = lien; // Naviguer vers le lien
                }
            });
        });

        // Arrêter le défilement automatique lorsque la souris quitte la ligne
        ligne.addEventListener('mouseleave', () => {
            isScrolling = false;
            cancelAnimationFrame(animationFrameId);
        });

        // Reprendre le défilement automatique lorsque la souris entre dans la ligne
        ligne.addEventListener('mouseenter', () => {
            isScrolling = window.innerWidth > 480;
            if (isScrolling && !isManualScroll) {
                startScroll();
            }
        });

        // Adapter le défilement automatique en fonction de la taille de la fenêtre
        window.addEventListener('resize', () => {
            scrollAmount = ligne.scrollLeft;
            isScrolling = window.innerWidth > 480;
            if (isScrolling) {
                cancelAnimationFrame(animationFrameId);
                startScroll();
            }
        });
    });
});




//gallerie projet

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');

    gallery.addEventListener('wheel', function(event) {
        if (event.deltaY !== 0) {
            gallery.scrollLeft += event.deltaY;
            event.preventDefault();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const images = Array.from(galleryContainer.children);
    const repetitions = 5;

    for (let i = 0; i < repetitions; i++) {
        images.forEach(img => galleryContainer.appendChild(img.cloneNode(true)));
    }
});

//a propos traduction

document.addEventListener('DOMContentLoaded', () => {
    const translatableElements = document.querySelectorAll('.translatable');

    translatableElements.forEach(element => {
        const originalHTML = element.innerHTML;

        element.addEventListener('mouseover', () => {
            const translationHTML = element.getAttribute('data-translation');
            element.innerHTML = translationHTML;
        });

        element.addEventListener('mouseout', () => {
            element.innerHTML = originalHTML;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function adjustQualificationsHeight() {
        const translatableElement = document.querySelector('.translatable');
        const rect = translatableElement.getBoundingClientRect();
        const elementHeight = rect.height;
        const qualificationsElement = document.querySelector('.qualifications');
        qualificationsElement.style.height = `${elementHeight}px`;
    }

    function handleResize() {
        if (window.innerWidth > 480) {
            adjustQualificationsHeight();
        } else {
            qualificationsElement.style.height = 'auto';
        }
    }

    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
});

//splitter

document.addEventListener('DOMContentLoaded', () => {
    const splitter = document.querySelector('.splitter');
    const leftPanel = document.querySelector('.about-text');
    const rightPanel = document.querySelector('.additional-content');
    const qualificationsElement = document.querySelector('.qualifications');
    const translatableElement = document.querySelector('.translatable');

    let startX, startWidthLeft;

    function adjustQualificationsHeight() {
        const translatableHeight = translatableElement.offsetHeight;
        qualificationsElement.style.height = `${translatableHeight}px`;
    }

    function handleResize() {
        if (window.innerWidth > 480) {
            adjustQualificationsHeight();
        } else {
            qualificationsElement.style.height = 'auto';
        }
    }

    splitter.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startWidthLeft = leftPanel.offsetWidth;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        const dx = e.clientX - startX;
        const newWidthLeft = Math.max(300, startWidthLeft + dx);

        leftPanel.style.width = `${newWidthLeft}px`;
        rightPanel.style.flexBasis = `calc(100% - ${newWidthLeft + splitter.offsetWidth}px)`;

        if (window.innerWidth > 480) {
            adjustQualificationsHeight();
        }
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
});

