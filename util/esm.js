export function getModuleNames(pathOrUrl) {
  return import(pathOrUrl)
    .then((module) => {
      const modulesString = Object.entries(module)
        .reduce((acc, [key, value]) => {
          acc += key === "default" ? `${value.name} (default)\n` : `${key}\n`;
          return acc;
        }, "")
        .trim();
      return modulesString;
    });
}
