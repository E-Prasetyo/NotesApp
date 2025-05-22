import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { dictionary } from '../utils';
import useLocaleContext from '../hooks/useLocaleContext';
import { postRegister } from '../utils/api';
import useLoading from '../hooks/useLoading';
import Modal from '../components/Modal';

function RegisterPage() {
    const navigate = useNavigate();
    const localeCtx = useLocaleContext();
    const [name, onChangeName] = useInput('');
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [confirmPassword, onChangeConfirmPassword] = useInput('');
    const [loading, toggleLoading] = useLoading();

    async function onSubmitRegister() {
        if (password.length < 6 || confirmPassword.length < 6) {
            alert('Password must contain at least 6 characters');
        }else if (password !== confirmPassword) {
            alert('Password and password confirm must be same.');
        } else {
            toggleLoading();
            const { error, data } = await postRegister(name, email, password);
            if (!error) {
                alert('User created successfully');
                toggleLoading();
                navigate('/login');
            } else {
                toggleLoading();
            }
        }
        
    }

    return (
        <section className="regsiter-page">
            <h2>
                {dictionary[localeCtx.lang].registerTitle}
            </h2>
            <div className="input-register">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e)=>onChangeName(e.target.value)}
                />
                    
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e)=>onChangeEmail(e.target.value)}
                />
                        
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>onChangePassword(e.target.value)}
                />
                
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=>onChangeConfirmPassword(e.target.value)}
                />
                                
                <button
                    type="button"
                    onClick={()=>onSubmitRegister()}
                >
                    {dictionary[localeCtx.lang].buttonRegister}
                </button>
            </div>
            <p>
                {dictionary[localeCtx.lang].askAccountRegister}
                &nbsp;
                <Link to="/">{dictionary[localeCtx.lang].linkLogin}</Link>
            </p>
            <Modal isOpen={loading} onClose={toggleLoading} />
        </section>
    );
}

export default RegisterPage;
