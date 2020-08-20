const extRe = /\.tsx?$/;

function loadConfig(mainPath, ts) {
  const fileName = ts.findConfigFile(mainPath, ts.sys.fileExists);
  if (!fileName) throw Error("tsconfig not found");
  const text = ts.sys.readFile(fileName);
  const loadedConfig = ts.parseConfigFileTextToJson(fileName, text).config;
  const parsedTsConfig = ts.parseJsonConfigFileContent(
    loadedConfig,
    ts.sys,
    process.cwd(),
    undefined,
    fileName
  );
  return parsedTsConfig;
}

function tsPlugin(mainPath, ts) {
  const config = loadConfig(mainPath);
  return {
    name: "ts-transpile-on-the-fl",
    async load(id) {
      if (!extRe.test(id)) return null;

      const file = await fsp.readFile(id, "utf-8");
      const res = ts.transpileModule(file, {
        compilerOptions: config.options,
      });

      return res.outputText;
    },
  };
}

export { tsPlugin };
