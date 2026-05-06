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
const generateBtn = document.getElementById('generateBtn');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

if (generateBtn) {
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const numChars = '0123456789';
        const symChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let chars = '';
        if (uppercase.checked) chars += upperChars;
        if (lowercase.checked) chars += lowerChars;
        if (numbers.checked) chars += numChars;
        if (symbols.checked) chars += symChars;

        if (chars === '') {
            alert('Select at least one character type!');
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return password;
    }

    function calculateStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (password.length >= 16) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) strength++;

        return Math.min(strength, 5);
    }

    function updateStrength(password) {
        const strength = calculateStrength(password);
        const colors = ['#e74c3c', '#e67e22', '#f39c12', '#27ae60', '#16a085'];
        const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

        strengthBar.style.width = (strength * 20) + '%';
        strengthBar.style.backgroundColor = colors[strength - 1] || '#e74c3c';
        strengthText.textContent = 'Strength: ' + (labels[strength - 1] || 'Not generated');
    }

    generateBtn.addEventListener('click', () => {
        const password = generatePassword();
        passwordOutput.value = password;
        updateStrength(password);
    });

    copyBtn.addEventListener('click', () => {
        if (passwordOutput.value === '') {
            alert('Generate a password first!');
            return;
        }

        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');

            setTimeout(() => {
                copyBtn.textContent = 'Copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });

    generateBtn.click();
}
