
const Controller = function() {
  this.mousemove = new Controller.MouseInput();
  this.mousedown = new Controller.MouseInput();
  this.mouseup   = new Controller.MouseInput();

  this.down  = new Controller.ButtonInput();
  this.left  = new Controller.ButtonInput();
  this.right = new Controller.ButtonInput();
  this.up    = new Controller.ButtonInput();

  this.mouse = function(event) {
    let move = (event.type == "mousemove") ? true : false;
    let down = (event.type == "mousedown") ? true : false;
    let up   = (event.type == "mouseup") ? true : false;

    this.mousemove.getInput(move);
    this.mousedown.getInput(down);
    this.mouseup.getInput(up);
    var element = event.target;
  };

  this.keyDownUp = function(event) {
    let down = (event.type == "keydown") ? true : false;
    let up = (event.type == "keyup") ? true : false;
  };
};

Controller.prototype = {
  constructor: Controller,
};

Controller.MouseInput = function() {
  this.active = this.down = false;
};

Controller.MouseInput.prototype = {
  constructor: Controller.MouseInput,

  getInput: function(down) {
    if(this.down != down) this.active = down;
    this.down = down;
  },
};

Controller.ButtonInput = function() {
  this.active = this.down = false;
};

Controller.ButtonInput.prototype = {
  constructor: Controller.ButtonInput,

  getInput: function(down) {
    if(this.down != down) this.active = down;
    this.down = down;
  },
};
