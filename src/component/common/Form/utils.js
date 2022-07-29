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
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error('子组件必须是 React Element');
  }
  // 基础样式由 taro-ui 提供，若非ui库中的组件，则给出提示
  // if (!childList[0].type?.name?.includes('At')) {
  //   console.error('子组件必须是 taro-ui 提供');
  // }
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

/** 添加报错处理 */
// export const addErrorHandle = (element, source = {}, errors) => {
//   const hasError = errors && errors.length > 0;
//   /** 判断是否有错误点击处理 */
//   if (typeof element.type?.propTypes?.onErrorClick === 'function') {
//     if (hasError) {
//       source.error = hasError;
//       source.onErrorClick = () => onErrorClick(errors[0].message);
//     }
//   } else {
//     if (hasError) {
//       onErrorClick(errors[0].message);
//     }
//   }
// };
