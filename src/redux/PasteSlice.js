import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
console.log(paste);
      if (paste.title.length > 0 && paste.content.length > 0) {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste added to Vault", {
          duration: 1000,
          position: "top-right",

          // Custom Icon
          icon: "👏",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
      } else {
        toast.error("Please fill all the fields", {
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
      }
    },
    updateToPastes: (state, action) => {
            const  paste  = action.payload;
            // console.log(paste);
            const index = state.pastes.findIndex(
              (pasteObj) => pasteObj.id == paste.id
            );
            // console.log(index);
 
            if (index !== -1) {
              state.pastes[index] = paste;
              localStorage.setItem("pastes", JSON.stringify(state.pastes));
              toast.success("Paste updated to Vault", {
                duration: 1000,
                position: "top-right",
                // Custom Icon
                icon: "👏",
                // Change colors of success/error/loading icon
                iconTheme: {
                  primary: "#000",
                  secondary: "#fff",
                },
              });
            }
    },
    removeFromPastes: (state, action) => {
      const pasteId=action.payload;
      // console.log(pasteId);
      const index=state.pastes.findIndex((paste)=>paste.id==pasteId);
      // console.log(index);
      if(index!==-1){
        state.pastes.splice(index,1);
      // console.log(state.pastes);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("Paste deleted", {
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
      

      }
      
      
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("All Pastes deleted", {
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
      

    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
