import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

const SingleComponent = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/blog/" + slug)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [slug]);
  return (
      <div className="container p-5">
          <NavbarComponent/>
          <h1>{blog.title}</h1>
          <p dangerouslySetInnerHTML={{__html:blog.content}}></p>
          <p className="text-muted">Author: {blog.author}, Create: {new Date(blog.createdAt).toLocaleString()}</p>
      </div>
  )
};
export default SingleComponent;
