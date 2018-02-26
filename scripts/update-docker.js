const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function buildImage(name, imagePath) {
  try {
    await execAsync(`docker build -t ${name} ${imagePath}`);
    console.log(`Built image ${name}`);
  } catch (e) {
    console.error(e.message);
  }
}

async function removeImage(name) {
  try {
    await execAsync(`docker rmi ${name}`);
    console.log(`Removed image ${name}`);
  } catch (e) {
    console.error(e.message);
  }
}

async function setupImage(image) {
  const name = `${image}-compiler`;
  const imagePath = path.join(__dirname, '..', 'docker', image);
  await removeImage(name);
  await buildImage(name, imagePath);
}

function listImages() {
  return fs.readdirSync(path.join(__dirname, '..', 'docker'));
}

async function updateDocker() {
  const images = listImages();
  await Promise.all(images.map(image => setupImage(image)));
}

if (require.main === module) {
  updateDocker();
}

module.exports = updateDocker;
