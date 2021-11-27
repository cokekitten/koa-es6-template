module.exports = {
  types: [
    {
      value: 'WIP',
      name: '💡  WIP: 工作正在进行中',
    },
    {
      value: 'feat',
      name: '🚀  feat: 一个新功能',
    },
    {
      value: 'fix',
      name: '🔧  fix: 修复一个 BUG',
    },
    {
      value: 'refactor',
      name: '🔨  refactor: 既不修复 BUG 也不添加功能的代码更改，代码重构',
    },
    {
      value: 'release',
      name: '🛳  release: 发布一个新的发行版',
    },
    {
      value: 'docs',
      name: '📚  docs: 仅文档更改',
    },
    {
      value: 'test',
      name: '🔍  test: 添加缺失的测试或纠正现有的测试',
    },
    {
      value: 'perf',
      name: '⚡️  perf: 提高性能的更改',
    },
    {
      value: 'chore',
      name: '🚬  chore: 变更构建流程或辅助工具',
    },
    {
      value: 'workflow',
      name: '📦  workflow: 仅影响工作流程的更改，例如更新构建系统或 CI 等',
    },
    {
      value: 'style',
      name: '💅  style: 代码样式，不影响代码含义的更改（空格、格式、缺少分号等）',
    },
    {
      value: 'revert',
      name: '⏱  revert: 恢复 commit',
    },
  ],

  // 指定特定项目的范围
  scopes: [{ name: 'accounts' }, { name: 'admin' }, { name: 'exampleScope' }, { name: 'changeMe' }],

  // 重定义消息
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // 如果 allowCustomScopes 为 true 则使用
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],

  // 限制长度
  subjectLimit: 100,
}
