const fs = require('fs');
const path = require('path');
const dir = './src/components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the filter animation from scroll reveals because it causes massive lag
    content = content.replace(/filter:\s*"blur\(20px\)",\s*/g, '');
    content = content.replace(/filter:\s*"blur\(0px\)",\s*/g, '');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Optimized component animations.');
