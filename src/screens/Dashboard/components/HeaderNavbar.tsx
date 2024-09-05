import { useState, useEffect, useRef } from "react";
import { LuLogOut } from "react-icons/lu";
import { FaSortDown } from "react-icons/fa";
import {
  logOutAction,
  selectName,
  setAccountId,
} from "../../../redux/authSlice";
import history from "../../../utils/history";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { fetchAccountTableHandler } from "../../Settings/Account/service/account.service";
import { openSuccessNotification } from "../../../helpers/methods";
import { store } from "../../../utils/store";
import { divide } from "lodash";

type Account = {
  _id: string;
  accountId: string;
  accountName: string;
};

const HeaderNavbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userName = useAppSelector(selectName);
  const dispatch = useAppDispatch(); // Dispatch for Redux

  const handleLogout = () => {
    history.push("/");
    dispatch(logOutAction());
    localStorage.clear();
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetchAccountTableHandler({
          input: { page: -1, limit: 10000 },
        });

        if (response && response?.fetchAccountModuleList?.data) {
          setAccounts(response?.fetchAccountModuleList?.data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle account selection and update Redux store
  const handleAccountSelection = (accountId: string) => {
    dispatch(setAccountId(accountId)); // Dispatch the action to update accountId in the Redux store
    openSuccessNotification("Account ID updated: ", accountId);
  };

  return (
    <>
      <nav className="bg-[#060B25] border-gray-20 border-b border-[#303968]">
        <div className="px-6 flex flex-wrap items-center justify-between mx-auto py-2 relative">
          {store.getState().auth.isSuperAdmin ? (
            <div>
              <div className="relative w-56" ref={dropdownRef}>
                <div
                  onClick={toggleDropdown}
                  className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-400"
                >
                  Select Account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-auto h-4 text-gray-600 transition ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {showDropdown && (
                  <ul className="absolute left-0 top-full z-10 w-full select-none flex-col overflow-hidden rounded-b-lg shadow-xl bg-white transition-all duration-300 py-3">
                    {Array.isArray(accounts) && accounts.length > 0 ? (
                      accounts.map((account) => (
                        <li
                          key={account._id}
                          className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white"
                          onClick={() =>
                            handleAccountSelection(account.accountId)
                          } // Dispatch Redux action on selection
                        >
                          {account?.accountId}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-sm text-gray-500">
                        No accounts available
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-4">
            <div className="relative rounded-lg">
              <div
                className="flex gap-2 items-center cursor-pointer border border-[#313147] px-2 py-1 rounded-lg"
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
                <div className="user-dropdown absolute right-0 mt-2 w-36 bg-[#15152E] border border-[#313147] rounded-lg shadow-lg z-20">
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
