import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePaste } from "../redux/pasteSlice";

const EditPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const [paste, setPaste] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const response = allPastes.find((p) => p.id === id);
    setPaste(response);
    setTitle(response.title);
    setContent(response.content);
  }, [id, paste]);

  const editPaste = () => {
    if (title && content) {
      dispatch(updatePaste({ id, title, content }));
      navigate("/pastes");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black via-emerald-950 to-black py-20 ">
      <div className="md:w-3/4 w-full  text-white mx-auto px-5 md:px-0">
        <h1 className=" text-4xl font-bold text-center mb-10">Edit</h1>
        <div className="flex  justify-between gap-3">
          <input
            type="text"
            placeholder="Paste title"
            className="w-full bg-transparent border rounded-lg p-2 border-green-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="w-1/5 bg-green-600 px-3 md:px-0 rounded-lg md:text-base text-xs"
            onClick={editPaste}
          >
            Edit
          </button>
        </div>
        <textarea
          cols="30"
          rows="10"
          className="bg-transparent  w-full p-3 border border-green-600 rounded-lg mt-4"
          placeholder="Paste content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};
export default EditPaste;
