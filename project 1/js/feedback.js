
document.addEventListener('DOMContentLoaded', () => {
 
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      
      const nav = btn.parentElement.querySelector('.site-nav') || document.getElementById('siteNav');
      if(!nav) return;
      nav.classList.toggle('show');
    });
  });
 
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year2')?.textContent = y;

  
  const learn = document.getElementById('learnBtn');
  if(learn) {
    learn.addEventListener('click', () => {
      
      window.location.href = 'about.html';
    });
  }
});