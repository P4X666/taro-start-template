import { AtSwitch } from 'taro-ui';

const FormSwitch = (props) => {
  const { label, value, ...restProps } = props;
  return <AtSwitch title={label} checked={value} {...restProps} />;
};
export default FormSwitch;
