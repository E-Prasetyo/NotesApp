import React from 'react';
import { dictionary } from '../utils/index';
import useLocaleContext from '../hooks/useLocaleContext';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { postLogin } from '../utils/api';
import PropTypes from 'prop-types';
import useLoading from '../hooks/useLoading';
import Modal from '../components/Modal';

const LoginPage = ({loginHandler}) => {
    const localeCtx = useLocaleContext();
    const [email, onChangHandlerEmail] = useInput('');
    const [password, onChangHandlerPassword] = useInput('');
    const [loading, toggleLoading] = useLoading();

    async function onSubmitLogin() {
        if (password.length < 6 ) {
            alert('Password must contain at least 6 characters')
        } else {
            toggleLoading();
            const { error, data } = await postLogin(email, password);
            if (!error) {
                alert("User logged successfully");
                localeCtx.setLogIn(data?.accessToken);
                toggleLoading();
                loginHandler(data?.accessToken);
            } else {
                toggleLoading();
            }
        }        
    }

    return (
        <section className="login-page">
            <h2>
                {dictionary[localeCtx.lang].loginTitle}
            </h2>
            <div className="input-login">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => onChangHandlerEmail(e.target.value)}
                />
                    
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password" 
                    value={password}
                    onChange={(e) => onChangHandlerPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={()=>onSubmitLogin()}
                >
                    {dictionary[localeCtx.lang].buttonLogin}
                </button>
            </div>
            <p>
                {dictionary[localeCtx.lang].askAccount}
                &nbsp;
                <Link to="/register">{dictionary[localeCtx.lang].linkRegister}</Link>
            </p>
            <Modal isOpen={loading} onClose={toggleLoading} />
        </section>
    );
}

export default LoginPage;


LoginPage.propTypes = {
    loginHandler: PropTypes.func.isRequired
};
