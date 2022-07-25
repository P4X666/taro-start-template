export const showErrorMessage = (errorMessage, during = 2000) => {
  if (errorMessage) {
    // 添加延迟，防止与业务代码中的 Taro.showLoading 发生冲突
    setTimeout(() => {
      Taro.showToast({
        title: errorMessage,
        icon: 'error',
        duration: during
      });
    }, 100);
  }
};