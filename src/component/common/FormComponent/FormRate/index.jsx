import { AtRate } from 'taro-ui';

const FormRate = (props) => {
  const { label, required, error, onErrorClick, isNewLine, border, ...restProps } = props;
  // const wrapperProps = {label, required, error, onErrorClick, isNewLine, border};
  return <AtRate {...restProps} />;
};
export default FormRate;
