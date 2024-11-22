/**
 * @author: leroy
 * @date: 2021/8/20 20:30
 * @description：_app
 */
import type { ReactElement, ReactNode } from 'react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import type { NextPage } from 'next';
import { wrapper } from '@/store/store';
import { StyleProvider } from '@ant-design/cssinjs';
import { App as AntdApp, ConfigProvider } from 'antd';

import type { LayoutConfig } from '@/layout';
import './global.css';
import Layout from '@/layout';

import App from 'next/app';
import { Provider } from 'react-redux';
import { fetchUserInfo } from '@/store/slices/user';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(durationPlugin);

export type NextPageWithLayout<T = any> = NextPage<T> & {
  layout?: {
    renderContent?: (page: ReactElement) => ReactNode;
  } & LayoutConfig;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  err: any;
};

function MyApp({ Component, pageProps, ...other }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore({ pageProps, ...other });

  const { renderContent, ...layout } = Component.layout ?? {};
  const getLayout = renderContent ?? ((page) => <Layout {...layout}>{page}</Layout>);
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: '#FF8135',
          colorTextBase: '#19191a',
        },
      }}
    >
      <AntdApp>
        <StyleProvider hashPriority="high">
          <Provider store={store}>
            {getLayout(<Component {...props.pageProps} {...other} />)}
          </Provider>
        </StyleProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
  const {
    ctx: { req },
  } = appContext;
  if (req) {
    try {
      const auth = (req as any)?.cookies.haitou_auth;
      if (auth) {
        await store.dispatch(fetchUserInfo({ auth }));
      }
    } catch (e) {
      console.log('e', e);
    }
  }
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
});

export function reportWebVitals(metric: NextWebVitalsMetric) {
  return;
  switch (metric.name) {
    // handle FCP results
    // TTFB + 内容加载时间 + 渲染时间
    case 'FCP':
      console.log('FCP 首次内容绘制', metric);
      break;
    // handle LCP results
    case 'LCP':
      console.log('LCP 最大的内容绘制', metric);
      break;
    // handle CLS results
    case 'CLS':
      console.log('CLS 累积布局偏移', metric);
      break;
    // handle FID results
    case 'FID':
      console.log('FID 首次输入延迟', metric);
      break;
    // handle TTFB results
    case 'TTFB':
      console.log('TTFB 首字节时间', metric);
      break;
    // handle route-change to render results
    case 'Next.js-route-change-to-render':
      console.log('路由改变后页面开始渲染的时间', metric);
      break;
    // handle render results
    case 'Next.js-render':
      console.log('路由更改后页面完成渲染的时间', metric);
      break;
    default:
      console.log(metric);
      break;
  }
}

export default MyApp;
