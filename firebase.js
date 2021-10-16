import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBK4Mj1YHW-h8wTYfDpG-paDGPAy4J4q6w",
  authDomain: "insta-clone-reactnative.firebaseapp.com",
  projectId: "insta-clone-reactnative",
  storageBucket: "insta-clone-reactnative.appspot.com",
  messagingSenderId: "239432296792",
  appId: "1:239432296792:web:8060da87d87032f0f65d2d",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };
