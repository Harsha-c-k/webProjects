"use client";
import Styles from "../../css/LoginPage.module.css";
import React, { useRef, useState } from "react";
 import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const page = () => {
  const videoRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const videos = [
    "/videos/intro1.mp4",
    "/videos/intro2.mp4",
    "/videos/intro3.mp4",
  ];
  const router = useRouter();

  const handleVideoEnd = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const validateUsername = (username) => {
    if (!username) {
      toast.error("Username is required");
      return false;
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      toast.error("Confirm Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (
      validateUsername(username) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword)
    ) {
      try {
        const response = await axios.post("/api/signups", {
          username,
          email,
          password,
        });
        toast.success(response.data.message);
        console.log("Sign up success:");
      } catch (error) {
        console.log("Error during sign up:", error);
        toast.error(error.response?.data?.message || "Error during sign up");
      }
    }
  };

  const handlelogin = async () => {
    if (email.toLowerCase() === "admin" && password.toLowerCase() === "admin") {
      router.push("/components/Admin");
      localStorage.setItem("userData", JSON.stringify({ username: "Admin" }));
      toast.success("Admin Login");
    }
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const response = await axios.post("/api/login", { email, password });
        if (response.data.message === "Login Successful") {
          router.push("/components/HomePage");
          localStorage.setItem(
            "userData",
            JSON.stringify({
              username: response.data.username,
              email: email,
            })
          );
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log("Error during logging in:", error);
        toast.error(error.response?.data?.message || "Error during logging in");
      }
    }
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.Ptitle}>Rent-A-Ride: A New Era of Mobility</div>
        <div className={Styles.intro}>
          <video
            ref={videoRef}
            src={videos[videoIndex]}
            type="video/mp4"
            autoPlay
            loop={false}
            muted
            preload="auto"
            className={Styles.video}
            onEnded={handleVideoEnd}
          />
        </div>

        <div className={Styles.switch}>
          {/* Login  */}
          {isLogin && (
            <div className={Styles.Login}>
              <div className={Styles.title}>Login</div>
              <div className={Styles.item}>Drive Your Dreams Forward</div>
              <div className={Styles.item}>Unlock the Road Ahead</div>
              <div className={Styles.wrapper}>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={Styles.betterOutline}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={Styles.betterOutline}
                />
              </div>

              <div className={Styles.item}>
                <button onClick={handlelogin}>Submit</button>
              </div>

              <div className={Styles.item}>(or)</div>

               <div className={`${Styles.icon} ${Styles.googleOutline}`}>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decodedCredentials = jwtDecode(
                      credentialResponse.credential
                    );
                    router.push("/components/HomePage");
                    localStorage.setItem(
                      "userData",
                      JSON.stringify({
                        username: decodedCredentials.name,
                        email: decodedCredentials.email,
                      })
                    );
                   }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>

              <div className={Styles.item} style={{ fontSize: "1.2dvw" }}>
                Don't have account?{" "}
                <span
                  className={Styles.LoginSign}
                  onClick={() => setIsLogin(false)}
                >
                  &nbsp;Signup
                </span>
              </div>
              <ToastContainer stacked/>
            </div>
          )}
          {/* SignUp */}
          {!isLogin && (
            <div className={Styles.Login}>
              <div className={Styles.title}>Sign Up</div>
              <div className={Styles.item}>Connect, create, and explore</div>
              <div className={Styles.item}>All in one place</div>

              <div className={Styles.wrapper}>
                <input
                  type="text"
                  placeholder="Username"
                  className={Styles.betterOutline}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className={Styles.betterOutline}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={Styles.betterOutline}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={Styles.betterOutline}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className={Styles.item}>
                <button onClick={handleSignUp}>Sign Up</button>
              </div>

              <ToastContainer />

              <div className={Styles.item} style={{ fontSize: "1.2dvw" }}>
                Have account?{" "}
                <span
                  className={Styles.LoginSign}
                  onClick={() => setIsLogin(true)}
                >
                  &nbsp;Login
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
