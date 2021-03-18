import Building from '@/services/building';
import { dispatch } from '@/utils/utils';
const namespace = 'buildings';
export const createABuilding = (payload, account) => ({
  type: `${namespace}/createABuilding`,
  payload,
  account,
});
export const selectABuilding = (building) => ({
  type: `${namespace}/setState`,
  building,
});
const startLoading = (loadingType) => ({ type: 'startLoading', loadingType });
const stopLoading = (loadingType) => ({ type: 'stopLoading', loadingType });

export default {
  namespace,
  state: {
    buildings: undefined,
    building: undefined,
    loading: {
      buildings: false,
      creation: false,
    },
  },

  effects: {
    *init({}, { put, call, select }) {
      yield put(startLoading('buildings'));
      let unsub = undefined;
      const { user } = yield select(({ user }) => ({ user: user.user }));
      // Check the user, if a customer, only buildings assigned to him.
      if (user.authority) {
        // Restrict the fetching if the role of the user is custom and he mistakenly init the buildings.
        if (user.authority != 'customer') {
          // Contructing a where query
          const where = user.authority == 'secretaries' && [
            'secretaries',
            'array-contains',
            user.uid,
          ];
          unsub = Building.listenBuildings(
            where,
            (buildings) => {
              dispatch({ type: 'buildings/setState', buildings: buildings.docs });
            },
            (erorr) => {
              console.log({ error });
            },
          );
          //   yield put({ type: 'setState', buildings: buildings.docs });
          //   yield put({ type: 'setState', building: buildings.docs[0] });
        } else {
          console.log('Welcome.');
        }
      } else {
        console.log('You seems lost.');
      }

      yield put(stopLoading('buildings'));
      //   refs.buildings
    },
    *createABuilding({ payload }, { put, call, select }) {
      console.log('trigged');
      yield put(startLoading('creation'));
      try {
        // Get User OBJ
        const { user } = yield select(({ user }) => ({ user: user.user }));
        // remove CB from payload.
        const CallBack = payload.CB;
        delete payload.CB;
        payload.createdBy = {
          id: user.uid,
          authority: user.authority,
        };
        payload.createdAt = new Date();

        // check if authority is only either admin or owner
        if (user.authority == 'admin' || user.authority == 'owner') {
          // create a building with Name, And Address

          const building = yield call(Building.setBuilding, payload);
          console.log({ building });
        } else {
          console.log('Woah what you doing..');
        }
        yield put(stopLoading('creation'));
      } catch (e) {
        yield put(stopLoading('creation'));
        console.log({ e });
      }
    },
  },
  //   unsub = Building.listenBuildings(
  //     where,
  //     (buildings) => {
  //       dispatch({ type: 'buildings/setState', buildings: buildings.docs });
  //     },
  //     (erorr) => {
  //         console.log({ error });
  //     },
  //     );

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
