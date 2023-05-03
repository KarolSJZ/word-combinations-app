const bitcoin = window.bitcoin;
const importButton = document.getElementById('import');
const clearButton = document.getElementById('clear');
const textarea = document.getElementById('seed-phrase');

importButton.addEventListener('click', () => {
    const seedPhrase = textarea.value.trim();
    if (seedPhrase) {
        window.open('https://cashtab.com/#/configure?seed=' + encodeURIComponent(seedPhrase), '_blank');
    } else {
        alert('Wpisz seed phrase do pola tekstowego przed importem.');
    }
});

clearButton.addEventListener('click', () => {
    textarea.value = '';
});
