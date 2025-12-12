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