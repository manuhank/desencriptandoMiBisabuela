module.exports = {
  filterByExtension: (extension) => (fileName) =>
    fileName.match(new RegExp(`.+\\.${extension}$`)),
  removeExtension: (fileName) => fileName.split('.').slice(0, -1).join('.'),
};
