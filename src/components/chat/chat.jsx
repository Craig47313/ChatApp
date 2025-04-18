import "./chat.css"

const Chat = () => {
    return (
        <div className='Chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">

            </div>
            <div className="bottom">
                <div className="icons">
                    <input type="text" placeholder="Type a message"/>
                    <div className="emoji">
                        <img src="./emoji.png" alt="" />
                    </div>
                    <button className="sendButton">Send</button>
                </div>
            </div>
        </div>

    )
}

export default Chat