import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";

const EditComponent = () => {
  const { slug } = useParams();
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });
  const { title, author } = state;

  const [content, setContent] = useState("");
  const submitContent = (e) => {
    setContent(e);
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/blog/" + slug)
      .then((response) => {
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(
        process.env.REACT_APP_API + "/blog/" + slug,
        { title, content, author },
        {
          headers: {
            authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((response) => {
        //alert("Create Data Success");
        Swal.fire("Success!", "Update Data Success!", "success");
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => {
        //alert(err.response.data.error);
        Swal.fire("Error!", err.response.data.error, "error");
      });
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>EDIT BLOG</h1>
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
        <input type="submit" value="UPDATE" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default EditComponent;
