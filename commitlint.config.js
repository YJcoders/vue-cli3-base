module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'never'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // bug修复
        'docs', // 文档更新
        'style', // 样式，格式更新
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试更新
        'build', // 构建系统，或者包依赖更新
        'chore', // 非src或=或者测试文件更新
        'ci', // CI配置，脚本更新
        'revert' // 版本回退
      ]
    ]
  }
};
