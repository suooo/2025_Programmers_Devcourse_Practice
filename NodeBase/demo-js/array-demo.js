// 자바스크립트 배열의 비구조화

const array = [1, 2, 3, 4, 5];

const num1 = array[0]; //1
const num4 = array[3]; //4

const [num2, num3] = array;
console.log(num2, num3); //1, 2

const [, n2, n3, , n5] = array;
console.log(n2, n3, n5); //2, 3, 5
