import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken, getUser } from "./services/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);
  const fetctData = () => {
    axios
      .get(process.env.REACT_APP_API + "/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetctData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Delete Data?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };
  const deleteBlog = (slug) => {
    //send request to api for delete data
    axios
      .delete(process.env.REACT_APP_API + "/blog/" + slug,
      {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      }
      )
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fetctData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={"/blog/" + blog.slug}>
              <h2>{blog.title}</h2>
            </Link>
            <p dangerouslySetInnerHTML={{__html:blog.content.substring(0, 180)}}></p>
            <p className="text-muted">
              Author: {blog.author}, Create:{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
            {getUser() && (
            <div>
              <Link className="btn btn-outline-success" to={'blog/edit/'+blog.slug}>EDIT</Link> &nbsp;
              <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>DELETE</button>
            </div>
            )}       
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
