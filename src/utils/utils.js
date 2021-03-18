import { message } from 'antd';
import { parse } from 'querystring';
import { history } from 'umi';
// import {UMI} from 'umi';
import { getApp } from '@/.umi/plugin-dva/dva';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const redirectWhenloggedIn = () => {
  const urlParams = new URL(window.location.href);
  if (urlParams.pathname.includes('user/login') || urlParams.pathname.includes('user/register')) {
    const params = getPageQuery();
    message.success('🎉 🎉 🎉  Welcome！');
    let { redirect } = params;

    if (redirect) {
      const redirectUrlParams = new URL(redirect);

      if (redirectUrlParams.origin === urlParams.origin) {
        redirect = redirect.substr(urlParams.origin.length);

        if (window.routerBase !== '/') {
          redirect = redirect.replace(window.routerBase, '/');
        }

        if (redirect.match(/^\/.*#/)) {
          redirect = redirect.substr(redirect.indexOf('#') + 1);
        }
      } else {
        window.location.href = '/';
        return;
      }
    }

    history.replace(redirect || '/');
  }
};
export function RANDOMWORDS(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function dispatch(action) {
  // console.log({ UMI });
  return getApp()?._store.dispatch(action);
  // return window.g_app?._store.dispatch(action);
}
