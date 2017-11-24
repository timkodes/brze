module.exports = {
  modify(config, { target, dev }, webpack) {
    const appConfig = config; // stay immutable here

    if(target === 'web'){
      appConfig.entry.client.unshift('whatwg-fetch');
      console.log(appConfig.entry);
    }
    return appConfig;
  }
};