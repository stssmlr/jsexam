document.addEventListener('DOMContentLoaded', () => {
    const contactMeButton = document.getElementById('contactMeButton');
    
    contactMeButton.addEventListener('click', () => {
        const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
        contactModal.show();
    });
});