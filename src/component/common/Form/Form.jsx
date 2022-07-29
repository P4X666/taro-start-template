import { View } from '@tarojs/components';
import { forwardRef, useImperativeHandle } from 'react';
import useFormStore, { FormContext } from './useFormStore';

const Form = forwardRef((props, ref) => {
  const { name = 'form', children, initialValues } = props;
  const { form, fields, dispatch, ...restProps} = useFormStore(initialValues);
  const { validateField } = restProps;
  /** 绑定在 form 实例上的方法，外部可直接使用 */
  useImperativeHandle(ref, () => {
    return {
      ...restProps
    };
  });
  const context = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };
  console.log('---------------');
  console.log(name, fields);
  console.log('---------------');

  // 支持自定义渲染
  let childrenNode;
  if (typeof children === 'function') {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }
  return <View name={name} className="form-wrap">
    <FormContext.Provider value={context}>
      { childrenNode }
    </FormContext.Provider>
  </View>;
});


export default Form;
