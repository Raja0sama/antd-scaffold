import getKey from 'lodash.get';
import { refs } from '../utils/firebase_config';
import { docToData, querySnapToData } from '../utils/utils';

const get = async (docRef, t = null) => {
  try {
    const doc = t ? t.get(docRef) : await docRef.get();
    return docToData(doc);
  } catch (e) {
    throw e;
  }
};

const get_value = async (docRef, key, fallback, t = null) => {
  try {
    const docData = await get(docRef, t);
    if (!docData) return fallback;
    return getKey(docData, key, fallback);
  } catch (e) {
    if (fallback) return fallback;
    throw e;
  }
};

const get_list = async (query, t = null) => {
  try {
    const snap = t ? t.get(query) : await query.get();
    return querySnapToData(snap);
  } catch (e) {
    throw e;
  }
};

const listen = (
  docRef,
  handler = () => {},
  error = (e) => {
    console.warn('Firestore.listen Error:', e);
  },
) => {
  const unsubscriber = docRef.onSnapshot((doc) => {
    handler(docToData(doc));
  }, error);
  return unsubscriber;
};

const listen_list = (
  query,
  handler = () => {},
  error = (e) => {
    console.warn('Firestore.listen_list Error:', e);
  },
) => {
  const unsubscriber = query.onSnapshot((snap) => {
    handler(querySnapToData(snap));
  }, error);
  return unsubscriber;
};

const register_user_entry = (id, params) => refs.users.doc(id).set(params);

const Firestore = {
  get,
  get_value,
  get_list,
  listen,
  listen_list,
  register_user_entry,
};

export default Firestore;
