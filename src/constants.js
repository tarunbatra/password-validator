module.exports = {
  error: {
    length: 'Length should be a valid positive number',
    password: 'Password should be a valid string'
  },
  regex: {
    digits: '(\\d.*)',
    letters: [
      '([',

      // Basic Latin
      '\\u{0041}-\\u{005A}', // A-Z
      '\\u{0061}-\\u{007A}', // a-z

      // Latin-1 Supplement
      '\\u{00C0}-\\u{00D6}', // À-Ö
      '\\u{00D8}-\\u{00DE}', // Ø-Þ
      '\\u{00DF}-\\u{00F6}', // ß-ö
      '\\u{00F8}-\\u{00FF}', // ø-ÿ

      // Latin Extended-A
      '\\u{0100}-\\u{017F}', // Ā-ſ

      // Latin Extended-B
      '\\u{0180}-\\u{024F}', // ƀ-ɏ

      // Latin Extended Additional
      '\\u{1E02}-\\u{1EF3}', // Ḃ-ỳ

      // Greek and Coptic
      '\\u{0370}-\\u{03FF}', // Ͱ-Ͽ

      // Greek Extended
      '\\u{1F00}-\\u{1FFF}', // ἀ-

      // Cyrillic
      '\\u{0400}-\\u{04FF}', // Ѐ-ӿ

      // CJK
      '\\u{4E00}-\\u{9FFC}',

      '].*)'
    ].join(''),
    symbols: '([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\\{\\}\\]\\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)',
    spaces: '([\\s].*)'
  }
};
