const updateCode = require('./update-code');
const updateDocker = require('./update-docker');

async function setup() {
  await updateCode();
  await updateDocker();
}

if (require.main === module) {
  setup();
}
