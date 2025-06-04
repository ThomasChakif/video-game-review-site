import {useState} from 'react'
import api from '../api'
import {useNavigate} from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/Form.css'

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const name = method ==="login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const res = await api.post(route, {username, password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/')
            }else{
                navigate('/login')
            }
        }catch(err){
            alert(err)
        }
    }

    return (
        <div>
            <form className = 'form-container' onSubmit={handleSubmit}>
                <h1>{name}</h1>
                <input
                    className='form-input'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                >
                </input>
                <input
                    className='form-input'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                >
                </input>
                <button className='form-button' type='submit'>{name}</button>
            </form>
            {method === 'login' && (
                <div className='reg-box'>
                    <h3 className='redirect-register'>Don't have an account? Click here to register!</h3>
                    <button className='register-button' onClick={() => navigate('/register')}>Register</button>
                </div>
            )}
        </div>
    );
}

export default Form