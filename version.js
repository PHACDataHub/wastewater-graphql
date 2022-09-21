/**
 * This utility scripts takes the version number from package.json, and 
 * provides it to the build via the version.txt file.
 * 
 * Meant to be used in conjunction with the `npm compile` command.
 */
const fs = require('fs');

try {
  var version = require('./package.json').version;
  fs.writeFileSync('build/src/version.txt', version);
} catch (err) {
  console.error(err);
  process.exit(1);
}

process.exit(0);
