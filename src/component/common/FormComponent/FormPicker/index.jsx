import { Picker } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';

const FormPicker = (props) => {
  const {mode, options, value, label } = props;

  return <Picker mode={mode} range={options}>
    <AtList>
      <AtListItem
        title={label}
        extraText={value}
      />
    </AtList>
  </Picker>;
};
export default FormPicker;
