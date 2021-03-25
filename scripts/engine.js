
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
  this.d = this.y = this.x = 0;

  this.running = false;
  this.runBFS = () => { this.bfs(); };
  this.runPath = () => { this.path(); };
};

Engine.prototype = {
  constructor: Engine,

  test: function() {
    let graph = this.graph;
    for(let i = 0; i < graph.length; i++)
      console.log(graph[i]);
  },
   
  path: function() {
    let graph = this.graph;
    let h = graph.length;
    let w = graph[0].length;
    let y = this.y;
    let x = this.x;
    let dist = this.dist;
    for(let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];
      if(ny < 0 || nx < 0 || ny >= h || nx >= w)
        continue;
      if(graph[ny][nx] == 3)
        continue;
      if(dist[ny][nx] == this.d - 1) {
        this.d--;
        this.y = ny;
        this.x = nx;
        break;
      }
    }
    let className = document.getElementById(`${this.y}-${this.x}`).className;
    if(className === "visited" || className === "next-visit") {
      document.getElementById(`${this.y}-${this.x}`).className = "path";
    }

    if(this.d != 0)
      window.requestAnimationFrame(this.runPath);
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
    if(y == start[0] && x == start[1]) {
    } else if(y == end[0] && x == end[1]) {
    } else {
      document.getElementById(`${y}-${x}`).className = "visited";
    }
    for(let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];
      if(ny < 0 || nx < 0 || ny >= h || nx >= w)
        continue;
      if(graph[ny][nx] == 3)
        continue;
      if(dist[ny][nx] != INF)
        continue;
      dist[ny][nx] = dist[y][x] + 1;

      q.push([ny, nx]);
      if(ny == end[0] && nx == end[1]) {
        q.length = 0;
        this.d = dist[end[0]][end[1]];
        this.y = end[0];
        this.x = end[1];
        this.runPath();
        break;
      }

      if(ny == start[0] && nx == start[1]) {
      } else if(ny == end[0] && nx == end[1]) {
      } else {
        document.getElementById(`${ny}-${nx}`).className = "next-visit";
      }
    }

    if(q.length > 0)
      window.requestAnimationFrame(this.runBFS);
  },
};
