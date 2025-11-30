// VibeCode Pager - Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Waitlist form submission
  const waitlistForm = document.getElementById('waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = this.querySelector('input[name="email"]').value;
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      try {
        submitBtn.textContent = 'Joining...';
        submitBtn.disabled = true;

        // Get project ID from meta tag if available
        const projectMeta = document.querySelector('meta[name="vibecode-project-id"]');
        const projectId = projectMeta ? projectMeta.content : null;

        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, project_id: projectId })
        });

        if (response.ok) {
          submitBtn.textContent = '✓ You\'re on the list!';
          submitBtn.classList.add('bg-green-600');
          this.querySelector('input[name="email"]').value = '';
        } else {
          throw new Error('Failed to join waitlist');
        }
      } catch (error) {
        submitBtn.textContent = 'Try again';
        setTimeout(() => { submitBtn.textContent = originalText; submitBtn.disabled = false; }, 2000);
      }
    });
  }

});