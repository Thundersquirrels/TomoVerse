// Class definitions
class Player {
    constructor(game, health, energy, speed) {
        this.element = document.createElement('div');
        this.element.id = 'player';
        this.game = game;
        this.maxHealth = health;
        this.health = this.maxHealth;
        this.maxEnergy = energy;
        this.energy = this.maxEnergy;
        this.speed = speed;
        this.coins = 0;
        this.direction = 'down';
        this.maxInvincibility = 20;
        this.invincibility = this.maxInvincibility;
        this.energyRegen = 0.1;
        this.level = 1;
        this.maxExp = this.level ** 1.5 + 2;
        this.exp = 0;

        // // Create a new image object for the player sprite
        // this.sprite = new Image();

        // // Set the source of the image
        // this.sprite.src = 'assets/player_frame1.png';
    }

    // draw() {
    //     this.game.ctx.drawImage(this.sprite, this.position.x, this.position.y, this.game.tileSize, this.game.tileSize);
    // }

    gainExp(exp) {
        this.exp += exp;
        if (this.exp >= this.maxExp) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.maxExp = this.level ** 1.5 + 2;
        this.exp = 0;
        this.maxHealth = this.level + 5;
        this.health = this.maxHealth;
        this.maxEnergy = this.level + 5;
        this.energy = this.maxEnergy;
        this.speed = this.level + 10;
        this.energyRegen = this.level * 0.1;
        this.game.updateHUD();
    }

    updateDirection() {
        switch (this.direction) {
            case 'up':
                this.element.style.transform = 'translate(-50%, -50%) rotate(180deg)';
                break;
            case 'right':
                this.element.style.transform = 'translate(-50%, -50%) rotate(270deg)';
                break;
            case 'down':
                this.element.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                break;
            case 'left':
                this.element.style.transform = 'translate(-50%, -50%) rotate(90deg) ';
                break;
        }
    }

    takeDamage(damage) {
        if (this.invincibility > 0) {
            return;
        }
        this.invincibility = this.maxInvincibility;
        this.health -= damage;
        this.element.style.backgroundColor = "#700707";
        this.game.updateHealthBar();
        if (this.health === 0) {
            setTimeout(() => {
                alert('Game over!');
                this.game.cashOut();
            }, 100);
        }
        setTimeout(() => {
            this.element.style.backgroundColor = "#185bb3";
        }, 100);
    }

    move(direction) {
        var nextX = this.position.x;
        var nextY = this.position.y;
    
        var moveAmount = this.speed / this.game.map.tileSize;
        
        switch (direction) {
            case 'left':
                nextX -= moveAmount;
                break;
            case 'right':
                nextX += moveAmount;
                break;
            case 'up':
                nextY -= moveAmount;
                break;
            case 'down':
                nextY += moveAmount;
                break;
        }
    
        var loadNextMap = false;
        if (nextX < -0.3 && this.game.worldPosition.x > 0 && this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x - 1] !== 0 && nextY < this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x - 1].mapSize.height) {
            loadNextMap = true;
            for (var child of this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x - 1].mapArray[Math.round(this.position.y)][this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x - 1].mapSize.width - 1].element.children) {
                if (child.classList.contains('rock')) {
                    loadNextMap = false;
                }
            }
            if (loadNextMap) {
                this.game.worldPosition.x--;
                this.position.x = this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x].mapSize.width - 0.7;
            }
        }
        else if (nextX > this.game.map.mapSize.width - 0.7 && this.game.worldPosition.x < this.game.worldMapSize.width - 1 && this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x + 1] !== 0 && nextY < this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x + 1].mapSize.height) {
            loadNextMap = true;
            for (var child of this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x + 1].mapArray[Math.round(this.position.y)][0].element.children) {
                if (child.classList.contains('rock')) {
                    loadNextMap = false;
                }
            }
            if (loadNextMap) {
                this.game.worldPosition.x++;
                this.position.x = -0.3;
            }
        }
        else if (nextY < -0.3 && this.game.worldPosition.y > 0 && this.game.worldMap[this.game.worldPosition.y - 1][this.game.worldPosition.x] !== 0 && nextX < this.game.worldMap[this.game.worldPosition.y - 1][this.game.worldPosition.x].mapSize.width) {
            loadNextMap = true;
            for (var child of this.game.worldMap[this.game.worldPosition.y - 1][this.game.worldPosition.x].mapArray[this.game.worldMap[this.game.worldPosition.y - 1][this.game.worldPosition.x].mapSize.height - 1][Math.round(this.position.x)].element.children) {
                if (child.classList.contains('rock')) {
                    loadNextMap = false;
                }
            }
            if (loadNextMap) {
                this.game.worldPosition.y--;
                this.position.y = this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x].mapSize.height - 0.7;
            }
        }
        else if (nextY > this.game.map.mapSize.height - 0.7 && this.game.worldPosition.y < this.game.worldMapSize.height - 1 && this.game.worldMap[this.game.worldPosition.y + 1][this.game.worldPosition.x] !== 0 && nextX < this.game.worldMap[this.game.worldPosition.y + 1][this.game.worldPosition.x].mapSize.width) {
            loadNextMap = true;
            for (var child of this.game.worldMap[this.game.worldPosition.y + 1][this.game.worldPosition.x].mapArray[0][Math.round(this.position.x)].element.children) {
                if (child.classList.contains('rock')) {
                    loadNextMap = false;
                }
            }
            if (loadNextMap) {
                this.game.worldPosition.y++;
                this.position.y = -0.3;
            }
        }
        if (loadNextMap) {
            this.game.map.clear();
            this.game.map = this.game.worldMap[this.game.worldPosition.y][this.game.worldPosition.x];
            this.game.map.load();
            return;
        }
        if (nextX < -0.3) {
            nextX = -0.3;
        }
        if (nextX > this.game.map.mapSize.width - 0.7) {
            nextX = this.game.map.mapSize.width - 0.7;
        }
        if (nextY < -0.3) {
            nextY = -0.3;
        }
        if (nextY > this.game.map.mapSize.height - 0.7) {
            nextY = this.game.map.mapSize.height - 0.7;
        }
        var nextTile = this.game.map.mapArray[Math.round(nextY)][Math.round(nextX)];
        var canMove = true;
        for (var child of nextTile.element.children) {
            if (child.classList.contains('rock')) {
                canMove = false;
                break;
            }
        }
        if (canMove) {
            this.position.x = nextX;
            this.position.y = nextY;
            this.element.style.left = ((this.position.x + 0.5) * this.game.map.tileSize) + 'px';
            this.element.style.top = ((this.position.y + 0.5) * this.game.map.tileSize) + 'px';
            for (var child of nextTile.element.children) {
                if (child.classList.contains('exit')) {
                    this.game.finishWorld();
                    return;
                }
            }
        }
    }

    fireProjectile() {
        if (this.game.player.energy <= 0) {
            return;
        }
        var projectile = new Projectile(this.game, this.position.x, this.position.y, 20, this.direction);
        this.game.map.element.appendChild(projectile.element);
        this.game.map.projectiles.push(projectile);
        this.energy--;
        this.game.updateEnergyBar();
    }
}

class Projectile {
    constructor(game, x, y, speed, direction) {
        this.game = game;
        this.position = { x: x, y: y };
        this.speed = speed;
        this.direction = direction;
        this.element = document.createElement('div');
        this.element.classList.add('projectile');
        this.element.style.left = ((this.position.x + 0.5) * this.game.map.tileSize) + 'px';
        this.element.style.top = ((this.position.y + 0.5) * this.game.map.tileSize) + 'px';
    }

    remove() {
        this.element.remove();
        const index = this.game.map.projectiles.indexOf(this);
        if (index !== -1) {
            this.game.map.projectiles.splice(index, 1);
        }
    }

    move() {
        var moveAmount = this.speed / this.game.map.tileSize;
        switch (this.direction) {
            case 'left':
                this.position.x -= moveAmount;
                break;
            case 'right':
                this.position.x += moveAmount;
                break;
            case 'up':
                this.position.y -= moveAmount;
                break;
            case 'down':
                this.position.y += moveAmount;
                break;
        }
        if (this.position.x < -0.4 || this.position.x > this.game.map.mapSize.width - 0.6 || this.position.y < -0.4 || this.position.y > this.game.map.mapSize.height - 0.6) {
            this.remove();
        } else {
            this.element.style.left = ((this.position.x + 0.5) * this.game.map.tileSize) + 'px';
            this.element.style.top = ((this.position.y + 0.5) * this.game.map.tileSize) + 'px';
            var tile = this.game.map.mapArray[Math.round(this.position.y)][Math.round(this.position.x)];
            for (var child of tile.element.children) {
                if (child.classList.contains('tree')) {
                    child.remove();
                    if (Math.random() < 0.2) {
                        new Coin(this.game, tile.position.x, tile.position.y);
                    }
                    this.remove();
                } else if (child.classList.contains('rock')) {
                    this.remove();
                }
            }
            for (var enemy of this.game.map.enemies) {
                if (Math.abs(this.position.x - enemy.position.x) < 0.5 && Math.abs(this.position.y - enemy.position.y) < 0.5) {
                    enemy.remove();
                    this.remove();
                }
            }
        }
        
    }
}

class Enemy {
    constructor(game, x, y, speed) {
        this.game = game;
        this.position = { x: x, y: y };
        this.speed = speed;
        this.attack = 1;
        this.expValue = 1;
        this.element = document.createElement('div');
        this.element.className = 'enemy';
    }

    remove() {
        this.element.remove();
        this.game.player.gainExp(this.expValue);
        new Coin(this.game, this.position.x, this.position.y);
        const index = this.game.map.enemies.indexOf(this);
        if (index !== -1) {
            this.game.map.enemies.splice(index, 1);
        }
    }

    move() {
        if (this.game.player.invincibility > 0) {
            return;
        }
        if (Math.abs(this.game.player.position.x - this.position.x) < 0.5 && Math.abs(this.game.player.position.y - this.position.y) < 0.5) {
            this.game.player.takeDamage(this.attack);
            return;
        }
        var directionX = this.game.player.position.x - this.position.x;
        var directionY = this.game.player.position.y - this.position.y;
        // Normalize the direction
        var length = Math.sqrt(directionX * directionX + directionY * directionY);
        directionX /= length;
        directionY /= length;
        var moveAmount = this.speed / this.game.map.tileSize;
        // Move the enemy moveAmount distance towards the player
        var nextX = this.position.x + directionX * moveAmount;
        var nextY = this.position.y + directionY * moveAmount;

        var canMove = true;
        if (nextX < -0.3 || nextX > this.game.map.mapSize.width - 0.7 || nextY < -0.3 || nextY >= this.game.map.mapSize.height - 0.7) {
            canMove = false;
        } else {
            for (var child of this.game.map.mapArray[Math.round(nextY)][Math.round(nextX)].element.children) {
                if (child.classList.contains('rock')) {
                    canMove = false;
                    break;
                }
            }
            if (!canMove) {
                canMove = true;
                nextX = this.position.x;
                nextY = this.position.y + directionY * moveAmount;
                for (var child of this.game.map.mapArray[Math.round(nextY)][Math.round(nextX)].element.children) {
                    if (child.classList.contains('rock')) {
                        canMove = false;
                        break;
                    }
                }
            }
            if (!canMove) {
                canMove = true;
                nextX = this.position.x + directionX * moveAmount;
                nextY = this.position.y;
                for (var child of this.game.map.mapArray[Math.round(nextY)][Math.round(nextX)].element.children) {
                    if (child.classList.contains('rock')) {
                        canMove = false;
                        break;
                    }
                }
            }
            for (var enemy of this.game.map.enemies) {
                if (enemy !== this && Math.abs(nextX - enemy.position.x) < 0.5 && Math.abs(nextY - enemy.position.y) < 0.5) {
                    canMove = false;
                    break;
                }
            }
        }
        if (canMove) {
            this.position.x = nextX;
            this.position.y = nextY;
            this.element.style.left = ((this.position.x + 0.5) * this.game.map.tileSize) + 'px';
            this.element.style.top = ((this.position.y + 0.5) * this.game.map.tileSize) + 'px';
        }
    }
}

class Map {
    constructor(game, mapData) {
        this.element = document.createElement('div');
        this.element.id = 'map';
        this.game = game;
        this.mapSize = { width: mapData[0].length, height: mapData.length };
        this.tileSize = Math.floor(this.game.hudSize * 16 / this.mapSize.width);
        this.enemies = [];
        this.projectiles = [];
        this.collectibles = [];
    
        // Create the map
        this.mapArray = new Array(this.mapSize.height).fill(0).map(() => new Array(this.mapSize.width).fill(0));
        for (var y = 0; y < this.mapSize.height; y++) {
            for (var x = 0; x < this.mapSize.width; x++) {
                this.mapArray[y][x] = new Tile(this.game, x, y, mapData[y][x], this);
                if (mapData[y][x] === 3) {
                    this.enemies.push(new Enemy(this.game, x, y, 5));
                }
            }
        }
        for (var enemy of this.enemies) {
            this.element.appendChild(enemy.element);
            enemy.element.style.left = (enemy.position.x * this.tileSize + this.tileSize / 2) + 'px';
            enemy.element.style.top = (enemy.position.y * this.tileSize + this.tileSize / 2) + 'px';
        }
    }

    load() {
        this.game.element.appendChild(this.element);
        this.element.appendChild(this.game.player.element);
        this.game.player.element.style.left = (this.game.player.position.x * this.tileSize + this.tileSize / 2) + 'px';
        this.game.player.element.style.top = (this.game.player.position.y * this.tileSize + this.tileSize / 2) + 'px';
        document.documentElement.style.setProperty('--tileSize', this.tileSize + 'px');
        document.documentElement.style.setProperty('--mapWidth', this.mapSize.width);
        document.documentElement.style.setProperty('--mapHeight', this.mapSize.height);
        this.game.player.invincibility = this.game.player.maxInvincibility;
        this.game.updateHUD();
        this.game.checkWin();
    }

    clear() {
        this.game.element.removeChild(this.element);
        let children = Array.from(this.element.childNodes);
        for (let child of children) {
            if (child.id === 'player') {
                child.remove();
            }
        }
    }
}

class Tile {
    constructor(game, x, y, type, map) {
        this.game = game;
        this.element = document.createElement('div');
        this.element.style.left = x * map.tileSize + 'px';
        this.element.style.top = y * map.tileSize + 'px';
        this.element.classList.add('tile');
        this.position = { x: x, y: y };
        map.element.appendChild(this.element);

        if (type === 1) {
            this.addTree();
        } else if (type === 2) {
            this.addRock();
        }
    }

    addTree() {
        var tree = document.createElement('div');
        tree.classList.add('tree');
        this.element.appendChild(tree);
    }

    addRock() {
        var rock = document.createElement('div');
        rock.classList.add('rock');
        this.element.appendChild(rock);
    }
}

class Collectible {
    constructor(game, x, y) {
        this.game = game;
        this.position = { x: x, y: y };
        this.game.map.collectibles.push(this);
        this.element = document.createElement('div');
        this.element.classList.add('collectible');
        this.game.map.element.appendChild(this.element);
        this.element.style.left = ((this.position.x + 0.5) * this.game.map.tileSize) + 'px';
        this.element.style.top = ((this.position.y + 0.5) * this.game.map.tileSize) + 'px';
    }

    remove() {
        this.element.remove();
        const index = this.game.map.collectibles.indexOf(this);
        if (index !== -1) {
            this.game.map.collectibles.splice(index, 1);
        }
    }
}

class Coin extends Collectible {
    constructor(game, x, y) {
        super(game, x, y);
        this.element.classList.add('coin');
    }
}

// Main game logic
class Game {
    constructor() {
        this.active = true;
        this.worldLevel = 1;
        this.worldFinished = false;
        this.exitSpawned = false;
        this.ticksPerSecond = 20;
        this.tickLength = 1000 / this.ticksPerSecond;
        this.tick = setInterval(() => {
            this.updateGame();
        }, this.tickLength);
        document.documentElement.style.setProperty('--tickLength', this.tickLength + 'ms');
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            fire: false,
        };

        this.hudSize = Math.min(Math.floor(document.documentElement.clientHeight / 20), Math.floor(document.documentElement.clientWidth / 20));

        this.element = document.createElement('div');
        this.element.id = 'gameWindow';
        // this.canvas = document.createElement('canvas');

        // // Get the 2D rendering context of the canvas
        // this.ctx = this.canvas.getContext('2d');

        // // Set the size of the canvas
        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight;

        // // Append the canvas to the body of the document
        // //document.body.appendChild(this.canvas);

        this.minimap = document.createElement('div');
        this.minimap.id = 'minimap';
        this.element.appendChild(this.minimap);

        this.energyBar = document.createElement('div');
        this.energyBar.id = 'energyBar';
        this.element.appendChild(this.energyBar);

        this.healthBar = document.createElement('div');
        this.healthBar.id = 'healthBar';
        this.element.appendChild(this.healthBar);

        this.coinBar = document.createElement('div');
        this.coinBar.id = 'coinBar';
        this.element.appendChild(this.coinBar);

        this.experienceBar = document.createElement('div');
        this.experienceBar.id = 'experienceBar';
        this.element.appendChild(this.experienceBar);
        this.experienceBarOutline = document.createElement('div');
        this.experienceBarOutline.id = 'experienceBarOutline';
        this.element.appendChild(this.experienceBarOutline);

        this.player = new Player(this, 5, 5, 10);
        this.loadNewWorld();

        // Listen for keydown and keyup events to update the state of the keys
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'a':
                    this.keys.left = true;
                    break;
                case 'd':
                    this.keys.right = true;
                    break;
                case 'w':
                    this.keys.up = true;
                    break;
                case 's':
                    this.keys.down = true;
                    break;
                case ' ':
                    this.keys.fire = true;
                    this.player.element.classList.add('attackReady');
                    break;
                case 'ArrowLeft':
                    this.player.direction = 'left';
                    break;
                case 'ArrowRight':
                    this.player.direction = 'right';
                    break;
                case 'ArrowUp':
                    this.player.direction = 'up';
                    break;
                case 'ArrowDown':
                    this.player.direction = 'down';
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'a':
                    this.keys.left = false;
                    break;
                case 'd':
                    this.keys.right = false;
                    break;
                case 'w':
                    this.keys.up = false;
                    break;
                case 's':
                    this.keys.down = false;
                    break;
                case ' ':
                    this.keys.fire = false;
                    this.player.element.classList.remove('attackReady');
                    break;
            }
        });
    }

    resetGame() {
        this.active = false;
        this.player = null;
        this.map = null;
        this.worldMap = null;
        this.worldMapSize = null;
        this.worldPosition = null;
        this.element.remove();
        this.element = null;
        clearInterval(this.tick);
    }

    cashOut() {
        // Add the player's coins to the total
        totalCoins += game.player.coins;

        // Update the total on the home screen
        document.getElementById('totalCoins').textContent = `Total Coins: ${totalCoins}`;

        // Reset the game
        game.resetGame();
    }
    
    finishWorld() {
        this.worldLevel++;
        this.worldFinished = false;
        this.exitSpawned = false;
        this.map.clear();
        this.loadNewWorld();
    }

    loadNewWorld() {
        this.generateNewWorld(this.worldLevel, this.worldLevel);
        while (true) {
            var x = Math.floor(Math.random() * this.map.mapSize.width);
            var y = Math.floor(Math.random() * this.map.mapSize.height);
            if (this.map.mapArray[y][x].element.children.length === 0) {
                this.player.position = { x: x, y: y };
                break;
            }
        }
        this.map.load();
        this.player.energy = this.player.maxEnergy;
    }

    checkWin() {
        for (var i = 0; i < this.worldMapSize.height; i++) {
            for (var j = 0; j < this.worldMapSize.width; j++) {
                if (this.worldMap[i][j] !== 0 && this.worldMap[i][j].enemies.length > 0) {
                    return;
                }
            }
        }
        this.worldFinished = true;
        if (!this.exitSpawned) {
            this.spawnExit();
            this.exitSpawned = true;
        }
    }

    spawnExit() {
        while (true) {
            var x = Math.floor(Math.random() * this.map.mapSize.width);
            var y = Math.floor(Math.random() * this.map.mapSize.height);
            if (this.map.mapArray[y][x].element.children.length === 0) {
                break;
            }
        }
        var exit = document.createElement('div');
        exit.classList.add('exit');
        this.map.mapArray[y][x].element.appendChild(exit);
    }

    updateHUD() {
        this.updateMinimap();
        this.updateEnergyBar();
        this.updateHealthBar();
        this.updateCoinBar();
        this.updateExperienceBar();
    }

    updateMinimap() {
        // Clear the existing minimap
        while (this.minimap && this.minimap.firstChild) {
            this.minimap.firstChild.remove();
        }
        // Create a new tile for each map in the world map
        for (var y = 0; y < this.worldMapSize.height; y++) {
            for (var x = 0; x < this.worldMapSize.width; x++) {
                var miniTile = document.createElement('div');
                miniTile.style.left = (x * this.hudSize - 1) + 'px';
                miniTile.style.top = (y * this.hudSize - 1) + 'px';
                miniTile.classList.add('miniTile');
                if (x === this.worldPosition.x && y === this.worldPosition.y) {
                    miniTile.classList.add('playerIcon');
                }
                else if (this.worldMap[y][x] !== 0) {
                    miniTile.classList.add('mapIcon');
                }
                this.minimap.appendChild(miniTile);
            }
        }
    }

    updateEnergyBar() {
        // Clear the existing energy bar
        while (this.energyBar.firstChild) {
            this.energyBar.firstChild.remove();
        }

        // Create a new square for each point of energy
        for (var i = 0; i < this.player.energy; i++) {
            var square = document.createElement('div');
            square.classList.add('square');
            this.energyBar.appendChild(square);
        }
    }

    updateHealthBar() {
        // Clear the existing health bar
        while (this.healthBar.firstChild) {
            this.healthBar.firstChild.remove();
        }

        // Create a new square for each point of health
        for (var i = 0; i < this.player.health; i++) {
            var square = document.createElement('div');
            square.classList.add('square');
            this.healthBar.appendChild(square);
        }
    }

    updateCoinBar() {
        // Clear the existing health bar
        while (this.coinBar.firstChild) {
            this.coinBar.firstChild.remove();
        }

        // Create a new square for each point of health
        for (var i = 0; i < this.player.coins; i++) {
            var square = document.createElement('div');
            square.classList.add('square');
            this.coinBar.appendChild(square);
        }
    }

    updateExperienceBar() {
        this.experienceBar.style.width = (this.player.exp / this.player.maxExp * this.experienceBarOutline.clientWidth) + 'px';
    }

    updateGame() {
        // Move the player based on the state of the keys
        this.player.moveClock++;
        if (this.keys.left) {
            this.player.move('left');
        }
        if (this.keys.right) {
            this.player.move('right');
        }
        if (this.keys.up) {
            this.player.move('up');
        }
        if (this.keys.down) {
            this.player.move('down');
        }
        this.player.updateDirection();
        if (this.keys.fire) {
            this.player.fireProjectile();
        }
        for (let i = this.map.projectiles.length - 1; i >= 0; i--) {
            this.map.projectiles[i].move();
        }
        for (var enemy of this.map.enemies) {
            enemy.move();
        }
        for (var collectible of this.map.collectibles) {
            if (Math.abs(this.player.position.x - collectible.position.x) < 0.5 && Math.abs(this.player.position.y - collectible.position.y) < 0.5) {
                collectible.remove();
                this.player.coins++;
                this.updateCoinBar();
            }
        }
        this.player.invincibility--;
        this.player.energy += this.player.energyRegen;
        if (this.player.energy > this.player.maxEnergy) {
            this.player.energy = this.player.maxEnergy;
        }
        this.updateHUD();
        this.checkWin();
    }

    generateNewWorld(width, height) {
        var mapLayouts = this.generateWorldMap(height, width);
        this.worldMapSize = { width: width, height: height };
        this.worldMap = new Array(this.worldMapSize.height).fill(0).map(() => new Array(this.worldMapSize.width).fill(0));
        for (var y = 0; y < this.worldMapSize.height; y++) {
            for (var x = 0; x < this.worldMapSize.width; x++) {
                if (mapLayouts[y][x] !== 0) {
                    this.worldMap[y][x] = new Map(this, mapLayouts[y][x]);
                }
            }
        }
        while (true) {
            var x = Math.floor(Math.random() * this.worldMapSize.width);
            var y = Math.floor(Math.random() * this.worldMapSize.height);
            if (this.worldMap[y][x] !== 0) {
                this.worldPosition = { x: x, y: y };
                this.map = this.worldMap[this.worldPosition.y][this.worldPosition.x];        
                break;
            }
        }
        // Set up CSS variables
        document.documentElement.style.setProperty('--hudSize', this.hudSize + 'px');
        document.documentElement.style.setProperty('--tileSize', this.map.tileSize + 'px');
        document.documentElement.style.setProperty('--mapWidth', this.map.mapSize.width);
        document.documentElement.style.setProperty('--mapHeight', this.map.mapSize.height);
        document.documentElement.style.setProperty('--worldMapWidth', this.worldMapSize.width);
        document.documentElement.style.setProperty('--worldMapHeight', this.worldMapSize.height);
    }

    generateWorldMap(height, width) {
        var worldMap = new Array(height).fill(0).map(() => new Array(width).fill(0));
        var x = Math.floor(width / 2);// + 1 - Math.random() * 2 * ((width + 1) % 2));
        var y = Math.floor(height / 2);// + 1 - Math.random() * 2 * ((height + 1) % 2));
        worldMap[y][x] = this.generateMap(9, 13);
        for (var count = 1; count < this.worldLevel ** 1.3; count++) {
            while (true) {
                x = Math.floor(Math.random() * width);
                y = Math.floor(Math.random() * height);
                if (x >= 0 && x < width && y >= 0 && y < height && worldMap[y][x] === 0 && this.checkSurroundingRooms(worldMap, x, y, width, height) === 1) {
                    worldMap[y][x] = this.generateMap(9, 13);
                    break;
                }
            }
        }
        return worldMap;
    }

    generateMap(height, width) {
        var map = [];
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                var random = Math.random();
                if (random < 0.7) row.push(0);
                else if (random < 0.84) row.push(1);
                else if (random < 0.98) row.push(2);
                else row.push(3);
            }
            map.push(row);
        }
        return map;
    }

    checkSurroundingRooms(worldMap, x, y, width, height) {
        var count = 0;
        if (x > 0 && worldMap[y][x - 1] !== 0) count++;
        if (x < width - 1 && worldMap[y][x + 1] !== 0) count++;
        if (y > 0 && worldMap[y - 1][x] !== 0) count++;
        if (y < height - 1 && worldMap[y + 1][x] !== 0) count++;
        return count;
    }
}

var game = { active: false };

// Home screen logic
document.getElementById('start').addEventListener('click', function() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('continue').style.display = 'block';
    if (game.active) {
        game.resetGame();
    }
    game = new Game();
    document.getElementById('game').appendChild(game.element);
});

document.getElementById('back').addEventListener('click', function() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('home').style.display = 'block';
});

document.getElementById('continue').addEventListener('click', function() {
    document.getElementById('game').style.display = 'block';
    document.getElementById('home').style.display = 'none';
});

var totalCoins = 0;

document.getElementById('cashout').addEventListener('click', function() {
    game.cashOut();
    document.getElementById('game').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    document.getElementById('continue').style.display = 'none';
});

