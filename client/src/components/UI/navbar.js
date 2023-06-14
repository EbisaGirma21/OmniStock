import { Link } from "react-router-dom";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Box } from "@mui/material";

const NavBar = ({ isLogin }) => {
  return (
    <nav className="bg-gray-100 sticky top-0 z-40 px-32">
      <Box className="py-6 flex justify-between ">
        <LocalGroceryStoreIcon sx={{ m: 2 }} />
        <ul className="flex items-center ">
          <li>
            <Link
              to="/"
              className="hover:text-green-700 active:text-violet-700"
            >
              Home
            </Link>
          </li>
          <li className="px-3 ">
            <Link
              href="../components/shop"
              className="hover:text-green-700 active:text-violet-700"
            >
              Shop
            </Link>
          </li>
          <li className="px-3">
            <Link
              href="../components/Shop"
              className="hover:text-green-700 active:text-violet-700"
            >
              Blog
            </Link>
          </li>
          <li className="px-3">
            <Link
              href="../components/Shop"
              className="hover:text-green-700 active:text-violet-700"
            >
              About
            </Link>
          </li>
          <li className="px-3">
            <Link
              href="./components/Shop"
              className="hover:text-green-900 active:bg-violet-700"
            >
              Contact
            </Link>
          </li>
          <li className="px-3">{!isLogin && <Link to="login">Login</Link>}</li>
        </ul>
      </Box>
    </nav>
  );
};

export default NavBar;
