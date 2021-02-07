import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
	constructor() {
		firebase.initializeApp(firebaseConfig);

		this.auth = firebase.auth();
		this.database = firebase.database();

		this.userUid = null;
		this.wordsArr = [];
	}


	setUserUid = (uid) => this.userUid = uid;

	deleteUserUid = () => this.auth.signOut();

	setWordsArr = (words) => this.wordsArr = words;

	signWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	createUserWithEmail = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	getUserCardsRef = () => this.database.ref(`/cards/${this.userUid}`);

	getUserCurrentCardRef = (id) => this.database.ref(`/cards/${this.userUid}/${id}`);

	addItem = ({ text, translate }) => {
		this.getUserCardsRef().set([...this.wordsArr, {
			id: +new Date(),
			eng: text,
			rus: translate,
		}],
			console.log('callback')
		);
	}

	deletedItem = (id) => {
		const newWordArr = this.wordsArr.filter(item => item.id !== id);
		this.getUserCardsRef().set(newWordArr);
	}

}

export default Firebase;