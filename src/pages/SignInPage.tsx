import { useRef, useState } from "react"
import { signIn } from "../services/AuthService";

function SigninPage() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    const handleSignIn = async () => {
        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;

        const error = await signIn(email, password);
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
            type="password"
            placeholder="Password"
            className=""
            ref={passwordRef}
        />
        <button className="" onClick={handleSignIn}>Submit</button>
        {errorMessage && <p className="">{errorMessage}</p>}
    </div>
  )
}

export default SigninPage