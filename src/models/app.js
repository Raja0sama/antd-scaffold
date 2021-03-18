import Auth from '@/services/auth';
import Firestore from '@/services/firestore';
import { refs } from '@/services/utils/firebase_config';
import { setAuthority } from '@/utils/authority';
import { redirectWhenloggedIn } from '@/utils/utils';
import { message } from 'antd';
import { history } from 'umi';

const namespace = 'app';

export const Login = (payload) => ({ type: `${namespace}/login`, payload });
export const Register = (payload) => ({ type: `${namespace}/register`, payload });
const startLoading = (loadingType) => ({ type: 'startLoading', loadingType });
const stopLoading = (loadingType) => ({ type: 'stopLoading', loadingType });

export default {
  namespace,
  state: {
    user: undefined,
    loading: {
      user: false,
      login: false,
      register: false,
      layout: false,
    },
  },

  effects: {
    *register({ payload }, { call, put }) {
      yield put(startLoading('register'));
      try {
        // create an account
        const auth = yield call(Auth.register_with_email, payload.username, payload.password);
        // create a firestore entry
        yield call(Firestore.register_user_entry, auth.user.uid, {
          name: payload.name,
          email: payload.username,
        });
      } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          message.error('The password is too weak.');
        } else {
          message.error(errorMessage);
        }
      }
      yield put(stopLoading('register'));
    },
    *login({ payload }, { call, put }) {
      yield put(startLoading('login'));
      try {
        yield call(Auth.login_with_email, payload.username, payload.password);
        yield put(stopLoading('login'));
      } catch (e) {
        yield put(stopLoading('login'));
        message.error('Error occured, make sure to input correct credientials.');
      }
    },
  },

  subscriptions: {
    authSubscriber({ dispatch }) {},
  },

  reducers: {
    setState(state, newState) {
      return { ...state, ...newState };
    },
    startLoading(state, { loadingType }) {
      return { ...state, loading: { ...state.loading, [loadingType]: true } };
    },
    stopLoading(state, { loadingType }) {
      return { ...state, loading: { ...state.loading, [loadingType]: false } };
    },
  },
};
