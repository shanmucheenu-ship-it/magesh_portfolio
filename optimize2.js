const fs = require('fs');
const path = require('path');
const dir = './src/components';
const files = fs.readdirSync(dir);

const radialGlow = "bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]";

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace heavy blurs with optimized radial gradients
    // Matches bg-white/5 blur-[something] or similar patterns
    content = content.replace(/bg-white\/5\s+rounded-full\s+blur-\[\d+px\]/g, radialGlow);
    content = content.replace(/bg-white\/10\s+rounded-full\s+blur-\[\d+px\]/g, radialGlow);
    content = content.replace(/bg-white\/5\s+blur-\[\d+px\]/g, radialGlow);

    // Remove backdrop-blurs which severely impact scrolling frame rates on many devices
    content = content.replace(/backdrop-blur-sm/g, 'bg-black/40');
    content = content.replace(/backdrop-blur-md/g, 'bg-black/60');
    content = content.replace(/backdrop-blur-xl/g, 'bg-black/80');
    content = content.replace(/backdrop-blur/g, 'bg-black/50');
    
    // Specifically fix the hero backdrop glow that causes immense lag
    content = content.replace(/bg-gradient-to-tr\s+from-white\/10\s+to-transparent\s+blur-\[64px\]/g, radialGlow);

    fs.writeFileSync(filePath, content);
  }
});
console.log('Optimized intense blurs and backdrops.');
