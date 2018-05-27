const path = require('path');
const fs = require('fs');

const paths = {
  src: path.resolve(__dirname, '../src'),
}

const folders = fs.readdirSync(paths.src).filter(file => fs.lstatSync(path.resolve(paths.src, file)).isDirectory());
const modules = folders.map((folder) => {
  const files = fs.readdirSync(path.resolve(paths.src, folder)).filter(file => !file.includes('test') && !file.includes('index') && !file.includes('-lib'));

  return {
    name: folder,
    length: files.length,
    files: files.map(file => file.replace('.js', '')),
  }
});

let headerString = '';

modules.forEach((mod) => {
  mod.files.forEach((file) => {
    headerString += `import ${file} from './${mod.name}/${file}';` + '\n';
  });
});

headerString += '\n' + 'const modules = {';

modules.forEach((mod) => {
  mod.files.forEach((file) => {
    headerString += '\n  ' + `${file},`;
  });
});

headerString += '\n' + '}';
headerString += '\n' + 'export default modules;';

fs.writeFile(path.resolve(__dirname, '../src/main.js'), headerString, (err) => {
  if(err) {
      return console.log(err);
  }

  console.log("The file was saved!");
});