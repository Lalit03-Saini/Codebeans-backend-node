const multer = require('multer');
const path = require('path'); // For working with file paths

// Storage
const storage = multer.diskStorage({
    destination: "public/images/team",
    filename: (req, file, cb) => {
        // Generate a unique filename to avoid conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
});

const upload = multer({ storage: storage });

// Create a New Team Member 
const createTeam = upload.single("image"); // Middleware to handle image upload