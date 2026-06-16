const fs = require('fs');
const path = require('path');
const https = require('https');

const root = __dirname;
const uvDir = path.join(root, 'public', 'uv');
if (!fs.existsSync(uvDir)) {
    fs.mkdirSync(uvDir, { recursive: true });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function run() {
    console.log("Downloading UV files to " + uvDir);
    await download("https://unpkg.com/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js", path.join(uvDir, "uv.bundle.js"));
    await download("https://unpkg.com/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.client.js", path.join(uvDir, "uv.client.js"));
    await download("https://unpkg.com/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.sw.js", path.join(uvDir, "uv.sw.js"));
    await download("https://unpkg.com/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.handler.js", path.join(uvDir, "uv.handler.js"));
    
    // Write config
    const configContent = `
self.__uv$config = {
    prefix: '/uv/service/',
    bare: 'https://illusions.dev/bare/', // Fallback public bare server
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    client: '/uv/uv.client.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};
    `;
    fs.writeFileSync(path.join(uvDir, "uv.config.js"), configContent);
    console.log("Done.");
}

run();
