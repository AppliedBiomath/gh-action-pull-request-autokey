const fs = require('fs');
const path = require('path');


module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.js',
    ],
    tests: [
      '__test__/**/*.test.js',
    ],
    env: {
      type: 'node',
      runner: 'node',
    },
    debug: true,
    trace: true,
    testFramework: 'jest',
    setup: function(wallaby) {
      const path = require('path');
      const envPath = path.join(wallaby.localProjectDir, './.env');
      require('dotenv').config({
        path: envPath,
      });

      wallaby.testFramework.failWithoutAssertions = false;

    },
  };
};
