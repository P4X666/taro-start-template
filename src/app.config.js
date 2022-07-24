export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/simpleFormExample/index'
    'pages/formExample/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  lazyCodeLoading: "requiredComponents",
  tabBar: {
    // custom: true, // 如果项目对小程序的底部栏有特殊需求，则取消该注释, 并在 src下的 custom-tab-bar 中去配置
    color: "#606266",
    selectedColor: "#3D7EFF",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "imgs/tabbar/home.png",
        selectedIconPath: "imgs/tabbar/home-active.png"
      },
      {
        pagePath: "pages/simpleFormExample/index",
        text: "简单的表单样例",
        iconPath: "imgs/tabbar/event.png",
        selectedIconPath: "imgs/tabbar/event-active.png"
      },
      {
        pagePath: "pages/formExample/index",
        text: "表单样例",
        iconPath: "imgs/tabbar/me.png",
        selectedIconPath: "imgs/tabbar/me-active.png"
      }
    ]
  },
  usingComponents: {},
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示"
    }
  }
})
