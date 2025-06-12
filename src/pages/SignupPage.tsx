import { useRef, useState } from "react"
import { signUp } from "../services/AuthService";

function SignupPage() {

    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    const handleSignUp = async () => {
        const email = emailRef.current!.value;
        const username = usernameRef.current!.value;
        const password = passwordRef.current!.value;

        const error = await signUp(email, username, password);

        setErrorMessage(error);
    }

  return (
    <div>
        <h2>Sign Up</h2>
        <input 
            type="email"
            placeholder="Email"
            className=""
            ref={emailRef}
        />
        <input
            type="text"
            placeholder="User Name"
            className=""
            ref={usernameRef}
        />
        <input
            type="password"
            placeholder="Password"
            className=""
            ref={passwordRef}
        />
        <button className="" onClick={handleSignUp}>Submit</button>
        {errorMessage && <p className="">{errorMessage}</p>}
    </div>
  )
}

export default SignupPage