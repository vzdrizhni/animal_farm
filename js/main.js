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

    const animalData = [
      {key: 'chicken', text: 'CHICKEN'},
      {key: 'horse', text: 'HORSE'},
      {key: 'pig', text: 'PIG'},
      {key: 'sheep', text: 'SHEEP'},
    ]

    this.animals = this.game.add.group();
    const animal;

    animalData.forEach(animal => {
      animal = this.create(200, this.world.centerY, animal.key);

      animal.customParams = {text: animal.text}
      animal.anchor.setTo(0.5);
      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.event.onInputDown.add(this.animateAnimal, this);
    })

  },
  //this is executed multiple times per second
  update: function() {

  },

  switchAnimal: function(sprite, event) {
    console.log('move hui');
  }


};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');