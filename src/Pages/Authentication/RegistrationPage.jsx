import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";
import UseAuth from "../../Hooks/UseAuth";

const RegisterPage = () => {

  const {createUser} = UseAuth()



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const {email, password} = data

    createUser(email, password)
    .then(result => {
      console.log('User created', result.user)
    })
    .catch(error => {
      console.log(error.message)
    })
};

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-center"><Link to="/" className="text-2xl font-bold mb-2 text-primary">EventHub</Link></h2>
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          <button type="submit" className="btn btn-primary w-full mt-2">
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </div>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FaGoogle className="text-red-500" /> Register with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
