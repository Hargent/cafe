import { addDoc, collection, getDocs } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCbP3_paYM30ZB7KlEaj0j6JbL7mLLlrK8",
	authDomain: "cafe-firestore-ca877.firebaseapp.com",
	projectId: "cafe-firestore-ca877",
	storageBucket: "cafe-firestore-ca877.appspot.com",
	messagingSenderId: "199364587123",
	appId: "1:199364587123:web:4efc2f0f0805b09ac34406",
	measurementId: "G-9VCXR0VGBT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// db.settings({timestampsInSnapshots:true});

// get refernce to a collection

const cafeList = document.querySelector("#cafe-list");
// const form = document.querySelector("#add-cafe-form");
const init = async data => {
	try {
		const docRef = await addDoc(collection(db, "cafes"), data);
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};
const renderCafe = doc => {
	const li = document.createElement("li");

	const name = document.createElement("span");
	const city = document.createElement("span");
	const cousine = document.createElement("span");

	li.setAttribute("data-id", doc.id);
	name.innerHTML = doc.data()?.name;
	city.innerHTML = doc.data()?.city;
	cousine.innerHTML = doc.data()?.cousine ?? "";

	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(cousine);

	cafeList.appendChild(li);
};
const getDocuments = async () => {
	try {
		const getDoc = await getDocs(collection(db, "cafes"));
		getDoc.docs.forEach(doc => {
			renderCafe(doc);
		});
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};

getDocuments();
document.addEventListener("submit", e => {
	e.preventDefault();
	const form = e.target;
	const data = Object.fromEntries([...new FormData(form)]);
	init(data);
	form.name.value = "";
	form.city.value = "";
	form.cousine.value = "";
});
