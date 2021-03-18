// import request from '@/utils/request';
// export async function query() {
//   return request('/api/users');
// }
// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// export async function queryNotices() {
//   return request('/api/notices');
// }

import Firestore from './firestore';
import { refs } from './utils/firebase_config';

const getUser = (role) => Firestore.get_list(refs.users.where(role[0], role[1], role[2]));
const listenUsers = (where, callback, error) => {
  if (where) {
    return Firestore.listen_list(refs.users.where(where[0], where[1], where[2]), callback, error);
  } else {
    return Firestore.listen_list(refs.users, callback, error);
  }
};
const getAllUsers = () => Firestore.get_list(refs.users);
const setUser = (params, id) => refs.users.doc(id).set(params);
const User = {
  getUser,
  setUser,
  getAllUsers,
  listenUsers,
};

export default User;
