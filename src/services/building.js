import Firestore from './firestore';
import { refs } from './utils/firebase_config';

const getBuildings = (where) => {
  if (where) {
    return Firestore.get_list(refs.buildings.where(where[0], where[1], where[2]));
  } else {
    return Firestore.get_list(refs.buildings);
  }
};
const listenBuildings = (where, callback, error) => {
  if (where) {
    return Firestore.listen_list(
      refs.buildings.where(where[0], where[1], where[2]),
      callback,
      error,
    );
  } else {
    return Firestore.listen_list(refs.buildings, callback, error);
  }
};

const setBuilding = (params, id) => refs.buildings.doc(id).set(params);

const Building = {
  getBuildings,
  setBuilding,
  listenBuildings,
};

export default Building;
