import Auth from '@/services/auth';
import { queryCurrent, query as queryUsers } from '@/services/user';
import Firestore from '@/services/firestore';
import { refs } from '@/services/utils/firebase_config';
import { setAuthority } from '@/utils/authority';
import { redirectWhenloggedIn } from '@/utils/utils';
import { message } from 'antd';
import { history } from 'umi';

const namespace = 'user';

export const Login = (payload) => ({ type: `${namespace}/login`, payload });
export const Register = (payload) => ({ type: `${namespace}/register`, payload });
const startLoading = (loadingType) => ({ type: 'startLoading', loadingType });
const stopLoading = (loadingType) => ({ type: 'stopLoading', loadingType });

const UserModel = {
  namespace,
  state: {
    currentUser: {},
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
          authority: "admin",      // *** TEMP ***
          created_at: new Date()
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
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const user = yield call(Auth.curr_user);

      yield put({
        type: 'saveCurrentUser',
        payload: user,
      });
    },
  },
  subscriptions: {
    authSubscriber({ dispatch }) {
      dispatch(startLoading('layout'));
      return Auth.subscribe(async (user) => {
        if (user) {
          // Check if the user exists in firestore
          const checkInFirestore = await Firestore.get(refs.users.doc(user.uid));
          if (checkInFirestore) {
            checkInFirestore.uid = user.uid;
            setAuthority(checkInFirestore.authority);
            dispatch({
              type: 'setState',
              user: checkInFirestore,
            });
            dispatch({
              type: 'buildings/init',
            });
            redirectWhenloggedIn();
            dispatch(stopLoading('layout'));
          } else {
            dispatch(stopLoading('layout'));
            // log the person out
          }
        } else {
          dispatch(stopLoading('layout'));
          dispatch({ type: 'setState', user: undefined });
        }
      });
    },
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
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
