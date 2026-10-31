const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    optimizeResume
} = require("../controllers/optimizerController");

const protect = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();

const upload = multer({
    storage
});

router.post(
    "/optimize",
    protect,
    upload.single("resume"),
    optimizeResume
);

module.exports = router;