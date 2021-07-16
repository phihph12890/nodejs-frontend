import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBonQ2R77HASiru8jmT_4D5REjpTxMgI78",
    authDomain: "ecmascript-9d7cc.firebaseapp.com",
    projectId: "ecmascript-9d7cc",
    storageBucket: "ecmascript-9d7cc.appspot.com",
    messagingSenderId: "1241059716",
    appId: "1:1241059716:web:e092bf906ff749de454dd1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;