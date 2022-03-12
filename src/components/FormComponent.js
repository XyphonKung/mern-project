import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken, getUser } from "../services/authorize";

const FormComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });
  const { title, author } = state;
  const [content, setContent] = useState("");

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const submitContent = (e) => {
    setContent(e);
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API + "/create",
        { title, content, author },
        {
          headers: {
            authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((response) => {
        //alert("Create Data Success");
        Swal.fire("Success!", "Create Data Success!", "success");
        setState({ ...state, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        //alert(err.response.data.error);
        Swal.fire("Error!", err.response.data.error, "error");
      });
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>ADD BLOG</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-5 mb-3"
            placeholder="description"
            style={{ border: "1px solid #666" }}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            className="form-control"
            type="text"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <input type="submit" value="SUBMIT" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default FormComponent;
