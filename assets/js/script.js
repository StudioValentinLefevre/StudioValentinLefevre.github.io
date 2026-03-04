// Overlay Toggle Logic for About
document.getElementById('close-overlay').addEventListener('click', function () {
    document.getElementById('overlay').classList.remove('active');
});

document.getElementById('about-link').addEventListener('click', function () {
    document.getElementById('overlay').classList.add('active');
});

// Overlay Toggle Logic for Contact
document.getElementById('close-contact-overlay').addEventListener('click', function () {
    document.getElementById('contact-overlay').classList.remove('active');
});

document.getElementById('contact-link').addEventListener('click', function () {
    document.getElementById('contact-overlay').classList.add('active');
});

// Theme toggle (dark / light)
(function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }

    toggle.addEventListener('click', function () {
        document.body.classList.toggle('light');
        var mode = document.body.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('theme', mode);
    });
})();
