// Pobierz formularz i przycisk
const form = document.getElementById('word-form');
const submitButton = document.getElementById('submit-button');

// Dodaj obsługę zdarzenia kliknięcia na przycisk
submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Znajdź wszystkie pola input w formularzu
    const inputs = form.querySelectorAll('input[type="text"]');

    // Utwórz pustą tablicę słów
    const words = [];

    // Przejdź przez wszystkie pola input
    for (let i = 0; i < inputs.length; i++) {
        const word = inputs[i].value.trim();
        if (word !== '') {
            words.push(word);
        }
    }

    // Wywołaj funkcję generującą kombinacje
    generateCombinations(words);
});

function generateCombinations(words) {
    // Wygeneruj kombinacje tylko wtedy, gdy istnieją jakieś słowa
    if (words.length > 0) {
        // Usuń wcześniejsze wyniki z wyświetlacza
        const combinationsElement = document.getElementById('combinations');
        combinationsElement.innerHTML = '';

        // Wygeneruj kombinacje
        const combinations = generateAllCombinations(words);

        // Wyświetl kombinacje
        displayCombinations(combinations);
    }
}

function generateAllCombinations(words) {
    const combinations = [];

    // Utwórz tablicę zawierającą indeksy słów (0, 1, 2, itd.)
    const wordIndexes = words.map((word, index) => index);

    // Wygeneruj wszystkie możliwe kombinacje indeksów
    const indexCombinations = generateIndexCombinations(wordIndexes);

    // Dla każdej kombinacji indeksów utwórz kombinację słów
    for (let i = 0; i < indexCombinations.length; i++) {
        const indexCombination = indexCombinations[i];
        const combination = indexCombination.map(index => words[index]).join(' ');
        combinations.push(combination);
    }

    return combinations;
}

function generateIndexCombinations(indexes) {
    const combinations = [];

    // Funkcja rekurencyjna do wygenerowania kombinacji indeksów
    function generate(currentCombination, remainingIndexes) {
        // Jeżeli nie ma już pozostałych indeksów, dodaj bieżącą kombinację do listy
        if (remainingIndexes.length === 0) {
            combinations.push(currentCombination);
        } else {
            // W przeciwnym razie wywołaj funkcję dla każdej pozostałej liczby
            for (let i = 0; i < remainingIndexes.length; i++) {
                const newCombination = currentCombination.concat(remainingIndexes[i]);
                const newRemainingIndexes = remainingIndexes.slice(0, i).concat(remainingIndexes.slice(i + 1));
                generate(newCombination, newRemainingIndexes);
            }
        }
    }

    // Wywołaj funkcję rekurencyjną
    generate([], indexes);

    return combinations;
}

function displayCombinations(combinations) {
