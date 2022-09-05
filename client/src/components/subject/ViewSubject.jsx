import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import Pagination from "../pagination/Pagination";

function ViewSubject() {
  const [subjects, setSubjects] = useState([]);

  const { role } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);
  const pages = new Array(noOfPages).fill(null).map((s, i) => i);

  useEffect(() => {
    const getSubjects = async () => {
      setLoading(true);
      const { data } = await axios.get(`/subject?page=${pageNumber}`);
      const { totalPages, subjects } = data;
      setSubjects(subjects);
      setNoOfPages(totalPages);
      setLoading(false);
    };
    getSubjects();
  }, [pageNumber]);

  const deleteItem = async (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
    try {
      await axios.delete(`/subject/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const prevPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const nextPage = () => {
    setPageNumber(Math.min(noOfPages - 1, pageNumber + 1));
  };

  //   if(subjects.length<=0) return <h1 style={{textAlign: 'center', fontSize: '45px', color: 'gray'}}>No Subject Found</h1>

  if (loading)
    return (
      <h1 className="loading-text">
        <Loading />
      </h1>
    );
  return (
    <div className="dashboard" style={{ padding: "0 40px" }}>
      {subjects?.length > 0 ? (
        <>
          {" "}
          <h1
            style={{ textAlign: "center", fontWeight: "lighter" }}
            className="dashboardBodyHeading"
          >
            ALL CLASS SUBJECTS
          </h1>
          <table className="viewClassTable">
            <thead>
              <tr>
                <th>S/N</th>
                <th>SUBJECTS</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, idx) => (
                <tr key={subject._id}>
                  <td>{idx + 1 + pageNumber * 7}</td>
                  <td>{subject.name}</td>
                  <td>
                    <Link to={`/createSubject/${subject._id}`}>
                      <button>
                        <EditOutlined className='edit-btn' />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      disabled={role !== "superuser"}
                      onClick={() => deleteItem(subject._id)}
                    >
                      <DeleteOutlined className='del-btn' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "45px", color: "gray" }}>
          No Subject Found
        </h1>
      )}
      <Link className="viewClassLink" to="/createSubject">
        Create Subject
      </Link>
      {subjects?.length > 0 && (
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

export default ViewSubject;
