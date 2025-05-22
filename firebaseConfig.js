// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDpFACho5sXGVkY1kZG36ERzt8s88YM6WI',
  authDomain: 'sanpc-cfd7d.firebaseapp.com',
  projectId: 'sanpc-cfd7d',
  storageBucket: 'sanpc-cfd7d.appspot.com', // ✅ Make sure this has .app**spot**.com
  messagingSenderId: '221346400443',
  appId: '1:221346400443:web:d690bbb1d53ce857ec419e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

