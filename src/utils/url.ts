const Url = {
  staticHost: process.env.STATIC_HOST,
  wwwDomain: process.env.API_HOST?.replace('api', 'www'),
  userInfo: `/user/my-info`, // 获取用户信息
};
export default Url;
