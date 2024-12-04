/**
 * @author: leroy
 * @date: 2021/8/21 09:54
 * @description：首页
 */
import { saveTDK } from '@/store/slices/seo';
import { useMemoSelector } from '@/store/store';
import { useEffect } from 'react';
import { Button } from 'antd';
import CatSvg from '@/assets/svgs/cat.svg';
import Icon from '@ant-design/icons';
import type { NextPageWithLayout } from '@/pages/_app';

const Home: NextPageWithLayout = () => {
  const { userInfo, loading } = useMemoSelector((state) => ({
    userInfo: state.user.userInfo,
    loading: state.loading['user/getUserInfo'],
  }));
  useEffect(() => {
    if (userInfo.auth) {
      console.log('userInfo', userInfo);
    }
  }, [userInfo.auth]);
  useEffect(() => {
    console.log('loading', loading);
  }, [loading]);
  return (
    <div className="block">
      首页
      <Button>123</Button>
      <Icon component={CatSvg} style={{ color: '#ccc' }} />
    </div>
  );
};

Home.getInitialProps = async ({ store, query }) => {
  await store.dispatch(
    saveTDK({
      title: '首页',
      keywords: '',
      description: '',
    }),
  );
  return { query };
};
Home.layout = {
  footer: false,
};

export default Home;
