document.getElementById('pasteButton').addEventListener('click', async () => {
  const clipboardText = await navigator.clipboard.readText();
  document.getElementById('inputArea').value = clipboardText;
});

document.getElementById('clearButton').addEventListener('click', () => {
  document.getElementById('inputArea').value = '';
});

document.getElementById('crackButton').addEventListener('click', () => {
  // Implement the cracking functionality here.
});
