# Codebee Compiler

# Don't use this!
Everything here has been moved to https://github.com/coldpockets/codebee-core

---

## Prerequisites
1. Install Docker
2. Expose Docker daemon on tcp without tls
4. `npm run setup` to fetch code from `codebee-bots` and build Docker images

If you're importing this package, you can run `node node_modules/codebee-compiler/scripts/setup.js` for setup 4.

## Usage
Example:
```
import { compileCpp } from 'codebee-compiler';
import * as fs from 'fs';

const file = fs.readFileSync('bot.cpp');
compileCpp(file).then(bundle => {
  fs.writeFileSync('bundle.tar.gz', bundle);
}).catch(error => {
  // Compilation errors
  console.error(error);
});
```
