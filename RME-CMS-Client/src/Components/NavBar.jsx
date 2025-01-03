import { NavLink, useLocation } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";

const NavBar = () => {
  const location = useLocation();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const { user } = useUser();

  const isHeaderBlack = location.pathname === "/The-Phoenix-era";

  const linkTextColor = (isActive) => {
    if (isHeaderBlack) {
      return "text-white no-underline hover:text-gray-500";
    } else {
      return isActive
        ? "text-orange-500 no-underline"
        : "text-black no-underline";
    }
  };

  const items = [
    {
      label: <a onClick={() => signOut(() => navigate("/"))}>Log Out</a>,
      key: "0",
    },
  ];

  return (
    <header
      className={`flex w-full ${
        isHeaderBlack
          ? "bg-[#060606] pt-3 pb-3 scroll-smooth"
          : "bg-transparent mt-3 mb-5"
      } justify-between items-center md:padding-x max-md:padding-x sm:px-11`}
    >
      <div className="flex justify-start items-start">
        <NavLink to="/" className="no-underline">
          LOGO
        </NavLink>
      </div>
      <nav className="gap-10 flex items-center text-xl max-sm:hidden max-md:text-[17px] text-[19px]">
        <NavLink to="/" className={({ isActive }) => linkTextColor(isActive)}>
          Dashboard
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) => linkTextColor(isActive)}
        >
          Categories
        </NavLink>
        <NavLink
          to="/menu-items"
          className={({ isActive }) => linkTextColor(isActive)}
        >
          Menu Items
        </NavLink>
        <NavLink
          to="/combo-planes"
          className={({ isActive }) => linkTextColor(isActive)}
        >
          Combo Offers
        </NavLink>
        <NavLink
          to="/table-reservation"
          className={({ isActive }) => linkTextColor(isActive)}
        >
          Table Reservation
        </NavLink>
        <NavLink
          to="/design-custormization"
          className={({ isActive }) => linkTextColor(isActive)}
        >
          Design Customization
        </NavLink>
        <NavLink
          to="/The-Phoenix-era"
          className={({ isActive }) => linkTextColor(isActive)}
        >
          The Phoenix Era
        </NavLink>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          className="cursor-pointer items-center"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img src={user.imageUrl} width={35} className="rounded-full" />
            </Space>
          </a>
        </Dropdown>
      </nav>
    </header>
  );
};

export default NavBar;
