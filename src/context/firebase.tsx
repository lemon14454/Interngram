import { createContext } from "react";
import Firebase from "firebase/app";

interface FirebaseContextInterface {
  firebase: Firebase.app.App;
  FieldValue: any;
}

const FirebaseContext = createContext<FirebaseContextInterface | null>(null);
export default FirebaseContext;
