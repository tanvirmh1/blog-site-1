// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.createElement('button');
const blogCards = document.querySelectorAll('.blog-card');
const caseCards = document.querySelectorAll('.case-card');
const teamMembers = document.querySelectorAll('.team-member');
const subscribeForm = document.querySelector('.subscribe-form');
const footerSubscribe = document.querySelector('.footer-subscribe');
const playButton = document.querySelector('.play-button');
const readMoreLinks = document.querySelectorAll('.read-more, .case-link');

// Create scroll to top button
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
document.body.appendChild(scrollTopBtn);

// Mobile Menu Toggle
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    }
});

// Close menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Scroll to Top Functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                z-index: 2000;
                animation: slideIn 0.3s ease forwards;
                max-width: 350px;
                border-left: 4px solid #10b981;
            }
            .notification.error {
                border-left-color: #ef4444;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification i {
                font-size: 1.2rem;
            }
            .notification.success i {
                color: #10b981;
            }
            .notification.error i {
                color: #ef4444;
            }
            .notification-close {
                background: none;
                border: none;
                color: #6b7280;
                cursor: pointer;
                padding: 5px;
                font-size: 0.9rem;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Close notification
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Hero subscription form
if (subscribeForm) {
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    const submitBtn = subscribeForm.querySelector('button');
    
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            emailInput.focus();
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        // Simulate subscription
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log subscription (in real app, send to server)
            console.log('New subscription:', email);
        }, 1500);
    });
}

// Footer subscription form
if (footerSubscribe) {
    const footerInput = footerSubscribe.querySelector('input[type="email"]');
    const footerButton = footerSubscribe.querySelector('button');
    
    footerSubscribe.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = footerInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            footerInput.focus();
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            footerInput.focus();
            return;
        }
        
        // Simulate subscription
        const originalHTML = footerButton.innerHTML;
        footerButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        footerButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for subscribing!');
            footerInput.value = '';
            footerButton.innerHTML = originalHTML;
            footerButton.disabled = false;
            
            // Log subscription
            console.log('Footer subscription:', email);
        }, 1500);
    });
}

// Play button interaction
if (playButton) {
    playButton.addEventListener('click', () => {
        showNotification('Video playback starting...');
        
        // In a real implementation, this would play a video
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Motion Design Tutorial</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Video player would appear here in production</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(videoModal);
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 800px;
                overflow: hidden;
                animation: scaleIn 0.3s ease;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                background: #f8fafc;
                border-bottom: 1px solid #e5e7eb;
            }
            .modal-header h3 {
                margin: 0;
                color: #1f2937;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                color: #6b7280;
                cursor: pointer;
                padding: 5px;
            }
            .video-placeholder {
                padding: 60px 30px;
                text-align: center;
                color: #6b7280;
            }
            .video-placeholder i {
                font-size: 4rem;
                color: #2563eb;
                margin-bottom: 20px;
            }
            @keyframes scaleIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Close modal
        videoModal.querySelector('.modal-close').addEventListener('click', () => {
            videoModal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => videoModal.remove(), 300);
        });
        
        // Close modal on outside click
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => videoModal.remove(), 300);
            }
        });
    });
}

// Card hover effects
blogCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

caseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Team member hover effect
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.querySelector('img').style.transform = 'scale(1.1)';
        member.querySelector('.member-info').style.transform = 'translateY(0)';
    });
    
    member.addEventListener('mouseleave', () => {
        member.querySelector('img').style.transform = 'scale(1)';
        member.querySelector('.member-info').style.transform = 'translateY(100%)';
    });
});

// Read more links animation
readMoreLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.gap = '12px';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.gap = '8px';
    });
    
    // Add click tracking (simulated)
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const articleTitle = link.closest('.blog-content, .case-content').querySelector('h3').textContent;
        showNotification(`Opening article: ${articleTitle}`);
        
        // In real app, this would navigate to the article
        setTimeout(() => {
            console.log(`Navigating to article: ${articleTitle}`);
            // window.location.href = link.href; // Uncomment in production
        }, 500);
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.blog-card, .case-card, .topic-card, .team-member, .motion-content, .cta-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Initialize with a welcome message
window.addEventListener('load', () => {
    console.log('Rush it Studio Blog loaded successfully!');
    
    // Simulate loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Show welcome message
    setTimeout(() => {
        console.log('Welcome to Rush it Studio Blog! Explore our latest articles on design and technology.');
    }, 500);
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(animationStyles);