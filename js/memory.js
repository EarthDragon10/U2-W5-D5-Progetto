let arrayAnimali = [
	"🐱",
	"🦉",
	"🐾",
	"🦁",
	"🦋",
	"🐛",
	"🐝",
	"🐬",
	"🦊",
	"🐨",
	"🐰",
	"🐯",
	"🐱",
	"🦉",
	"🐾",
	"🦁",
	"🦋",
	"🐛",
	"🐝",
	"🐬",
	"🦊",
	"🐨",
	"🐯",
	"🐰",
];
//libreria per icone
//https://html-css-js.com/html/character-codes/

let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

// let classFind = document.querySelectorAll("card").classList.add("find");
let modalElement = document.getElementById("modal");
let timerElement = document.querySelector(".timer");

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato
// (l'array contiene le icone degli animali)
function shuffle(a) {
	let currentIndex = a.length;
	let temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = a[currentIndex];
		a[currentIndex] = a[randomIndex];
		a[randomIndex] = temporaryValue;
	}
	return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()

function removeActiveClass() {
	modalElement.classList.remove("active");
	startGame();
}

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia,
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

function startGame() {
	// timerElement.textContent = "Tempo: 0 min 0 sec";

	let arrayShuffle = shuffle(arrayAnimali);

	for (let i = 0; i < arrayShuffle.length; i++) {
		document.querySelector(
			".icon-grid"
		).innerHTML += `<div class="card" onclick="displayIcon(${i})">${arrayShuffle[i]}</div>`;
	}

	// arrayShuffle = [];
}

function displayIcon(cardIndex) {
	// var icon = document.getElementsByClassName("icon");
	// var icons = [...icon];
	let card = document.querySelectorAll(".card");

	/*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

	//mette/toglie la classe show
	card[cardIndex].classList.toggle("show");

	//aggiunge l'oggetto su cui ha cliccato all'array del confronto
	arrayComparison.push(card[cardIndex]);
	// let iconsFind = arrayComparison.push(card[cardIndex]);

	let len = arrayComparison.length;
	//se nel confronto ci sono due elementi
	if (len === 2) {
		//se sono uguali aggiunge la classe find
		if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
			arrayComparison[0].classList.add("find", "disabled");
			arrayComparison[1].classList.add("find", "disabled");
			arrayComparison = [];
			// iconsFind = [];
		} else {
			//altrimenti (ha sbagliato) aggiunge solo la classe disabled

			card.forEach(function (item) {
				item.classList.add("disabled");
			});

			// con il timeout rimuove  la classe show per nasconderli
			setTimeout(function () {
				arrayComparison[0].classList.remove("show", "disabled");
				arrayComparison[1].classList.remove("show", "disabled");
				console.log(arrayComparison);
				console.log(card);

				let cardsDisabled = document.querySelectorAll(".card.disabled");
				for (let i = 0; i < cardsDisabled.length; i++) {
					cardsDisabled[i].classList.remove("disabled");
				}
				arrayComparison = [];
			}, 700);
		}
	}
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte

// una funzione che nasconde la modale alla fine e riavvia il gioco

// una funzione che calcola il tempo e aggiorna il contenitore sotto
