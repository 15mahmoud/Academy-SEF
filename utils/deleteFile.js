const fs = require('fs');
const path = require('path');

function deleteUploadedFile(filePath) {
    const absolutePath = path.join(`${__dirname}`, `../public/images/user`, path.basename(filePath));
    fs.unlink(absolutePath, (err) => {
        if (err) console.log("Failed to delete file:", err.message);
    });
}

module.exports = { deleteUploadedFile };