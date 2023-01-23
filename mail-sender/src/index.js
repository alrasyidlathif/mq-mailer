import http from 'http';
import { publish } from './publisher.js';
const port = 8080

http.createServer(function (req, res) {
    console.log(req.method)
    console.log(req.url)
    if (req.method == 'POST' && req.url == '/mail') {
        let data = '';

        req.on('data', function (chunk) {
            data += chunk;
        });

        req.on('end', function () {
            if (data) {
                const jsonData = JSON.parse(data);
                console.log(jsonData)
                if (
                    !jsonData.to ||
                    !jsonData.title ||
                    !jsonData.body
                ) {
                    res.writeHead(400);
                    res.write('Wrong Input');
                    res.end();                
                }
                else {
                    publish(jsonData)
                    .then(_ => {
                        res.writeHead(200);
                        res.write('Success');
                        res.end();
                    })
                    .catch(error => {
                        console.log(error)
                        res.writeHead(500);
                        res.write('Error');
                        res.end();
                    })
                }
            }
            else {
                res.writeHead(400);
                res.write('Wrong Input');
                res.end();
            }
        })
    }
    else {
        res.writeHead(404);
        res.write('URL Not Found');
        res.end();
    }
}).listen(port, () => {
    console.log((`server on ${port}`))
});
