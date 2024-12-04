const baseDomain = process.env.BASE_DOMAIN;

const url = {
  staticHost: process.env.STATIC_HOST,
  wwwDomain: `https://www${baseDomain}`,
  userInfo: `/user/my-info`, // 获取用户信息
};
export default url;
