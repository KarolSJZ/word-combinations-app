const wordInputs = document.querySelectorAll('.word-input');

// Add paste and clear icons for each input
wordInputs.forEach(input => {
  const pasteIcon = document.createElement('i');
  pasteIcon.classList.add('fas', 'fa-paste', 'input-icon');
  input.parentNode.appendChild(pasteIcon);
  pasteIcon.addEventListener('click', () => {
    navigator.clipboard.readText().then(text => input.value = text);
  });

  const clearIcon = document.createElement('i');
  clearIcon.classList.add('fas', 'fa-times-circle', 'input-icon');
  input.parentNode.appendChild(clearIcon);
  clearIcon.addEventListener('click', () => input.value = '');
});

// Generate seed phrases
function generateSeeds() {
  // Get word inputs
  const words = [];
  wordInputs.forEach(input => words.push(input.value.trim()));

  // Filter out empty inputs
  const nonEmptyWords = words.filter(word => word !== '');

  // Generate combinations
  const combinations = getCombinations(nonEmptyWords);

  // Render combinations
  renderCombinations(combinations);
}

// Register event listeners
document.getElementById('generate-seeds').addEventListener('click', generateSeeds);
wordInputs.forEach(input => input.addEventListener('input', generateSeeds));
