import { auth, db } from '../config/firebase';

export const createProperty = ({ name, acre, image }) => {
  let property = {
    name,
    acre: Number(acre),
    createdAt: new Date(),
  };

  if (image) {
    property = { ...property, image };
  }

  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('properties')
    .add(property);
};

export const editProperty = ({ name, acre, image, id }) => {
  let property = {
    name,
    acre: Number(acre),
    createdAt: new Date(),
  };

  if (image) {
    property = { ...property, image };
  }

  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('properties')
    .doc(id)
    .update(property);
};

export const listProperties = () => {
  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('properties');
};

export const deleteProperty = (id) => {
  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('properties')
    .doc(id)
    .delete();
};
