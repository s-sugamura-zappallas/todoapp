module.exports = {
  presets: process.env.NODE_ENV === 'test' ? [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ] : []
}; 