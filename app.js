// Select word input elements
const wordInputs = document.querySelectorAll('.word-input');

// Select generate button element
const generateButton = document.getElementById('generate-seeds');

// Select result textarea element
const resultTextarea = document.getElementById('result');

// Register event listeners
generateButton.addEventListener('click', generateSeeds);
wordInputs.forEach(input => {
    input.addEventListener('input', generateSeeds);
    input.nextElementSibling.addEventListener('click', pasteFromClipboard);
    input.nextElementSibling.nextElementSibling.addEventListener('click', clearInput);
});

/**
 * Generate seed phrases from the word inputs
 */
function generateSeeds() {
    const words = [];
    for (let i = 1; i <= 12; i++) {
        const input = document.getElementById(`word-${i}`);
        const inputWords = input.value.trim().split(' ');
        if (inputWords.length > 1) {
            words.push(inputWords[Math.floor(Math.random() * inputWords.length)]);
        } else if (inputWords.length === 1) {
            words.push(inputWords[0]);
        }
    }
    const numSeeds = document.getElementById('num-seeds').value;
    const seeds = Cain.generateSeedPhrases(words, numSeeds);
    resultTextarea.value = seeds.join('\n');
}

/**
 * Paste text from clipboard to a given input
 * @param {Event} event 
 */
function pasteFromClipboard(event) {
    const input = event.target.previousElementSibling;
    navigator.clipboard.readText().then(text => {
        input.value = text.trim();
        generateSeeds();
    });
}

/**
 * Clear the value of a given input
 * @param {Event} event 
 */
function clearInput(event) {
    const input = event.target.previousElementSibling.previousElementSibling;
    input.value = '';
    generateSeeds();
}
