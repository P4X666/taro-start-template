import { AtRate } from 'taro-ui';

const FormRate = (props) => {
  const {label, value, ...restProps} = props;
  return <AtRate value={value} {...restProps} />;
};
export default FormRate;
