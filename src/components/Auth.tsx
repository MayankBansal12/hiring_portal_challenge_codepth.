import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/user";

const Auth = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [newUser, setNewUser] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const firebase = useFirebase();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If new user, it must be org signup
    if (newUser) {
      handleAuth("signup");
    } else {
      handleAuth("login");
    }
  }

  // Function to handle signup, login for both org and user
  const handleAuth = async (type: string) => {
    // If type is signup then input will be diff
    if (type === "signup") {
      // Signup for new user
      firebase.signup(email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          alert("Successfully signed up!");
          localStorage.setItem("uid", user?.uid);
          navigate("/");
        })
        .catch((error) => {
          // error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert(error.message);
        });
    } else {
      // Handle login request
      firebase.login(email, password)
        .then((userCredential) => {
          // Log in 
          const user = userCredential.user;
          localStorage.setItem("uid", user?.uid);
          alert("Success");
          navigate("/");
        })
        .catch((error) => {
          // error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert("Wrong Email or Password, try again!");
        });
    }
  }

  return (
    <div className="flex flex-row h-screen">

      <div className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl my-2">Welcome to JobPth</h1>

        {/* In case user is new, signup will appear, otherwise login */}
        {newUser ?
          <>
            <h2>Signup to your account</h2>
            <form className="w-4/5 md:w-1/2 flex flex-col gap-5 my-8" onSubmit={onSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                required={true}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Signup
                </Button>
              </div>
            </form>
            <p>Already have an account? <button onClick={() => setNewUser(false)} className="text-blue-400">Log in</button></p>
          </>
          :
          <>
            <h2>Login to your account</h2>
            <form className="w-4/5 md:w-1/2 flex flex-col gap-5 my-8" onSubmit={onSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </div>
            </form>
            <p>New to JobPth? <button onClick={() => setNewUser(true)} className="text-blue-400">Sign up</button></p>
          </>}
      </div>
    </div >
  )
}

export default Auth;