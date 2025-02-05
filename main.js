let newGame = document.querySelector(".newGame")
let cartes = document.querySelectorAll(".cartes");
let nbCoups = 0;
let coups = document.querySelector(".coups");
coups.textContent = nbCoups;

let temps = document.querySelector(".temps");
let chrono;  
let secondes = 0;
let chronoActive = false; 
console.log(cartes.length);
const emojis6 = ["🎲", "🃏", "🎯", "🏆", "🎮", "🧩"];
const emojis62 = [...emojis6, ...emojis6];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
shuffle(emojis62);

// associer carte emote
let carteEmojis = [];
cartes.forEach((carte, index) => {
    carteEmojis.push({ element: carte, emoji: emojis62[index], index: index });
});

// cacher cartes
cartes.forEach(element => {
    element.textContent = " ";
});

// stock les cartes
let cartesRetournees = [];
let cartesCorrectes = 0;  // Compteur des paires trouvees

// Fonction pour démarrer le chrono
function startChrono() {
    if (!chronoActive) { 
        chronoActive = true;
        chrono = setInterval(() => {
            secondes++;
            temps.textContent = secondes + " s";
        }, 1000);
    }
}

// Fonction pour arrêter le chrono
function stopChrono() {
    clearInterval(chrono);
}

cartes.forEach(element => {
    element.addEventListener('click', function () {

        
        startChrono();

        if (cartesRetournees.length >= 2) return;

        let pos = carteEmojis.find(entry => entry.element === element)?.index;

        if (cartesRetournees.includes(element)) return;

        element.classList.toggle("return");

        if (element.textContent == " ") {
            setTimeout(() => {
                element.textContent = carteEmojis[pos].emoji;
                nbCoups++;
                coups.textContent = nbCoups;
            }, 600);
        } else {
            setTimeout(() => {
                element.textContent = " ";
            }, 600);
        }
        cartesRetournees.push(element);
        if (cartesRetournees.length === 2) {
            setTimeout(() => {
                let [carte1, carte2] = cartesRetournees;

                if (carte1.textContent === carte2.textContent) {
                    cartesCorrectes++;

                    if (cartesCorrectes === cartes.length / 2) {
                        stopChrono();
                        setTimeout(() => {
                            alert(`Félicitations, vous avez gagné en ${nbCoups} coups et ${secondes} secondes !`);
                            location.reload(); 
                        }, 500);
                    }
                } else {
                    //retouner les cartes si faux 
                    setTimeout(() => {
                        carte1.textContent = " ";
                        carte2.textContent = " ";
                        carte1.classList.toggle("return");
                        carte2.classList.toggle("return");
                    }, 600);
                }

                cartesRetournees = [];
            }, 1500);
        }
    });
});

newGame.addEventListener('click', function () {
    location.reload(); 
});
