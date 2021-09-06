import { action, createStore, thunk } from "easy-peasy";
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
    addData: action((state, payload) => {
      state.data = [...state.data, payload];
    }),
    uploadDataToFirebase: thunk((actions, payload, { getStoreActions }) => {
      let datetime = firebase.firestore.Timestamp.now().toDate();
      let weight = payload.weight / 1;
      actions.addData({ weight, datetime: `${datetime}`.slice(0, 24) });
      db.doc(`/${payload.uid}/${datetime}`)
        .set({
          weight,
        })
        .then((docRef) => {
          console.log(docRef);
          getStoreActions().addToast({
            open: true,
            message: "Added a new Entry",
            severity: "success",
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          getStoreActions().addToast({
            open: true,
            message: "Error adding an Entry",
            severity: "error",
          });
        });
    }),
    updateData: action((state, payload) => {
      state.data = payload;
    }),
    clearData: action((state, payload) => {
      state.data = [];
    }),
  },
  toast: {
    open: false,
    message: "",
    severity: "",
  },
  addToast: action(
    (state, payload = { open: false, message: "", severity: "" }) => {
      state.toast = payload;
    }
  ),
  removeToast: action((state, payload = false) => {
    state.toast.open = payload;
  }),
});
export default store;
