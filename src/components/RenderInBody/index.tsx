/**
 * @author: leroy
 * @date: 2021-12-09 15:04
 * @description：RenderInBody
 */
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const CreatePortal = dynamic(() => import('./CreatePortal'), { ssr: false });

const RenderInBody = ({ children }: { children: ReactNode }) => {
  return <CreatePortal>{children}</CreatePortal>;
};

export default RenderInBody;
