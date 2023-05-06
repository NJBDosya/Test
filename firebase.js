
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCC4xxCDqNZPH-_SNccydcVTzoqhopu6wg",
  authDomain: "fir-auth-cca56.firebaseapp.com",
  projectId: "fir-auth-cca56",
  storageBucket: "fir-auth-cca56.appspot.com",
  messagingSenderId: "587083777344",
  appId: "1:587083777344:web:5deffd164cfa34b3e726a5"
};

console.log("Подключил firebase = " + firebase.apps.length)
let app;
if (firebase.apps.length === 0) {
  console.log('firebase меньше 0')
  app = firebase.initializeApp(firebaseConfig);
} else {
  console.log('firebase больше 0')
  app = firebase.app()
}

export const auth = firebase.auth()




// import firebase from 'firebase/app';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCC4xxCDqNZPH-_SNccydcVTzoqhopu6wg",
//   authDomain: "fir-auth-cca56.firebaseapp.com",
//   projectId: "fir-auth-cca56",
//   storageBucket: "fir-auth-cca56.appspot.com",
//   messagingSenderId: "587083777344",
//   appId: "1:587083777344:web:5deffd164cfa34b3e726a5"
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }

// export const auth = firebase.auth()

// // export { auth };