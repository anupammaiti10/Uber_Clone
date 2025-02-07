import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div>
      <div className="bg-cover bg-center  bg-[url(https://www.miniphysics.com/wp-content/uploads/2011/05/file-AYQMIHQeCrps7zXtPZbUT8Iv.webp)]  h-screen w-full pt-8 flex justify-between flex-col">
        <img
          className="w-12 h-5 ml-10 text-2xl fill-white "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        />
        <div className="bg-white pt-3 pb-7 flex flex-col items-center justify-center rounded">
          <h1 className="pt- text-2xl font-bold text-black">
            Get started with Uber
          </h1>
          <Link
            to="/login"
            className="bg-black text-white px-12 py-2 mt-4 text-2xl rounded"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
