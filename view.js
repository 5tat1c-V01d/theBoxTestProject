"use strict";

export const view = {
	bindButtons:()=>{
		let restartButton = document.getElementById("restartButton");
		restartButton.addEventListener('click', () =>{
			view.buttonClicked();
		})
	},
	renderBoard: (board) => {
		
			let div = document.getElementById("board");
			//Builds each space
			board.spaces.forEach(space =>{
				let htmlString = `<div id="space${space.spaceId}" class="blackBackground"> \
				<div id="spaceForeground${space.spaceId}" class=""> \
				<div id="spaceForegroundTwo${space.spaceId}" class=""></div> \
				</div>`;
				
				div.insertAdjacentHTML("beforeend" , htmlString);
				//adds event listeners
				let spaceElement = document.getElementById(`space${space.spaceId}`);
				spaceElement.addEventListener('click', () => {

					view.clickRegistered(space.spaceId);

				});//Loop end
			})
	},
	addCross: (spaceId) => {
		const clickSpace = document.getElementById(`spaceForeground${spaceId}`);
		const classList = clickSpace.classList;
	 
			  classList.add('cross');
		
	},
	addNaught: (spaceId) => {
		const firstCircle = document.getElementById(`spaceForeground${spaceId}`);
		const secondCircle = document.getElementById(`spaceForegroundTwo${spaceId}`);
	
		if (firstCircle.classList.contains('naughtOuter') && secondCircle.classList.contains('naughtInner')) {
			firstCircle.classList.remove('naughtOuter');
			secondCircle.classList.remove('naughtInner');
		}
		  else { 
			  firstCircle.classList.add('naughtOuter');
			  secondCircle.classList.add('naughtInner');
		  }
	},
	updateWinStateOnScreen: (winningLine) => {	
		
		winningLine.forEach((space) => {
			document.getElementById(`spaceForeground${space.spaceId}`).classList.add("win");
		})

		
	},
	drawPlayerOnBoard: (activePlayer, spaceId) => {
		if (activePlayer === "Crosses") {
			view.addCross(spaceId);
		  } 
		  else if (activePlayer === "Naughts") {
			view.addNaught(spaceId);
		  }	  
		  else {
			throw new Error("Unknown player type passed to drawPlayerOnBoard");
		}
	},
	informUserSpaceTaken: (spaceClicked) => {
		document.getElementById(`spaceForeground${spaceClicked.spaceId}`).classList.add("flash-error");
		view.playErrorNoise();
	},
	resetErrorAnimation: (spaceClicked) => {
		const el = document.getElementById(`spaceForeground${spaceClicked.spaceId}`);
			if (el) {
  				el.classList.remove('flash-error');

  				// Force a DOM reflow (forces browser to "register" the removal)
  				void el.offsetWidth;

  				el.classList.add('flash-error');
				}
	},

	playWinDing: () => {
  		if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }

  const synth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.1,
      release: 3
    }
  }).toDestination();

  const phrase = [
    { time: 0,      note: "A5",  velocity: 0.0787, duration: 0.1979 },
    { time: 0.125,  note: "D6",  velocity: 0.126,  duration: 0.1667 },
    { time: 0.25,   note: "E6",  velocity: 0.2047, duration: 0.1406 },
    { time: 0.375,  note: "G6",  velocity: 0.378,  duration: 0.375  },
    { time: 0.75,   note: "F#6", velocity: 0.165,  duration: 0.6354 }
  ];

  const now = Tone.now();

  phrase.forEach(note => {
    synth.triggerAttackRelease(
      note.note,
      note.duration,
      now + note.time,
      note.velocity
    );
  });
	},
	playErrorNoise: async () => {
		await Tone.start(); // Required for browsers to allow sound
	  
		const synth = new Tone.PolySynth(Tone.Synth, {
		  oscillator: { type: "triangle" },
		  envelope: {
			attack: 0.01,
			decay: 0.01,
			sustain: 0,
			release: 0.063
		  }
		}).toDestination();
	  
		const phrase = [
			{ time: 0, note: "C#4", velocity: 0.126, duration: 0.063 },
			{ time: 0, note: "D4",  velocity: 0.126, duration: 0.063 },
			{ time: 0, note: "D#4", velocity: 0.126, duration: 0.063 },
			{ time: 0, note: "E4",  velocity: 0.126, duration: 0.063 },
			{ time: 0, note: "F#4", velocity: 0.126, duration: 0.063 },
			{ time: 0, note: "G4",  velocity: 0.126, duration: 0.063 },
		  { time: 0, note: "C#3", velocity: 0.126, duration: 0.063 },
		  { time: 0, note: "D3",  velocity: 0.126, duration: 0.063 },
		  { time: 0, note: "D#3", velocity: 0.126, duration: 0.063 },
		  { time: 0, note: "E3",  velocity: 0.126, duration: 0.063 },
		  { time: 0, note: "F#3", velocity: 0.126, duration: 0.063 },
		  { time: 0, note: "G3",  velocity: 0.126, duration: 0.063 },
		  { time: 0, note: "G#3", velocity: 0.126, duration: 0.063 }
		];
	  
		const now = Tone.now();
	  
		phrase.forEach(note => {
		  synth.triggerAttackRelease(
			note.note,
			note.duration,
			now + note.time,
			note.velocity
		  );
		});
	  }
}