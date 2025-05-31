import "./chatList.css"
import React, { useEffect, useState } from "react"; 
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";


const ChatList = () => {
    const [addMode, setAddMode]= useState(false);
    const [chats, setChats]= useState([]);
    

    const {currentUser} = useUserStore();
    /*
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
            const data = res.data();
            //if (!data) return;  // Just stop if no data
            
            const items = data.chats || [];  // fallback to empty array if chats undefined
            
            const promisses = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.recieverID);
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();
        
                return { ...item, user };
            });
            
            const chatData = await Promise.all(promisses);
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });
      
        return () => unSub();
      }, [currentUser.id]);
      */
      useEffect(() => {
        const unSub = onSnapshot(
          doc(db, "userChats", currentUser.id),
          async (res) => {
            const items = res.data().chats;
    
            const promises = items.map(async (item) => {
                console.log("item:", item);
                console.log("receiverID:", item.recieverID);
                const userDocRef = doc(db, "users", item.recieverID);

                const userDocSnap = await getDoc(userDocRef);
        
                const user = userDocSnap.data();
        
                return { ...item, user };
            });
    
            const chatData = await Promise.all(promises);
    
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
          }
        );
    
        return () => {
          unSub();
        };
      }, [currentUser.id]);

    
    return (
        <div className="chatList">
            
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt =""/>
                    <input type="text" placeholder="search"/>
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="add"
                onClick = {()=> setAddMode((prev) => !prev)}/>
            </div>
            {chats.map((chat) => (
                <div className="item" key={chat.chatId}>
                    <img src={chat.user.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            

            {addMode && <AddUser/>}
        </div>
    ) 
}

export default ChatList