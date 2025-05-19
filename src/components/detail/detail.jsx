import { auth } from "../lib/firebase"
import "./detail.css"

const Detail = () => {
    return (
        <div className='detail'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <h2>Jane Doe</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./theme.png" alt="" />
                                <span>photo_2_2025/5/3</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./bg.jpg" alt="" />
                                <span>photo_2_2025/5/3</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div> 
                <div className="buttons">
                    <button className="block" onClick={()=> auth.signOut()}>Block User</button>
                    <button className="logout">LogOut</button>
                </div>
            </div>
        </div>
    )
}

export default Detail