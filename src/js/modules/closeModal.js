const closeModal = (windows, modal) => {
    windows.forEach(item => {
        item.style.display = 'none';
    });
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

export default closeModal;