import * as tf from '@tensorflow/tfjs-node-gpu'

console.log(tf.version)
console.log(tf.getBackend())

function getModel(): tf.Sequential {
    let model: tf.Sequential = tf.sequential({ name: "testModel" })
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
    return model;
}


// 生成一些用于训练的数据.
function getData() {
    let xs = tf.tensor2d([[1], [2], [3], [4]], [4, 1]);
    let ys = tf.tensor2d([[1], [3], [5], [7]], [4, 1]);
    return { x: xs, y: ys }
}

// 用 fit() 训练模型.
let fit = async (model: tf.Sequential, x: any, y: any) => {
    await model.fit(x, y, { epochs: 100 });
    // Note that the untrained model is random at this point.
    return model;
}


async function run() {
    let model = getModel();
    let datas = getData()
    await fit(model, datas.x, datas.y)
    console.log(model.summary())
    let tensor = model.predict(tf.tensor2d([[5]], [1, 1]));
    console.log(tensor)
}

run()