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