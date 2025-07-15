// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js for hero section
    initParticles();
    
    // Initialize Tubelight Navbar Effect
    initTubelightEffect();
    
    // Smooth scrolling for navigation links
    initSmoothScroll();
    
    // Form submission handling
    initContactForm();
});

// Initialize Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6c63ff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6c63ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize Tubelight Effect for Navbar
function initTubelightEffect() {
    const navItems = document.querySelectorAll('.nav-item');
    const tubelight = document.querySelector('.tubelight');
    
    // Set initial position for tubelight under active nav item
    const activeNavItem = document.querySelector('.nav-item.active');
    if (activeNavItem && tubelight) {
        positionTubelight(activeNavItem, tubelight);
    }
    
    // Add event listeners to each nav item
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            positionTubelight(this, tubelight);
        });
        
        item.addEventListener('click', function(e) {
            // Remove active class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Position tubelight under active nav item
            positionTubelight(this, tubelight);
        });
    });
    
    // Reset tubelight position when mouse leaves navbar
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.addEventListener('mouseleave', function() {
            const activeItem = document.querySelector('.nav-item.active');
            if (activeItem) {
                positionTubelight(activeItem, tubelight);
            }
        });
    }
}

// Position tubelight element under nav item
function positionTubelight(item, tubelight) {
    if (!item || !tubelight) return;
    
    const width = item.offsetWidth;
    const left = item.offsetLeft;
    
    tubelight.style.width = `${width}px`;
    tubelight.style.left = `${left}px`;
}

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Update active navigation item based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const tubelight = document.querySelector('.tubelight');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (pageYOffset >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
            positionTubelight(item, tubelight);
        }
    });
});