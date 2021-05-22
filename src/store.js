import { action, createStore } from "easy-peasy";
import { db } from "./firebase";
import firebase from "firebase/app";

const store = createStore({
  auth: {
    loggedIn: false,
    uid: "",
    signin: action((state, payload) => {
      state.uid = payload;
      state.loggedIn = true;
    }),
    signout: action((state, payload) => {
      state.uid = "";
      state.loggedIn = false;
    }),
  },
  weights: {
    data: [],
    uploadDataToFirebase: action((state, payload) => {
      let datetime = firebase.firestore.Timestamp.now().toDate();
      let weight = payload.weight / 1;
      state.data = [
        ...state.data,
        { weight, datetime: `${datetime}`.slice(0, 24) },
      ];
      db.doc(`/${payload.uid}/${datetime}`)
        .set({
          weight,
        })
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }),
    updateData: action((state, payload) => {
      state.data = payload;
    }),
    clearData: action((state, payload) => {
      state.data = [];
    }),
  },
});
export default store;
