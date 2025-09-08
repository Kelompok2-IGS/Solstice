document.addEventListener('DOMContentLoaded', () => {
    // Navbar Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Particle Animation Setup
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const numParticles = 100;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor(x, y, size, speed) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = speed;
            this.color = '#634438';
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0 - this.size;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    function initParticles() {
        setCanvasSize();
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speed = Math.random() * 5.5 + 0.5;
            particles.push(new Particle(x, y, size, speed));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', initParticles);

    // Reveal on Scroll Animation Setup
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(revealOnScroll, {
        root: null,
        threshold: 0.1
    });

    revealElements.forEach(element => {
        scrollObserver.observe(element);
    });
});

function showDetail(title, description, iconClass) {
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = title;
    modalTitle.style.color = 'white';
    document.getElementById('modal-description').innerText = description;
    
    const iconContainer = document.getElementById('modal-icon-container');
    iconContainer.innerHTML = `<i class='${iconClass}' style='color:white; font-size: 150px;'></i>`;
    
    modal.style.display = 'flex';
}

function closeDetail() {
    const modal = document.getElementById('detail-modal');
    modal.style.display = 'none';
}

// Optional: Close modal when clicking on the overlay
window.onclick = function(event) {
    const modal = document.getElementById('detail-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
