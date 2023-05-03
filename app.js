const wordInputs = document.querySelectorAll(".word-input");

function getWords() {
  const words = [];
  for (let i = 0; i < wordInputs.length; i++) {
    const word = wordInputs[i].value.trim();
    if (word !== "") {
      words.push(word);
    }
  }
  return words;
}

function generateCombinations() {
  const words = getWords();
  const combinations = getCombinations(words);
  const combinationList = document.getElementById("combinations");
  combinationList.innerHTML = "";
  for (let i = 0; i < combinations.length && i < 100000; i++) {
    const combination = combinations[i];
    const listItem = document.createElement("li");
    listItem.innerText = combination;
    combinationList.appendChild(listItem);
  }
  showPages();
}

function showPages() {
  const combinations = document.getElementById("combinations");
  const pageContainer = document.getElementById("pages");
  const numPages = Math.ceil(combinations.children.length / 100000);
  pageContainer.innerHTML = "";
  for (let i = 0; i < numPages; i++) {
    const pageNumber = i + 1;
    const pageButton = document.createElement("button");
    pageButton.innerText = pageNumber;
    pageButton.onclick = function () {
      showPage(pageNumber);
    };
    pageContainer.appendChild(pageButton);
  }
}

function showPage(pageNumber) {
  const combinations = document.getElementById("combinations");
  const startIndex = (pageNumber - 1) * 100000;
  const endIndex = startIndex + 100000;
  for (let i = 0; i < combinations.children.length; i++) {
    if (i >= startIndex && i < endIndex) {
      combinations.children[i].style.display = "block";
    } else {
      combinations.children[i].style.display = "none";
    }
  }
}

function generateSeeds() {
  const words = getWords();
  const combinations = getCombinations(words);
  const seeds = [];
  for (let i = 0; i < combinations.length; i++) {
    const seed = btoa(combinations[i]);
    seeds.push(seed);
  }
  const seedList = document.getElementById("seeds");
  seedList.innerHTML = "";
  for (let i = 0; i < seeds.length; i++) {
    const seedItem = document.createElement("div");
    seedItem.className = "seed-item";
    const seedValue = document.createElement("span");
    seedValue.className = "seed-value";
    seedValue.innerText = seeds[i];
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.innerText = "Copy";
    copyButton.onclick = function () {
      const tempInput = document.createElement("input");
      tempInput.value = seeds[i];
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    };
    seedItem.appendChild(seedValue);
    seedItem.appendChild(copyButton);
    seedList.appendChild(seedItem);
  }
}

document.getElementById("generate-combinations").onclick = generateCombinations;
document.getElementById("generate-seeds").onclick = generateSeeds;
