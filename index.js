const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
});

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showToast('Message sent!', 'success');
                contactForm.reset();
            } else {
                showToast('Something went wrong. Please try again.', 'error');
            }
        }).catch(() => {
            showToast('Something went wrong. Please try again.', 'error');
        });
    });
}

// Toast notification function
function showToast(message, type = 'success') {
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    if (type === 'success') {
        toastTitle.textContent = 'Message sent!';
        toastDescription.textContent = "Thank you for your message. I'll get back to you soon.";
    } else {
        toastTitle.textContent = 'Error';
        toastDescription.textContent = message;
    }
    
    // Show toast
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}
function initTypingAnimation() {
    // The array of strings you want to split and display
    var myArray = ["HTML", "CSS", "JavaScript", "BootStrap", "Tailwindcss", "JQuery", "React"];
    
    // The current word you want to display
    var currentWord = "";
    
    // The current index of the letter
    var currentIndex = 0;
    
    // The time interval between each letter typed
    var typingInterval = 200;
    
    // The time interval between cleaning and typing the next word
    var cleaningInterval = 500;
    
    // The current index of the letter when cleaning
    var cleaningIndex = 0;
    
    var typingIntervalId;
    var cleaningIntervalId;

    function displayNextLetter() {
        currentWord += myArray[0][currentIndex];
        currentIndex++;
        // Update the text in the element
        document.getElementById("array-item").textContent = currentWord;
        if(currentIndex === myArray[0].length) {
            clearInterval(typingIntervalId);
            setTimeout(cleanAndNext, cleaningInterval);
        }
    }
    
    function cleanAndNext() {
        cleaningIndex = currentWord.length - 1;
        cleaningIntervalId = setInterval(clean, 50);
    }
    
    function clean() {
        currentWord = currentWord.slice(0, cleaningIndex);
        cleaningIndex--;
        document.getElementById("array-item").textContent = currentWord;
        if(cleaningIndex === -1) {
            clearInterval(cleaningIntervalId);
            currentWord = "";
            currentIndex = 0;
            myArray.shift();
            if(myArray.length > 0) {
                typingIntervalId = setInterval(displayNextLetter, typingInterval);
            } else {
                myArray = ["HTML", "CSS", "JavaScript", "Tailwindcss", "React"];
                typingIntervalId = setInterval(displayNextLetter, typingInterval);
            }
        }
    }
    
    typingIntervalId = setInterval(displayNextLetter, typingInterval);
}


// Scroll-based animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .project, .stat');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .project, .stat');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Scroll event listener
window.addEventListener('scroll', handleScrollAnimations);

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        if (window.scrollY >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Parallax effect for hero section
function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-container');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
}

window.addEventListener('scroll', handleParallax);

// Button hover effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});

// Project button functionality with actual links
const projectButtons = document.querySelectorAll('.project-buttons .btn');
projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('Github')) {
            // Replace these with your actual GitHub repository URLs
            const projectTitle = button.closest('.project').querySelector('.project-title').textContent;
            let githubUrl = '#'; // Default fallback
            
            switch(projectTitle) {
                case 'Socialmedia Dashboard':
                    githubUrl = 'https://github.com/KachiTechboss/Socialmedia-Dashboard';
                    break;
                case 'Product List':
                    githubUrl = 'https://github.com/KachiTechboss/product-list';
                    break;
                case 'Flyo Dark Theme':
                    githubUrl = 'https://github.com/KachiTechboss/flyo-dark-theme';
                    break;
                case 'Time Tracking Dashboard':
                    githubUrl = 'https://github.com/KachiTechboss/Time-Tracking-Dashboard';
                    break;
                case 'Huddle Landing Page':
                    githubUrl = 'https://github.com/KachiTechboss/complex-hudddle-landing-page';
                    break;
                case 'Clipboard page':
                    githubUrl = 'https://github.com/KachiTechboss/clipboard-page';
                    break;
                case 'Landlord Properties':
                    githubUrl = 'https://github.com/KachiTechboss/real-estate-demo-site';
                    break;
            }
            
            showToast('Opening GitHub repository...', 'success');
            setTimeout(() => {
                window.open(githubUrl, '_blank');
            }, 500);
            
        } else if (buttonText.includes('View project')) {
            // Replace these with your actual live project URLs
            const projectTitle = button.closest('.project').querySelector('.project-title').textContent;
            let projectUrl = '#'; // Default fallback
            
            switch(projectTitle) {
                case 'Socialmedia Dashboard':
                    projectUrl = 'https://kachitechboss.github.io/Socialmedia-Dashboard/';
                    break;
                case 'Product List':
                    projectUrl = 'https://kachitechboss.github.io/product-list/';
                    break;
                case 'Flyo Dark Theme':
                    projectUrl = 'https://kachitechboss.github.io/flyo-dark-theme/';
                    break;
                case 'Time Tracking Dashboard':
                    projectUrl = 'https://kachitechboss.github.io/Time-Tracking-Dashboard/';
                    break;
                case 'Huddle Landing Page':
                    projectUrl = 'https://kachitechboss.github.io/complex-hudddle-landing-page/';
                    break;
                    case 'Clipboard page':
                    projectUrl = 'https://kachitechboss.github.io/clipboard-page/';
                    break;
                    case 'Landlord Properties':
                    projectUrl = 'https://kachitechboss.github.io/real-estate-demo-site/';
                    break;
            }
            
            showToast('Opening live project...', 'success');
            setTimeout(() => {
                window.open(projectUrl, '_blank');
            }, 500);
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .project, .stat');
    animatedElements.forEach(el => observer.observe(el));
});
// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
     const elements = document.querySelectorAll('.service-card, .project, .stat');  
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Start typing animation
    initTypingAnimation();
});
