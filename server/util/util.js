
function transformDataToObj(data) {
  const dataToObj = (d) => {
    const retval = {};
    data.headers.forEach((h, i) => retval[h] = d[i]);
    return retval;
  };

  return data.data.map(d => {
    const o = dataToObj(d);
    return o;
  });
}

function addCustomInfoToDataObj(dataArr, customInfo) {
  dataArr.forEach(d => Object.assign(d, customInfo));
}

module.exports = exports = {
  transformDataToObj,
  addCustomInfoToDataObj,
}
