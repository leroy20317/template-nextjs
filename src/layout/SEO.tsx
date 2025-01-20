/*
 * @Author: leroy
 * @Date: 2024-10-31 11:23:01
 * @LastEditTime: 2025-01-20 10:06:20
 * @Description: SEO
 */

import { useAppSelector } from '@/store/store';
import type { FC } from 'react';
import { NextSeo } from 'next-seo';
import url from '@/utils/url';
import { useRouter } from 'next/router';

const SEO: FC = () => {
  const { title, description, keywords, openGraph } = useAppSelector((state) => state.seo);
  const { asPath } = useRouter();
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        type: 'website',
        locale: 'zh_CN',
        url: `${url.wwwDomain}${decodeURIComponent(asPath)}`,
        siteName: '',
        // images: [
        //   {
        //     url: `${url.staticHost}/images/share-logo.png`,
        //     alt: '',
        //   },
        // ],
        ...openGraph,
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: `${url.wwwDomain}/favicon.ico`,
        },
      ]}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: keywords || '',
        },
        {
          httpEquiv: 'x-ua-compatible',
          content: 'IE=edge',
        },
        {
          name: 'viewport',
          content:
            'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
        },
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
      ]}
    />
  );
};
export default SEO;
