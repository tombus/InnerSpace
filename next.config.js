const withTM = require('next-transpile-modules')([
  'drei',
  'three',
  'postprocessing',
]);

module.exports = withTM({
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
    ]
  }
});
