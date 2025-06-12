const acordeonTrigger = document.querySelectorAll('.acordeon-trigger');

acordeonTrigger.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const acordeon = trigger.parentElement;
        acordeon.classList.toggle('open');
    });
});
