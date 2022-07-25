import { showErrorMessage } from 'src/utils/common';
import { baseURL } from '@/utils/global';
import Taro from '@tarojs/taro';
import { LOGIN_URL, TOKEN_KEY } from 'src/utils/constent';
import { getToken } from 'src/utils/token';
// eslint-disable-next-line import/no-commonjs
const Flyio = require('flyio/dist/npm/wx');

const fly = new Flyio();

//配置请求基地址
fly.config.baseURL = baseURL;

/** 登录接口不需要检查token */
const noAuthUrl = [ '/api/user/login' ];

const isLoginPage = () => {
  const loginRoutes = LOGIN_URL.substring(1);
  const pages = Taro.getCurrentPages();
  if (pages.length > 0) {
    const thisRoute = pages[pages.length - 1].route;
    return loginRoutes === thisRoute;
  }
  return false;
};
/** 跳转到登录页 */
const reLaunchLoginPage = () => {
  // 防止在登录页重复跳转
  if (!isLoginPage()) {
    Taro.reLaunch({url: LOGIN_URL});
  }
}

fly.interceptors.request.use(request => {
  request.headers['Content-Type'] = 'application/json;charset=utf-8';
  request.headers['x-forwarded-host'] = request.baseURL;
  const token = getToken();
  if (token) {
    request.headers[TOKEN_KEY] = token;
  } else {
    if (!noAuthUrl.includes(request.url)) {
      reLaunchLoginPage();
      fly.clear(); // 清空后续请求
      return Promise.reject('没有查到token，取消请求， 并跳转到登录页');
    }
  }
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use((response, promise) => {
  if (Array.isArray(response.headers.tokenname)) {
    Taro.setStorage({
      key: TOKEN_KEY,
      data: response.headers.tokenvalue[0]
    });
  }

  return promise.resolve(response.data);
},
(error, promise) => {
  if ([ 401, 404 ].includes(error.status)) {
    reLaunchLoginPage();
  }
  const errorMessage = error?.response?.data?.message;
  showErrorMessage(errorMessage);

  return promise.reject(error);
});

export default fly;
