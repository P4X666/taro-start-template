import { View } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import './index.less';

const FormComponentWrapper = (props) => {
  const { className, label, required, error, onErrorClick, border, isNewLine} = props;
  const wrapperClass = classNames(className, 'form-component-wrapper', {
    'form-component-wrapper--border': border,
    'form-component-wrapper--new_line': isNewLine,
  });
  const labelClass = classNames('formLabel', {
    'formLabel--error': error,
    'formLabel--require': required
  });
  return <View className={wrapperClass}>
    { label && <View className={labelClass} onClick={onErrorClick}>
      { label }
      { error && <View className="at-icon at-icon-alert-circle"></View> }
    </View>}
    <View className="form-component-content">
      {props.children}
    </View>
  </View>;
};

FormComponentWrapper.defaultProps = {
  border: true
};

export default React.memo(FormComponentWrapper);
