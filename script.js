import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";

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

const renderCafe = _doc => {
	const li = document.createElement("li");

	const name = document.createElement("span");
	const city = document.createElement("span");
	const cousine = document.createElement("span");
	const cross = document.createElement("div");

	li.setAttribute("data-id", _doc.id);
	name.innerHTML = _doc.data()?.name;
	city.innerHTML = _doc.data()?.city;
	cousine.innerHTML = _doc.data()?.cousine ?? "";
	cross.textContent = "x";
	cross.classList.add("delete");

	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(cousine);
	li.appendChild(cross);

	cafeList.appendChild(li);

	cross.addEventListener("click", async e => {
		e.stopPropagation();
		// getting the document id
		const id = e.target.parentElement.getAttribute("data-id");
		// query firestore and delete
		const docRef = doc(db, "cafes", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Document data : " + docSnap.data());
			// delete the document
			deleteDoc(docRef);
		} else {
			console.log("No such document in the database");
		}
	});
};
// const getDocuments = async () => {
// 	try {
// 		const _query = query(collection(db, "cafes"), orderBy("cousine"));
// 		const getDoc = await getDocs(_query);
// 		getDoc.docs.forEach(doc => {
// 			renderCafe(doc);
// 		});
// 	} catch (e) {
// 		console.error("Error adding document: ", e);
// 	}
// };
// ! Realtime Store
const updateDom = async () => {
	try {
		const _query = query(collection(db, "cafes"), orderBy("cousine"));
		// Realtime data
		// a listener for any change in the database which is then reflected in the frontend
		const dataSnapShot = onSnapshot(_query, doc => {
			const changes = doc.docChanges();
			changes.forEach(change => {
				if (change.type === "added") {
					renderCafe(change.doc);
				}
				if (change.type === "removed") {
					const li = cafeList.querySelector(
						"[data-id=" + change.doc.id + "]"
					);
					cafeList.removeChild(li);
				}
			});
		});
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};
updateDom();
// ! Getting queries
// const getQuery = async () => {
// 	// querying for a particular property
// 	const q = query(collection(db, "cafes"), where("city", "==", "Konoha"));
// 	// get the docs in an ordering
// 	const o = query(collection(db, "cafes"), orderBy("name"));
// 	const querySnapShot = await getDocs(o);

// 	// console.log(querySnapShot);
// 	querySnapShot.forEach(_query => {
// 		console.log(_query.id + " : " + _query.data());
// 	});
// };
// getQuery();

// getDocuments();
document.addEventListener("submit", e => {
	e.preventDefault();
	const form = e.target;
	const data = Object.fromEntries([...new FormData(form)]);
	init(data);
	form.name.value = "";
	form.city.value = "";
	form.cousine.value = "";
});
