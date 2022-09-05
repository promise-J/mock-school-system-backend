import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNotify } from "src/customHooks";
import Loading from "../../loading/Loading";
import Pagination from "../../pagination/Pagination";

function ViewClass() {
  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);
  const { role } = useSelector((state) => state.auth);
  const pages = new Array(noOfPages).fill(null).map((s, i) => i);
  const { user } = useSelector((state) => state.auth);
  const notify = useNotify();

  useEffect(() => {
    const getClasses = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/class");

        const { totalPages, classes } = data;
        setAllClasses(classes);
        setNoOfPages(totalPages);
        setLoading(false);
        // console.log(res.data)
      } catch (error) {
        console.log(error, 'from the class get')
      }
    };
    getClasses();
  }, []);

  // SMACADY8ef7fa6dbec8-card, reg - 2021100001, third, 23/24

  const prevPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const nextPage = () => {
    setPageNumber(Math.min(noOfPages - 1, pageNumber + 1));
  };

  const deleteItem = async (id) => {
    try {
      setAllClasses(allClasses.filter((c) => c._id !== id));
      notify("success", "Deleted Successfully");
      await axios.delete(`/class/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <h1 className="loading-text">
      <Loading />
    </h1>
  ) : (
    <div className="dashboard">
      {allClasses?.length > 0 ? (
        <>
          <h1 className="dashboardBodyHeading">All Student Class</h1>

          <table className="viewClassTable">
            <thead>
              <tr>
                <th>Class</th>
                <th>Subjects Offered</th>
                <th>Class Code</th>
                {user.role === "superuser" && (
                  <>
                    <th>Edit</th>
                    <th>Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {allClasses.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.subjects.length}</td>
                  <td>{c.code}</td>
                  {user.role === "superuser" && (
                    <>
                      <td>
                        <Link
                          // disable={role!=='superuser'}
                          to={`/editClass/${c._id}`}
                        >
                          <button>
                            <EditOutlined className="edit-btn" />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          disabled={role !== "superuser"}
                          onClick={() => deleteItem(c._id)}
                        >
                          <DeleteOutlined className="del-btn" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "45px", color: "gray" }}>
          No Class Found
        </h1>
      )}
      {user?.role === "superuser" && (
        <Link className="viewClassLink" to="/createClass">
          Create Class
        </Link>
      )}
      {allClasses?.length > 0 && user.role === "superuser" && (
        <Pagination
          noOfPages={noOfPages}
          prevPage={prevPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
          pages={pages}
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
}

export default ViewClass;
