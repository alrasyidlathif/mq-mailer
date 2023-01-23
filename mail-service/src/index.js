import { Consumer } from './consumer.js'

setInterval(async () => {
    console.log('Consuming...');
    await new Consumer().consume()
}, 10000);
