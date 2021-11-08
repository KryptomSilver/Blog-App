import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface IProps {
  body: string;
  setBody: (value: string) => void;
}
const LiteQuill: React.FC<IProps> = ({ setBody, body }) => {
  const modules = {
    toolbar: [
      [{ font: [] }],

      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "align",
    "color",
    "background",
    "link",
    "clean",
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        value={body}
      />
    </div>
  );
};

export default LiteQuill;
