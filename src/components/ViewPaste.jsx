import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function ViewPaste() {
  const {id} = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
console.log(id);
  const selectedPaste = pastes.filter((paste) => paste.id == id)[0];
  console.log(selectedPaste);

  return (
    <div className=" w-screen flex flex-col items-center justify-center gap-4 mt-4">
      <div className="flex w-screen justify-center items-center gap-2">
            <label className='text-3xl ' htmlFor="title">Title</label>
          <input
            className="bg-black border border-slate-400 w-[400px] px-3 py-2 rounded-full"
            type="text"
            name="title"
            id='title'
        
            value={selectedPaste?.title}
            disabled
          
          />
       
        </div>
        <label className='text-3xl ' htmlFor="content">Content</label>
        <div className="w-2/3 flex flex-col  h-[400px] bg-gray-500 rounded-b-xl rounded-t-lg">
        <div className="flex m-2 justify-between ">
        <p className="flex gap-2 items-center pl-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </p>
          <button className="pr-2" onClick={
              () => {
                  navigator.clipboard.writeText(selectedPaste.content)
                    .then(() => {
                      toast.success('Copied to clipboard', {
                          duration: 1000,
                          position: 'top-right',
                        
                         
                        
                          // Custom Icon
                          icon: '✅',
                        
                          // Change colors of success/error/loading icon
                          iconTheme: {
                            primary: '#000',
                            secondary: '#fff',
                          },
                        
                          
                        });
                    })
                    .catch((err) => {
                      toast.error('Error while copying the content', {
                          duration: 1000,
                          position: 'top-right',
                        
                         
                        
                          // Custom Icon
                          icon: '❌',
                        
                          // Change colors of success/error/loading icon
                          iconTheme: {
                            primary: '#000',
                            secondary: '#fff',
                          },
                        
                          
                        });
                    });
                }
          }>
         <i className="fa-regular fa-copy text-lg hover:text-xl "></i>
          </button>
  
        </div>
        
          <textarea
            className="bg-black resize-none w-full pt-2  py-1  px-4 rounded-b-xl outline-none"
            name="content"
            id="content"
            rows="16"
            cols="80"
         
            value={selectedPaste?.content}
           disabled
          ></textarea>
        </div>
    </div>
  );
}
