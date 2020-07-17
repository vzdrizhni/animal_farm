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
    this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
    this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
    this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3);
    this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);
    this.load.audio('chickenSound', ['assets/audio/chicken.ogg', 'assets/audio/chicken.mp3']);
    this.load.audio('horseSound', ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);
    this.load.audio('pigSound', ['assets/audio/pig.ogg', 'assets/audio/pig.mp3']);
    this.load.audio('sheepSound', ['assets/audio/sheep.ogg', 'assets/audio/sheep.mp3']);
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
      {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'},
      {key: 'horse', text: 'HORSE', audio: 'horseSound'},
      {key: 'pig', text: 'PIG', audio: 'pigSound'},
      {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'}
    ]

    this.animals = this.game.add.group();
    let animal;

    animalData.forEach(elem => {
      animal = this.animals.create(-1000, this.game.world.centerY, elem.key);

      animal.customParams = {text: elem.text, sound: this.game.add.audio(elem.audio)}
      animal.anchor.setTo(0.5);
      animal.animations.add('animate', [0,1,2,1,2,1], 3, true);
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

    if (this.isMoving) {
      return false;
    }

    this.isMoving = true;

    if (sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      newAnimal.x = -newAnimal.width / 2;
      endX = 640 + this.currentAnimal.width / 2;
    } else {
      newAnimal = this.animals.previous();
      newAnimal.x = 640 + newAnimal.width / 2;
      endX = -this.animals.width / 2;
    }

    let animalMovement = this.game.add.tween(newAnimal);
    animalMovement.to({x: this.game.world.centerX}, 1000);
    animalMovement.onComplete.add(function() {
      this.isMoving = false;
    }, this);
    animalMovement.start();

    let anotherAnimalMovement = this.game.add.tween(this.currentAnimal);
    anotherAnimalMovement.to({x: endX}, 1000)
    anotherAnimalMovement.start();

    this.currentAnimal = newAnimal;
  },

  animateAnimal: function(sprite, event) {
    sprite.play('animate');
    sprite.customParams.sound.play();
  }


};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');