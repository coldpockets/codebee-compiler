import * as archiver from 'archiver';
import * as Docker from 'dockerode';
import * as fs from 'fs';
import { Writable } from 'stream';
import { WritableStreamBuffer } from 'stream-buffers';
import * as zlib from 'zlib';

import { docker, getArchive, putFile } from './docker';

async function compile(image: string, fileName: string, file: Buffer) {
  const container = await docker.createContainer({
    Image: image,
    Tty: false,
  });

  const stream = await container.attach({
    stderr: true,
    stdout: false,
    stream: true,
  });
  const end = new Promise(resolve => stream.on('end', resolve));

  const stderr = new WritableStreamBuffer();
  container.modem.demuxStream(stream, null, stderr);

  let bundle: Buffer;
  try {
    // Copy file to container
    await putFile(container.id!, file, fileName);

    // Run compilation
    await container.start();
    await container.stop();
    await end;

    // Write bundle to buffer
    const output = new WritableStreamBuffer();
    const outputFinish = new Promise(resolve => output.on('finish', resolve));
    const res = await getArchive(container.id!);
    res.pipe(zlib.createGzip()).pipe(output);
    await outputFinish;
    bundle = output.getContents();
  } finally {
    await container.remove();
  }

  // Get output (compilation errors)
  const err = stderr.getContentsAsString();
  if (err) {
    throw new Error(err);
  }
  return bundle;
}

export function compileCpp(file: Buffer) {
  return compile('cpp-compiler', 'bot.cpp', file);
}

export function compileJavaScript(file: Buffer) {
  return compile('node-compiler', 'bot.js', file);
}

export async function compileScript(file: Buffer, extension: string) {
  const stream = new WritableStreamBuffer();
  const tar = archiver('tar', { gzip: true });
  tar.pipe(stream);
  tar.append(file, { name: `build/bot.${extension}` });
  await tar.finalize();
  await new Promise(resolve => stream.on('finish', resolve));
  return stream.getContents();
}
