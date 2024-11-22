/**
 * @author: leroy
 * @date: 2021/10/29 17:47
 * @description：Layout
 */

import Head from 'next/head';
import Header from './Header';
import SEO from './SEO';
import Footer from './Footer';
import type { FC, ReactNode } from 'react';

export type LayoutConfig = {
  header?: false;
  footer?: false;
};

const Layout: FC<{ children: ReactNode } & LayoutConfig> = ({ children, footer, header }) => (
  <>
    <Head>
      <meta name="baidu-site-verification" content="uGgzMZ4ZfV" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="cleartype" content="on" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriENDly" content="True" />
      <meta itemProp="image" content="" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta content="yes" name="apple-touch-fullscreen" />
    </Head>
    <SEO />
    {header !== false && <Header />}
    {children}
    {footer !== false && <Footer />}
  </>
);
export default Layout;
