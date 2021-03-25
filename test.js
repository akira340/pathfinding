
let x = [];
for(let i = 0; i < 5; i++) {
  let y = [];
  for(let j = 0; j < 5; j++)
    y.push(0);
  x.push(y);
}

let a = x.shift();
console.log(a);
console.log(x);

