//accueil

document.addEventListener('DOMContentLoaded', function() {
    const lignes = document.querySelectorAll('.ligne');
    const repetitions = 5;

    lignes.forEach(ligne => {
        const projets = Array.from(ligne.children);

        for (let i = 0; i < repetitions; i++) {
            projets.forEach(projet => ligne.appendChild(projet.cloneNode(true)));
        }

        ligne.scrollLeft = 0;

        let scrollAmount = 0;
        const speed = 2;
        let isScrolling = false;
        let isDragging = false;
        let startX;
        let scrollLeft;
        let animationFrameId;
        let wasDragging = false;

        const startScroll = () => {
            if (isScrolling && window.innerWidth > 480) { 
                scrollAmount += speed;
                if (scrollAmount > ligne.scrollWidth - ligne.clientWidth) {
                    scrollAmount = 0;
                }
                ligne.scrollLeft = scrollAmount;
                animationFrameId = requestAnimationFrame(startScroll);
            }
        };

        const startDrag = (e) => {
            isDragging = true;
            wasDragging = false;
            startX = e.pageX - ligne.getBoundingClientRect().left;
            scrollLeft = ligne.scrollLeft;
            ligne.style.cursor = 'grabbing';
            isScrolling = false;
            cancelAnimationFrame(animationFrameId);
        };

        const drag = (e) => {
            if (isDragging) {
                wasDragging = true;
                const x = e.pageX - ligne.getBoundingClientRect().left;
                const walk = (x - startX) * 0.5;
                ligne.scrollLeft = scrollLeft - walk;
            }
        };

        const endDrag = (e) => {
            if (isDragging) {
                isDragging = false;
                ligne.style.cursor = 'grab';
                scrollAmount = ligne.scrollLeft;
                isScrolling = true;
                if (window.innerWidth > 480) { 
                    startScroll();
                }
                if (wasDragging) {
                    e.preventDefault();
                }
            }
        };

        ligne.addEventListener('mouseenter', () => {
            if (!isDragging && window.innerWidth > 480) { 
                isScrolling = true;
                startScroll();
            }
        });

        ligne.addEventListener('mouseleave', () => {
            isScrolling = false;
            cancelAnimationFrame(animationFrameId);
        });

        ligne.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        ligne.addEventListener('click', (e) => {
            const projet = e.target.closest('.projet');
            if (projet && !wasDragging) {
                const link = projet.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
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

    let scrollAmount = 0;
    const speed = 1;
    let isScrolling = window.innerWidth > 480; 

    const startScroll = () => {
        if (isScrolling) {
            scrollAmount += speed;
            if (scrollAmount >= galleryContainer.scrollWidth / 2) {
                scrollAmount = 0;
            }
            galleryContainer.scrollLeft = scrollAmount;
            animationFrameId = requestAnimationFrame(startScroll);
        }
    };

    if (isScrolling) {
        startScroll();
    }

    document.querySelector('.gallery').addEventListener('wheel', function(event) {
        galleryContainer.scrollLeft += event.deltaY;
        event.preventDefault();
    });

    document.querySelector('.gallery').addEventListener('mouseenter', () => {
        isScrolling = false;
        cancelAnimationFrame(animationFrameId);
    });

    document.querySelector('.gallery').addEventListener('mouseleave', () => {
        isScrolling = window.innerWidth > 480; 
        if (isScrolling) {
            startScroll();
        }
    });

    window.addEventListener('resize', () => {
        scrollAmount = galleryContainer.scrollLeft;
        isScrolling = window.innerWidth > 480; 
        if (isScrolling) {
            cancelAnimationFrame(animationFrameId);
            startScroll();
        }
    });
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
