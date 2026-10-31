const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        "application/pdf"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    }

    else {

        cb(new Error("Only PDF files are allowed."));

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 10 * 1024 * 1024

    }

});

module.exports = upload;