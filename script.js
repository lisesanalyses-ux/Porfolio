document.addEventListener('DOMContentLoaded', () => {
    const langSwitchers = document.querySelectorAll('.lang-switcher a');
    const langElements = document.querySelectorAll('.lang');

    // Function to set the language
    const setLanguage = (lang) => {
        // Hide all language-specific elements
        langElements.forEach(el => {
            el.style.display = 'none';
        });

        // Show elements for the selected language
        document.querySelectorAll(`.lang-${lang}`).forEach(el => {
            el.style.display = 'block';
        });

        // Update active state for switchers
        langSwitchers.forEach(switcher => {
            if (switcher.getAttribute('data-lang') === lang) {
                switcher.classList.add('active');
            } else {
                switcher.classList.remove('active');
            }
        });

        // Save language preference
        localStorage.setItem('portfolio-lang', lang);
    };

    // Set initial language
    const savedLang = localStorage.getItem('portfolio-lang') || 'en';
    setLanguage(savedLang);

    // Add click event listeners to switchers
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = switcher.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});
