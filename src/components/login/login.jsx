import { useState } from "react"
import "./login.css"
import { toast, ToastContainer } from "react-toastify"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { auth, db } from "../lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import upload from "../lib/upload"
const Login = () => {
    const [avatar,setAvatar] = useState({
        file: null,
        url:""
    })
    const [loading,setLoading] = useState(false)
    const handleAvatar = e =>{
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        } 
    }

    const handleLogin = async (e) =>{
        e.preventDefault()
        toast.warn("Login")
        setLoading(true)

        const formData = new FormData(e.target); 

        const {email, password} = Object.fromEntries(formData);
        try{
            await signInWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.log(err);
            toast.warn(err.message);

        }finally{
            setLoading(false)
        }
    }
    const handleRegister = async (e) =>{
        e.preventDefault();
        toast.warn("Registering");

        const formData = new FormData(e.target);

        setLoading(true)

        const {username, email, password} = Object.fromEntries(formData);

        try {
            if (!email || !password || password.length < 6) {
                toast.error("Please enter a valid email and a password with at least 6 characters.");
                return;
            }
            
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email, 
                avatar: imgUrl,
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
        } finally{
            setLoading(false)
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
                    <button disabled={loading}>{loading ? "Loading" : "Login"}</button>
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
                    <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login