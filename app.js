let date = new Date();
let time = date.getTime()/1000;
let counter = 0;
let NameLS = 'score';
let NameLSName = 'scoreN';

function CheckLH(){
	for (var t = 1; t < 11; t++) {
		if ((localStorage.getItem(NameLS + t)) == 'null' || (localStorage.getItem(NameLS + t)) == 0 ){
			localStorage.setItem(NameLS + t,0);
			localStorage.setItem(NameLSName + t,"no one");
		}
	}
}

function Interval(){
let myTimer = setInterval(function(){
		let date2 = new Date();
		let time2 = date2.getTime()/1000;
		document.getElementById('clock').innerHTML = "Your time is " + Math.round(time2-time) + "/20";
		document.getElementById('score').innerHTML = "Your score is " + counter;
		document.getElementById('ClickPerSecond').innerHTML = "Click per second: " + Number((counter/(time2-time)).toFixed(3));
		if ((time2-time)>20){
			for (var i = 1; i < 11; i++) {
				//https://www.w3schools.com/jsref/prop_win_localstorage.asp
				if (((Number((counter/(time2-time)).toFixed(3)) > localStorage.getItem(NameLS + i)))){
					for (var p = 1; p < (11-i); p++) {
						localStorage.setItem(NameLS + (11-p),localStorage.getItem(NameLS + (10-p)));
						localStorage.setItem(NameLSName + (11-p),localStorage.getItem(NameLSName + (10-p)));
					}
					localStorage.setItem(NameLS + i,Number((counter/(time2-time)).toFixed(3)));
					localStorage.setItem(NameLSName + i,document.getElementById('nameText').value);
					counter = 0;
					break;
				}
			}
			clearInterval(myTimer);
			alert("Game ended");
		}
	}, 1) ;
}
//https://stackoverflow.com/questions/37287093/starting-a-javascript-prompt-after-a-button-is-clicked
function promptMe(){
	counter = 0
	date = new Date();
	time = date.getTime()/1000;
	typer.start();
	Interval();
}

function promptMe2(){
	CheckLH();
	document.getElementById('Score01').innerHTML = localStorage.getItem('score1') + " by " + localStorage.getItem('scoreN1');
	document.getElementById('Score02').innerHTML = localStorage.getItem('score2') + " by " + localStorage.getItem('scoreN2');
	document.getElementById('Score03').innerHTML = localStorage.getItem('score3') + " by " + localStorage.getItem('scoreN3');
	document.getElementById('Score04').innerHTML = localStorage.getItem('score4') + " by " + localStorage.getItem('scoreN4');
	document.getElementById('Score05').innerHTML = localStorage.getItem('score5') + " by " + localStorage.getItem('scoreN5');
	document.getElementById('Score06').innerHTML = localStorage.getItem('score6') + " by " + localStorage.getItem('scoreN6');
	document.getElementById('Score07').innerHTML = localStorage.getItem('score7') + " by " + localStorage.getItem('scoreN7');
	document.getElementById('Score08').innerHTML = localStorage.getItem('score8') + " by " + localStorage.getItem('scoreN8');
	document.getElementById('Score09').innerHTML = localStorage.getItem('score9') + " by " + localStorage.getItem('scoreN9');
	document.getElementById('Score10').innerHTML = localStorage.getItem('score10') + " by " + localStorage.getItem('scoreN10');
}

/* TYPER */
const TYPER = function () {
  if (TYPER.instance_) {
    return TYPER.instance_
  }
  TYPER.instance_ = this

  this.WIDTH = window.innerWidth
  this.HEIGHT = window.innerHeight
  this.canvas = null
  this.ctx = null

  this.words = []
  this.word = null
  this.wordMinLength = 5
  this.guessedWords = 0

  this.init()
}

window.TYPER = TYPER

TYPER.prototype = {
  init: function () {
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.ctx = this.canvas.getContext('2d')

    this.canvas.style.width = this.WIDTH + 'px'
    this.canvas.style.height = this.HEIGHT + 'px'

    this.canvas.width = this.WIDTH * 1
    this.canvas.height = this.HEIGHT * 1

    this.loadWords()
  },

  loadWords: function () {
    const xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && (xmlhttp.status === 200 || xmlhttp.status === 0)) {
        const response = xmlhttp.responseText
        const wordsFromFile = response.split('\n')

        typer.words = structureArrayByWordLength(wordsFromFile)

        typer.start()
      }
    }

    xmlhttp.open('GET', './lemmad2013.txt', true)
    xmlhttp.send()
  },

  start: function () {
    this.generateWord()
    this.word.Draw()

    window.addEventListener('keypress', this.keyPressed.bind(this))
  },

  generateWord: function () {
    const generatedWordLength = this.wordMinLength + parseInt(this.guessedWords / 5)
    const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
    const wordFromArray = this.words[generatedWordLength][randomIndex]

    this.word = new Word(wordFromArray, this.canvas, this.ctx)
  },

  keyPressed: function (event) {
    const letter = String.fromCharCode(event.which)

    if (letter === this.word.left.charAt(0)) {
      this.word.removeFirstLetter()
	  counter ++;

      if (this.word.left.length === 0) {
        this.guessedWords += 1

        this.generateWord()
      }

      this.word.Draw()
    }
  }
}

/* WORD */
const Word = function (word, canvas, ctx) {
  this.word = word
  this.left = this.word
  this.canvas = canvas
  this.ctx = ctx
}

Word.prototype = {
  Draw: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.textAlign = 'center'
    this.ctx.font = '140px Courier'
    this.ctx.fillText(this.left, this.canvas.width / 2, this.canvas.height / 3.5)
  },

  removeFirstLetter: function () {
    this.left = this.left.slice(1)
  }
}

/* HELPERS */
function structureArrayByWordLength (words) {
  let tempArray = []

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length
    if (tempArray[wordLength] === undefined)tempArray[wordLength] = []

    tempArray[wordLength].push(words[i])
  }

  return tempArray
}

window.onload = function () {
  const typer = new TYPER()
  window.typer = typer
}

/*dark/light mode https://codepen.io/HarlemSquirrel/pen/NdMebZ*/
function toggleDarkLight() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}
