
const Display = function(grid) {
  this.grid = grid;
  this.graph = [];
  this.startIsSet = this.endIsSet = true;
};

Display.prototype = {
  constructor: Display,

  render: function() {
    this.grid.setAttribute("style", `width:${this.width}px; height:${this.height}px`);
  },

  resize: function(width, height, ratio) {
    this.width = width;
    this.height = height - 30;
  },

  drawGrid: function() {
    let rows = Math.floor(this.height / 30);
    let cols = Math.floor(this.width / 30);
    this.height = 30 * rows;
    this.width = 30 * cols;

    
    let html = "";
    this.start = [Math.floor(rows/2), Math.floor(cols/3)];
    this.end = [Math.floor(rows/2), Math.floor(cols/3*2)];

    for(let r = 0; r < rows; r++) {
      let htmlRow = `<div class="row" id="row${r}">`
      let graphRow = [];
      for(let c = 0; c < cols; c++) {
        htmlRow += `<div id="${r}-${c}" class="`;
        let x = 0;
        if(r === this.start[0] && c === this.start[1]) {
          htmlRow += `start`;
          x = 1;
        } else if(r === this.end[0] && c == this.end[1]) {
          htmlRow += `end`;
          x = 2;
        } else {
          htmlRow += `unvisited`;
        }
        htmlRow += `"></div>`;
        graphRow.push(x);
      }
      html += `${htmlRow}</div>`;
      this.graph.push(graphRow);
    }
    this.grid.innerHTML += html;

    this.render();
  },

  clearBoard: function(event) {
    let rows = Math.floor(this.height / 30);
    let cols = Math.floor(this.width / 30);
    this.start = [Math.floor(rows/2), Math.floor(cols/3)];
    this.end = [Math.floor(rows/2), Math.floor(cols/3*2)];
    for(let r = 0; r < rows; r++) {
      for(let c = 0; c < cols; c++) {
        if(r === this.start[0] && c === this.start[1])
          document.getElementById(`${r}-${c}`).className = "start";
        else if(r === this.end[0] && c === this.end[1])
          document.getElementById(`${r}-${c}`).className = "end";
        else
          document.getElementById(`${r}-${c}`).className = "unvisited";
      }
    }
  },

  setStart: function(event) {
    document.getElementById(event.target.id).className = "start";
      this.startIsSet = true;
  },

  setEnd: function(event) {
    document.getElementById(event.target.id).className = "end";
      this.endIsSet = true;
  },

  setWall: function(event) {
    document.getElementById(event.target.id).className = "wall";
  },

  setUnvisited: function(event) {
    document.getElementById(event.target.id).className = "unvisited";
  }
};

