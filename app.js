// Clear input when clear icon is clicked
function clearInput(event) {
  const input = event.target.previousElementSibling;
  input.value = "";
}

// Paste text from clipboard to input when paste icon is clicked
function pasteToInput(event) {
  const input = event.target.previousElementSibling;
  navigator.clipboard.readText().then((text) => {
    input.value = text;
  });
}

// Generate all possible combinations of one word from each input
function generate(event) {
  event.preventDefault();
  const words = [];
  const seedOutput = document.getElementById("seed-output");
  const seedOutputTextarea = document.getElementById("seed-output-textarea");

  // Loop through all the word inputs and add them to the words array
  for (let i = 1; i <= 12; i++) {
    const input = document.getElementById(`word-${i}`);
    const inputWords = input.value.split(" ");
    words.push(inputWords);
  }

  // Generate all possible combinations of one word from each input
  const combinations = cartesian(...words).map((c) => c.join(" "));

  // Display the generated seed phrases
  seedOutputTextarea.value = combinations.join("\n");
  seedOutput.style.display = "block";
}

// Copy seed phrases to clipboard when "Copy to Clipboard" button is clicked
function copyToClipboard(event) {
  const seedOutputTextarea = document.getElementById("seed-output-textarea");
  seedOutputTextarea.select();
  document.execCommand("copy");
}

// Generate all possible combinations of arrays
function cartesian(...arrays) {
  return arrays.reduce((a, b) => {
    return a.flatMap((x) => {
      return b.map((y) => {
        return x.concat(y);
      });
    });
  }, [[]]);
}

// Add event listeners to paste and clear icons
const pasteIcons = document.querySelectorAll(".fa-paste");
pasteIcons.forEach((icon) => {
  icon.addEventListener("click", pasteToInput);
});

const clearIcons = document.querySelectorAll(".fa-times-circle");
clearIcons.forEach((icon) => {
  icon.addEventListener("click", clearInput);
});

// Add event listener to generate button
const generateButton = document.getElementById("generate-button");
generateButton.addEventListener("click", generate);

// Add event listener to copy to clipboard button
const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", copyToClipboard);
