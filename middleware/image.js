const fs = require('fs')

const f1 = (file_data, object_name) => {
    try {
        if (file_data.slice(0, 4) === 'http') {
            return file_data
        }
        else if (file_data.slice(0, 5) === 'img__') {
            return `http://localhost:${process.env.EXPRESS_PORT}/images/${file_data}.png`
        }
        else if (file_data.slice(0, 6) === '"data:') {
            const title = object_name.split(' ').join('-').toLowerCase() + "-" + Date.now()
            const data = JSON.stringify(file_data).split(';base64,').pop()
            fs.writeFile(`./images/${title}.png`, data, { encoding: 'base64' }, (err) => { if (err) { console.log(err) } })
            return `http://localhost:${process.env.EXPRESS_PORT}/images/${title}.png`
        }
        else {
            return JSON.stringify(file_data.slice(0, 12))
        }
    } catch (error) {
        console.log(error)
        return "IMG_URL"
    }
}

module.exports = { f1 }
