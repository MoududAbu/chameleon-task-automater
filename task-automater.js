const { fileWriter, updateCSS } = require("./file-editor");

const searchColorProperties = (regex, data) => {
  const cssColorProperties = {};
  while ((match = regex.exec(data)) != null) {
    const start = match.index;
    const end = data.indexOf(";", match.index);
    const colorProperty = data.substring(match.index, end + 1);
    cssColorProperties[colorProperty] = updateColorProperty(colorProperty);
  }
  return cssColorProperties;
};

const updateColorProperty = (cssProperty) => {
  return cssProperty.replace("$color-", "var(--").replace(";", ");");
};

const updateColorProperties = (cssColorProperties, data) => {
  const regexString = Object.keys(cssColorProperties)
    .join("|")
    .replaceAll(/\$/g, "\\$")
    .replace(/[0-9]/g, '')
    .replace(/[.,\s]/g, '')
    .replace(/\s/g,'')
    .replace(/Unmatched/, '');

  const regex = new RegExp(regexString, "gi");

  return data.replace(regex, function (matched) {
    return cssColorProperties[matched];
  });
};

const updateFile = (data, componentPath) => {
  if (data.includes("$color") && data.includes(";")) {
    const regex = /\$color/g;
    const cssColorProperties = searchColorProperties(regex, data);
    const result = updateColorProperties(cssColorProperties, data);
    fileWriter(componentPath, result)
  }
};

updateCSS(updateFile);