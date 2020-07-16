//this game will have only 1 state
var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('chicken', 'assets/images/chicken.png');
    this.load.image('horse', 'assets/images/horse.png');
    this.load.image('pig', 'assets/images/pig.png');
    this.load.image('sheep', 'assets/images/sheep3.png');
    this.load.image('arrow', 'assets/images/arrow.png');

  },
  //executed after everything is loaded
  create: function() {

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.background = this.game.add.sprite(0, 0, 'background');

    this.leftArrow = this.game.add.sprite(60, this.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.customParams = {direction: 1}

    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    this.rightArrow = this.game.add.sprite(580, this.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.customParams = {direction: -1}

    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

    let animalData = [
      {key: 'chicken', text: 'CHICKEN'},
      {key: 'horse', text: 'HORSE'},
      {key: 'pig', text: 'PIG'},
      {key: 'sheep', text: 'SHEEP'},
    ]

    this.animals = this.game.add.group();
    let animal;

    animalData.forEach(elem => {
      animal = this.animals.create(-1000, this.game.world.centerY, elem.key);

      animal.customParams = {text: elem.text}
      animal.anchor.setTo(0.5);
      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.events.onInputDown.add(this.animateAnimal, this);
    });

    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

  },
  //this is executed multiple times per second
  update: function() {

  },

  switchAnimal: function(sprite, event) {
    let newAnimal, endX;

    if (sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      endX = 640 + this.currentAnimal.width / 2;
    } else {
      newAnimal = this.animals.previous();
      endX = -this.animals.width / 2;
    }

    this.currentAnimal.x = endX;
    newAnimal.x = this.world.centerX;
    this.currentAnimal = newAnimal;
  },

  animateAnimal: function(sprite, event) {
    console.log(this.currentAnimal)
  }


};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');