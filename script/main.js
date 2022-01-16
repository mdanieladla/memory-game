'use strict';

//Grab things we need
const section = document.querySelector('.js-section');
const playerLivesCount = document.querySelector('.js-player-lives');
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the data. The function is gonna return us this array of objects
const getData = () => [
  { imgSrc: './images/beatles.jpeg', name: 'beatles' },
  { imgSrc: './images/blink182.jpeg', name: 'blink182' },
  { imgSrc: './images/fkatwigs.jpeg', name: 'fkatwigs' },
  { imgSrc: './images/fleetwood.jpeg', name: 'fleetwood' },
  { imgSrc: './images/joy-division.jpeg', name: 'joy division' },
  { imgSrc: './images/ledzep.jpeg', name: 'led zeppelin' },
  { imgSrc: './images/metallica.jpeg', name: 'metallica' },
  { imgSrc: './images/pinkfloyd.jpeg', name: 'pink floyd' },
  { imgSrc: './images/beatles.jpeg', name: 'beatles' },
  { imgSrc: './images/blink182.jpeg', name: 'blink182' },
  { imgSrc: './images/fkatwigs.jpeg', name: 'fkatwigs' },
  { imgSrc: './images/fleetwood.jpeg', name: 'fleetwood' },
  { imgSrc: './images/joy-division.jpeg', name: 'joy division' },
  { imgSrc: './images/ledzep.jpeg', name: 'led zeppelin' },
  { imgSrc: './images/metallica.jpeg', name: 'metallica' },
  { imgSrc: './images/pinkfloyd.jpeg', name: 'pink floyd' },
];

//Function that randomize all the cards
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card generator function
const cardGenerator = () => {
  const cardData = randomize();
  //Generate html
  cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    //Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    //Attach the cards ti the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    card.addEventListener('click', (ev) => {
      card.classList.toggle('toggleCard');
      checkCards(ev);
    });
  });
};

//Check cards
const checkCards = (ev) => {
  const clickedCard = ev.target; //when we clicked target is gonna be the element on which we click on
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');
  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute('name') ===
      flippedCards[1].getAttribute('name')
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart('👎 try again');
      }
    }
  }
  //run a check to see if we won the game
  if (toggleCard.length === 16) {
    restart('🤘 you won');
  }
};

//Restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');
    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      section.style.pointerEvents = 'all';
    }, 1000);
  });

  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 1000);
};

cardGenerator();
