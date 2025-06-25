/*
 * @Author: leroy
 * @Date: 2024-10-31 11:23:01
 * @LastEditTime: 2025-06-25 14:35:51
 * @Description: prettier config
 */
/** @type {import('prettier').Options} */
const prettierConfig = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/pages/global.css',
  tailwindFunctions: ['classNames'],
};

export default prettierConfig
