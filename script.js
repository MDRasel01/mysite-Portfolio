document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');

  // Category filter functionality
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');

      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter products with animations
      filterProducts(category);
    });
  });

  function filterProducts(category) {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      const shouldShow = category === 'all' || cardCategory === category;

      if (shouldShow) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${visibleCount * 0.1}s`;
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Re-trigger animations for visible cards
    setTimeout(() => {
      productCards.forEach(card => {
        if (!card.classList.contains('hidden')) {
          card.classList.remove('animate-scale-in');
          void card.offsetWidth; // Trigger reflow
          card.classList.add('animate-scale-in');
        }
      });
    }, 50);
  }

  // Truncate product descriptions after 127 characters
  const maxChars = 127;
  document.querySelectorAll('.product-description').forEach(p => {
    const text = p.textContent;
    if (text.length > maxChars) {
      p.textContent = text.substring(0, maxChars) + '...';
    }
  });
});
