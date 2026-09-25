document.querySelectorAll('.stat-val, .t-val').forEach((el) => {
  el.style.transition = 'text-shadow 0.8s ease';
  setInterval(() => {
    el.style.textShadow = Math.random() > 0.5 ? '0 0 12px currentColor' : 'none';
  }, 2200 + Math.random() * 1500);
});
