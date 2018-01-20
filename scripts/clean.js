/* eslint-disable import/no-dynamic-require,global-require, no-console */
const fs = require('fs');
const path = require('path');

// Ensure top-level is installed
let shell;
try {
  shell = require('shelljs');
} catch (e) {
  console.log(
    "👉 Please be sure to 'npm install' or 'yarn install' in the root after.js/ directory before running 'clean'"
  );
  process.exit();
}

const logTask = msg => console.log(`👍  ${msg}`);

const cleanPackages = at => {
  const result = shell.rm('-rf', `${at}/node_modules`);
  if (result.code !== 0) {
    console.log(`Unable to clean node_modules in ${at}`);
  }
  logTask(`Cleaned ${at}\n`);
};

const getPackages = () =>
  fs.readdirSync('packages').reduce((pkgs, pkg) => {
    let packagePath = path.join(process.cwd(), 'packages', pkg);
    const packageJSON = path.join(packagePath, 'package.json');
    try {
      if (
        fs.statSync(packagePath).isDirectory() &&
        fs.statSync(packageJSON).isFile()
      ) {
        1;
        const packageName = require(packageJSON).name;
        pkgs.push({ path: packagePath, name: packageName });
      }
    } catch (e) {
      return pkgs;
    }
    return pkgs;
  }, []);

// Start cleaning
console.log('\n🛁 Cleaning...\n');

// Clean all of the monorepo packages.
getPackages().forEach(pkg => cleanPackages(pkg.path));

// npm unlink packages
shell.exec('yarn unlink', {
  cwd: path.join(process.cwd(), 'packages', 'after'),
});
logTask('npm-unlinked after\n');

// Done
console.log('\n✅  cleaned\n');
