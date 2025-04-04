import "./list.css"
import ChatList from "./chatList/ChatList"
import UserInfo from "./userInfo/userInfo"
const List = () => {
    return (
        <div className='list'>
            <ChatList/>
            <UserInfo/>
        </div>
    )
}

export default List