const { Compress } = require('gzipper');

const distPath = 'dist/apps/setgo/browser/';

const deflate = new Compress(distPath, null, { deflate: true });
const gzip = new Compress(distPath);
const brotli = new Compress(distPath, null, { brotli: true });

(async () => {
  try {
    await Promise.all([deflate.run(), gzip.run(), brotli.run()]);
  } catch (err) {
    console.error(err);
  }
})();
