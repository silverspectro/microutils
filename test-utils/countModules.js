const path = require('path');
const fs = require('fs');

const paths = {
  src: path.resolve(__dirname, '../src'),
}

export default () => {
  const folders = fs.readdirSync(paths.src).filter(file => fs.lstatSync(path.resolve(paths.src, file)).isDirectory());
  const obj = {};
  const modules = folders.map((folder) => {
    const files = fs.readdirSync(path.resolve(paths.src, folder)).filter(file => !file.includes('test') && !file.includes('index') && !file.includes('-lib'));

    return {
      name: folder,
      length: files.length,
      files: files.map(file => file.replace('.js', '')),
    }
  });

  modules.forEach(mod => obj[mod.name] = mod);
  return obj;
}