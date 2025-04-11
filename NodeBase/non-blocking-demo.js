function first() {
  console.log("첫번째");
}

function second() {
  console.log("두번째");
}

function third() {
  console.log("세번째");
}

first();
setTimeout(second, 2000);
//second();
third();
