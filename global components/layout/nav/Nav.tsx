"use client";

import { ReactNode, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchBar from "@global components/ui/SearchBar";
import { SeparatorLine } from "../FormWrapper";

import "@global components/icons/icons";

import useNav from "./hooks/useNav";
import { globalContext } from "@globals";
import { useGlobals } from "@globals";

export default function Nav() {
  const {} = useGlobals();

  const globalStates = useContext(globalContext);

  if (!globalStates)
    throw new Error("Global context must be within a provider");

  const { user } = globalStates;

  const {
    searchQuery,
    setSearchQuery,
    profileOptions,
    setProfileOptions,
    openNotifications,
    setOpenNotifications,
    handleLogout,
  } = useNav();

  return (
    <nav className="fixed w-[calc(100vw-260px)] h-15 top-0 left-65 flex gap-2.5 items-center border-b border-(--terciary-grey) backdrop-blur shadow-[0_4px_6px_-1px_rgba(51,51,51,0.1)] py-2.5 px-5 text-style__body z-1">
      <SearchBar
        val={searchQuery}
        placeholder="Search leads, services, content..."
        changeFunc={(val) => setSearchQuery(val)}
      />

      {/* NOTIFICATIONS */}
      <div className="relative">
        <div
          className="relative p-1 rounded-[10px] duration-300 hover:bg-(--terciary-grey) cursor-pointer"
          onClick={() =>
            setOpenNotifications((prev) => (prev === true ? false : true))
          }
        >
          <FontAwesomeIcon
            icon={["far", "bell"]}
            className="text-(--primary-grey)"
          />

          {user?.role === "admin" && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </div>
          )}
        </div>

        {openNotifications && (
          <div className="absolute min-w-50 feature-container-vertical right-0">
            <div className="w-full h-full text-center">You are up to date</div>
          </div>
        )}
      </div>

      <div className="h-full border-r border-(--terciary-grey)"></div>

      {/* PROFILE DETAILS */}
      <div
        className="relative cursor-pointer p-2 flex items-center gap-2.5 text-style__small-text duration-300 hover:bg-(--terciary-grey) rounded-[10px]"
        onClick={() => setProfileOptions((prev) => !prev)}
      >
        <div>
          <div className="font-bold">{user?.name}</div>
          <div className="">{user?.role}</div>
        </div>

        <div className="p-2 border rounded-full bg-(--primary-blue)">
          <FontAwesomeIcon
            icon={["far", "user"]}
            className="text-white text-style__body"
          />
        </div>

        {/* DROPDOWN PROFILE OPTIONS */}
        {profileOptions && (
          <ul
            className="absolute w-30 p-2.5 flex flex-col gap-0.5 bg-white border border-(--terciary-grey) rounded-[10px] top-12.5 duration-300"
            onMouseLeave={() => setProfileOptions(false)}
          >
            <ProfileOption
              option="Profile"
              action={() => {}}
              style="text-(--primary-blue)"
            >
              <FontAwesomeIcon icon={["far", "user"]} />
            </ProfileOption>

            <SeparatorLine />

            <ProfileOption option="Settings" action={() => {}}>
              <FontAwesomeIcon icon={["fas", "gear"]} />
            </ProfileOption>

            <ProfileOption option="Security" action={() => {}}>
              <FontAwesomeIcon icon={["fas", "shield-halved"]} />
            </ProfileOption>

            <ProfileOption option="Activity" action={() => {}}>
              <FontAwesomeIcon icon={["fas", "chart-line"]} />
            </ProfileOption>

            <SeparatorLine />

            <ProfileOption
              option="logout"
              action={handleLogout}
              style="text-(--primary-red)"
            >
              <FontAwesomeIcon icon={["far", "trash-can"]} />
            </ProfileOption>
          </ul>
        )}
      </div>
    </nav>
  );
}

function ProfileOption({
  option,
  children,
  style,
  action,
}: {
  option: string;
  children: ReactNode;
  style?: string;
  action: () => void;
}) {
  return (
    <ul
      className={`flex gap-2.5 items-center px-1 py-1.5 rounded-[10px] duration-300 hover:bg-(--terciary-grey)/50 hover:font-bold ${style}`}
      onClick={action}
    >
      {children}
      <div className="">{option}</div>
    </ul>
  );
}
