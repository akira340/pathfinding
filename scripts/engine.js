
const INF = 1000000009;
const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

const Engine = function(graph) {
  this.graph = graph;
  this.dist = [];
  this.start = [];
  this.end = [];
  for(let i = 0; i < graph.length; i++) {
    let distRow = []
    for(let j = 0; j < graph[i].length; j++) {
      distRow.push(INF);
      if(graph[i][j] == 1)
        this.start = [i, j];
      if(graph[i][j] == 2)
        this.end = [i, j];
    }
    this.dist.push(distRow);
  }
  this.dist[this.start[0]][this.start[1]] = 0;
  this.q = [this.start];
  this.runBFS = () => { this.bfs(); };
};

Engine.prototype = {
  constructor: Engine,

  test: function() {
    let graph = this.graph;
    for(let i = 0; i < graph.length; i++)
      console.log(graph[i]);
  },

  bfs: function() {
    let graph = this.graph;
    let dist = this.dist;
    let h = graph.length;
    let w = graph[0].length;
    let start = this.start;
    let end = this.end;
    let q = this.q;
    let run = true;

    let next = q.shift();
    let y = next[0], x = next[1];
    document.getElementById(`${y}-${x}`).className = "";
    if(y == start[0] && x == start[1]) {
      document.getElementById(`${y}-${x}`).classList.add('start');
    } else if(y == end[0] && x == end[1]) {
      document.getElementById(`${y}-${x}`).classList.add('end');
    } else {
      document.getElementById(`${y}-${x}`).classList.add('visited');
    }
    for(let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];
      if(ny < 0 || nx < 0 || ny >= h || nx >= w)
        continue;
      if(dist[ny][nx] != INF)
        continue;
      dist[ny][nx] = dist[y][x] + 1;

      if(ny == end[0] && nx == end[1]) {
        run = false;
        console.log(dist[end[0]][end[1]]);
      }

      q.push([ny, nx]);

      document.getElementById(`${ny}-${nx}`).className = "";
      if(ny == start[0] && nx == start[1]) {
        document.getElementById(`${ny}-${nx}`).classList.add('start');
      } else if(ny == end[0] && nx == end[1]) {
        document.getElementById(`${ny}-${nx}`).classList.add('end');
      } else {
        document.getElementById(`${ny}-${nx}`).classList.add('next-visit');
      }
    }

    if(run)
      window.requestAnimationFrame(this.runBFS);
  },
};
