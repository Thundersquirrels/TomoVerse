var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var ball;
var pegs;

function preload ()
{
    this.load.image('ball', 'assets/example.png');
    this.load.image('peg', 'assets/peg.jpeg');
    this.load.image('box', 'assets/box.png');
    this.load.on('complete', () => {
        createSprites(this);
    });
}

var score = 0;
var scoreText;
var scoreBoxes;

function create ()
{
    pegs = this.physics.add.staticGroup(); // Create a group for the pegs

    var rows = 5;
    var spacing = 80; // adjust as needed

    for (var i = 1; i < rows; i++) {
        for (var j = 0; j <= i; j++) {
            var x = this.cameras.main.centerX - i * spacing / 2 + j * spacing;
            var y = spacing + i * spacing;
            var peg = this.physics.add.staticSprite(x, y, 'peg');
            peg.setCircle(peg.width / 2);
            pegs.add(peg); // Add the peg to the group
        }
    }
    

    ball = this.physics.add.sprite(200 + Math.random() * 50, 50, 'ball');
    ball.setBounce(0.8);
    ball.setCollideWorldBounds(true);
    ball.setCircle(ball.width / 2);

    // Set the size of the ball
    ball.displayWidth = 50;
    ball.displayHeight = 50;

    this.physics.add.collider(ball, pegs); // Now pegs is defined

    var button = document.createElement("button");
    button.innerText = "Return to Home Screen";
    button.addEventListener("click", function() {
        window.location.href = "localhost:8080/src/index.html";
    });
    document.body.appendChild(button);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    scoreBoxes = this.physics.add.staticGroup();
    for (var i = 0; i < 10; i++) {
        var x = i * this.cameras.main.width / 10 + this.cameras.main.width / 20;
        var y = this.cameras.main.height - 50;
        var box = this.physics.add.staticSprite(x, y, 'box');
        scoreBoxes.add(box);
    }

    // Set the size of the boxes
    scoreBoxes.children.iterate(function (box) {
        box.displayWidth = 50;
        box.displayHeight = 50;
    });

    this.physics.add.collider(ball, scoreBoxes, hitBox, null, this);

    var addBallButton = this.add.text(200, 800, 'Add Ball', { fontSize: '32px', fill: '#000' });
    addBallButton.setInteractive();
    addBallButton.on('pointerdown', () => addBall(this));
}

function update ()
{
    // Add game logic here
}

function hitBox (ball, box)
{
    score += 10;
    scoreText.setText('Score: ' + score);
}

function addBall (scene)
{
    var newBall = scene.physics.add.sprite(250, 50, 'ball');
    newBall.setBounce(1);
    newBall.setCollideWorldBounds(true);
    newBall.setCircle(newBall.width / 2);
    scene.physics.add.collider(newBall, pegs);
    scene.physics.add.collider(newBall, scoreBoxes, hitBox, null, scene);
}

function createSprites(scene)
{
    // Set the size of the boxes
    pegs.children.iterate(function (peg) {
        peg.displayWidth = 50;
        peg.displayHeight = 50;
    });
}