import http from 'node:http'
import { HandleUpload } from './busboy.js'

const server = http.createServer(async (req, res) => {

 
    if(req.url === '/zip') {
        const bb = new HandleUpload({ headers: req.headers })

        const handle = bb.getFile()

        req.pipe(handle)
        res.writeHead(200, { 'content-type': 'application/json' })
        return res.end(JSON.stringify({ message: 'endpoint zip ok' }))
    }

    if (req.url === '/stream') {

        console.log(req.headers);


    }
    
})

server.listen(3000, () => {
    console.log('Server running ar 3000');
})