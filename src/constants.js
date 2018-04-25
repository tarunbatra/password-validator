module.exports = {
  error: {
    length: 'Length should be a valid positive number',
    password: 'Password should be a valid string'
  },
  regex: {
    digits: /\d+/,
    letters: /[a-zA-Z]+/,
    uppercase: /[A-Z]+/,
    lowercase: /[a-z]+/,
    symbols: /[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?€£¥₹]+/,
    spaces: /[\s]+/
  }
};
