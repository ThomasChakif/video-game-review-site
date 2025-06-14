import Form from '../components/Form'
import '../styles/Login.css'
import me2PageImage from './me2-page.png';

function Login() {
    return (
        <div className='page-body'>
            <div className='page-info'>
                <h1>Welcome to Video Game Reviews!</h1>
                <h3>Sign in to leave and read reviews for all your favorite video games!</h3>
                <img className='game-image' src={me2PageImage} alt='Mass Effect 2 Page' title='Mass Effect 2 Page'/>
            </div>
            <div>
                <Form route='api/token/' method="login"/>
            </div>
        </div>
    )
}

export default Login