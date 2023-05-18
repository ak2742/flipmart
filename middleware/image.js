const http = require('http')
const https = require('https')
const fs = require('fs')

const f1 = (file_data, object_name) => {
    try {
        const title = object_name.split(' ').join('-').toLowerCase() + "-" + Date.now()

        if (file_data.slice(0, 4).toLowerCase() === 'http') {
            const file = fs.createWriteStream(`./images/${title}.png`)

            let req = []

            if (file_data.slice(0, 5).toLowerCase() === 'http:') {
                req = http.get(`${file_data}`, (res) => {
                    if (res.statusCode !== 200) {
                        fs.unlink(`./images/${title}.png`, () => {
                            return file_data
                        })
                    } else {
                        res.pipe(file)
                    }
                }).end()
            }

            if (file_data.slice(0, 5).toLowerCase() === 'https') {
                req = https.get(`${file_data}`, (res) => {
                    if (res.statusCode !== 200) {
                        fs.unlink(`./images/${title}.png`, () => {
                            return file_data
                        })
                    } else {
                        res.pipe(file)
                    }
                }).end()
            }

            req.on('error', (err) => {
                fs.unlink(`./images/${title}.png`, () => {
                    return file_data
                })
            })

            file.on('error', (err) => {
                fs.unlink(`./images/${title}.png`, () => {
                    return file_data
                })
            })

            file.on('finish', () => {
                file.close(() => {
                    return `http://localhost:${process.env.EXPRESS_PORT}/images/${title}.png`
                })
            })
            return `http://localhost:${process.env.EXPRESS_PORT}/images/${title}.png`
        }

        else if (file_data.slice(0, 5).toLowerCase() === 'img__') {
            return `http://localhost:${process.env.EXPRESS_PORT}/images/${file_data}.png`
        }

        else if (file_data.slice(0, 6).toLowerCase() === '"data:') {
            const data = JSON.stringify(file_data).split(';base64,').pop()
            fs.writeFile(`./images/${title}.png`, data, { encoding: 'base64' }, (err) => { if (err) { console.log(err) } })
            return `http://localhost:${process.env.EXPRESS_PORT}/images/${title}.png`
        }

        else {
            return JSON.stringify(file_data.slice(0, 10))
        }
    } catch (error) {
        console.log(error)
        return "IMG_URL"
    }
}

module.exports = { f1 }
