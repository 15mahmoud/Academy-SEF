function convertToFullPath(req, relativePath) {
    const protocol = req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}/${relativePath}`;
}

module.exports = { convertToFullPath };