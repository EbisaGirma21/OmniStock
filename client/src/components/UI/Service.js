import { Typography } from "@mui/material";
import b2 from "../../assets/b2.jpg";
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <div className="bg-gray-700 w-full h-52 relative">
      <img
        src={b2}
        alt=""
        className="w-full h-full object-cover absolute mix-blend-overlay "
      />
      <div className="text-white text-center py-10">
        <Typography variant="h5" className="text-2xl">
          Services
        </Typography>
        <Typography variant="h2" className="text-4xl mt-2 mb-3">
          Up to 70% Off - All t-Shirts & clothing
        </Typography>
        <button className="bg-white w-32 h-8 rounded-md hover:bg-black">
          <Link href="" className="text-black">
            Explore More
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Service;
