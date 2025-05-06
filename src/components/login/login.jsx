import { useState } from "react"
import "./login.css"

const Login = () => {
    const [avatar,setAvatar] = useState({
        file: null,
        url:""
    })

    const handleAvatar = e =>{
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
        
    }
    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome Back</h2>
                <form>
                    <input type="text" placeholder="email" name="email"/>
                    <input type="text" placeholder="password" name="password"/>
                    <button>Log In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <form>
                    <h2>Create an Account</h2>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"}alt="" />
                        <p>Upload an Image</p>
                    </label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder="username" name="username"/>
                    <input type="text" placeholder="email" name="email"/>
                    <input type="text" placeholder="password" name="password"/>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Login