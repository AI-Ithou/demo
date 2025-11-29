document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for buttons
    const buttons = document.querySelectorAll('.action-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cardTitle = e.target.closest('.choice-card').querySelector('.card-title').textContent;
            console.log(`User selected: ${cardTitle}`);

            // Add a simple click effect
            e.target.style.transform = 'scale(0.98)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 100);

            // In a real app, this would navigate to the next page
            // window.location.href = '/next-step';
        });
    });
});
