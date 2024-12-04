/**
 * @name: tying.d
 * @author: leroy
 * @date: 2021/8/21 09:39
 * @description：tying.d.ts
 */

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare namespace NodeJS {
  interface ProcessEnv {
    /** NODE 内置环境变量, 会影响到最终构建生成产物 */
    NODE_ENV: 'development' | 'production';
    // .example.com
    BASE_DOMAIN: string;
    // /static
    STATIC_HOST: string;
  }
}
