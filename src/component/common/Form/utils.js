import Taro from '@tarojs/taro';
import React from 'react';

/** formItem 限定有且只有一个子组件，否则给出错误提示 */
export const getFormItemFirstChildren = (children) => {
  const childList = React.Children.toArray(children);
  // 没有子组件
  if (childList.length === 0) {
    console.error('必须提供一个 form 子组件');
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn('只支持一个子组件，其余会被忽略');
  }
  // 不是 Form 的子组件
  if (childList[0].type?.type === 'FormItem') {
    console.error('子组件必须是 FormItem');
  }
  return childList[0];
};

/** 添加非必要属性 */
export const addNonRequiredAttr = (source = {}, targetAttr = [ {key: '', value: ''} ]) => {
  for (const iterator of targetAttr) {
    if (iterator.value) {
      source[iterator.key] = iterator.value;
    }
  }
};

export const _onErrorClick = (errMessage = '') => {
  Taro.showToast({
    title: errMessage,
    icon: 'none',
    duration: 1500,
    mask: true
  });
};
