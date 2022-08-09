// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtVuERC7yWglcpl6ANHbv8R9nhvX1R9OI",
  authDomain: "rattapp-df835.firebaseapp.com",
  projectId: "rattapp-df835",
  storageBucket: "rattapp-df835.appspot.com",
  messagingSenderId: "1079399802797",
  appId: "1:1079399802797:web:55cfcbbe0642872b78a324"
};

// Initialize Firebase
const appConfig = initializeApp(firebaseConfig);

export default appConfig