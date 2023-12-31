import React from "react";
import { Link } from "react-router-dom";
import { setFilters, setcatfil } from "../../redux/slice/products";
import { useDispatch, useSelector } from "react-redux";

const Category = (props) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const updateFilter = (e) => {
    dispatch(setcatfil(e.target.innerText.toLowerCase()))
  };
  return (
    <div
      className="flex flex-col w-64 h-auto transition-all p-1 "
      onClick={updateFilter}
    >
      <Link
        to={`/shop/${props.title.toLowerCase()}`}
        state={{ category: props.title.toLowerCase() }}
      >
        <div
          class="transition-all duration-500 ease-in-out bg-transparent backgroud bg-top cursor-pointer bg-no-repeat bg-cover hover:bg-left flex h-60  hover:scale-105  p-3 rounded-xl bg-gray-800 mx-2 text-white items-start justify-center "
          style={{ backgroundImage: props.imgurl }}
        >
          <h1 className="text-black font-sans  font-semibold text-xl ">
            {props.title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Category;
