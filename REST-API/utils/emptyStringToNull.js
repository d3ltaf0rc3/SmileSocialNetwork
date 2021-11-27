const emptyStringToNull = (obj) => {
  const copy = JSON.parse(JSON.stringify(obj));

  for (const key in copy) {
    if (copy[key] === "") {
      copy[key] = null;
    }
  }

  return copy;
};

module.exports = emptyStringToNull;
