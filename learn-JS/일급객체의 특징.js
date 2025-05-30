/*
1. 자바스크립트 함수는 함수의 실제 매개변수가 될 수 있다.
*/
function foo(input) {
  return input() + 1;
  // return input()() + 1;도 가능
}

function bar() {
  return 1;
}

foo(bar); //

/*
2. 자바스크립트 함수는 함수의 반환값이 될 수 있다.
*/
function baz() {
  return bar;
}

foo(baz)(); // 2

/*
3. 자바스크립트 함수는 할당명령문의 대상이 될 수 있다.
*/
/*
4. 자바스크립트 함수는 동일 비교의 대상이 될 수 있다.
*/
const foo2 = function (arg) {
  return arg;
};

foo2(1); // 1
