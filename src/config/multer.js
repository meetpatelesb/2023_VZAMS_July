// multer use
var multer = require('multer');
const path = require('path');

// upload using MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/siddharth-patel/Desktop/VZAMS/project/pull_request_twitter/twitter/public/upload') //folder name
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage});

const storage_profile = multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null, '/home/siddharth-patel/Desktop/VZAMS/project/pull_request_twitter/twitter/public/assets/profile');
    },
    filename : (req,file,cb)=>{
        
            cb(null, Date.now() + path.extname(file.originalname));
    
    }
})

const uplaod_profile = multer({storage : storage_profile})

module.exports = { upload , uplaod_profile};