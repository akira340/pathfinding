
const HEIGHT = 30, WIDTH = 40;
const INF = 1000000009;
let h = HEIGHT, w = WIDTH;

let graph = [];
let html = '';
let start = [15, 10];
let end = [15, 30];
for(let r = 0; r < HEIGHT; r++) {
  let htmlRow = `<tr id="row ${r}">`;
  let graphRow = [];
  for(let c = 0; c < WIDTH; c++) {
    htmlRow += `<td id='${r}-${c}'`
    let x = 0;
    if(r === start[0] && c === start[1]) {
      htmlRow += `class='start'`;
      x = 1;
    } else if(r === end[0] && c === end[1]) {
      htmlRow += `class='end'`;
      x = 2;
    }
    htmlRow += `></td>`;
    graphRow.push(x);
  }
  graph.push(graphRow);
  html += `${htmlRow}</tr>`;
}

document.getElementById('board').innerHTML += html;

let dist = [];
for(let i = 0; i < h; i++) {
  let distRow = []
  for(let j = 0; j < w; j++)
    distRow.push(INF);
  dist.push(distRow);
}
dist[start[0]][start[1]] = 0;

let q = [start];

let dy = [0, 1, 0, -1];
let dx = [1, 0, -1, 0];

while(q.length > 0) {
  let next = q.shift();
  let y = next[0], x = next[1];
  if(next != start || next != end)
    document.getElementById(`${y}-${x}`).classList.add('visited');
  for(let i = 0; i < 4; i++) {
    let ny = y + dy[i];
    let nx = x + dx[i];
    if(ny < 0 || nx < 0 || ny >= HEIGHT || nx >= WIDTH)
      continue;
    if(dist[ny][nx] != INF)
      continue;
    dist[ny][nx] = dist[y][x] + 1;
    q.push([ny, nx]);
    if([ny, nx] != start || [ny, nx] != end)
      document.getElementById(`${y}-${x}`).classList.add('next-visit');
  }
}

