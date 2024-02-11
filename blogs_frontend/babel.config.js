module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react',{ runtime: 'automatic' }], // Preset para permitir la sintaxis de JSX
  ],
}
