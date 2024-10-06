module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',  // Isso especifica o nome do módulo que você vai usar para importar suas variáveis de ambiente
        path: '.env',        // O caminho para o arquivo .env
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      }]
    ]
  };
};
