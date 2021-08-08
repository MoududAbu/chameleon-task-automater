const { fileReader } = require("./file-reader");
let { parse, stringify } = require("scss-parser");
let createQueryWrapper = require("query-ast");
const { filter, indexOf, property } = require("lodash");

const componentPath =
  "../sounds-components/src/components/organisms/Banner/banner.scss";

const searchColorProperties = (regex, data) => {
  const cssColorProperties = [];
  while ((match = regex.exec(data)) != null) {
    const start = match.index;
    const end = data.indexOf(";", match.index);
    const colorProperty = data.substring(match.index, end + 1);
    cssColorProperties.push(colorProperty);
  }
  return cssColorProperties;
};

const updateColorProperty = (cssProperty) => {
  return cssProperty.replace("$color", "var(--").replace(";", ");");
};

const updateColorProperties = (cssColorProperties, data) => {

  cssColorProperties.forEach((cssProperty) => {
    updatedProperty = updateColorProperty(cssProperty);
    let results = data.replace(cssProperty, updatedProperty);
    console.log(results);
  });

  // return data;
}

const readFile = (data) => {
  if (data.includes("$color") && data.includes(";")) {
    const regex = /\$color/g;
    const cssColorProperties = searchColorProperties(regex, data);
    const result = updateColorProperties(cssColorProperties, data);
    // console.log(result)
  }
};

fileReader(componentPath, readFile);
