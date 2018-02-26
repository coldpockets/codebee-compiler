const fs = require('fs-extra');
const path = require('path');
const git = require('simple-git/promise');
const tmp = require('tmp');

const REPO = 'https://github.com/coldpockets/codebee-bots';

const PACKAGE_MAP = {
  cpp: 'helper-package',
  node: 'helper-package-js',
};

async function updateCode() {
  const dir = tmp.dirSync({ unsafeCleanup: true });

  await git(dir.name).clone(REPO);
  console.log(`Cloned repo ${REPO}`);

  await Promise.all(Object.keys(PACKAGE_MAP).map(async language => {
    const packageDir = PACKAGE_MAP[language];
    const src = path.join(dir.name, `codebee-bots`, packageDir);
    const dst = path.join(__dirname, '..', 'docker', language, 'src', packageDir);
    await fs.copy(src, dst);
    console.log(`Copied ${src} to ${dst}`);
  }));
}

if (require.main === module) {
  updateCode();
}

module.exports = updateCode;
