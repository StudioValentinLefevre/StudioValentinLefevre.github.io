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
