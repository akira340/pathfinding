window.addEventListener("load", function(event) {
  var mouse = function(event) {
    controller.mouse(event);
    if(controller.mousedown.active) {
      if(event.target.id === "clear")
        location.reload();
    }
    if(controller.mousedown.active && !engine.running && event.target.id != "") {
      let element = document.getElementById(event.target.id);
      let s = event.target.id.split('-');
      let y = parseInt(s[0]);
      let x = parseInt(s[1]);
      if(event.target.id === "start-find") {
        engine.running = true;
        engine.bfs();

      } else if(element.className === "start") {
        display.setUnvisited(event);
        display.startIsSet = false;
        engine.graph[y][x] = 0;
        engine.dist[y][x] = 1000000009;
        engine.q = [];

      } else if(element.className === "end") {
        display.setUnvisited(event);
        display.endIsSet = false;
        engine.graph[y][x] = 0;

      } else if(element.className === "wall") {
        display.setUnvisited(event);
        engine.graph[y][x] = 0;

      } else if(element.className === "unvisited") {
        if(!display.startIsSet) {
          display.setStart(event);
          engine.graph[y][x] = 1;
          engine.dist[y][x] = 0;
          engine.start[0] = y;
          engine.start[1] = x;
          engine.q = [engine.start];
        } else if(!display.endIsSet) {
          display.setEnd(event);
          engine.graph[y][x] = 2;
          engine.end[0] = y;
          engine.end[1] = x;
        } else {
          display.setWall(event);
          engine.graph[y][x] = 3;
        }
      }
    }
  };

  var keyDownUp = function(event) {
    controller.keyDownUp(event);
  };

  var resize = function(event) {
    display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
  };

  var render = function() {
    display.render();
  };

  var update = function() {
  };

  var controller = new Controller();
  var display    = new Display(document.querySelector("#grid"));
  var game       = new Game();
  resize();
  display.drawGrid();
  var engine     = new Engine(display.graph);

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("mousemove", mouse);
  window.addEventListener("mousedown", mouse);
  window.addEventListener("mouseup", mouse);
});
