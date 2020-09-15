import { auth, db } from '../config/firebase';

export const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const createUser = (user, uid) => {
  return db.collection('users').doc(uid).set(user);
};

export const logout = () => {
  return auth.signOut();
};

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
