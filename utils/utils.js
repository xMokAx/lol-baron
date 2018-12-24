export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export function getValueByProp(object, prop, value) {
  const key = Object.keys(object).find(
    key => object[key][prop].toLowerCase().replace(/([ &])/gi, "") === value
  );
  return object[key];
}
