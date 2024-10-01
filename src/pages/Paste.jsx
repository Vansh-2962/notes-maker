import { useDispatch, useSelector } from "react-redux";
import { Copy, CopyIcon, Edit, Eye, Share2, Trash2 } from "lucide-react";
import { deletePaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Paste = () => {
  const [searchParams, setSearhcParams] = useSearchParams();
  const id = searchParams.get("edit");
  const [paste, setPaste] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();



  

  const removePaste = (id) => {
    if (id) {
      dispatch(deletePaste(id));
    }
  };
  const copyPaste = (content) => {
    if (content) navigator.clipboard.writeText(content);
    toast.success("Post copied");
  };

  const viewPaste = (id) => {
    if (id) {
      const paste = pastes?.find((p) => p.id == id);
      setPaste(paste);
    }
  };

  const sharePaste = (id) => {
    if (id) {
      // generate a paste URL
      const paste = pastes?.find((p) => p.id == id);
      const url = `${window.location.origin}/pastes/?edit=${paste.id}`;
      console.log(url);
      navigator.clipboard.writeText(url);
      toast.success("URL copied successfully");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black py-20 ">
        {!id ? (
          <section className="w-3/4 mx-auto text-white flex flex-col gap-2 ">
            <p className=" p-2  font-bold text-xl">All Pastes</p>
            {pastes ? (
              pastes?.map((paste) => (
                <div
                  key={paste?.id}
                  className="border border-emerald-600 rounded-lg p-4  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  "
                >
                  <div className="flex md:flex-row flex-col-reverse gap-4 items-center justify-between ">
                    <div className="flex flex-col w-full">
                      <span className="font-semibold md:text-xl text-base text-left w-full">
                        {paste?.title}
                      </span>
                      <small className="text-white">{paste.createdAt}</small>
                    </div>
                    <div className="flex gap-1 w-full justify-end">
                      <Link to={`/paste/${paste.id}`}>
                        {" "}
                        <Edit className="border p-1 border-emerald-600 rounded-md hover:cursor-pointer" />
                      </Link>
                      <Trash2
                        className="border p-1 border-emerald-600 rounded-md hover:cursor-pointer"
                        onClick={() => removePaste(paste?.id)}
                      />
                      <Copy
                        className="border p-1 border-emerald-600 rounded-md hover:cursor-pointer"
                        onClick={() => copyPaste(paste?.content)}
                      />
                      <Link to={`/pastes/?edit=${paste.id}`}>
                        <Eye
                          className="border p-1 border-emerald-600 rounded-md hover:cursor-pointer"
                          onClick={() => viewPaste(paste?.id)}
                        />
                      </Link>
                      <Share2
                        className="border p-1 border-emerald-600 rounded-md hover:cursor-pointer"
                        onClick={() => sharePaste(paste?.id)}
                      />
                    </div>
                  </div>
                  <p className="mt-5 text-zinc-400 whitespace-pre-wrap">
                    {paste?.content}
                  </p>
                </div>
              ))
            ) : (
              <span className="text-center w-full mx-auto text-white">
                There is nothing to show. Please add something
              </span>
            )}
          </section>
        ) : (
          <div className="w-3/4 text-white mx-auto border p-4 border-emerald-500 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div className="flex items-center justify-between md:flex-row flex-col-reverse gap-2 ">
              <span className="font-bold  w-full">{paste?.title}</span>
              <div className=" w-full flex justify-end">
                <CopyIcon
                  className="border p-1 border-emerald-600 rounded-md hover:cursor-pointer "
                  onClick={() => copyPaste(paste?.content)}
                />
              </div>
            </div>
            <p className="mt-3 p-3">{paste?.content}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default Paste;
