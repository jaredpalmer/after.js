const dist = 'dist';
const lib = 'lib';
const server = 'server';
const bin = 'bin';

const babelOptions = {
  presets: ['es2015', 'react'],
  plugins: [
    'transform-async-to-generator',
    'transform-object-rest-spread',
    'transform-class-properties',
    'transform-runtime',
  ],
};

export default async function watch(task) {
  await task.watch(
    [`${server}/**/*.js`, `${lib}/**/*.js`, `${bin}/*`],
    'build'
  );
}

export async function build(task) {
  await task.parallel(['bin', 'lib', 'server', 'permissions']);
}

export async function bin(task) {
  await task
    .source(`${bin}/*`)
    .babel(babelOptions)
    .target(`${dist}/bin`);
}

export async function server(task) {
  await task
    .source(`${server}/**/*.js`)
    .babel(babelOptions)
    .target(`${dist}/server`);
}

export async function lib(task) {
  await task
    .source(`${lib}/**/*.js`)
    .babel(babelOptions)
    .target(`${dist}/lib`);
}

export async function permissions(task) {
  await task
    .source(`${dist}/${bin}/*`)
    .shell({ cmd: 'chmod u+x $file', glob: true })
    .target(`${dist}/${bin}`);
}
