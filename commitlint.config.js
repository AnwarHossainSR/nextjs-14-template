module.exports = {
  extends : [ '@commitlint/config-conventional' ],
  rules : {
    'header-max-length' : [ 2, 'always', 72 ],
    'subject-case' : [ 2, 'never', [ 'upper-case' ] ],
  },
};
