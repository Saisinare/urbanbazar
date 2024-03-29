import React from "react";
import { Link } from "react-router-dom";
const OfferBanner = () => {
  return (
<div className=" px-1 md:px-0">
<Link to="/offers">
<div className=" w-full  mt-5 h-72 rounded-xl my-3 overflow-hidden bg flex items-center justify-center hover:shadow-md transition-all duration-500 ease-in-out hover:shadow-emerald-700" style={{backgroundColor:"#13171a"}} >
  <img src={`${process.env.REACT_APP_BACKEND_API_URL}/icons/offer.JPG`}  alt="" />
</div>
</Link>
</div>
  );
};

export default OfferBanner;
