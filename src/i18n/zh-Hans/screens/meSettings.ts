export default {
  heading: '设置',
  content: {
    language: {
      heading: '切换语言',
      options: {
        en: 'English',
        'zh-Hans': '简体中文',
        cancel: '$t(common:buttons.cancel)'
      }
    },
    theme: {
      heading: '应用外观',
      options: {
        auto: '跟随系统',
        light: '浅色模式',
        dark: '深色模式',
        cancel: '$t(common:buttons.cancel)'
      }
    },
    browser: {
      heading: '打开链接',
      options: {
        internal: '应用内',
        external: '系统浏览器',
        cancel: '$t(common:buttons.cancel)'
      }
    },
    remote: {
      heading: '$t(meSettingsUpdateRemote:heading)',
      description: '外站只能看不能玩'
    },
    cache: {
      heading: '清空缓存',
      empty: '暂无缓存'
    },
    analytics: {
      heading: '帮助我们改进',
      description: '允许我们收集不与用户相关联的使用信息'
    },
    version: '版本 v{{version}}'
  }
}
