/* ========================================
   COMINOVA - Comic Trinova Website
   JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Preloader ==========
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 800);
        });
        // Fallback: hide preloader after 3 seconds
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 3000);
    }

    // ========== Navigation ==========
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navAnchors = document.querySelectorAll('.nav-links a');

    if (navbar) {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    if (hamburger && navLinks && mobileOverlay) {
        // Mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        const closeMenu = () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileOverlay.addEventListener('click', closeMenu);
        navAnchors.forEach(a => a.addEventListener('click', closeMenu));
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const onScroll = () => {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    navAnchors.forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    };
    window.addEventListener('scroll', onScroll);

    // ========== Countdown Timer ==========
    const eventDate = new Date('2026-12-21T10:00:00+07:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = eventDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    };

    if (document.getElementById('days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ========== Hero Particles ==========
    const particlesContainer = document.getElementById('particles');
    const createParticles = () => {
        if (!particlesContainer) return;
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = Math.random() * 10 + 8 + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    };
    createParticles();

    // ========== Stat Counter Animation ==========
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = Math.ceil(target / (duration / 16));
            let current = 0;

            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                counter.dataset.animated = 'true';
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = current.toLocaleString('id-ID');
                }, 16);
            }
        });
    };
    window.addEventListener('scroll', animateCounters);

    // ========== Catalog Data & Rendering ==========
    const circleData = [
        { name: 'Ichigowarano', code: 'A-01', fandom: 'Original Illustration', color: '#ff6b6b', initial: 'IG' },
        { name: 'Soykune', code: 'A-05', fandom: 'Original Illustration', color: '#a29bfe', initial: 'SK' },
        { name: 'Oishikunare', code: 'B-12', fandom: 'Artbook, Goods', color: '#00b894', initial: 'OK' },
        { name: 'Aika Sesilia', code: 'B-03', fandom: 'Cosplayer, Goods', color: '#fd79a8', initial: 'AS' },
        { name: 'Airine Panpan', code: 'C-08', fandom: 'Cosplayer, Goods', color: '#fdcb6e', initial: 'AP' },
        { name: 'Xiao Yukiko', code: 'C-15', fandom: 'Cosplayer, Artbook, Goods', color: '#74b9ff', initial: 'XY' },
        { name: 'Ryukku_cos', code: 'D-02', fandom: 'Cosplayer, Artbook, Goods', color: '#e17055', initial: 'RC' },
        { name: 'Inkwell Studio', code: 'D-10', fandom: 'manga', color: '#636e72', initial: 'IS' },
        { name: 'Aurora Circle', code: 'E-04', fandom: 'game', color: '#6c5ce7', initial: 'AC' },
        { name: 'Kitsune Lab', code: 'E-07', fandom: 'vtuber', color: '#e84393', initial: 'KL' },
        { name: 'Nebula Arts', code: 'F-01', fandom: 'original', color: '#0984e3', initial: 'NA' },
        { name: 'Panda Press', code: 'F-06', fandom: 'anime', color: '#00cec9', initial: 'PP' },
    ];

    const catalogGrid = document.getElementById('catalogGrid');
    const filterTags = document.querySelectorAll('.filter-tag');
    const searchInput = document.getElementById('catalogSearch');

    if (catalogGrid) {
        const renderCatalog = (data) => {
            catalogGrid.innerHTML = '';
            data.forEach(circle => {
                const card = document.createElement('div');
                card.className = 'catalog-card';
                card.dataset.fandom = circle.fandom;
                card.innerHTML = `
                    <div class="catalog-card-header">
                        <div class="catalog-avatar" style="background: ${circle.color};">${circle.initial}</div>
                        <div class="catalog-card-info">
                            <h4>${circle.name}</h4>
                            <span class="catalog-card-code">Booth: ${circle.code}</span>
                        </div>
                    </div>
                    <span class="catalog-card-fandom">${circle.fandom}</span>
                `;
                catalogGrid.appendChild(card);
            });
        };

        renderCatalog(circleData);

        // Filter
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                const filter = tag.dataset.filter;
                const filtered = filter === 'all' 
                    ? circleData 
                    : circleData.filter(c => c.fandom === filter);
                renderCatalog(filtered);
            });
        });

        if (searchInput) {
            // Search
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filtered = circleData.filter(c => 
                    c.name.toLowerCase().includes(query) || 
                    c.code.toLowerCase().includes(query) || 
                    c.fandom.toLowerCase().includes(query)
                );
                // Reset filter tags
                filterTags.forEach(t => t.classList.remove('active'));
                const allFilter = document.querySelector('.filter-tag[data-filter="all"]');
                if (allFilter) allFilter.classList.add('active');
                renderCatalog(filtered);
            });
        }
    }

    // ========== Contact Form ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Pesan Terkirim!</h3>
                    <p>Terima kasih telah menghubungi kami. Tim Cominova akan segera merespons pesanmu.</p>
                </div>
            `;
        });
    }

    // ========== Back to Top ==========
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== Scroll Reveal Animation ==========
    const revealElements = () => {
        const elements = document.querySelectorAll(
            '.section-header, .feature-card, .timeline-item, .ticket-card, ' +
            '.circle-banner, .catalog-search, .gallery-item, .venue-card, ' +
            '.contact-form-container, .contact-info-container'
        );
        
        elements.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealElements);
    window.addEventListener('load', revealElements);
    revealElements();

    // ========== Smooth scroll for all anchor links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
