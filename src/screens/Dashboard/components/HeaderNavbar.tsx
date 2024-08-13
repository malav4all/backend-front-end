import { useState } from "react";
import ROUTEYE_LOGO from "../../../assets/images/ROUTEYE_LOGO.png";
import { LuLogOut } from "react-icons/lu";
import { FaSortDown } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"; // Icons for theme toggle
import { store } from "../../../utils/store";
import { logOutAction, selectName } from "../../../redux/authSlice";
import history from "../../../utils/history";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useThemeContext } from "../../../redux/ThemeContext"; // Import the theme context

const HeaderNavbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const userName = useAppSelector(selectName);
  const dispatch = useAppDispatch();
  const { toggleTheme, darkMode } = useThemeContext(); // Use the theme context

  const handleLogout = () => {
    history.push("/");
    dispatch(logOutAction());
    localStorage.clear();
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
      <nav className="bg-[#060B25] border-gray-20 border-b border-[#303968]">
        <div className="px-6 flex flex-wrap items-center justify-between mx-auto py-2">
          <div>
            {/* <img src={ROUTEYE_LOGO} alt="Routeye Logo" className="h-[30px]" /> */}
          </div>
          <div className="flex items-center gap-4">
            <div
              className="cursor-pointer border border-[#313147] p-2 rounded-md text-white"
              onClick={toggleTheme}
            >
              {darkMode ? (
                <MdOutlineLightMode size={18} />
              ) : (
                <MdOutlineDarkMode size={18} />
              )}
            </div>

            <div className="relative rounded-lg ">
              <div
                className="flex gap-2 items-center cursor-pointer border border-[#313147] px-2 py-1 rounded-lg "
                onClick={toggleOptions}
              >
                <div className="flex items-center">
                  <p className="bg-[#5F22E1] p-3 rounded-full w-[30px] h-[30px] flex justify-center items-center text-xl text-white">
                    {userName?.charAt(0)}
                  </p>
                </div>
                <p className="text-white">{userName}</p>
                <FaSortDown className="text-white text-sm mb-2 ml-3" />
              </div>

              {showOptions && (
                <div className="user-dropdown absolute right-0 mt-2 w-36 bg-[#15152E] border border-[#313147] rounded-lg shadow-lg">
                  <div className="dropdown-menu py-2">
                    <div
                      className="dropdown-item logout px-4 py-2 flex items-center cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LuLogOut className="mr-2 text-[#7C58CB] text-2xl" />
                      <span className="text-[#7C58CB] font-semibold">
                        Sign Out
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderNavbar;
