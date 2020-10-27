import { auth, db } from '../config/firebase';

export const createFinance = ({ value, isPaid, type, date }) => {
  let finance = {
    type,
    isPaid: isPaid == 'true',
    value,
    date: date || null,
    createdAt: new Date(),
  };

  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('finances')
    .add(finance);
};
export const editFinance = ({ value, isPaid, type, date, id }) => {
  let item = {
    type,
    isPaid: isPaid == 'true',
    value,
    date: date || null,
    createdAt: new Date(),
  };

  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('finances')
    .doc(id)
    .update(item);
};

export const listFinances = () => {
  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('finances');
};

export const deleteFinance = (id) => {
  return db
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('finances')
    .doc(id)
    .delete();
};
