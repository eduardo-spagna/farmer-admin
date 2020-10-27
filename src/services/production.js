import { auth, db } from '../config/firebase';

export const createProduction = ({ description, amount }) => {
  let item = {
    description,
    amount: Number(amount),
    createdAt: new Date(),
  };

  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('productions')
    .add(item);
};

export const editProduction = ({ id, description, amount }) => {
  let item = {
    description,
    amount: Number(amount),
    createdAt: new Date(),
  };

  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('productions')
    .doc(id)
    .update(item);
};

export const listProductions = () => {
  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('productions');
};

export const deleteProduction = (id) => {
  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('productions')
    .doc(id)
    .delete();
};
