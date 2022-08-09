import './Login.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "../../components/navbar/Navbar";
import {Auth} from "../../components/Auth";
import {useState} from "react";
import {EmailInput} from "../../components/validation/EmailInput";

export const Login = () => {

    const [email, setEmail] = useState("demo@demo.demo")
    const [password, setPassword] = useState("Password123@")

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `/login`,
                {email, password},
                {withCredentials: true}
            )
            let data = res.data;
            localStorage.setItem("username", data.username);
            localStorage.setItem("accountId", data.accountId);
            toast("Login successfully!");
            setTimeout(() => navigate("/", {replace: true}), 2000);
        } catch (e) {
            toast.error("Invalid username or password")
        }
    }


    const handlePassword = (e) => {
        setPassword(e.target.value);
    }



    const validatePassword = (password) => {
        return /.*\W.*/.test(password) && /.*[a-zA-Z].*/.test(password) && /.*[0-9].*/.test(password);
    }

    return (
        <>
            <Auth/>
            <ToastContainer/>
            <Navbar/>
            <form onSubmit={onSubmit} className="login-container login">
                <h2 className="login-header">Log in</h2>
                <EmailInput email={email}/>
                <p><input style={{borderColor: password.length ? "" : "red"}} type="password" placeholder="Password"
                          onChangeCapture={handlePassword}/></p>
                {password.length === 0 && <p style={{color: "red"}}>Password is required</p>}
                {!validatePassword(password) &&
                    <p style={{color: "red"}}>Password must have at least 8 characters including letters, numbers and
                        special characters</p>}
                <div className={"navigate"}>
                    <input style={{background: "red"}} onClick={() => {
                        navigate('/')
                    }} type={"submit"} value={"Cancel"}/>
                    <input type="submit"/>
                </div>
            </form>
        </>
    );
}