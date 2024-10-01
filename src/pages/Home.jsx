import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  const phrase = "Save and share your code, notes, dates....";
  useEffect(() => {
    const interval = setInterval(() => {
      if (index < phrase.length) {
        setText((prev) => prev + phrase[index]);
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setText("");
          setIndex(0);
        }, 1000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [index]);
  const paste = {
    id: Date.now().toLocaleString(),
    title,
    content,
    createdAt: new Date().toDateString().slice(4),
  };

  const createPaste = () => {
    if (paste && content) {
      dispatch(addPaste(paste));
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black via-emerald-950 to-black py-20 ">
      <div className="md:w-3/4 w-full  text-white mx-auto px-5 md:px-0">
        <h1 className=" text-4xl font-bold text-center mb-10">
          "Paste, Share, Store-{" "}
          <span className="text-emerald-500">Simplified"</span>
        </h1>
        <div className="w-full mx-auto mb-5">
          <p className=" mb-5 text-center font-semibold text-emerald-200 text-md transition-all opacity-[0.7]">
            {text}
          </p>
        </div>
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
            onClick={createPaste}
          >
            Create
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
export default Home;
