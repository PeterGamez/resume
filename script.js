document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('section, aside > div');
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        if (index % 3 === 1) el.classList.add('reveal-delay-1');
        else if (index % 3 === 2) el.classList.add('reveal-delay-2');
        observer.observe(el);
    });

    // 2. 3D Interactive Tilt Effect for Project and Achievement Cards
    const cards = document.querySelectorAll('.grid > div');

    cards.forEach(card => {
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(37, 99, 235, 0.1)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = `none`;
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            setTimeout(() => {
                card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
            }, 500);
        });
    });
});
