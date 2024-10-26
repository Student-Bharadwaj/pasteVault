import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { removeFromPastes, resetAllPastes } from "../redux/PasteSlice";
import { handleDate } from "../utils/FormattedDate";

export default function Pastes() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-screen  flex flex-col mt-8 items-center">
      <div className=" flex w-full justify-center gap-4 sm:gap-7 md:gap-10 items-center">
      <input
        className="bg-black  border border-slate-400 w-[200px] sm:w-[300px] md:w-[350px] px-1 sm:px-2  md:px-3  py-1 md:py-2  rounded-xl md:rounded-xl"
        type="text"
        value={search}
        id="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        name="search"
        placeholder="Search paste here....."
      />
     
      

      <button
          className="  text-base md:text-lg border-none px-4  py-1  bg-red-700 hover:bg-red-600  rounded-xl"
          onClick={() => {
            dispatch(resetAllPastes());
          }}
        >
          Reset 
        </button>
     
      </div>
     

      <main className="border border-gray-500 rounded-lg bg-black p-2 flex flex-col gap-3  h-[450px] w-11/12 md:w-9/12 lg:w-8/12 overflow-y-scroll mt-4  ">
        <div className="text-xl sm:text-xl md:text-2xl lg:text-3xl">

          All Pastes
          <hr className="" />
        </div>

        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => {
            return (
              <div
                className="border border-gray-500 rounded-lg  w-full flex justify-between px-1 md:px-3 lg:px-4 pt-2 lg:pt-4 pb-2   "
                key={paste.id}
              >
                <div className="flex w-8/12 flex-col h-[120px] pr-1 md:pr-2 lg:pr-4  gap-2  text-ellipsis line-clamp-3">
                  <p className="text-lg md:text-xl lg:text-2xl font-normal md:font-medium">{paste.title}</p> 
                  <p className="text-base md:text-lg text-gray-400">{paste.content}</p>
                </div>
                <div className="flex w-4/12 flex-col pt-1 md:pt-1 lg:pt-0 justify-normal
                 lg:justify-evenly  ">
                  <div className="  flex gap-2 justify-center  sm:justify-evenly md:gap-0  md:justify-evenly">
                    <button
                      onClick={() => {
                        navigate(`/pastes/update/${paste.id}`);
                      }}
                    >
                    <i class="fa-regular fa-pen-to-square text-sm lg:text-base "></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(removeFromPastes(paste.id));
                      }}
                    >
  <i class="fa-solid fa-trash text-sm lg:text-base "></i>
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/pastes/view/${paste.id}`);
                      }}
                    >
                      <i class="fa-regular fa-eye text-sm lg:text-base "></i>
                    </button>
                    <button>
                    <i class="fa-solid fa-share text-sm lg:text-base "></i>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard
                          .writeText(paste.content)
                          .then(() => {
                            toast.success("Copied to clipboard", {
                              duration: 1000,
                              position: "top-right",

                              // Custom Icon
                              icon: "✅",

                              // Change colors of success/error/loading icon
                              iconTheme: {
                                primary: "#000",
                                secondary: "#fff",
                              },
                            });
                          })
                          .catch((err) => {
                            toast.error("Error while copying the content", {
                              duration: 1000,
                              position: "top-right",

                              // Custom Icon
                              icon: "❌",

                              // Change colors of success/error/loading icon
                              iconTheme: {
                                primary: "#000",
                                secondary: "#fff",
                              },
                            });
                          });
                      }}
                    >
             <i class="fa-regular fa-copy text-sm lg:text-base "></i>
                    </button>
                  </div>

                  <p className=" text-center text-sm md:text-base  lg:text-lg pt-6 lg:pt-0  ">{handleDate(paste.created_At)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-4xl flex justify-center text-gray-500  pt-8">No pastes!</div>
        )}
      </main>
     
    </div>
  );
}
