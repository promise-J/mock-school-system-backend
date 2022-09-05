import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import Pagination from "../pagination/Pagination";
import {useNotify} from '../../customHooks'
import { isPrincipal } from "src/utils/roleChecks";

function ViewSession() {
  const notify = useNotify()
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noOfPages, setNoOfPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const { role } = useSelector((state) => state.auth);

  const pages = new Array(noOfPages).fill(null).map((s, i) => i);
  // const history = useHistory()

  useEffect(() => {
    if (isPrincipal(role)) {
      const getSessions = async () => {
        setLoading(true);
        const res = await axios.get(`/session/all/session?page=${pageNumber}`);
        setSessions(res.data.sessions);
        setNoOfPages(res.data.totalPages);
        setLoading(false);
      };
      getSessions();
    }
  }, [pageNumber, role]);

  const prevPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const nextPage = () => {
    setPageNumber(Math.min(noOfPages - 1, pageNumber + 1));
  };
  const deleteItem = async (id) => {
    setSessions(sessions.filter(s=> s._id !== id))
    try {
      const res = await axios.delete(`/session/${id}`);
      notify('success', res.data)
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

  // if (role !== "superuser") return <h1>You are not allowed to view this</h1>;
  return (
    <div className="dashboard">
      {sessions?.length > 0 ? (
        <>
          <h1 className="dashboardBodyHeading">All Sessions</h1>
          <table className="viewClassTable">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Term</th>
                <th>SESSIONS</th>
                <th>-</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, idx) => (
                <tr key={session._id}>
                  <td>{idx + 1}</td>
                  <td>{session.currentTerm}</td>
                  <td>
                    {session.year}/{session.year + 1}
                  </td>
                  <td>
                    <Link to={`/createSession/${session._id}`}>
                      <button>
                        <EditOutlined className='edit-btn' />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => deleteItem(session._id)}>
                      <DeleteOutlined className="del-btn" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1>No Session Found</h1>
      )}
      <Link className="viewClassLink" to="/createSession">
        Create Session
      </Link>
      {sessions?.length > 0 && (
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

export default ViewSession;
