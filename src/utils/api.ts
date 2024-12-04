/**
 * @author: leroy
 * @date: 2021/9/26 16:35
 * @description：request
 */

import axios from 'axios';
import { message } from 'antd';
import Cookies from 'js-cookie';

// 覆盖返回类型
declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const codeMessage: Record<number, string | (() => void)> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  429: () => {
    window.location.reload();
  },
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const baseDomain = process.env.BASE_DOMAIN;
const instance = axios.create({
  baseURL: `https://api${baseDomain}`,
  withCredentials: true,

  headers: {
    ...(typeof window === 'undefined' && { Connection: 'keep-alive' }),
  },
});

/**
 * 异常处理程序
 */

instance.interceptors.request.use(
  (config) => {
    // config.params.client = "pc"
    const newParams: any = config.params || {};
    const auth = Cookies.get('auth');
    if (auth) {
      newParams.auth = auth;
    }
    return { ...config, params: newParams };
  },
  (error) => {
    console.log('请求错误', error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const statusCode = error.response && error.response.status;
    if (typeof window !== 'undefined') {
      const handleCode = codeMessage[statusCode];
      if (typeof handleCode !== 'string') {
        handleCode();
      } else {
        message.error(handleCode, 1);
      }
      return undefined;
    }
    return Promise.reject(codeMessage[statusCode]);
  },
);

export default instance;
