let date = new Date();
let time = date.getTime()/1000;
let counter = 0;

function Interval(){
let myTimer = setInterval(function(){
		let date2 = new Date();
		let time2 = date2.getTime()/1000;
		document.getElementById('clock').innerHTML = "Your time is " + Math.round(time2-time) + "/60";
		document.getElementById('score').innerHTML = "Your score is " + counter;
		document.getElementById('ClickPerSecond').innerHTML = "Click per second: " + Number((counter/(time2-time)).toFixed(2));
		if ((time2-time)>60){
			alert("Your scoor is "+ counter);
			clearInterval(myTimer);
		}
	}, 10) ;
}
//https://stackoverflow.com/questions/37287093/starting-a-javascript-prompt-after-a-button-is-clicked
function promptMe(){
	counter = 0
	date = new Date();
	time = date.getTime()/1000;
	typer.start();
	Interval();
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

function toggleDarkLight() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}
