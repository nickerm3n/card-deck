'use strict';

(function($){
	$(document).ready(function() {
		

		// Create deck
		var deck = createDeck();
		var shiftedDeck = randomShift(deck);


		//add to HTML
		for (let card of shiftedDeck) {


			let flipCard = document.createElement('div');
				flipCard.className = 'flip-card';
				flipCard.innerHTML = `<div class="flip-card-inner">
											<div class="flip-card-front">
												<img src="images/card-back.jpg" alt="card-back" style="width:120px;height:200px;">
											</div>
									  </div>`

			let item = document.createElement('div')
			var	boardContainer = document.querySelector('.board-container'),
				top, bottom, suit;

		    top = document.createElement('p');
		    bottom = document.createElement('p');
		    suit = document.createElement('p');
		    var layout = document.createElement('p')

		    item.classList.add('flip-card-back', card.color, card.suitTitle);
		    top.className = 'flip-card-back__value-top';
		    bottom.className = 'flip-card-back__value-bottom';
		    suit.className = 'flip-card-back__suit';
		    layout.className = 'flip-card-back__layout';


		    top.append(document.createTextNode(card.value))
		    bottom.append(document.createTextNode(card.value))
		    suit.append(document.createTextNode(card.suitSymbol))

			item.append(top, bottom, suit);
			flipCard.children[0].append(item);
			flipCard.addEventListener('click', function(e) {
				modal(e);
			});
			boardContainer.append(flipCard);

		}

		boardContainer.append(layout);
	});
})(jQuery);


class Card {
	constructor(color, suitSymbol, suitTitle, value) {
		this.color = color;
		this.suitSymbol = suitSymbol;
		this.suitTitle = suitTitle;
		this.value = value;
	}
}


function createDeck() {
	var suits = {
		red: [['♥', 'heart'], ['♦', 'diamond']],
		black: [['♣', 'club'], ['♠', 'spade']]
	},
	cardValue = ['A', 'K', 'Q', 'J'],

	deck = [];

	for (let i = 10; i >= 2; i--) {
		cardValue.push(i);
	}

	for (let color in suits) {

		for (let suit of suits[color]) {

			for (let value of cardValue) {

				let [suitSym, suitTitle] = suit,
					card = new Card(color, suitSym, suitTitle, value);

				deck.push(card);

			}
		}
	}
	return deck;
}

function randomShift(deck) {
	let shiftedArr = [];

	for (let i = 0; i < deck.length; i++) {

		let max = deck.length,
		j = Math.floor(Math.random() * (max - 0)) + 0;

		shiftedArr.push(deck[j])
	}

	return shiftedArr;
}

function modal(e) {
	var parent = e.target.parentNode.parentNode,
		layout = document.querySelector('.flip-card__layout'),
		boardContainer = document.querySelector('.board-container');

	if (parent.classList.contains('flip-card-inner')) {
		parent = parent.parentNode;
	}

	parent.classList.add('active');

	if (document.body.classList.contains('active') || boardContainer.classList.contains('active')) {
		document.body.classList.remove('active');
		boardContainer.classList.remove('active');
		return false;
	}

	layout.style.display = 'block'

	layout.addEventListener('click', closeModal); 
}

function closeModal() {
	var flipCard = document.querySelectorAll('.flip-card');

	for (let i = 0; i < flipCard.length; i++) {
		flipCard[i].classList.remove('active');
	}

	this.style.display = 'none';
}

