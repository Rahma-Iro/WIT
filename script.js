const themeBtn = document.getElementById('themeBtn');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = 'Light';
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = 'Light';
    } else {
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = 'Dark';
    }
});