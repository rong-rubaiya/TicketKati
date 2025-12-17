import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SocialBtn from "./SocialBtn";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password", "");

  const rules = [
    { test: /.{6,}/, label: "At least 6 characters" },
    { test: /[A-Z]/, label: "One uppercase letter (A–Z)" },
    { test: /[a-z]/, label: "One lowercase letter (a–z)" },
  ];

  const onSubmit = (data) => {
    const { name, email, password, photo } = data;

    createUser(email, password)
      .then(() => {
        return updateUserProfile(name, photo);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Account created successfully!",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl max-w-md w-full shadow-xl"
      >
        <h2 className="text-4xl font-bold text-center mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-2xl"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-2xl"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Photo */}
          <div className="mb-4">
            <input
              {...register("photo")}
              placeholder="Photo URL"
              className="w-full px-4 py-3 rounded-2xl"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
                validate: {
                  upper: (v) =>
                    /[A-Z]/.test(v) || "Must contain uppercase letter",
                  lower: (v) =>
                    /[a-z]/.test(v) || "Must contain lowercase letter",
                },
              })}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-2xl"
            />

            <span
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            {password && (
              <ul className="mt-2 text-sm">
                {rules.map((rule, i) => (
                  <li
                    key={i}
                    className={
                      rule.test.test(password)
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {rule.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="w-full bg-[#FEBC00] py-3 rounded-full font-bold">
            Register
          </button>
        </form>

        <SocialBtn />

        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-[#FEBC00] ml-1">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
