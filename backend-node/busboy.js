import busboy from 'busboy'
import { createWriteStream } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export class HandleUpload {

    constructor({ headers }) {
        this.bb = busboy({ headers })
    }

    getFile() {

        let filename = ''
        this.bb.on('file', (name, file, info) => {
            filename = info.filename
            file.pipe(createWriteStream(join(__dirname, 'downloads', filename)))
        })

        this.bb.on('close', () => {
            console.log('finished')
        })

        return this.bb

    }
}