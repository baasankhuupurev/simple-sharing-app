import React, { useRef, useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { createPost } from "../services/post";
import { getCategory } from "../services/category";
export default () => {
  const editorRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [banner, setBanner] = useState(null);
  const [posturl, setPostUrl] = useState(null);
  const state = useContext(UserContext);
  const navigate = useNavigate();
  function handleEditorChange(content, editor) {
    setContent(content);
  }

  const Postsend = () => {
    if (!title || !content || !banner || !posturl) {
      state.setToastMsg("Та мэдээллээ бүрэн бөглөнө үү");
    } else {
      const post = {
        Title: title,
        Banner: banner,
        content: content,
        url: posturl,
        category: category.value,
      };
      createPost(state.token, post)
        .then((res) => {
          state.setToastMsg("Мэдээллийг амжилттай илгээлээ. ");
          navigate("/", { replace: true });
        })
        .catch((err) => {
          state.setToastMsg(
            "Пост илгээх явцад алдаа гарлаа" + err.response.data.message
          );
        });
    }
  };

  useState(() => {
    getCategory()
      .then((res) => {
        res.data.data.map((el) =>
          setCategories((oldArray) => [
            ...oldArray,
            { label: el.Name, value: el._id },
          ])
        );
      })
      .catch((err) => console.log(err));
  }, []);
  if (categories) {
    console.log(categories);
  }
  return (
    <>
      {categories && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-wrap -mx-3 mb-6 justify-between">
            <div className="w-full px-3 my-2">
              <input
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-50 rounded shadow"
                placeholder="Enter blog title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-1/3 px-3 my-2 z-10">
              <Select
                value={category}
                options={categories}
                placeholder="Select category..."
                onChange={(el) => setCategory(el)}
                required
              />
            </div>
            <div className="w-1/3 px-3 my-2">
              <input
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-50 rounded shadow"
                placeholder="Enter the cover image path here."
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
              />
            </div>
            <div className="w-1/3 px-3 my-2">
              <input
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-50 rounded shadow"
                placeholder="Enter your link to read more"
                value={posturl}
                onChange={(e) => setPostUrl(e.target.value)}
              />
            </div>
            <div className="w-full p-3">
              <Editor
                apiKey="7i1nph8bqytxrxnxy7m8tdiauos1lncx3gpcw7bgiz693hhm"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  placeholder: "Write your blog here...",
                  selector: "textarea#premiumskinsandicons-outside",
                  skin: "outside",
                  icons: "small",

                  plugins:
                    "preview casechange importcss tinydrive searchreplace autolink autosave directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample nonbreaking advlist lists checklist wordcount tinymcespellchecker  pageembed mentions quickbars linkchecker emoticons autocorrect",
                  toolbar:
                    "undo redo |emoticons insertfile image media pageembed link codesample | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat  | fullscreen  preview",
                  font_size_formats:
                    "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
                  codesample_languages: [
                    { text: "HTML/XML", value: "markup" },
                    { text: "JavaScript", value: "javascript" },
                    { text: "CSS", value: "css" },
                    { text: "Python", value: "python" },
                    { text: "Java", value: "java" },
                    { text: "C", value: "c" },
                    { text: "C#", value: "csharp" },
                    { text: "C++", value: "cpp" },
                  ],
                  menubar: false,
                  statusbar: false,
                  height: 500,
                  image_advtab: true,
                }}
                onEditorChange={handleEditorChange}
              />
              <button
                onClick={Postsend}
                className={` mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
