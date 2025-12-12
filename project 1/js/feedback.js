
document.addEventListener('DOMContentLoaded', () => {
 
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      
      const nav = btn.parentElement.querySelector('.site-nav') || document.getElementById('siteNav');
      if(!nav) return;
      nav.classList.toggle('show');
    });
  });
 