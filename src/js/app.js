$(document).ready(function(){
    const IMAGEPATH = "src/cards/";

    let cards = [{
            'id': 'ac',
            'value': 1
        }, {
            'id': 'ad',
            'value': 1
        }, {
            'id': 'ah',
            'value': 1
        }, {
            'id': 'as',
            'value': 1
        },

        {
            'id': '2c',
            'value': 2
        }, {
            'id': '2d',
            'value': 2
        }, {
            'id': '2h',
            'value': 2
        }, {
            'id': '2s',
            'value': 2
        },

        {
            'id': '3c',
            'value': 3
        }, {
            'id': '3d',
            'value': 3
        }, {
            'id': '3h',
            'value': 3
        }, {
            'id': '3s',
            'value': 3
        },

        {
            'id': '4c',
            'value': 4
        }, {
            'id': '4d',
            'value': 4
        }, {
            'id': '4h',
            'value': 4
        }, {
            'id': '4s',
            'value': 4
        },

        {
            'id': '5c',
            'value': 5
        }, {
            'id': '5d',
            'value': 5
        }, {
            'id': '5h',
            'value': 5
        }, {
            'id': '5s',
            'value': 5
        },

        {
            'id': '6c',
            'value': 6
        }, {
            'id': '6d',
            'value': 6
        }, {
            'id': '6h',
            'value': 6
        }, {
            'id': '6s',
            'value': 6
        },

        {
            'id': '7c',
            'value': 7
        }, {
            'id': '7d',
            'value': 7
        }, {
            'id': '7h',
            'value': 7
        }, {
            'id': '7s',
            'value': 7
        },

        {
            'id': '8c',
            'value': 8
        }, {
            'id': '8d',
            'value': 8
        }, {
            'id': '8h',
            'value': 8
        }, {
            'id': '8s',
            'value': 8
        },

        {
            'id': '9c',
            'value': 9
        }, {
            'id': '9d',
            'value': 9
        }, {
            'id': '9h',
            'value': 9
        }, {
            'id': '9s',
            'value': 9
        },

        {
            'id': '10c',
            'value': 10
        }, {
            'id': '10d',
            'value': 10
        }, {
            'id': '10h',
            'value': 10
        }, {
            'id': '10s',
            'value': 10
        },

        {
            'id': 'jc',
            'value': 10
        }, {
            'id': 'jd',
            'value': 10
        }, {
            'id': 'jh',
            'value': 10
        }, {
            'id': 'js',
            'value': 10
        },

        {
            'id': 'qc',
            'value': 10
        }, {
            'id': 'qd',
            'value': 10
        }, {
            'id': 'qh',
            'value': 10
        }, {
            'id': 'qs',
            'value': 10
        },

        {
            'id': 'kc',
            'value': 10
        }, {
            'id': 'kd',
            'value': 10
        }, {
            'id': 'kh',
            'value': 10
        }, {
            'id': 'ks',
            'value': 10
        },
    ];

    selectedNumbers = [];
    userNumbers = [];
    compNumbers = [];
    userCount = 2;

    let compScore, userScore;

    $('#playAgain').click(function() {
        window.location.reload();
    });

    $('#startGame').click(function() {
        $(this).hide();
        $('#gameBoard').show();
        for (var i = 0; i <= 1; i++) {
            userNumbers.push(getRandomNumber());
            compNumbers.push(getRandomNumber());
        }
        displayCardImages();
        setTimeout(setScores, 4000);
        setTimeout(showOptions, 4200);
    });

    showOptions = () => {
        if (userScore == 21) {
            userWinMessage();
        } else {
            $('#options').addClass("animated slideInUp");
            $('#options').show();
        }
    }

    //recursion if number is repeated
    getRandomNumber = () => {
        let randomNumber = Math.floor(Math.random() * 52);
        if (selectedNumbers.filter(n => n == randomNumber).length > 0) {
            randomNumber = getRandomNumber();
        }
        selectedNumbers.push(randomNumber);
        return randomNumber;
    }

    displayCardImages = () => {
        $('#compCard1').attr("src", IMAGEPATH + cards[compNumbers[0]].id + '.png');
        $('#compCard1').addClass("animated fadeInLeft");

        $('#userCard1').attr("src", IMAGEPATH + cards[userNumbers[0]].id + '.png');
        $('#userCard1').addClass("animated fadeInRight delay-1s");

        $('#compCard2').attr("src", "src/cards/back.png");
        $('#compCard2').addClass("animated fadeInLeft delay-2s");

        $('#userCard2').attr("src", IMAGEPATH + cards[userNumbers[1]].id + '.png');
        $('#userCard2').addClass("animated fadeInRight delay-3s");
    }

    setScores = () => {
        compScore = cards[compNumbers[0]].value;
        userScore = calculateScore(userNumbers);
        $('#compScore').html(compScore);
        $('#userScore').html(userScore);
    }

    $('#hitTheGame').click(function() {
        addUserCard();
    });

    addUserCard = () => {
        ++userCount;
        if (userScore < 21) {
            let randomNum = getRandomNumber();
            userNumbers.push(randomNum);
            userScore = calculateScore(userNumbers);
            $('#userCard' + userCount).attr("src", IMAGEPATH + cards[randomNum].id + '.png');
            $('#userCard' + userCount).addClass("animated fadeInRight");
        }

        $('#userScore').html(userScore);
        checkThatDamnScore();
    }

    checkThatDamnScore = () => {
        if (userScore == 21)
            userWinMessage();
        if (userScore > 21)
            userLoseMessage();
    }

    $('#stayTheGame').click(function() {
        $(this).attr('disabled', true);
        $('#hitTheGame').attr('disabled', true);
        turnTheCard();
        setTimeout(checkCompScore, 3000);
    });

    checkCompScore = () => {
        if (compScore > userScore && compScore >= 17 && compScore <= 21) {
            userLoseMessage();
        } else {
            let i = 2;
            while (compScore < 21) {
                ++i;
                if (compScore > userScore && compScore <= 21 && compScore > 17) {
                    userLoseMessage();
                    break;
                } else if (compScore > 21) {
                    userWinMessage();
                    break;
                }
                let randomNum = getRandomNumber();
                compNumbers.push(randomNum);
                $('#compCard' + i).attr("src", IMAGEPATH + cards[randomNum].id + '.png');
                compScore = calculateScore(compNumbers);
                $('#compScore').html(compScore);
            }
            checkWinner();
        }
    }

    checkWinner = () => {
        if (compScore > userScore && compScore <= 21 && compScore > 17) {
            userLoseMessage();
        } else if (compScore > 21) {
            userWinMessage();
        }
    }

    userLoseMessage = () => {
        $('#options').hide();
        $('#result').html("You Lose");
        $('#result').addClass("alert alert-danger");
        $('#gameResult').show();
    }

    userWinMessage = () => {
        $('#options').hide();
        $('#result').html("You Win");
        $('#result').addClass("alert alert-success");
        $('#gameResult').show();
    }

    turnTheCard = () => {
        $('#compCard2').addClass("animated flipInY");
        $('#compCard2').attr("src", IMAGEPATH + cards[compNumbers[1]].id + '.png');
        setTimeout(calculateCompScoreAfterTurn, 2500);
    }

    calculateCompScoreAfterTurn = () => {
        compScore = calculateScore(compNumbers);
        $('#compScore').html(compScore);
    }

    calculateScore = (arr) => {
        let otherNumbersSum;
        let nonAceValues = arr.filter(u => u > 3);

        if (nonAceValues.length == 1) {
            otherNumbersSum = cards[nonAceValues[0]].value;
        } else if (nonAceValues.length > 1) {
            otherNumbersSum = nonAceValues.reduce((a, v) => a + cards[v].value, 0);
        }

        if (arr.filter(n => n <= 3).length > 0) {
            if (otherNumbersSum > 10) {
                return otherNumbersSum + arr.filter(n => n <= 3).length;
            }
            return otherNumbersSum + 11 + (arr.filter(n => n <= 3).length - 1);
        }

        return otherNumbersSum;
    }
});