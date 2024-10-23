import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/PasteSlice";
import toast from "react-hot-toast";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

  const handleCreatePaste = () => {
    const paste = {
      title: title,
      content: content,
      id: Date.now(),
      created_At: new Date(Date.now()).toISOString(),
    };
console.log(paste)
    dispatch(addToPastes(paste));
    setTitle("");
    setContent("");
  };

  return (
    <div className=" w-screen flex flex-col items-center justify-center gap-4 mt-8">
      <div className="flex w-screen justify-center gap-8">
        <input
          className="bg-black border border-slate-400 w-[400px] px-3 py-2 rounded-full"
          type="text"
          name="title"
          placeholder="Title...."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
        // style={{backgroundColor:"#48518F"}}
          className=" bg-blue-600 text-xl hover:bg-blue-700 border border-slate-400 w-[200px] px-3 py-2 rounded-full"
          onClick={handleCreatePaste}
        >
          Create my paste
        </button>
      </div>
      <div className="w-2/3 flex flex-col  h-[400px] bg-slate-600 rounded-b-xl rounded-t-lg">
        <div className="flex m-2  justify-between ">
          <p className="flex gap-2 items-center pl-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </p>
          <button
            className="pr-2 "
            onClick={() => {
              navigator.clipboard
                .writeText(content)
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
       <i className="fa-regular fa-copy text-lg hover:text-xl "></i>
          </button>
        </div>
        <textarea
          className="bg-black resize-none w-full pt-2  py-1  px-4 rounded-b-xl outline-none"
          name="content"
          id="content"
          rows="16"
          cols="80"
          draggable="false"
          placeholder="Enter content here...."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}
