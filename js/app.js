// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
  constructor() {
    this.sprite = 'images/char-horn-girl.png'
    this.xStep = 101;
    this.yStep = 83;
    this.xStart = this.xStep * 2;
    this.yStart = this.yStep * 4.8;
    this.x = this.xStart;
    this.y = this.yStart;
}
  handleInput(input) {
    switch(input) {
      case 'up':
        this.y -= this.yStep;
        break;
      case 'down':
        this.y += this.yStep;
        break;
      case 'right':
        this.x += this.xStep;
        break;
      case 'left':
        this.x -= this.xStep;
        break;
    }
  }
  reset() {
    this.y = this.yStart;
    this.x = this.xStart;
  }
};

//update player
Hero.prototype.update = function(dt) {
//TODO check if move within bounds? move forward && increment speed || reset to start position
  for(let enemy of allEnemies) {
    if(
      (this.y <= enemy.y + 25) && (this.y >= enemy.y - 25) &&
      (this.x <= enemy.x + 50) && (this.x >= enemy.x -50)) {
        this.reset();
    }
  }
};
//render player
Hero.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//TODO check for win

// Instantiate objects for hero and enemies
const allEnemies = [];
const player = new Hero();
const bug1 = new Enemy(-101, 60, 100);
const bug2 = new Enemy(-101, 145, 255);
const bug3 = new Enemy(-101, 225, 125);
const bug4 = new Enemy(-200, 145, 150);
const bug5 = new Enemy(-200, 225, 175);
allEnemies.push(bug1, bug2, bug3, bug4, bug5);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
