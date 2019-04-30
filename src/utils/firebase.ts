import { initializeApp } from "firebase";

const config = {
  apiKey: "AIzaSyBT3xzcR_0Sup7kwIzqn5iIRc_-V_SFdTw",
  authDomain: "pentago-4f1bf.firebaseapp.com",
  databaseURL: "https://pentago-4f1bf.firebaseio.com",
  projectId: "pentago-4f1bf",
  storageBucket: "pentago-4f1bf.appspot.com",
  messagingSenderId: "72124936709"
};
const firebaseApp = initializeApp(config);
export const firestore = firebaseApp.firestore();
