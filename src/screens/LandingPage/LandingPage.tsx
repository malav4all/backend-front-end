import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../utils/hooks";
import { selectAuthenticated } from "../../redux/authSlice";
import history from "../../utils/history";
import { Location } from "history";
import strings from "../../global/constants/StringConstants";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ROUTEYE_LOGO from "../../assets/images/ROUTEYE_LOGO.png";
import login_background from "../../assets/images/login_background.avif";
import login_background1 from "../../assets/images/login_background1.avif";
import login_background2 from "../../assets/images/login_background2.avif";
import login_background3 from "../../assets/images/login_background3.avif";
import Mesh from "../../assets/images/mesh.jpg";

interface CustomProps {
  location?: Location;
}

const LandingPage = (props: CustomProps) => {
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Backgrounds and corresponding text array
  const backgrounds = [
    login_background,
    login_background1,
    login_background2,
    login_background3,
  ];

  const texts = [
    "We outpace the competition with 10x the speed, consistently delivering new features while others are stuck managing technical debt.",
    "Innovation is our core, driving your business forward with every step.",
    "Experience cutting-edge technology with uninterrupted performance—always online, always ready.",
    "Turn your ideas into reality at lightning speed. We make it happen.",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentBackgroundIndex(
          (prevIndex) => (prevIndex + 1) % backgrounds.length
        );
        setFade(true);
      }, 500); // Delay of 500ms
    }, 4000); // Every 3 seconds,

    return () => clearInterval(intervalId);
  }, []);

  const getComponentBasedOnURL = () => {
    const location = props.location?.pathname?.split("/")[1].toLowerCase();
    switch (location) {
      case strings.LOGIN:
        return <Login />;
      case strings.FORGOT_PASSWORD:
        return <ForgotPassword />;
      case strings.RESET_PASSWORD:
        return <ResetPassword />;
      default:
        return <Login />;
    }
  };

  const getLandingPage = () => {
    return (
      <div className="flex flex-wrap h-screen w-screen overflow-hidden">
        {/* Left section for login form */}
        <div
          className="w-full h-screen lg:w-1/3 flex justify-center items-center p-6 bg-fit"
          style={{
            backgroundImage: `url(${Mesh})`,
          }}
        >
          <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
            <div className="flex justify-center items-center mb-6">
              <img
                src={ROUTEYE_LOGO}
                alt="Routeye Logo"
                className="h-10 mb-4"
              />
            </div>

            <div className="w-full">{getComponentBasedOnURL()}</div>
          </div>
        </div>

        {/* Right section with changing background image and text */}
        <div className="hidden lg:flex lg:w-2/3 bg-cover bg-center relative">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-20"
            }`}
            style={{
              backgroundImage: `url(${backgrounds[currentBackgroundIndex]})`,
            }}
          ></div>

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="flex flex-col justify-end text-white p-8 z-10 relative">
            <div className="absolute inset-0 bg-gradient-to-t min-w-[100vw] from-black via-transparent to-transparent"></div>

            {/* Changing Text */}
            <p className="mb-12 text-4xl font-semibold leading-tight z-10 relative">
              {texts[currentBackgroundIndex]}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (isAuthenticated) {
    history.push("/dashboard");
    return null;
  }

  return getLandingPage();
};

export default LandingPage;
