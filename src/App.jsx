import Login from "./components/login/login";
import Chat from "./components/chat/chat";
import List from "./components/list/List";
import Detail from "./components/detail/Detail";
import { toast, ToastContainer } from "react-toastify"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/lib/firebase";
import { useUserStore } from "./components/lib/userStore";
//npm run dev
const App = () => {

  //const user = false;

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user?.uid);
       
    });

    return () =>{
      unSub();
    }
  },[fetchUserInfo]);
  
  console.log("current user:");
  console.log(currentUser);

  if(isLoading) return <div className="loading">Loading...</div>

  return (
    <div className='container'>
      {currentUser ? (
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