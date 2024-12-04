/**
 * @author: leroy
 * @date: 2021/8/28 14:37
 * @description：seo
 */
import Head from 'next/head';
import { useMemoSelector } from '@/store/store';
import type { FC } from 'react';

const SEO: FC = () => {
  const { title, description, keywords } = useMemoSelector((state) => state.seo);
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </Head>
  );
};
export default SEO;
