module.exports = {
  error: {
    length: 'Length should be a valid positive number',
    password: 'Password should be a valid string',
    invalidPlugin: 'Plugin should be a valid function',
  },
  regex: {
    digits: '(\\d.*)',
    letters: '([a-zA-Z].*)',
    symbols: '([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\\{\\}\\]\\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)',
    spaces: '([\\s].*)'
  }
};
