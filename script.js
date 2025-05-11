document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Audio player functionality
    const audioPlayer = document.getElementById('audioPlayer');
    const audioButtons = document.querySelectorAll('.audio-btn');
    
    audioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioFile = this.getAttribute('data-audio');
            if (audioFile) {
                audioPlayer.src = `audio/${audioFile}`;
                audioPlayer.play();
                
                // Add visual feedback
                this.innerHTML = '<i class="fas fa-volume-up"></i> Playing...';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-volume-up"></i> Listen';
                }, 2000);
            }
        });
    });

    // Start lesson buttons
    const startButtons = document.querySelectorAll('.start-lesson');
    const progressTracker = document.createElement('div');
    progressTracker.className = 'progress-tracker';
    document.body.appendChild(progressTracker);
    
    // Load progress from localStorage
    let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    
    startButtons.forEach(button => {
        const lessonCard = button.closest('.lesson-card');
        const lessonTitle = lessonCard.querySelector('h4').textContent;
        
        if (completedLessons.includes(lessonTitle)) {
            button.textContent = 'Completed!';
            button.style.backgroundColor = '#2ecc71';
        }
        
        button.addEventListener('click', function() {
            if (!completedLessons.includes(lessonTitle)) {
                completedLessons.push(lessonTitle);
                localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
                
                this.textContent = 'Completed!';
                this.style.backgroundColor = '#2ecc71';
                
                // Show progress tracker
                progressTracker.textContent = `Progress: ${completedLessons.length} lessons completed`;
                progressTracker.classList.add('show');
                
                setTimeout(() => {
                    progressTracker.classList.remove('show');
                }, 3000);
            }
        });
    });

    // Game buttons
    const gameButtons = document.querySelectorAll('.play-btn');
    
    gameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.closest('.game-card').id;
            alert(`Starting ${gameId} game! This would launch the interactive game in a real implementation.`);
        });
    });

    // Vocabulary search
    const vocabSearch = document.getElementById('vocabSearch');
    
    if (vocabSearch) {
        vocabSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const vocabItems = document.querySelectorAll('.vocab-item');
            
            vocabItems.forEach(item => {
                const word = item.querySelector('p').textContent.toLowerCase();
                if (word.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            faqItem.classList.toggle('active');
            
            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.closest('.faq-item').classList.remove('active');
                }
            });
        });
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                if (validateEmail(email)) {
                    alert('Thank you for your message! We will contact you soon.');
                    this.reset();
                } else {
                    alert('Please enter a valid email address.');
                }
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // "Start Now" button scroll to courses
    const startNowBtn = document.getElementById('startNow');
    if (startNowBtn) {
        startNowBtn.addEventListener('click', function() {
            document.querySelector('#courses').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.lesson-card, .game-card, .video-card, .vocab-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});