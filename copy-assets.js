const fs = require('fs');
const path = require('path');

const root = __dirname;
function copyDir(src, dest) {
    src = path.join(root, src);
    dest = path.join(root, dest);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);
        if (fs.statSync(srcFile).isDirectory()) copyDir(path.join(src, path.relative(src, srcFile)), path.relative(root, destFile));
        else fs.copyFileSync(srcFile, destFile);
    }
}

copyDir('node_modules/@titaniumnetwork-dev/ultraviolet/dist', 'public/uv');
copyDir('node_modules/@mercuryworkshop/bare-mux/dist', 'public/baremux');
copyDir('node_modules/@mercuryworkshop/epoxy-transport/dist', 'public/epoxy');
