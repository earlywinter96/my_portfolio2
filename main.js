// ===================================== PAGE LOADER ===================================== //
window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('pageLoader').classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 1500);
  });
  
  // ===================================== CUSTOM CURSOR ===================================== //
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  
  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      
      cursorOutline.style.left = e.clientX + 'px';
      cursorOutline.style.top = e.clientY + 'px';
    });
  
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .expertise-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
      });
    });
  }
  
  // ===================================== NAVIGATION ===================================== //
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Sticky navbar
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
  
  // ===================================== THREE.JS HERO BACKGROUND ===================================== //
  const canvas = document.getElementById('heroCanvas');
  
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
  
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
    // Create particles
    const particleCount = window.innerWidth < 768 ? 500 : 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
  
    const color = new THREE.Color('#00ffd5');
  
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
  
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
    const material = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
  
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
  
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
  
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      
      // Mouse parallax effect
      particles.rotation.x += mouseY * 0.00005;
      particles.rotation.y += mouseX * 0.00005;
      
      renderer.render(scene, camera);
    }
  
    animate();
  
    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  
  // ===================================== TERMINAL TYPING EFFECT ===================================== //
  const terminalCode = document.getElementById('terminalCode');
  
  if (terminalCode) {
    const codeLines = [
      '# Initializing Data Analyst Portfolio...',
      '',
      'class DataAnalyst:',
      '    def __init__(self):',
      '        self.name = "Hemant Solanki"',
      '        self.role = "Senior Data Analyst & AI Developer"',
      '        self.experience = 4.5  # years',
      '        ',
      '    def skills(self):',
      '        return [',
      '            "Python", "SQL", "R",',
      '            "Machine Learning", "AI",',
      '            "Tableau", "Data Visualization"',
      '        ]',
      '    ',
      '    def impact(self):',
      '        return {',
      '            "accuracy": "+30%",',
      '            "efficiency": "+60%",',
      '            "adoption": "+25%"',
      '        }',
      '',
      '# Ready to transform your data! 🚀'
    ];
  
    let lineIndex = 0;
    let charIndex = 0;
  
    function typeCode() {
      if (lineIndex < codeLines.length) {
        if (charIndex < codeLines[lineIndex].length) {
          terminalCode.textContent += codeLines[lineIndex][charIndex];
          charIndex++;
          setTimeout(typeCode, 30);
        } else {
          terminalCode.textContent += '\n';
          charIndex = 0;
          lineIndex++;
          setTimeout(typeCode, 100);
        }
      }
    }
  
    setTimeout(typeCode, 500);
  }
  
  // ===================================== COUNTER ANIMATION ===================================== //
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
  
    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target % 1 === 0 ? target : target.toFixed(1);
        clearInterval(counter);
      } else {
        element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
      }
    }, 16);
  }
  
  // Intersection Observer for counter animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => counterObserver.observe(stat));
  
  // ===================================== SKILLS RADAR CHART ===================================== //
  const skillsRadar = document.getElementById('skillsRadar');
  
  if (skillsRadar && typeof Chart !== 'undefined') {
    const ctx = skillsRadar.getContext('2d');
    
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Python', 'SQL', 'R', 'Tableau', 'Machine Learning', 'Data Analysis'],
        datasets: [{
          label: 'Skill Proficiency',
          data: [95, 90, 85, 88, 82, 95],
          backgroundColor: 'rgba(0, 255, 213, 0.2)',
          borderColor: '#00ffd5',
          borderWidth: 2,
          pointBackgroundColor: '#00ffd5',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#00ffd5'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            min: 0,
            max: 100,
            beginAtZero: true,
            ticks: {
              stepSize: 20,
              color: '#666',
              backdropColor: 'transparent'
            },
            grid: {
              color: 'rgba(0, 255, 213, 0.1)'
            },
            pointLabels: {
              color: '#00ffd5',
              font: {
                size: 12,
                weight: '600'
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
  
  // ===================================== SCROLL ANIMATIONS ===================================== //
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
  
  // Observe elements for scroll animation
  const animatedElements = document.querySelectorAll(
    '.expertise-card, .project-card, .timeline-item, .cert-card, .contact-card'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
  
  // ===================================== COPY EMAIL FUNCTIONALITY ===================================== //
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const email = button.getAttribute('data-copy');
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showCopySuccess(button);
        }).catch(() => {
          fallbackCopy(email, button);
        });
      } else {
        fallbackCopy(email, button);
      }
    });
  });
  
  function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span>✓ Copied!</span>';
    button.style.background = 'rgba(76, 175, 80, 0.2)';
    button.style.borderColor = 'rgba(76, 175, 80, 0.5)';
    button.style.color = '#4caf50';
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
      button.style.borderColor = '';
      button.style.color = '';
    }, 2000);
  }
  
  function fallbackCopy(text, button) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
      document.execCommand('copy');
      showCopySuccess(button);
    } catch (err) {
      console.error('Copy failed:', err);
    }
    
    document.body.removeChild(tempInput);
  }
  
  // ===================================== PARALLAX EFFECT ===================================== //
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .about-visual');
    
    parallaxElements.forEach(el => {
      const speed = 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
  
  // ===================================== SMOOTH SCROLL FOR ALL LINKS ===================================== //
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===================================== PERFORMANCE OPTIMIZATION ===================================== //
  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Apply debounce to scroll events
  const debouncedScroll = debounce(highlightNavigation, 100);
  window.addEventListener('scroll', debouncedScroll);
  
  // ===================================== CONSOLE MESSAGE ===================================== //
  console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #00ffd5;');
  console.log('%cInterested in the code? Check out my GitHub: https://github.com/earlywinter96', 'font-size: 14px; color: #b4b4b4;');
  console.log('%c🚀 Let\'s build something amazing together!', 'font-size: 14px; color: #00ffd5;');