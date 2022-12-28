const randomstring = require('randomstring');

exports.generateReferall = () => {
  const randomNumber = randomstring.generate({
    length: 6,
    charset: 'alphanumeric'
  });
  return randomNumber;
};
