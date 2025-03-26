import { auth } from "@/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();

	return signInWithPopup(auth, provider)
		.then(async (result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			// const credential = GoogleAuthProvider.credentialFromResult(result);
			// const token = credential?.accessToken;
			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			console.log({ user });

			// add user 
		})
		.catch((error) => {
			console.error(error);
			alert(error);
		});
}