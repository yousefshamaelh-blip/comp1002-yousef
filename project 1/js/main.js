document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'retroPolaroidComments';
  const commentsEl = document.getElementById('comments');
  const form = document.getElementById('feedbackForm');
  const clearBtn = document.getElementById('clearComments');
  const starsContainer = document.getElementById('stars');

  
  function loadComments() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch(e) {
      return [];
    }
  }
  function saveComments(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function renderComments() {
    const arr = loadComments().slice(0, 10);
    commentsEl.innerHTML = '';
    if(arr.length === 0) {
      commentsEl.innerHTML = '<li>No feedback yet — be the first!</li>';
      return;
    }
    arr.forEach(c => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(c.name || 'Anonymous')}</strong>
        <div class="small">Rating: ${renderStars(c.rating)}</div>
        <p>${escapeHtml(c.comment)}</p>
        <div class="small muted">${new Date(c.createdAt).toLocaleString()}</div>`;
      commentsEl.appendChild(li);
    });
  }

  
  function renderStars(n) {
    n = Number(n) || 0;
    return '★'.repeat(n) + '☆'.repeat(5-n);
  }

  
  function escapeHtml(s='') {
    return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  }

  
  if(starsContainer) {
    starsContainer.innerHTML = ''; 
    for(let i=1;i<=5;i++){
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'star';
      btn.setAttribute('data-value', i);
      btn.setAttribute('aria-label', `${i} star${i>1?'s':''}`);
      btn.innerText = '☆';
      btn.addEventListener('click', () => setRating(i));
      btn.addEventListener('mouseover', () => highlight(i));
      btn.addEventListener('mouseout', () => highlight(currentRating));
      starsContainer.appendChild(btn);
    }
  }

  let currentRating = 0;
  function setRating(n) {
    currentRating = n;
    highlight(n);
  }
  function highlight(n) {
    const buttons = starsContainer.querySelectorAll('.star');
    buttons.forEach(btn => {
      const v = Number(btn.getAttribute('data-value'));
      btn.innerText = v <= n ? '★' : '☆';
      btn.classList.toggle('on', v <= n);
    });
  }
