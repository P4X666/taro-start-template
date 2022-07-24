import Taro from '@tarojs/taro';
import { TOKEN_KEY } from 'src/utils/constent';
import { baseURL } from 'src/utils/global';
import { getToken, loginUlr } from 'src/utils/token';

const noAuthHandle = () => {
  const token = getToken();
  if (!token) {
    Taro.redirectTo({ url: loginUlr });
    return;
  }
  return token;
};

export const uploadSource = ({ url, filePath, formData }) => {
  const token = noAuthHandle();
  return Taro.uploadFile({
    url: baseURL + url,
    filePath,
    name: 'file',
    fileName: 'file',
    formData: {
      ...formData
    },
    header: { [TOKEN_KEY]: token }
  });
};

export const uploadSourceHandle = (source, tips, eventId) => {
  const params = {
    url: `/api/event/upload/${eventId}`,
    filePath: source.tempFilePath
  };
  // 如果有 duration ，说明是音频，视频
  if (source.duration) {
    params.formData = {
      duration: source.duration
    };
  }
  console.log(params, '文件上传------------------》');
  return uploadSource(params)
    .then(() => {
      Taro.showToast({ title: tips, icon: 'success' });
    })
    .catch(err => {
      Taro.showToast({ title: err, icon: 'error' });
    });
};

export const downloadSource = ({ url }) => {
  const token = noAuthHandle();
  return Taro.downloadFile({
    url: baseURL + url,
    header: { [TOKEN_KEY]: token },
    fail: err => {
      console.log(err);
      Taro.showToast({ title: '资源下载失败，请重新下载！', icon: 'error' });
    }
  });
};
