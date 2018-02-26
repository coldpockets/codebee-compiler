import * as archiver from 'archiver';
import * as Docker from 'dockerode';
import { WritableStreamBuffer } from 'stream-buffers';

export const docker = new Docker();

export async function putFile(containerId: string, file: Buffer, fileName: string) {
  const stream = new WritableStreamBuffer();
  const tar = archiver('tar');
  tar.pipe(stream);
  tar.append(file, { name: fileName });
  await tar.finalize();

  const contents = stream.getContents();
  const container = docker.getContainer(containerId);
  return container.putArchive(contents, {
    path: 'src',
  });
}

export async function getArchive(containerId: string) {
  const container = docker.getContainer(containerId);
  return container.getArchive({
    path: 'build',
  });
}
