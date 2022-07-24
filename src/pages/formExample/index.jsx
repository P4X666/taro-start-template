import { useRef } from 'react';
import { View, Button, Picker } from '@tarojs/components';
import Form from 'src/components/common/Form';
import { AtInput } from 'taro-ui';
import Taro from '@tarojs/taro';
import { gradeList } from 'src/utils/constent';
import styles from './index.module.less';

const FormExample = () => {

  const formRef = useRef(null);

  const onSubmit = () => {
    formRef.current.validateAllFields().then(({ isValid, errors, values }) => {
      if (isValid) {
        console.log('验证通过，表单的值为：', values);
      } else {
        console.log('验证未通过，表单的值为：', values);
        console.log('错误信息为：', errors);
      }
    });
  };

  // const location = {
  //   latitude: '',
  //   longitude: ''
  // };
  const chooseLocation = () => {
    let params = {};
    Taro.chooseLocation({
      ...params,
      success: (res) => {
        console.log(res);
        formRef.current.setFieldValue('address', res.address);
      }
    });
  };
  const onReset = () => {
    formRef.current.resetFields();
  };
  return (
    <View className={styles.wrapper}>
      <View className={styles.box}>
        <Form ref={formRef} initialValues={{ username: '用户名1' }}>
          <Form.Item label="详细地址" name="address" rules={[ { type: 'string', required: true, message: '请选择详细地址' } ]}>
            <AtInput disabled onClick={chooseLocation}>
              <View className="at-icon at-icon-chevron-right"></View>
            </AtInput>
          </Form.Item>
          <Form.Item>
            <Picker mode="selector" range={gradeList} className={styles.required}>
              {/* <AtList>
                <AtListItem
                  arrow="right"
                  title="预警等级"
                  extraText={formValue.warnLevel}
                />
              </AtList> */}
            </Picker>
          </Form.Item>
        </Form>
        <Button form-type="submit" onClick={onSubmit} className={styles.submit}>提交</Button>
        <Button onClick={onReset} className={styles.submit}>重置</Button>
      </View>
    </View>
  );
};

export default FormExample;
