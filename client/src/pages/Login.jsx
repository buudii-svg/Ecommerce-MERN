import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md self-end"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
 try {
   const response = await fetch("http://localhost:4000/login", {
     method: "POST",
     headers: {
       Accept: "application/formData",
       "Content-Type": "application/json",
     },
     body: JSON.stringify(formData),
   });
   const responseData = await response.json();
   if (responseData.success === true) {
     localStorage.setItem("auth-token", responseData.token);
     window.location.replace("/");
   } else {
     setError(responseData.errors);
   }
 } catch (error) {
   setError("An error occurred. Please try again.");
 }
  };

  const signup = async () => {
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          Accept: "application/formData",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.success === true) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        setError(responseData.errors);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="max_padd_conatiner flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10  rounded-md">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Enter Your Name"
              className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
            />
          ) : (
            //  : (
            //   ""
            // )}
            // {state === "Sign Up" ? (
            //   <input
            //     type="number"
            //     name="mobile"
            //     value={formData.mobile}
            //     onChange={changeHandler}
            //     placeholder="Enter Your Mobile Number"
            //     className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
            //   />
            // )
            ""
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter Your Email"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter Your Password"
            className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
          />
        </div>
        <button
          className="btn_dark_rounded my-4 w-full !rounded-md"
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          {state}
        </button>
        {state === "Sign Up" ? (
          <p className="text-black font-bold ">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-secondary underline"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-black font-bold ">
            Create an account?{" "}
            <span
              className="cursor-pointer text-secondary underline"
              onClick={() => setState("Sign Up")}
            >
              Register
            </span>
          </p>
        )}
        <div className="flexCenter mt-6 gap-2">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      </div>
    </section>
  );
};

export default Login;
