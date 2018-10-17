// https://github.com/michael-ciniawsky/postcss-load-config

let plugins = {
  'postcss-import': {},
  'postcss-url': {},
  // to edit target browsers: use "browserslist" field in package.json
  'autoprefixer': {},
}
if (process.env.npm_config_client == 'h5') {
  plugins = {
    ...plugins,
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7'],
    },
    'postcss-pxtorem': {
      rootValue: 35,
      propList: ['*'],
    },
  }
}
module.exports = {
  plugins,
}
