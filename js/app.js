console.log('basketball game');

class Basketball {
	constructor(position) {
		this.position = position
	}
}

const game = {
	remainingAttemp: 2,
	points: 0,
	power: 1,
	collisionDetected: false,
	myIntervalId: 0,
	highEnough: false,
	// throw the ball
	throwBall() {
		// ball goes up
		$('#ball').animate({ 
			top:'-=80%'
		}, 600);

		// the ball goes down
		$('#ball').animate({
			top: '+=100%'
		}, 800)
	},

	// check collision
	checkCollision() {
		const $ring = $('#ring')[0].getBoundingClientRect()
		const $ball = $('#ball')[0].getBoundingClientRect()

		// const dx = $ring.x - $ball.x
		// const dy = $ring.y - $ball.y
		// const ballRadius = $ball.height / 2
		// const ringRadius = $ring.height
		// console.log(ballRadius);
		// console.log(ringRadius);
		// const distance = Math.sqrt(dx*dx + dy*dy)

		// check the position 

		if($ball.top < 100) {
			console.log('is less');
			this.highEnough = true

		}

		if(this.highEnough) {
			if($ring.x < $ball.x + $ring.width && 
				$ring.x + $ring.width > $ball.x &&
				$ring.y < $ball.y + $ball.height &&
				$ring.y + $ring.height > $ball.y) {
				console.log('Collision detected');
	
				this.collisionDetected = true
				$('#ball').attr('class', 'collision-state')
				$('#ball').animate({ 
					top:'-=30%',
					left: '-=30%'
				}, 500);
				$('#ball').stop()

			}  else {
			this.collisionDetected = false
			$('#ball').attr('class', 'collision-state1')

		}	

		}
		console.log($ball);
	},
	speed() {
		this.myIntervalId = setInterval(function(){
			game.checkCollision()
		}, 100)
	}
}


// Listeners
$('#ball').click(function() {
	game.speed()
	game.throwBall()
});
