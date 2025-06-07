document.addEventListener('DOMContentLoaded', function() {
    const rsvpButton = document.getElementById('rsvp-button');
    const rsvpForm = document.getElementById('rsvp-form');

    if (rsvpButton) {
        rsvpButton.addEventListener('click', function() {
            rsvpForm.classList.toggle('hidden');
        });
    }

    const animateElements = document.querySelectorAll('.animate');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    animateElements.forEach(element => {
        observer.observe(element);
    });
});