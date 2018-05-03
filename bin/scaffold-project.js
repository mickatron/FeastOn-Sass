#! /usr/bin/env node
//  Copies FeastOn.SASS scaffolds to your project.
const argv = require('minimist')(process.argv.slice(2));
const { ncp } = require('ncp');

const destination = argv.f || undefined;

if (!destination) {
  console.log('FeastOn.SASS: copy-scaffold operation failed. Please provide a destination folder with the -f option.');
} else {
  console.log('FeastOn.SASS: Copying scaffold to destination folder ', destination);
  ncp('node_modules/feast-on-sass/lib/scaffold', destination, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log('done!');
  });
}

