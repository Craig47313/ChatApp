/*import "./addUser.css";
import { db } from "../../../lib/firebase";
import { collection, getDoc, query, where, getDocs, setDoc, serverTimestamp, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useState } from "react";
import firebase from "firebase/compat/app";
import { useUserStore } from "../../../lib/userStore";


const AddUser = () =>{
    const [user, setUser] = useState(null);
    const {currentUser} = useUserStore();

    const handleSearch = async e =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
        
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));

            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty){
                setUser(querySnapshot.docs[0].data());
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleAdd = async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userChats");
    
        try {
            // Create new chat document
            const newChatRef = doc(chatRef); // auto-generated ID
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            });
    
            const currentUserChatRef = doc(userChatsRef, currentUser.id);
            const currentUserChatSnap = await getDoc(currentUserChatRef);
    
            const chatData = ;
                await updateDoc(doc(currentUserChatRef, cu){
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        recieverID: user.id,
                        updatedAt: Date.now(),  
                    }),
                });
    
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };
    

    return(
    <div className="AddUser">
        <form onSubmit={handleSearch} >
            <input type="text" placeholder="username" name="username"/>
            <button>Search</button>
        </form>  
        {user && <div className="user">
            <div className="detail">
                <img src={user.avatar || "./avatar.png"} alt="" />
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
        </div>}
    </div>
    )
}

export default AddUser*/
import "./addUser.css";
import { db } from "../../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../../lib/userStore";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";


const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          recieverID: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          recieverID: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;