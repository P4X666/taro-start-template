import { Image, View } from '@tarojs/components';

import emptyImg from 'src/imgs/common/empty.svg';
import styles from './index.module.less';

const Empty = (props) => {

  const { className, text = '暂无数据' } = props;
  return (
    <View className={`${styles.wrapper} ${className}`}>
      <Image src={emptyImg} className={styles.img}></Image>
      <View className={styles.text}>{text}</View>
    </View>
  );
};

export default Empty;
