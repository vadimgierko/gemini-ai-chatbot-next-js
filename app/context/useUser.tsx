"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";

const UserContext = createContext<{
	user: User | null;
}>({ user: null });

export default function useUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUser has to be used within <UserContext.Provider>");
	}

	return context;
}

interface UserProviderProps {
	children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		/**
		 * THIS IS TEMPORARY TEST CHECK FOR ANALYTICS.
		 * WILL BE IMPLEMENTED PROPERLY IN DEDICATED PROJECT SOON. 
		 */
		async function addUserIfDoesntExist(loggedUser: User) {
			// check if there is user data in /user collection,
			// if not => add newly created user to firestore:
			const docRef = doc(firestore, "ai-chat", "users");
			const docSnap = await getDoc(docRef);

			// USER EXISTS IN DB => RETURN:
			if (docSnap.exists()) {
				const aiChatUsers = docSnap.data() as {[key: string]: boolean}

				if (aiChatUsers[loggedUser.uid]) return console.log("User is in Firestore already.");
			}
				

			// USER DOESN'T EXIST IN DB => ADD:
			console.log("There is no such User data in Firestore... Create one!");
			// add user to /users collection:

			const batch = writeBatch(firestore);

			const newUserRef = doc(firestore, "ai-chat", "users");
			batch.set(newUserRef, {[loggedUser.uid]: true});

			// const newUserChatsRef = doc(firestore, "user-chats", loggedUser.uid);
			// batch.set(newUserChatsRef, {}); // user-chats is empty {} which will be filled [chatId]: UserChat in the future

			await batch.commit();
		}
		// listen to User changes:
		const unsubscribe = onAuthStateChanged(auth, (u) => {
			if (u) {
				setUser(u);
				addUserIfDoesntExist(u);
			} else {
				setUser(null);
			}
		});

		return unsubscribe;
	}, []);

	const value = {
		user,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}