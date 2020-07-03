
import * as firebase from 'firebase';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyAdQjvBQjdFc1O-Fq2fAXBsvASq_q0h0FM",
  authDomain: "provareactnative.firebaseapp.com",
  databaseURL: "https://provareactnative.firebaseio.com",
  projectId: "provareactnative",
  storageBucket: "provareactnative.appspot.com",
  messagingSenderId: "182490668314",
  appId: "1:182490668314:web:a39aea73b1d3ef6b55e0a3",
  measurementId: "G-DEFQ9FJKFB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


  export const database = firebase.firestore();