import { View } from '@tarojs/components';
import useConfiguration from 'src/hooks/useConfiguration';
import { AtButton } from 'taro-ui';
import styles from './index.module.less';

const SafeAreaContainer = (props) => {

  const {hasButton, onClick, text, className, loading, customButton } = props;

  const { safeArea } = useConfiguration();

  const _onClick = () => {
    onClick && onClick();
  };
  const buttonHeight = hasButton ? 46 : 0;
  return <View className={styles.contain} style={{paddingBottom: buttonHeight + safeArea.bottom + 'px'}}>
    {props.children}
    <View className={styles.safeBottom} style={{ paddingBottom: safeArea.bottom + 'px' }}>
      {props.tip && <View className={styles.tips}>{props.tip}</View>}
      {customButton || hasButton && <AtButton className={`${styles.btn} ${className}`} onClick={_onClick} type="primary" block disabled={loading}>{text}</AtButton>}
    </View>
  </View>;
};

export default SafeAreaContainer;
