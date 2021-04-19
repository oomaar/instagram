import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";

const LoginScreen = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = emailAddress === '' || password === '';

    const handleLogin = async e => {
        e.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);

        } catch (error) {
            setEmailAddress("");
            setPassword("");
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);

    return (
        <div className="loginscreen">
            <div className="loginscreen__imageContainer">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with instagram" />
            </div>
            <div className="loginscreen__rightContaier">
                <div className="loginscreen__formContaier">
                    <h1 className="loginscreen__logoContainer">
                        <img src="/images/logo.png" alt="Instagram" className="loginscreen__logo" />
                    </h1>
                    {error && <p className="loginscreen__error">{error}</p>}
                    <form onSubmit={handleLogin} method="POST">
                        <input
                            type="email"
                            aria-label="Enter your email address"
                            placeholder="Email Address"
                            className="loginscreen__input"
                            onChange={({ target }) => setEmailAddress(target.value)}
                        />
                        <input
                            type="password"
                            aria-label="Enter your password"
                            placeholder="Password"
                            className="loginscreen__input"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`loginscreen__loginBtn ${isInvalid && `opacity-50`}`}
                        >
                            Log In
                    </button>
                    </form>
                </div>
                <div className="loginscreen__signupContainer">
                    <p className="loginscreen__signupText">
                        Don't have an account? {``}
                    <Link to="/signup" className="loginscreen__signupLink">
                        Sign Up
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
