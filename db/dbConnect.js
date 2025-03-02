import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_HOST);
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;

// // function add(a) {
// //   return function (b) {
// //     if (b === undefined) {
// //       return a;
// //     }
// //     return add(a + b);
// //   };
// // }

// // let ans = add(2)(3)(3)(4)(5)(); //function currying

// // let x = add(2);
// // let y = x(4);

// // let z = y(5);

// // console.log(ans);

// let newArr = [];

// function flatten(arr) {
//   for (let i of arr) {
//     if (Array.isArray(i)) {
//       return flatten(i);
//     }
//     newArr.push(i);
//     return i;
//   }
// }

// flatten([2, [2, 1, [31, 2]], 2]); // [2,2,1,31,2,2]

// console.log(newArr);
