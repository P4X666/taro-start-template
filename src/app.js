import { useEffect } from 'react';
import Taro from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import 'fe-taro-form/dist/index.css';
import ConfigurationProvider from './components/common/ConfigurationProvider';
import UserProvider from './components/common/UserProvider';
import './app.less';

const App = (props) => {

  useEffect(() => {
    if (!Taro.canIUse('getUpdateManager')) {
      Taro.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
        showCancel: false
      });
      return;
    }

    // https://developers.weixin.qq.com/miniprogram/dev/api/base/update/UpdateManager.html
    const updateManager = Taro.getUpdateManager();

    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(data) {
              if (data.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          });
        });

        updateManager.onUpdateFailed(() => {
          // 新版本下载失败
          Taro.showModal({
            title: '更新提示',
            content: '新版本已上线，请删除当前小程序，重新搜索打开'
          });
        });
      }
    });
    // Taro.setEnableDebug({
    //   enableDebug: true
    // });
  }, []);

  return <ConfigurationProvider>
    <UserProvider>{props.children}</UserProvider>
  </ConfigurationProvider>;
};

export default App;
