import { AtInput } from 'taro-ui';
import { View } from '@tarojs/components';
import styles from './index.module.less';

const FormInput = (props) => {
  const { label, hasError, onErrorClick, isNewLine, border, ...restProps } = props;
  const hasBorder = isNewLine ? true : border;
  return <View className={styles.formInput}>
    lalala
    { label && <View className={styles.label}>{ label }</View>}
    <AtInput title={label} border={hasBorder} {...restProps} />
  </View>;
};

FormInput.defaultProps = {
  border: true
};

export default FormInput;
