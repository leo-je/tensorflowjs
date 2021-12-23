import * as tf from '@tensorflow/tfjs-node-gpu';
/**
 * 
一、张量：tensors
tensor 是 TensorFlow.js 的数据中心单元：由一组数值组成的一维或多维数组。Tensor 实例的 shape 属性定义了这个数组的形状（例如：数组的每个维度有多少个值）。

最主要的 Tensor 构造函数是 tf.tensor 函数
 */
// 2x3 Tensor
const shape = [2, 3]; // 可以看做是两行三列组成
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print();
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]

// The shape can also be inferred:
const b = tf.tensor([
    [1.0, 2.0, 3.0],
    [10.0, 20.0, 30.0]
]);
b.print();
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]
/**
 * 
 * 但是，在构建低阶张量时，为了提高代码的可读性，我们推荐使用下列的函数：
 */
// 0阶张量，即标量
tf.scalar(3.14).print(); // 3.140000104904175， 默认dtype 是 float32
tf.scalar(3.14, 'float32').print(); // 3.140000104904175
tf.scalar(3.14, 'int32').print(); // 3
tf.scalar(3.14, 'bool').print(); // 1

// 1阶张量
tf.tensor1d([1, 2, 3]).print(); // [1, 2, 3]

// 2阶张量
// Pass a nested array.
tf.tensor2d([[1, 2], [3, 4]]).print();
// Pass a flat array and specify a shape.
tf.tensor2d([1, 2, 3, 4], [2, 2]).print();
// ouput
//    [[1, 2],
//   [3, 4]]

// 3阶张量
// Pass a nested array.
tf.tensor3d([[[1], [2]], [[3], [4]]]).print();
// Pass a flat array and specify a shape.
tf.tensor3d([1, 2, 3, 4], [2, 2, 1]).print();
// output
//    [[[1],
//      [2]],

//     [[3],
//      [4]]]

// 4阶张量
// Pass a nested array.
tf.tensor4d([[[[1], [2]], [[3], [4]]]]).print();
// Pass a flat array and specify a shape.
tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]).print();
// output
//    [[[[1],
//       [2]],

//      [[3],
//       [4]]]]