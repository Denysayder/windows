const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
        tabs = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    // hideModalContent();

    function showTabContent(i = 0) {
        content[i].style.display = display;
        tabs[i].classList.add(activeClass);
    }

    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target && (target.classList.contains(tabSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
            tabs.forEach((item, i) => {
                if (item == target || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
};

export default tabs;