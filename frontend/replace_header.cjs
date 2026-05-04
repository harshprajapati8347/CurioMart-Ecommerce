const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/import Header from (['"])(.*?)components\/Layout\/Header(['"]);?/g, 'import Navbar from $1$2components/Layout/Navbar$3;');
    
    content = content.replace(/import Header from (['"])(.*?)Header(['"]);?/g, function(match, p1, p2, p3) {
      if(p2.includes('components/Layout/') || match.includes('Layout')) {
         return 'import Navbar from ' + p1 + p2.replace('Header', 'Navbar') + p3 + ';';
      }
      return match;
    });

    content = content.replace(/<Header\b/g, '<Navbar');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
      console.log('Updated', filePath);
    }
  }
});
console.log(`Updated ${count} files.`);
