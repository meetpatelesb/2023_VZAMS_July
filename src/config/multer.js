// multer use
var multer = require('multer');
const path = require('path');





// upload using MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/zeel-patel/Desktop/twitter/public/upload') //folder name
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

module.exports = { upload };