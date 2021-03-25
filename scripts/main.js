
window.addEventListener("load", function(event) {
  var resize = function(event) {
    display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
  };

  var render = function() {
    display.render();
  };

  var update = function() {
  };

  var display = new Display(document.querySelector("#grid"));
  var game    = new Game();
  resize();
  display.drawGrid();
  var engine  = new Engine(display.graph);

  //window.addEventListener("resize", resize);

  engine.bfs();
});
