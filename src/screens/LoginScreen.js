import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FirebaseContext } from "../context/firebase";

const LoginScreen = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = emailAddress === '' || password === '';

    const handleLogin = () => {};

    useEffect (() => {
        document.title = 'Login - Instagram';

    }, []);
    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <p>some text</p>
        </div>
    );
};

export default LoginScreen;
