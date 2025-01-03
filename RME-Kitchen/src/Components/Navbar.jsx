import { NavLink } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";

const Navbar = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const { user } = useUser();

  const items = [
    {
      label: <a onClick={() => signOut(() => navigate("/"))}>Log Out</a>,
      key: "0",
    },
  ];

  return (
    <header className="flex w-full bg-transparent justify-between padding-x mt-5 mb-10">
      <div className="flex justify-start items-start">
        <NavLink to="/" className="no-underline">
          LOGO
        </NavLink>
      </div>
      <nav className="gap-10 flex items-center text-xl max-sm:hidden max-md:text-[17px] text-[19px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 no-underline"
              : "text-black no-underline"
          }
        >
          Item Status
        </NavLink>
        <NavLink
          to="/order-status"
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 no-underline"
              : "text-black no-underline"
          }
        >
          Pending Orders
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

export default Navbar;
