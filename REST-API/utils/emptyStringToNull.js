const emptyStringToNull = (body) => {
  const bodyCopy = JSON.parse(JSON.stringify(body));

  for (const key in bodyCopy) {
    if (bodyCopy[key] === "") {
      bodyCopy[key] = null;
    }
  }

  return bodyCopy;
};

module.exports = emptyStringToNull;
