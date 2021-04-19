import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUserExist } from "../utils/firebase";

const SignupScreen = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');

    const isInvalid = emailAddress === '' || password === '';

    const handleSignup = async e => {
        e.preventDefault();

        const userNameExists = await doesUserExist(userName);
        if(!userNameExists.length) {
            try {
                const createdUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress, password);

                await createdUserResult.user.updateProfile({
                    displayName: userName
                });

                await firebase
                .firestore()
                .collection("users")
                .add({
                    userId: createdUserResult.user.uid,
                    username: userName.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()
                });

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName("");
                setEmailAddress("");
                setPassword("");
                setError(error.message);
            };
        } else {
            setUserName("");
            setError("That username is taken, please try another.");
        };
    };

    useEffect(() => {
        document.title = 'Sign Up - Instagram';
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
                    <form onSubmit={handleSignup} method="POST">
                        <input
                            type="text"
                            aria-label="Enter your username"
                            placeholder="Username"
                            className="loginscreen__input"
                            onChange={({ target }) => setUserName(target.value)}
                            value={userName}
                        />
                        <input
                            type="text"
                            aria-label="Enter your full name"
                            placeholder="Full Name"
                            className="loginscreen__input"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input
                            type="email"
                            aria-label="Enter your email address"
                            placeholder="Email Address"
                            className="loginscreen__input"
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <input
                            type="password"
                            aria-label="Enter your password"
                            placeholder="Password"
                            className="loginscreen__input"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`loginscreen__loginBtn ${isInvalid && `opacity-50`}`}
                        >
                            Sign Up
                    </button>
                    </form>
                </div>
                <div className="loginscreen__signupContainer">
                    <p className="loginscreen__signupText">
                        Have an account? {``}
                    <Link to={ROUTES.LOGIN} className="loginscreen__signupLink">
                        Login
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupScreen;
