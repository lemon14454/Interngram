import ReactDOM from "react-dom";
import { App } from "./App";
import "./style.css";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import { FirebaseAuthProvider } from "./context/auth";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <FirebaseAuthProvider>
      <App />
    </FirebaseAuthProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
