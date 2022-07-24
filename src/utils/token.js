import Taro from '@tarojs/taro';
import { TOKEN_KEY } from 'src/utils/constent';

export const loginUlr = '/pages/login/phoneLogin/index';

export const getToken = () => {
  let token = '';
  try {
    token = Taro.getStorageSync(TOKEN_KEY);
  } catch (err) {
    console.error(err, ' token 不存在 ');
  }
  return token;
};

export const layout = () => {
  return Taro.removeStorage({key: TOKEN_KEY});
};
