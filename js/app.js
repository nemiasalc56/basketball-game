class Basketball {
    constructor() {
        this.powerLevel = null
        this.direction = null
        this.start = false
        this.player = 1
    }

    runPowerSelector() {
        const $dot = $('#dotP').css('animation-play-state', 'running')
    }

    runPowerSelector2() {
        const $dot = $('#dotP2').css('animation-play-state', 'running')
    }

    stopPowerSelector() {
        const $dot2 = $('#dotP').css('animation-play-state', 'paused')
        const $dot = $('#dotP').position().top
        this.getPowerLevel($dot)
    }

    stopPowerSelector2() {
        const $dot2 = $('#dotP2').css('animation-play-state', 'paused')
        const $dot = $('#dotP2').position().top
        this.getPowerLevel($dot)
    }

    runDirSelector() {
        const $dot = $('#dotD').css('animation-play-state', 'running')
    }

    runDirSelector2() {
        const $dot = $('#dotD2').css('animation-play-state', 'running')
    }

    stopDirSelector() {
        const $dot2 = $('#dotD').css('animation-play-state', 'paused')
        const $dot = $('#dotD').position().top
        this.getBallDirection($dot)
    }

    stopDirSelector2() {
        const $dot2 = $('#dotD2').css('animation-play-state', 'paused')
        const $dot = $('#dotD2').position().top
        this.getBallDirection($dot)
    }

    getPowerLevel(power) {
        const myPower = Math.floor((power * 100) / 50)
        this.powerLevel = myPower
    }

    getBallDirection(dir) {
        const ballDirection = Math.floor((dir * 100) / 100)

        this.direction = ballDirection

    }

    startSwitch() {
        if (this.start === false) {
            this.start = true
        } else if (this.start === true) {
            this.start = false
        }
    }

    switchPlayer() {
        if (this.player === 1) {
            this.player = 2
            $('.player-info').css('color', 'white')
        } else if (this.player === 2) {
            this.player = 1
            $('.player-info').css('color', 'black')
        }
    }

}

const game = {
    remainingAttemp: 3,
    score: 0,
    round: 0,
    round2: 1,
    power: 1,
    collisionDetected: false,
    myIntervalId: 0,
    myIntervalId2: 0,
    highEnough: false,
    hitTarget: false,
    powerWasCalled: false,
    dirWasCalled: false,
    basketballClass: new Basketball(),
    playerOnePoint: 0,
    playerTwoPoint: 0,
    playerOneRound: 0,
    playerTwoRound: 0,
    sliderA: false,
    sliderB: false,
    slidersSelected: false,
    ballWasThrown: false,
    startGame() {
        $('.player-info').css('display', 'block')
        $('#select-panel').css('display', 'block')
        $('#select-panel2').css('display', 'block')
        $('.main-container').css('display', 'block')
        $('.control1').css('display', 'block')
        $('.control2').css('display', 'block')
        $('.start').css('display', 'none')

        this.basketballClass.startSwitch()
        $('.score-num').text(this.score)
        $('.attemp-num').text(this.remainingAttemp)
        $('.round-num').text(this.round2)
    },
    throwBall(power, num) {
        $('#ball').css('animation-play-state', 'running')
        $('.ball2').animate(power, 900);
        $('.ball2').animate({
            top: '+=2000px',
            width: '-=60px',
            height: '-=80px'
        }, 2500)

        this.myIntervalId2 = setInterval(() => {
            this.resetBallPosition()
            this.getStatus()
        }, 10)

    },
    shootingDir(input1, input2) {
        const num = {
            top: `-=${this.basketballClass.powerLevel}px`,
            left: `${this.basketballClass.direction}px`,
            width: '-=30px',
            height: '-=30px'
        }
        this.throwBall(num)
        this.time()
    },

    checkCollision() {
        const $ring = $('#rim')[0].getBoundingClientRect()
        const $ball = $('#ball')[0].getBoundingClientRect()

        if ($ball.top < 100) {
            this.highEnough = true
            $('#rim').appendTo($('.main-container'))
        }

        if (this.highEnough) {
            if ($ring.x < $ball.x + $ball.width &&
                $ring.x + $ring.width > $ball.x &&
                $ring.y < $ball.y + $ball.height &&
                $ring.y + $ring.height > $ball.y) {

                this.collisionDetected = true
                this.checkHitTarget()

            } else {
                this.collisionDetected = false
            }
        }
    },
    checkHitTarget() {
        const $ball = $('#ball')[0].getBoundingClientRect()
        if (this.collisionDetected &&
            $ball.left > 664 && $ball.left < 687) {
            this.score++
            this.highEnough = false
            clearInterval(this.myIntervalId);
        } else if (this.collisionDetected && $ball.left < 635) {
            $('#ball').stop()
            clearInterval(this.myIntervalId);
            this.highEnough = false
            $('#ball').animate({
                top: '-=180px',
                left: '-=90px'
            }, 600);
            $('#ball').animate({
                top: '+=1300px',
                left: '-=90px'
            }, 1800)

            this.remainingAttemp--

        } else if (this.collisionDetected && $ball.left > 635 &&
            $ball.left < 665) {
            $('#ball').stop()
            clearInterval(this.myIntervalId);
            this.highEnough = false
            $('#ball').animate({
                top: '-=180px',
                left: '+=100px'
            }, 600);
            $('#ball').animate({
                top: '+=1300px',
                left: '+=90px',
            }, 1800)

            this.remainingAttemp--

        } else if (this.collisionDetected &&
            $ball.left > 684 && $ball.left < 708) {
            $('#ball').stop()
            clearInterval(this.myIntervalId)
            this.highEnough = false
            $('#ball').animate({
                top: '-=180px',
                left: '-=90px'
            }, 600);
            $('#ball').animate({
                top: '+=1300px',
                left: '-=90px'
            }, 1800)

            this.remainingAttemp--

        } else if (this.collisionDetected &&
            $ball.left > 708) {
            $('#ball').stop()
            clearInterval(this.myIntervalId)
            this.highEnough = false

            $('#ball').animate({
                top: '-=180px',
                left: '+=100px'
            }, 600);
            $('#ball').animate({
                top: '+=1300px',
                left: '+=90px',
            }, 1800)

            this.remainingAttemp--

        }
        $('.score-num').text(this.score)
        $('.attemp-num').text(this.remainingAttemp)
        $('.round-num').text(this.round2)
    },
    time() {
        this.myIntervalId = setInterval(() => {
            this.checkCollision()
        }, 1)
    },
    keyPressed(key) {
        if (key.toLowerCase() === 'w' && this.powerWasCalled === false &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 1 &&
            this.sliderA === false) {
            this.basketballClass.runPowerSelector()
            // turn off the other letters until the player stops the slider

            this.powerWasCalled = true
        } else if (key.toLowerCase() === 'w' && this.powerWasCalled &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 1) {
            this.basketballClass.stopPowerSelector()
            this.sliderA = true
            
        } else if (key.toLowerCase() === 'r' && this.dirWasCalled === false &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 1 &&
            this.sliderA) {
            this.basketballClass.runDirSelector()
            this.dirWasCalled = true
            
        } else if (key.toLowerCase() === 'r' && this.dirWasCalled &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 1 &&
            this.sliderA) {
            this.basketballClass.stopDirSelector()
            this.sliderB = true
            if(this.sliderA) {
                this.slidersSelected = true
                this.ballWasThrown = false
            }
        } else if (key.toLowerCase() === 'f' &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 1 && this.slidersSelected &&
            this.ballWasThrown === false) {
            this.shootingDir()
            this.ballWasThrown = true
            this.sliderA = false
            this.sliderB = false
            this.slidersSelected = false
        }
    },
    resetBallPosition() {
        if ($('#ball')[0].getBoundingClientRect().top > 700) {
            $('#ball').stop()
            $('#ball').css({
                left: '170px',
                top: '590px',
                width: '130px',
                height: '130px'
            })
            $('#dotP').css({
                'animation-name': 'more',
                top: '20px'
            })
            $('#dotD').css({
                'animation-name': 'more',
                top: '20px'
            })

            $('#dotP2').css({
                'animation-name': 'more',
                top: '20px'
            })
            $('#dotD2').css({
                'animation-name': 'more',
                top: '20px'
            })

            if ($('#dotP').css('animation-name') == 'more') {
                $('#dotP').css({
                    'animation-name': 'slide'
                })
                this.powerWasCalled = false
                $('#dotD').css({
                    'animation-name': 'range'
                })
                $('#dotP2').css({
                    'animation-name': 'slide'
                })
                this.powerWasCalled = false
                $('#dotD2').css({
                    'animation-name': 'range'
                })

                this.dirWasCalled = false
                this.basketballClass.powerLevel = 0
                this.basketballClass.direction = 0
                if (this.collisionDetected === false) {
                    this.remainingAttemp--
                }
                $('#ball').appendTo($('.main-container'))
                clearInterval(this.myIntervalId2)
                clearInterval(this.myIntervalId)
            }
            this.collisionDetected = false
            this.highEnough = false
            $('.attemp-num').text(this.remainingAttemp)
        }
    },

    getStatus() {
        if (this.remainingAttemp === 0) {
            if (this.basketballClass.player === 1) {
                this.playerOnePoint = this.score
            } else if (this.basketballClass.player === 2) {
                this.playerTwoPoint = this.score
                this.winRound()
                this.round++
                this.round2++
                this.winSceneario()
            }
            this.remainingAttemp = 3
            this.basketballClass.switchPlayer()
            this.score = 0
            $('.attemp-num').text(this.remainingAttemp)
            $('.score-num').text(this.score)
            $('.round-num').text(this.round2)
            $('.player-num').text(this.basketballClass.player)
            $('.player').text(this.basketballClass.player)
        }
    },
    winRound() {
        if (this.remainingAttemp === 0 &&
            this.basketballClass.player === 2) {

            if (this.playerOnePoint > this.playerTwoPoint) {
                this.playerOneRound++
                this.winCircle()
            } else if (this.playerOnePoint < this.playerTwoPoint) {
                this.playerTwoRound++
                this.winCircle2()
            }
        }
    },
    keyPressed2(key) {
        if (key.toLowerCase() === 'u' &&
            this.powerWasCalled === false &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 2 &&
            this.sliderA === false) {
            this.basketballClass.runPowerSelector2()
            this.powerWasCalled = true

        } else if (key.toLowerCase() === 'u' &&
            this.powerWasCalled &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 2) {
            this.basketballClass.stopPowerSelector2()
            this.sliderA = true

        } else if (key.toLowerCase() === 'i' &&
            this.dirWasCalled === false &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 2 && 
            this.sliderA) {
            this.basketballClass.runDirSelector2()
            this.dirWasCalled = true

        } else if (key.toLowerCase() === 'i' && this.dirWasCalled &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 2 ) {
            this.basketballClass.stopDirSelector2()
            this.sliderB = true
            if(this.sliderA) {
                this.slidersSelected = true
                this.ballWasThrown = false
            }

        } else if (key.toLowerCase() === 'j' &&
            this.basketballClass.start === true &&
            this.basketballClass.player === 2 &&
            this.slidersSelected && this.ballWasThrown === false) {
            this.shootingDir()
            this.ballWasThrown = true

            this.slidersSelected = false
            this.sliderA = false
            this.sliderB = false
        }
    },
    winSceneario() {
        if (this.round >= 4) {
            if (this.playerOneRound > this.playerTwoRound) {
                $('.rounds').remove()
                this.hideBackground()
                clearInterval(this.myIntervalId);
                clearInterval(this.myIntervalId2);
                $('.winner-container').css('display', 'block')
                $('<p id="winner">Player 1 is the winner!!</p>').appendTo('.winner-container')

            } else if (this.playerOneRound < this.playerTwoRound) {
                $('.rounds').remove()
                this.hideBackground()
                clearInterval(this.myIntervalId2);
                $('.winner-container').css('display', 'block')
                $('<p id="winner">Player 2 is the winner!!</p>').appendTo('.winner-container')
            }
        }
    },
    winCircle() {
        $('<div class="rounds"></div>').appendTo($('.board1'))
    },
    winCircle2() {
        $('<div class="rounds"></div>').appendTo($('.board2'))
    },
    hideBackground() {
        $('.player-info').css('display', 'none')
        $('#select-panel').css('display', 'none')
        $('#select-panel2').css('display', 'none')
        $('.main-container').css('display', 'none')
        $('.control1').css('display', 'none')
        $('.control2').css('display', 'none')
    },
    easyOption() {
        $('#dotP').css('animation-duration', '11s')
        $('#dotP2').css('animation-duration', '11s')

        $('#dotD').css('animation-duration', '11s')
        $('#dotD2').css('animation-duration', '11s')
    },
    normalOption() {
        $('#dotP').css('animation-duration', '7s')
        $('#dotP2').css('animation-duration', '7s')

        $('#dotD').css('animation-duration', '7s')
        $('#dotD2').css('animation-duration', '7s')
    },
    hardOption() {
        $('#dotP').css('animation-duration', '2s')
        $('#dotP2').css('animation-duration', '2s')

        $('#dotD').css('animation-duration', '2s')
        $('#dotD2').css('animation-duration', '2s')
    }
}

$(document).on('keypress', (e) => {
    game.keyPressed(e.key)
    game.keyPressed2(e.key)
})

$('.easy-button').click((e) => {
    game.startGame()
    game.easyOption()
})

$('.normal-button').click((e) => {
    game.startGame()
    game.normalOption()
})

$('.hard-button').click((e) => {
    game.startGame()
    game.hardOption()
})