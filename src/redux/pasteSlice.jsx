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
    addPaste(state, action) {
      // state.pastes.push(action.payload);
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Post created successfully");
    },
    deletePaste(state, action) {
      const id = action.payload;
      state.pastes = state.pastes.filter((paste) => paste.id != id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Post deleted");
    },
    updatePaste(state, action) {
      const { id, title, content } = action.payload;
      state.pastes = state.pastes.map((paste) => {
        if (paste.id == id) {
          return { ...paste, title, content };
        }
        return paste;
      });
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Post updated");

    },
    resetPaste(state, action) {},
  },
});

export const { addPaste, deletePaste, updatePaste, resetPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
