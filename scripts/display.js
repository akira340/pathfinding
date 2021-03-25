
const Display = function(grid) {
  this.grid = grid;
  this.graph = [];
};

Display.prototype = {
  constructor: Display,

  render: function() {
    this.grid.setAttribute("style", `width:${this.width}px; height:${this.height}px`);
  },

  resize: function(width, height, ratio) {
    this.width = width;
    this.height = height;
  },

  drawGrid: function() {
    let rows = Math.floor(this.height / 30);
    let cols = Math.floor(this.width / 30);
    this.height = 30 * rows;
    this.width = 30 * cols;
    
    let html = "";
    this.start = [15, 5];
    this.end = [15, 20];

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
};

