/*
 1. 기본값 매개변수 Default function parameter
*/
function foo(arg = 1) {
  console.log(arg);
}

foo(); // 1

/*
 2. 나머지 매개변수 Rest parameter
*/
function foo2(arg, ...rest) {
  // 첫번째 파라미터만 arg로, 나머지는 rest에
  console.log(rest); // [ 'b', 'c' ]
}

foo2("a", "b", "c"); // a

/*
 3. arguments 객체
*/
function foo3(arg, ...rest) {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
  return arg;
}
foo3(1, 2, 3);
