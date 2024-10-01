import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full absolute text-white p-4 flex items-center justify-around">
      <Link to={"/"} className="text-2xl font-bold">
        Paste
      </Link>
      <div className="flex gap-5">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/pastes"}>Pastes</NavLink>
      </div>
    </div>
  );
};
export default Navbar;
