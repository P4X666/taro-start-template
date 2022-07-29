import { View } from '@tarojs/components';
import React from 'react';
import { AtCheckbox } from 'taro-ui';
import styles from './index.module.less';

/** 只有一个选项 */
const FormCheckbox = (props) => {
  const { options, value, className } = props;
  if (options.length > 1) {
    console.error('最多只有一个选项，若有多个选项，建议使用 FormCheckboxGroup ');
  }
  return <View className={`${styles.checkBox} ${className}`}>
    <AtCheckbox options={options} selectedList={[ value ]} />
  </View>;
};
export default React.memo(FormCheckbox);
