import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import ConfigurationContext from 'src/hooks/Configuration/configuration';
/** 系统的配置信息 */
const ConfigurationProvider = ({ children }) => {
  /** 安全距离 */
  const [safeArea, updateSafeArea] = useState({});
  /** 在自定义 tab 栏时，跟随 tab 栏的变化 */
  const [ tabBarActiveIndex, setTabBarActiveIndex ] = useState(0);
  /** 窗口可用高度 */
  const [ windowHeight, setWindowHeight ] = useState(700);
  useEffect(() => {
    Taro.getSystemInfo({
      success: res => {
        console.log(res, 'getSystemInfo');
        // 注意：如果使用微信开发者工具中的模拟器，screenHeight和bottom始终是相等的，需要用真机来测试
        const safeAreaBottom = res.screenHeight - res.safeArea.bottom;
        updateSafeArea({bottom: safeAreaBottom});
        setWindowHeight(res.windowHeight);
      }
    });
  }, []);

  const value = {
    safeArea,
    windowHeight,
    tabBarActiveIndex,
    setTabBarActiveIndex
  };

  return (
    <ConfigurationContext.Provider value={value}>
      { children }
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationProvider;
