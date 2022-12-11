import React from 'react';
import { HiMenuAlt3, HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineDashboard, MdOutlineEventAvailable, MdDinnerDining, MdDesignServices } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { BiDrink } from "react-icons/bi";
import { GiVikingLonghouse, GiStairsCake } from "react-icons/gi";
import { FaUserShield, FaUserFriends } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import {useState} from 'react';
import { Outlet } from "react-router-dom";
import Body from './body';
import {BrowserRouter} from 'react-router-dom';
import AdminLogin from './manager/login/login';

const Navbar =()=>{

  const LogOut=()=>{
    localStorage.clear();
    window.location.replace('/login');
}
    const menus = [
        { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
        { name: "Staff", link: "/staffs", icon: FaUserShield },
        { name: "User", link: "/user", icon: FaUserFriends },
        { name: "Event type", link: "/event-type", icon: MdOutlineEventAvailable, margin: true },
        { name: "Venue", link: "/venue", icon: GiVikingLonghouse },
        { name: "Theme", link: "/theme", icon: HiOutlineLightBulb },
        { name: "Cakes", link: "/cake", icon: GiStairsCake },
        { name: "Drinks", link: "/drink", icon: BiDrink },
        // { name: "Food Menu", link: "/food", icon: MdDinnerDining },
        { name: "Decoration", link: "/decoration", icon: MdDesignServices },
        { name: "Settings", link: "/cake", icon: RiSettings4Line, margin: true },
      ];
    const [open, setOpen] = useState(true);

    var menu;

    //admin header
    if (localStorage.getItem('adminTicket')){
        menu = (
          <>
          <div className="flex">
          <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
            <button onClick={()=>{LogOut()}} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Logout
            </button>
            
          </div>
        </div>
        <div className="m-3 flex-auto text-xl text-gray-900 font-semibold">
          {
            <Body />
          }
        </div>
        </div>
        </>
        )
    } else{
      menu = (
        <>
      <div className="m-3 flex-auto text-xl text-gray-900 font-semibold">
        {
          <AdminLogin />
        }
      </div>
      </>
      )
    }

    return(
      <>
        {menu}
      </>
    )
}

export default Navbar;