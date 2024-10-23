import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePaste() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {pasteId}=useParams();

  useEffect(()=>{
    if(pasteId){
        const updatablePaste=pastes.filter((paste)=>paste.id==pasteId)[0];
        // console.log(updatablePaste);
    setNewTitle(updatablePaste.title);
    setNewContent(updatablePaste.content);

    }
   

  },[])

  const handleUpdatePaste = () => {
    const paste = {
      title: newTitle,
      content: newContent,
      id: pasteId,
      created_At: new Date(Date.now()).toISOString(),
    };
// console.log(paste)
    dispatch(updateToPastes(paste));
    setNewContent("");
    setNewTitle("");
    navigate("/pastes");
  };

  return (
    <div className=" w-screen flex flex-col items-center justify-center gap-4 mt-4">
      <div className="flex w-screen justify-center gap-8">
        <input
          className="bg-black border border-slate-400 w-[400px] px-3 py-2 rounded-full"
          type="text"
          name="title"
          placeholder="Title...."
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
        />
        <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleUpdatePaste}
        >
          Update paste
        </button>
      </div>
      <div className="w-2/3 flex flex-col  h-[400px] bg-gray-500 rounded-b-xl rounded-t-lg">
        <div className="flex m-2 justify-between ">
        <p className="flex gap-2 items-center pl-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </p>
          <button
            className="pr-2"
            onClick={() => {
              navigator.clipboard
                .writeText(newContent)
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
          className="bg-black w-full m  py-1  px-4 rounded-b-xl outline-none"
          name="content"
          id="content"
          rows="16"
          cols="80"
          placeholder="Enter content here...."
          value={newContent}
          onChange={(e) => {
            setNewContent(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}
