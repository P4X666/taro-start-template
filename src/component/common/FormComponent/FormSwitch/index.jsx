import { AtSwitch } from 'taro-ui';

const FormSwitch = (props) => {
  const { label, required, error, onErrorClick, isNewLine, border, ...restProps } = props;
  // const wrapperProps = {label, required, error, onErrorClick, isNewLine, border};
  return <AtSwitch {...restProps} />;
};
export default FormSwitch;
