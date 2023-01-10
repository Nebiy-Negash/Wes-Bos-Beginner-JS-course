console.log('connected');

function add1(a, b = 3) {
  const total = a + b;
  return total;
}
add1(1, 4);

const add = (a, b = 3) => a + b;

console.log(add());
