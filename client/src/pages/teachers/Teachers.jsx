import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
// import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import { useSelector } from "react-redux";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import Loading from "../../components/loading/Loading";
import { axiosRequest } from "src/utils/axiosRequest";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  const { role } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [cb, setCb] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);
  const pages = new Array(noOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    const getTeachers = async () => {
      setLoading(true);
      const { data } = await axiosRequest.get(
        `/users/all/teachers?page=${pageNumber}`
      );
      const { teachers, totalPages } = data;
      setNoOfPages(totalPages);
      setTeachers(teachers);
      setLoading(false);
    };
    if (role === "superuser") {
      getTeachers();
    }
  }, [pageNumber, cb, role]);

  const prevPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const nextPage = () => {
    setPageNumber(Math.min(noOfPages - 1, pageNumber + 1));
  };

  const deleteItem = async (id) => {
    try {
      await axiosRequest.delete(`/users/${id}`);
      setTeachers(teachers.filter((s) => s.id !== id));
      setCb(!cb);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {loading ? (
        <h1 className="loading-text">
          <Loading />
        </h1>
      ) : (
        <div className="dashboard" style={{ padding: "0 40px" }}>
          <>
            {teachers.length > 0 ? (
              <>
                <h1 className="dashboardBodyHeading">
                  All Registered Teachers
                </h1>
                <table className="viewClassTable">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>NAME</th>
                      <th>CLASS</th>
                      <th>Login ID</th>
                      <th>-</th>
                      <th>-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((s, idx) => (
                      <tr key={s?._id}>
                        <td>{idx + 1 + pageNumber * 7}</td>
                        <td>
                          {s?.firstName} {s?.lastName}
                        </td>
                        <td>{s?.class ? s?.class?.name : "None"}</td>
                        <td>{s?.loginID}</td>
                        <td>
                          <Link to={`/createUser/${s?._id}`}>
                            <button>
                              <EditOutlined className='edit-btn' />
                            </button>
                          </Link>
                        </td>
                        <td>
                          <button onClick={() => deleteItem(s._id)}>
                            <DeleteOutline className="del-btn" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <h1
                style={{ textAlign: "center", fontSize: "45px", color: "gray" }}
              >
                No Teacher Found
              </h1>
            )}

            <Link className="viewClassLink" to="/createUser">
              Register Teacher
            </Link>
            {teachers.length > 0 && (
              <Pagination
                noOfPages={noOfPages}
                prevPage={prevPage}
                nextPage={nextPage}
                pageNumber={pageNumber}
                pages={pages}
                setPageNumber={setPageNumber}
              />
            )}
          </>
        </div>
      )}
    </Layout>
  );
};

export default Teachers;
