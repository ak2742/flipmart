const db = require("mongoose")
const { Schema } = db
const fs = require('fs')
const { execSync } = require('child_process')
const router = require("express").Router()
const fileSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: String
    },
})
const fileModel = db.model("file", fileSchema)

const folderToSync = "./files"
if (!fs.existsSync(folderToSync)) {
    fs.mkdirSync(folderToSync)
}

router.get('/dbadd/:key/:name', async (req, res) => {
    try {
        let key = req.params.key
        let name = req.params.name
        let filenames = [];
        let data;
        if (name === "*") {
            let files = fs.readdirSync(`${folderToSync}`)
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                filenames.push(file)
            }
        } else {
            filenames.push(name)
        }
        if (filenames.length === 0) {
            return res.status(404).json(filenames)
        }
        for (let i = 0; i < filenames.length; i++) {
            const name = filenames[i];
            const existingFile = await fileModel.findOne({ title: name });
            if (existingFile) {
                console.log(name + " already in database.");
                continue;
            }
            data = fs.readFileSync(`${folderToSync}/${name}`, { encoding: 'base64' });
            if (key > 3) {
                fs.writeFileSync(`${folderToSync}/${name}.tmp`, data, 'utf-8')
                execSync(`python3 ./hidetext.py -k ${key} -et "${folderToSync}/${name}.tmp"`);
                data = fs.readFileSync(`${folderToSync}/${name}.tmp.ht`, 'utf8');
                fs.unlinkSync(`${folderToSync}/${name}.tmp`)
                fs.unlinkSync(`${folderToSync}/${name}.tmp.ht`)
            }
            const createdFile = new fileModel({
                title: name,
                data: data
            });
            await createdFile.save();
        }
        res.json("Done")
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

router.get('/dbparse/:key/:name', async (req, res) => {
    try {
        let key = req.params.key
        let name = req.params.name
        let file_obj_arr;
        if (name === "*") {
            file_obj_arr = await fileModel.find()
        } else {
            file_obj_arr = await fileModel.find({ title: name })
        }
        if (file_obj_arr.length === 0) {
            return res.status(404).json(file_obj_arr)
        }
        for (let i = 0; i < file_obj_arr.length; i++) {
            let file_obj = file_obj_arr[i];
            if (key > 3) {
                fs.writeFileSync(`${folderToSync}/${file_obj.title}.tmp.ht`, file_obj.data, { encoding: 'utf8' })
                execSync(`python3 ./hidetext.py -k ${key} -dt "${folderToSync}/${file_obj.title}.tmp.ht"`)
                file_obj.data = fs.readFileSync(`${folderToSync}/${file_obj.title}.tmp`, 'utf8');
                fs.unlinkSync(`${folderToSync}/${file_obj.title}.tmp`)
                fs.unlinkSync(`${folderToSync}/${file_obj.title}.tmp.ht`)
            }
            fs.writeFileSync(`${folderToSync}/${file_obj.title}`, file_obj.data, { encoding: 'base64' })
        }
        res.json("Done")
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

router.get('/db/:col/:id', async (req, res) => {
    try {
        let col = req.params.col
        let id = req.params.id
        let data;
        let model;
        if (col === "file") {
            model = fileModel;
        }
        if (id === "*") {
            data = await model.find();
        } else {
            data = await model.findById(id);
        }
        res.json(data)
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

router.delete("/db/:col/:id", async (req, res) => {
    try {
        let col = req.params.col
        let id = req.params.id
        let model;
        if (col === "file") {
            model = fileModel;
        }
        if (id === "*") {
            await model.deleteMany();
        } else {
            await model.findByIdAndDelete(id);
        }
        res.json("done");
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "INTERNAL SERVER ERROR" })
    }
}
)

module.exports = router