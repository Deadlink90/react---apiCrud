import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signin,registerErrors,isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(()=> {
   if(isAuthenticated) navigate("/tasks");
  },[isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

      {
      registerErrors.map((error,i)=> (
        <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
          {error}
        </div>
      ))  
      }
      
        <h1 className="text-3xl font-bold my-2">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 p-2 rounded-md my-2"
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500"> {errors.email.message} </p>
          )}

          <input
            type="password"
            className="w-full bg-zinc-700 text-white px-4 p-2 rounded-md my-2       "
            name="password"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500"> {errors.password.message} </p>
          )}

          <button 
          type="submit"
          className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >Login</button>
        </form>

        <p className="flex gap-x-2 justify-between">
          Don't have an acount <Link to='/register' className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
