import { createContext, useState, useReducer } from 'react';
import Schema from 'async-validator';
import { mapValues, each } from 'lodash';

export const FormContext = createContext({});

function fieldsReducer(state, action) {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value }
      };
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value }
      };
    case 'updateValidateResult':
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors }
      };
    default:
      return state;
  }
}

function useFormStore(initialValues) {
  const [ form, setForm ] = useState({
    isValid: true,
    isSubmitting: false,
    errors: {}
  });
  const [ fields, dispatch ] = useReducer(fieldsReducer, {});
  const getFieldValue = (key = '') => {
    return fields[key] && fields[key].value;
  };
  const setFieldValue = (name = '', value) => {
    if (fields.hasOwnProperty(name)) {
      dispatch({ type: 'updateValue', name, value });
    }
  };
  const transfromRules = (rules = []) => {
    return rules.map(rule => {
      if (typeof rule === 'function') {
        const calledRule = rule({ getFieldValue });
        return calledRule;
      } else {
        return rule;
      }
    });
  };
  const validateField = (name = '') => {
    if (!name) {
      console.error('请输入要校验的 name');
      return;
    }
    const { value, rules } = fields[name];
    const afterRules = transfromRules(rules);
    const descriptor = {
      [name]: afterRules
    };
    const valueMap = {
      [name]: value
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors = [];
    validator
      .validate(valueMap)
      .catch(e => {
        isValid = false;
        console.log('e', e.errors);
        console.log('fields', e.fields);
        errors = e.errors;
      })
      .finally(() => {
        console.log('errors', isValid);
        dispatch({
          type: 'updateValidateResult',
          name,
          value: { isValid, errors }
        });
      });
  };
  /** 校验表单所有子项 */
  const validateAllFields = () => {
    // 开始提交
    setForm({ ...form, isSubmitting: true });
    let isValid = true;
    let errors = {};
    const valueMap = mapValues(fields, item => item.value);
    const descriptor = mapValues(fields, item => transfromRules(item.rules));
    const validator = new Schema(descriptor);
    return new Promise((res) => {
      validator
        .validate(valueMap)
        .catch(e => {
          isValid = false;
          errors = e.fields;
          each(fields, (value, name) => {
            // errors 中有对应的 key
            if (errors[name]) {
              const itemErrors = errors[name];
              dispatch({
                type: 'updateValidateResult',
                name,
                value: { isValid: false, errors: itemErrors }
              });
            } else if (value.rules.length > 0 && !errors[name]) {
              dispatch({
                type: 'updateValidateResult',
                name,
                value: { isValid: true, errors: [] }
              });
            }
            //  有对应的 rules，并且没有 errors
          });
        })
        .finally(() => {
          setForm({ ...form, isSubmitting: false, isValid, errors });
          res({
            isValid,
            errors,
            values: valueMap
          });
        });
    });

  };
  /** 重置表单数据 */
  const resetFields = () => {
    if (initialValues) {
      const valueMap = mapValues(fields, item => item.value);
      each(valueMap, (value, name) => {
        let initValue;
        if (initialValues[name]) {
          initValue = initialValues[name];
        }
        dispatch({ type: 'updateValue', name, value: initValue});
      });
    }
  };

  return {
    fields,
    dispatch,
    form,
    validateField,
    getFieldValue,
    setFieldValue,
    validateAllFields,
    resetFields
  };
}

export default useFormStore;
