import React from "react";
import { useHistory } from "react-router-dom";

const MenuExpand = ({ setExpandMenu, userInfo, logoutHandler }) => {
  const history = useHistory();

  const toShopAll = () => {
    history.push("/shopAll");
    setExpandMenu(false);
  };
  const toLogin = () => {
    history.push("/login");
    setExpandMenu(false);
  };
  const toProfile = () => {
    history.push("/profile");
    setExpandMenu(false);
  };
  const toUserList = () => {
    history.push("/admin/users");
    setExpandMenu(false);
  };
  const toProductList = () => {
    history.push("/admin/productList");
    setExpandMenu(false);
  };

  return (
    <ul className="bg-brown-light block md:hidden">
      <li className="tracking-wide py-3 border-gray-300 border-t text-center">
        Welcome {userInfo && ` , ${userInfo.name.toUpperCase()}`}
      </li>
      {userInfo?.isAdmin && (
        <li
          className="link tracking-wide py-3 border-gray-300 border-t"
          onClick={toProductList}
        >
          Product List
        </li>
      )}
      {userInfo?.isAdmin && (
        <li
          className="link tracking-wide py-3 border-gray-300 border-t"
          onClick={toUserList}
        >
          User List
        </li>
      )}
      <li
        className="link tracking-wide py-3 border-gray-300 border-b border-t"
        onClick={toProfile}
      >
        Profile
      </li>
      <li
        className="link tracking-wide py-3 border-gray-300 border-b"
        onClick={toShopAll}
      >
        Shop All
      </li>
      {userInfo ? (
        <li className="link tracking-wide pt-3 pb-6" onClick={logoutHandler}>
          Sign out
        </li>
      ) : (
        <li className="link tracking-wide pt-3 pb-6" onClick={toLogin}>
          Sign In
        </li>
      )}
    </ul>
  );
};

export default MenuExpand;
