import User from '@/services/user';
import { functions } from '@/services/utils/firebase_config';
import { dispatch, RANDOMWORDS } from '@/utils/utils';
const namespace = 'accounts';
export const init = (account) => ({ type: `${namespace}/init`, payload: account });
export const createAnAccount = (payload, account) => ({
  type: `${namespace}/createAnAccount`,
  payload,
  account,
});
export const setState = (payload) => ({
  type: `${namespace}/setState`,
  ...payload,
});
const startLoading = (loadingType) => ({ type: 'startLoading', loadingType });
const stopLoading = (loadingType) => ({ type: 'stopLoading', loadingType });
export const unsubAccounts = () => ({
  type: `${namespace}/unsubCurrent`,
});

export default {
  namespace,
  state: {
    admin: undefined,
    owner: undefined,
    customer: undefined,
    secretary: undefined,
    loading: {
      accounts: false,
      creation: false,
    },
  },
  // const unsub = User.listenUsers(
  //   ['authority', '==', payload],
  //   (users) => {
  //     console.log({ users });
  //   },
  //   (error) => {
  //     console.log({ error });
  //   },
  // );
  effects: {
    *init({ payload }, { call, put, take }) {
      yield put(unsubAccounts());
      let unsub;
      yield put(startLoading('accounts'));
      try {
        unsub = User.listenUsers(
          ['authority', '==', payload],
          (users) => {
            dispatch({ type: `${namespace}/setState`, [payload]: users.docs });
            dispatch(stopLoading('accounts'));
          },
          (error) => {
            console.log({ error });
          },
        );
        // const getUsers = yield call(User.getUser, ['authority', '==', payload]);
        // yield put({ type: 'setState', [payload]: dataFromDoc });
        // const dataFromDoc = getUsers.docs;
        // yield put(stopLoading('accounts'));
      } catch (e) {
        yield put(stopLoading('accounts'));
        console.log({ e });
      }

      yield take(`${namespace}/unsubCurrent`);
      yield put({ type: 'setState', current: undefined });
      console.log('Unsubscribed successfully', payload);
      unsub && unsub();
    },
    *createAnAccount({ payload, account }, { call, put }) {
      yield put(startLoading('creation'));
      const password = RANDOMWORDS('7');
      const createUser = functions.httpsCallable('createUser');
      const callBack = payload.CB;
      const email = payload.email;
      try {
        console.log({ email, payload });
        const user = yield call(createUser, { email, password });
        console.log({ user, payload });
        payload.phone += payload.prefix;
        delete payload.prefix;
        delete payload.CB;
        payload.password = password;
        payload.status = 'pendingVerification';
        const result = yield call(User.setUser, payload, user.data.uid);
        callBack({ result });
      } catch (e) {
        console.log(e);
      }

      if (account === 'admin') {
        // check if user exist
        // const getUsers = yield call(User.getUser, ['email', '==', payload.email]);
        // if (getUsers.docs.length === 0) {
        //   payload.phone += payload.prefix;
        //   delete payload.prefix;
        //   // Create an account with temp Password
        //   // Store the object with new accounts id
        // } else {
        //   payload.CB({ type: 'error', message: 'Email already Exists.' });
        // }
        // Create an object
        // Create a future URL
        // Add a user to firestore
        // trigger email
      }

      // yield call(User.setUser, payload);

      yield put(stopLoading('creation'));
    },
  },

  subscriptions: {
    authSubscriber({}) {},
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
