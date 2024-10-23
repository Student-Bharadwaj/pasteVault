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
      <div className="relative flex items-center">
      <input
        className="bg-black  border border-slate-400 w-[400px] px-3 py-2 pl-8 rounded-lg"
        type="text"
        value={search}
        id="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        name="search"
        placeholder="Search paste here....."
      />
      <label htmlFor="search" className="flex items-center">
      <i className="fa-solid fa-magnifying-glass absolute left-2 text-gray-300"></i>
      </label>
      

      <button
          className=" ml-16 text-lg border-none px-4 py-2 bg-red-700 hover:bg-red-600  rounded-xl"
          onClick={() => {
            dispatch(resetAllPastes());
          }}
        >
          Reset all Pastes
        </button>
     
      </div>
     

      <main className="border border-gray-500 rounded-lg bg-black p-2 flex flex-col gap-3  h-[380px] w-6/12 overflow-y-scroll mt-4  ">
        <div className="text-3xl">

          All Pastes
          <hr className="" />
        </div>

        {filteredPastes.length > 0 ? (
          filteredPastes.map((paste) => {
            return (
              <div
                className="border border-gray-500 rounded-lg  w-full flex justify-between px-4 pt-4 pb-2   "
                key={paste.id}
              >
                <div className="flex w-8/12 flex-col h-[120px] pr-4  gap-2  text-ellipsis line-clamp-3">
                  <p className="text-2xl font-medium">{paste.title}</p> 
                  <p className="text-lg text-gray-400">{paste.content}</p>
                </div>
                <div className="flex w-4/12 flex-col justify-evenly ">
                  <div className="  flex justify-evenly">
                    <button
                      onClick={() => {
                        navigate(`/pastes/update/${paste.id}`);
                      }}
                    >
                    <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(removeFromPastes(paste.id));
                      }}
                    >
  <i class="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/pastes/view/${paste.id}`);
                      }}
                    >
                      <i class="fa-regular fa-eye"></i>
                    </button>
                    <button>
                    <i class="fa-solid fa-share"></i>
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
             <i class="fa-regular fa-copy"></i>
                    </button>
                  </div>

                  <p className="text-lg">{handleDate(paste.created_At)}</p>
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
