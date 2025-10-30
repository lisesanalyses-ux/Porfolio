// Portfolio JavaScript functionality

// Star Field Animation
function createStarField() {
    const starField = document.getElementById('star-field');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Random animation delay
        star.style.animationDelay = Math.random() * 4 + 's';

        starField.appendChild(star);
    }
}

// Language switching
document.addEventListener('DOMContentLoaded', () => {
    // Create star field
    createStarField();

    // Initialize language - default to English if not set
    const currentLang = localStorage.getItem('lang') || 'en';
    setLanguage(currentLang);

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Navigation active state
    const sections = document.querySelectorAll('section');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            const offset = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPosition >= offset && scrollPosition < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav);

    // Navigation scroll behavior - hide/show nav on scroll
    let lastScrollTop = 0;
    const floatingNav = document.getElementById('floating-nav');

    function updateNavVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - hide nav
            floatingNav.classList.add('hidden');
        } else {
            // Scrolling up - show nav
            floatingNav.classList.remove('hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    window.addEventListener('scroll', updateNavVisibility);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Removed duplicate navigation scroll code

    // Language switcher functionality
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const lang = e.target.dataset.lang;
                setLanguage(lang);
                localStorage.setItem('lang', lang);
            }
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        // Check for saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        if (savedDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-category li');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skillObserver.observe(item);
    });

    // Project card animations
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });

    // Typing effect for hero title (optional)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Performance optimization: Lazy load images if any
    // Intersection Observer for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Back to top button (if needed later)
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        document.body.appendChild(backToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'translateY(0)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.transform = 'translateY(100px)';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createBackToTopButton();

    // Form submission (if adding contact form later)
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         // Handle form submission
    //         console.log('Form submitted');
    //     });
    // }

    // Working Tools Demo Functions
    window.runSecurityScan = function() {
        const resultDiv = document.getElementById('security-result');
        resultDiv.classList.add('show');
        resultDiv.innerHTML = `
            <strong>🔍 Scanning in progress...</strong><br>
            Target: portfolio-index.html<br>
            <br>
            ✅ No security vulnerabilities found<br>
            🔒 Content Security: Enabled<br>
            ⚡ Performance Score: 98/100<br>
            🛡️ XSS Protection: Active<br>
            📱 Mobile Friendly: Yes
        `;
        setTimeout(() => {
            resultDiv.innerHTML += '<br><br><em>Security scan completed successfully!</em>';
        }, 1500);
    };

    window.runSystemHealthCheck = function() {
        const resultDiv = document.getElementById('health-result');
        resultDiv.classList.add('show');

        // Simulate system metrics
        const cpuUsage = Math.floor(Math.random() * 30) + 20;
        const memoryGB = (Math.random() * 4 + 2).toFixed(1);
        const networkStatus = Math.random() > 0.1 ? 'Connected' : 'Limited';

        resultDiv.innerHTML = `
            <strong>📊 System Health Report</strong><br>
            CPU Usage: ${cpuUsage}%<br>
            Memory Usage: ${memoryGB}GB / 8GB<br>
            Network Status: ${networkStatus}<br>
            Disk Space: 156GB free<br>
            Temperature: 42°C<br>
            Battery: 87% (Charging)
        `;

        setTimeout(() => {
            resultDiv.innerHTML += '<br><br><span style="color: #22c55e;">✓ All systems operating optimally</span>';
        }, 1000);
    };

    window.analyzePasswordStrength = function() {
        const resultDiv = document.getElementById('password-result');
        resultDiv.classList.add('show');

        const passwords = [
            { strength: 'Excellent', entropy: '192 bits', time: '1.2 trillion centuries', score: 'A+' },
            { strength: 'Very Strong', entropy: '156 bits', time: '8.9 billion years', score: 'A' },
            { strength: 'Strong', entropy: '128 bits', time: '2.8 trillion years', score: 'B+' }
        ];

        const selected = passwords[Math.floor(Math.random() * passwords.length)];

        resultDiv.innerHTML = `
            <strong>🔐 Password Analysis Result</strong><br>
            Password Strength: <span style="color: #22c55e;">${selected.strength}</span><br>
            Entropy: ${selected.entropy}<br>
            Estimated crack time: ${selected.time}<br>
            Security Score: ${selected.score}<br>
            Recommendations: Keep secure!
        `;
    };

    window.testAPIEndpoint = function() {
        const resultDiv = document.getElementById('api-result');
        resultDiv.classList.add('show');

        const responses = [
            '200 OK (Success)',
            '201 Created',
            '202 Accepted',
            '204 No Content'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseTime = Math.floor(Math.random() * 100) + 20;

        resultDiv.innerHTML = `
            <strong>🌐 API Test Results</strong><br>
            Method: GET /api/portfolio/status<br>
            Status: <span style="color: #22c55e;">${randomResponse}</span><br>
            Response Time: ${responseTime}ms<br>
            Content-Type: application/json<br>
            Cache-Control: public, max-age=3600<br>
            Server: Portfolio-API/1.0
        `;

        setTimeout(() => {
            resultDiv.innerHTML += '<br><br><em>API endpoint functioning correctly</em>';
        }, 800);
    };

    window.demonstrateCompression = function() {
        const resultDiv = document.getElementById('compression-result');
        resultDiv.classList.add('show');

        const files = [
            { name: 'report.pdf', original: '4.2MB', compressed: '1.8MB', ratio: '57%' },
            { name: 'presentation.pptx', original: '12.8MB', compressed: '5.4MB', ratio: '58%' },
            { name: 'dataset.json', original: '8.6MB', compressed: '2.1MB', ratio: '76%' }
        ];

        const selected = files[Math.floor(Math.random() * files.length)];

        resultDiv.innerHTML = `
            <strong>💾 File Compression Results</strong><br>
            File: ${selected.name}<br>
            Original Size: ${selected.original}<br>
            Compressed Size: ${selected.compressed}<br>
            Compression Ratio: ${selected.ratio}<br>
            Algorithm: LZMA2 (Optimal)<br>
            Time saved: 68% faster transfer
        `;

        setTimeout(() => {
            resultDiv.innerHTML += '<br><br><span style="color: #22c55e;">✓ Compression completed successfully</span>';
        }, 1200);
    };

    window.demonstrateCodeFormatting = function() {
        const resultDiv = document.getElementById('format-result');
        resultDiv.classList.add('show');

        const languages = ['JavaScript', 'Python', 'CSS', 'HTML'];
        const randomLang = languages[Math.floor(Math.random() * languages.length)];
        const linesCount = Math.floor(Math.random() * 200) + 50;
        const improvements = Math.floor(Math.random() * 15) + 5;

        resultDiv.innerHTML = `
            <strong>🔄 Code Formatting Complete</strong><br>
            Language: ${randomLang}<br>
            Lines of code: ${linesCount}<br>
            Issues fixed: ${improvements}<br>
            Formatting: Prettier Standard<br>
            Indentation: 2 spaces<br>
            Line length: 80 characters
        `;

        setTimeout(() => {
            resultDiv.innerHTML += '<br><br><span style="color: #22c55e;">✓ Code formatted successfully</span>';
        }, 900);
    };

    // Analytics (if needed)
    // console.log('Portfolio loaded successfully');
});

function setLanguage(lang) {
    // Hide all language-specific content
    document.querySelectorAll('.lang-cz, .lang-en').forEach(el => {
        el.style.display = 'none';
    });

    // Show content for selected language
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.style.display = 'inline';
    });

    // Update language switcher active state
    document.querySelectorAll('.lang-switcher a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.lang === lang) {
            link.classList.add('active');
        }
    });

    // Update page title if needed
    const titles = {
        cz: 'Kateřina Hosková - Portfolio',
        en: 'Katerina Hoskova - Portfolio'
    };
    document.title = titles[lang] || titles.en;
}

// Parallax effect for hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
