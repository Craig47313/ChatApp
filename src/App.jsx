import Login from "./components/login/login";
import Chat from "./components/chat/chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
import { toast, ToastContainer } from "react-toastify"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/lib/firebase";
//npm run dev
const App = () => {

  //const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user)=>{
      console.log(user);
       
    });
    return () =>{
      unSub();
    }
  },[]);

  return (
    <div className='container'>
      {user ? (
        <>
          <List/>
          <Chat/>
          <Detail/>
        </>
      ) : (
        <Login/>
      )}
      <ToastContainer position="bottom-right"/>
    </div>
  )
}

export default App