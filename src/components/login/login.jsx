import { useState } from "react"
import "./login.css"
import { toast, ToastContainer } from "react-toastify"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../lib/firebase"
import { doc, setDoc } from "firebase/firestore"
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

    const handleLogin = e =>{
        e.preventDefault()
        toast.warn("Login")
    }
    const handleRegister = async (e) =>{
        e.preventDefault();
        toast.warn("Registering");

        const formData = new FormData(e.target);

        const {username, email, password} = Object.fromEntries(formData);

        try {
            if (!email || !password || password.length < 6) {
                toast.error("Please enter a valid email and a password with at least 6 characters.");
                return;
            }

            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email, 
                id: res.user.uid,
                blocked: []
            });

            await setDoc(doc(db, "userChats", res.user.uid), {
                chats: []
            });
            
            toast.success("account created")

        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }
    return (
        <div className='login'>
            <ToastContainer position="bottom-right"/>
            <div className="item">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="email" name="email"/>
                    <input type="text" placeholder="password" name="password"/>
                    <button>Log In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
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