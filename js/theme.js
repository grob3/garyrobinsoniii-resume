document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;

    const setTheme = (isDarkMode) => {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
            localStorage.setItem('theme', 'light');
        }
    };

    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        setTheme(!isDarkMode);
    });

    // Load and apply the saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === null) {
        // If no saved theme, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme(true);
        } else {
            setTheme(false);
        }
    } else {
        setTheme(savedTheme === 'dark');
    }
});
