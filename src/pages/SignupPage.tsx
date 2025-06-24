import { useRef, useState } from "react";
import { signUp } from "../services/AuthService";
import { Link } from "react-router-dom";
import SignupButton from "../components/SignupButton";

function SignupPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSucessMessage] = useState<string | null>(null);

  const handleSignUp = async () => {
    const email = emailRef.current!.value;
    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;

    const error = await signUp(email, username, password);
    
    if(error){
      setErrorMessage(error);
    } else{
      setSucessMessage("Please Verify Your Email. After Verifying Sign in With Your Credentials");
    }

    return error === null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          ref={emailRef}
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          ref={usernameRef}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          ref={passwordRef}
        />

        <SignupButton onClick={handleSignUp}/>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-sm text-center">{successMessage}</p>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
