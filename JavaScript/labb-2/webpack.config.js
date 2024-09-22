const path = require('path');

module.exports = {
  entry: './src/script/app.js', // Entry point for your JS
  output: {
    filename: 'bundle.js',  // Output bundled JS file
    path: path.resolve(__dirname, 'dist')  // Output directory
  },
  mode: 'development',  // or 'production' for production mode
};
