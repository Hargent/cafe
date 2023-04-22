import { initializeApp } from "https://cdn.skypack.dev/firebase@9.20.0";
import { getFirestore } from "https://cdn.skypack.dev/firebase@9.20.0";


const firebaseConfig = {
  apiKey: "AIzaSyCbP3_paYM30ZB7KlEaj0j6JbL7mLLlrK8",
  authDomain: "cafe-firestore-ca877.firebaseapp.com",
  projectId: "cafe-firestore-ca877",
  storageBucket: "cafe-firestore-ca877.appspot.com",
  messagingSenderId: "199364587123",
  appId: "1:199364587123:web:4efc2f0f0805b09ac34406",
  measurementId: "G-9VCXR0VGBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
db.settings({timestampsInSnapshots:true});

// get refernce to a collection
// const init = async() => {
//   try{
    
//   const res = await db.collection('cafes').get()
//   console.log('res.docs')
//   console.log(res.docs)
//   }catch(err){
//     console.log(err)
//   }
// }

// init()
console.log(db)
db.collection('cafes').get().then((snapshot)=>{
  console.log(snapshot.docs)
})