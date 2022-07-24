import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
// import { apiLogin, apiLogout } from 'src/api';
import UserContext from 'src/context/user';
import { commonApi } from 'src/http/api';

const loginRoute = 'pages/simpleFormExample/index';

const UserProvider = ({ children }) => {

  const [ userInfo, updateUserInfo ] = useState(null);

  const { runAsync: _login } = useRequest(commonApi.login, { manual: true });
  // const { runAsync: _logout } = useRequest(apiLogout, { manual: true });
  const { runAsync: _userInfo } = useRequest(commonApi.getUserInfo, { manual: true });

  const setUserInfo = (info) => {
    updateUserInfo(info);
  };

  /** 当前页面是否在首页 */
  const isLoginPage = () => {
    const pages = Taro.getCurrentPages();
    if (pages.length > 0) {
      const thisRoute = pages[pages.length - 1].route;
      return loginRoute === thisRoute;
    }
    return false;
  };

  useEffect(() => {
    if (!isLoginPage()) {
      // _userInfo().then(resp => {
      //   setUserInfo(resp);
      //   return resp;
      // }).catch((err) => {
      //   console.log(err);
      //   Taro.reLaunch({url: `/${loginRoute}` });
      // });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    userInfo,
    login: (params) => _login(params)
      .then(resp => {
        setUserInfo(resp);
        return resp;
      }),
    // .catch(err => {
    //   console.log(err, ' login --------------> ');
    // }),
    getUserInfo: () => _userInfo()
      .then(resp => {
        setUserInfo(resp);
        return resp;
      }),
    // logout: () => _logout()
    //   .then(() => {
    //     updateUserInfo(null);
    //   })
  };

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  );
};

export default UserProvider;
