import { View } from '@tarojs/components';
import React, { useContext, useEffect } from 'react';
import { FormContext } from './useFormStore';
import { addNonRequiredAttr, getFormItemFirstChildren, onErrorClick } from './utils';

const FormItem = (props) => {
  const {
    name,
    label,
    children,
    valuePropName,
    trigger,
    getValueFromEvent,
    rules,
    validateTrigger,
    labelName,
    isNewLine,
    className = ''
  } = props;
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext);

  useEffect(() => {
    // 初始化 item 内容
    const value = (initialValues && initialValues[name]) || '';
    dispatch({ type: 'addField', name, value: { label, name, value, rules: rules || [], errors: [], isValid: true }});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 获取store 对应的 value
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  // 获取store 对应的 errors
  const errors = fieldState && fieldState.errors;
  const hasError = errors && errors.length > 0;
  const isRequired = rules?.some(rule => (typeof rule !== 'function') && rule.required);

  const onValueUpdate = (e) => {
    const val = getValueFromEvent(e);
    dispatch({ type: 'updateValue', name, value: val });
  };
  const onValueValidate = () => {
    validateField(name);
  };
  // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps = {};
  controlProps[valuePropName] = value;
  controlProps[trigger] = onValueUpdate;
  if (rules) {
    controlProps[validateTrigger] = onValueValidate;
  }
  const targetAttr = [
    {key: labelName, value: isNewLine ? '' : label},
    {key: 'required', value: isRequired},
    /** 统一添加错误处理 */
    // {key: 'error', value: hasError},
    // {key: 'onErrorClick', value: () => onErrorClick(errors[0].message)},
  ];
  const defaultErrorClick = () => {
    onErrorClick(errors[0].message);
  };
  addNonRequiredAttr(controlProps, targetAttr);
  // 2 获取 children 数组的第一个元素
  const child = getFormItemFirstChildren(children);
  /** 如果是 checkbox 之类的特殊 formItem ，报错操作交给使用者处理 */
  // addErrorHandle(child, controlProps, errors);
  // 3 cloneElement，混合这个child 以及 手动的属性列表
  const nodeProps = { ...child.props, ...controlProps };
  const returnChildNode = React.cloneElement(child, nodeProps);

  return <View className={`${className} row-wrap`}>
    <View className="form-item">
      <View className="form-item-control">
        {
          label && <View className={`form-item-label ${hasError ? 'error' : ''}`} onClick={defaultErrorClick}>{label}</View>
        }
        {returnChildNode}
      </View>
    </View>
  </View>;
};

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: e => e,
  labelName: 'title',
  isNewLine: false
};

export default FormItem;
