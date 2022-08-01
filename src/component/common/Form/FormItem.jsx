import React, { useContext, useEffect } from 'react';
import FormComponentWrapper from './FormComponentWrapper';
import { FormContext } from './useFormStore';
import { addNonRequiredAttr, getFormItemFirstChildren, _onErrorClick } from './utils';

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
    className = '',
    border,
    onErrorClick = _onErrorClick,
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
  // 支持自定义校验
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
    {key: labelName, value: ''},
    {key: 'required', value: false},
    {key: 'error', value: false},
    {key: 'onErrorClick', value: () => {}},
  ];
  addNonRequiredAttr(controlProps, targetAttr);
  // 2 获取 children 数组的第一个元素
  const child = getFormItemFirstChildren(children);
  // 3 cloneElement，混合这个child 以及 手动的属性列表
  // 在混合时需要将 label, required, error, onErrorClick, border 属性拦截
  const nodeProps = { ...child.props, ...controlProps };
  const returnChildNode = React.cloneElement(child, nodeProps);

  const formItemWrapperProps = {
    label,
    required: isRequired,
    error: hasError,
    isNewLine,
    onErrorClick: () => onErrorClick(errors[0].message),
    border,
    className
  };
  return <FormComponentWrapper {...formItemWrapperProps}>
    {returnChildNode}
  </FormComponentWrapper>;
};

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: e => e,
  labelName: 'label',
  isNewLine: false
};

export default FormItem;
