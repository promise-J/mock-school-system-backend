import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../pagination/Pagination";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import Loading from "../loading/Loading";
import { isAdmin } from "../../utils/roleChecks";
import {useNotify} from '../../customHooks'

function ViewStudent() {
  const notify = useNotify()
  const [students, setStudents] = useState([]);
  const { role } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);
  const pages = new Array(noOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `/users/all/students?page=${pageNumber}`
      );
      const { students, totalPages } = data;
      setNoOfPages(totalPages);
      setStudents(students);
      setLoading(false);
    };
    if (isAdmin(role)) {
      getStudents();
    }
  }, [pageNumber, role]);

  const prevPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const nextPage = () => {
    setPageNumber(Math.min(noOfPages - 1, pageNumber + 1));
  };

  const deleteItem = async (id) => {
    setStudents(students.filter((s) => s.id !== id));
    notify('success', 'Delete Successful')
    try {
      await axios.delete(`/users/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <h1 className="loading-text">
        <Loading />
      </h1>
    );

  return (
    <div className="dashboard">
      {isAdmin(role) ? (
        <>
          {students?.length > 0 ? (
            <>
              <h1 className="dashboardBodyHeading">All Registered Students</h1>
              <table className="viewClassTable">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>STUDENTS</th>
                    <th>CLASS</th>
                    <th>Login ID</th>
                    <th>CODE</th>
                    <th>-</th>
                    <th>-</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, idx) => (
                    <tr key={s?._id}>
                      <td>{idx + 1 + pageNumber * 7}</td>
                      <td>
                        {s?.firstName} {s?.lastName}
                      </td>
                      <td>{s?.class?.name}</td>
                      <td>{s?.loginID}</td>
                      <td>{s?.class?.code}</td>
                      <td>
                        <Link to={`/createUser/${s?._id}`}>
                          <button>
                            <EditOutlined className='edit-btn' />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => deleteItem(s._id)}>
                          <DeleteOutlined className="del-btn" />
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
              No Student Found
            </h1>
          )}

          <Link className="viewClassLink" to="/createUser">
            Register Student
          </Link>
          {students?.length > 0 && (
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
      ) : (
        <h1>You are not allowed to view this</h1>
      )}
    </div>
  );
}

export default ViewStudent;
