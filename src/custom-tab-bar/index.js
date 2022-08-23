import { CoverView, CoverImage } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import useConfiguration from 'src/hooks/Configuration/useConfiguration';
import styles from './index.module.less';

const config = {
  list: [
    {
      pagePath: '/pages/home/index',
      iconPath: '../imgs/tabbar/home.png',
      selectedIconPath: '../imgs/tabbar/home-active.png',
      text: '首页'
    },
    {
      pagePath: '/pages/me/MyEvent/index',
      iconPath: '../imgs/tabbar/event.png',
      selectedIconPath: '../imgs/tabbar/event-active.png',
      text: '事件'
    },
    {
      pagePath: '/pages/me/index',
      iconPath: '../imgs/tabbar/me.png',
      selectedIconPath: '../imgs/tabbar/me-active.png',
      text: '我的'
    }
  ]
};

const CustomTabBar = () => {

  const { tabBarActiveIndex } = useConfiguration();

  const switchTab = (path) => {
    Taro.switchTab({ url: path });
  };

  return (
    <CoverView className={styles.tabBar}>
      <CoverView className={styles.wrapper}>
        {
          config.list.map((item, index) => {
            const iconUrl = index === tabBarActiveIndex ? item.selectedIconPath : item.iconPath;
            const tabBarItemClassName = `${styles.tabBarItem} ${ index === tabBarActiveIndex ? styles.tabBarItemSelected : ''}`;
            return <CoverView
              key={index}
              className={tabBarItemClassName}
              data-path={item.pagePath}
              onClick={switchTab.bind(this, item.pagePath)}
            >
              <CoverImage className={styles.icon} src={iconUrl} />
              <CoverView className={styles.label}>{item.text}</CoverView>
            </CoverView>;
          })
        }
      </CoverView>
      {/* {showCust && <CoverView className={styles.customWrap} onClick={centerImgClick}>
        <CoverImage className={styles.customIcon} src={centerImg} />
      </CoverView>} */}
    </CoverView>
  );
};

export default React.memo(CustomTabBar);
