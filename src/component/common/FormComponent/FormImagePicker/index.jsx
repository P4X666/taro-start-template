import AtImagePicker from 'src/components/common/ImagePicker';

const FormImagePicker = (props) => {

  const { value, ...restProps } = props;

  return <AtImagePicker files={value || []} {...restProps} />;
};
export default FormImagePicker;
