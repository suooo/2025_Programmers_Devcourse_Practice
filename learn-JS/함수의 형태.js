/*
 1. IIFE (즉시 실행 함수)
*/
(function foo() {
  console.log("foo");
})(); // foo

/*
 2. 재귀함수
*/
function foo2(arg) {
  if (arg === 5) return;
  console.log(arg);
  foo2(arg + 1);
}
foo2(1); // 1 2 3 4

/*
 3. 중첩함수
*/
function foo3(arg) {
  function bar() {
    console.log(arg);
  }
  bar();
}
foo3("foo3"); // foo3

/*
 4. 콜백함수
*/
function foo4(arg) {
  arg();
}

foo4(() => {
  console.log("foo4"); // foo4
});
