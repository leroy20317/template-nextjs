/**
 * @author: leroy
 * @date: 2021/8/21 09:54
 * @description：首页
 */
import type { NextPage } from 'next';
import { saveTDK } from '@/store/slices/seo';
import { useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { Button } from 'antd';
import CatSvg from '@/assets/svgs/cat.svg';

const Home: NextPage = () => {
  const { userInfo, loading } = useAppSelector((state) => ({
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
      <CatSvg />
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

export default Home;
