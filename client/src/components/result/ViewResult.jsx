import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import Loading from "../loading/Loading";
import { isAdmin } from "../../utils/roleChecks";
// import { useFilter } from "src/customHooks";
import Pagination from "../pagination/index";
import { useFilter } from "../../customHooks";
import './viewResult.css'
import { axiosRequest } from "src/utils/axiosRequest";
// import Pagination from "src/components/pagination/";


function ViewResult() {
 

  const DEFAULT_TERM = "all";
  const DEFAULT_YEAR = "all";
  const DEFAULT_NAME = "all";

  const [paginationInfo, setPaginationInfo] = useState(null);

 
  // This ensures i reset the page No when updating the filters
  


  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('')
  const [sessions, setSessions] = useState([])
  
  
  const { role } = useSelector((state) => state.auth);
  
  const location = useLocation();
  const [term, setTerm] = useState('')
  const [year, setYear] = useState('')
  const [currentSession, setCurrentSession] = useState('')

  const { updateFilter, filter } = useFilter(
    location.pathname, // could also be hardcoded
    {
      term: DEFAULT_TERM,
      year: DEFAULT_YEAR,
      name: DEFAULT_NAME
    }
    );
    
    const { page, ...filterObj } = filter;
    
  useEffect(() => {
    if (isAdmin(role)) {
      const getSessions = async () => {
        setLoading(true);
        const res = await axiosRequest.get('/session/all/session');
        setSessions(res.data.sessions);
        setLoading(false);
      };
      getSessions();
    }
  }, [role]);

  useEffect(()=>{
    setYear(filterObj.year)
    setTerm(filterObj.term)
    setName(filterObj.name)
  },[filterObj])


  useEffect(() => {
    const query = new URLSearchParams({
      ...filter,
      ...(page && { page }),
    });

    // if (role === "superuser" || role === "teacher") {
    if (isAdmin(role)) {
      const getResults = async () => {
        setLoad(true);
        const { data } = await axiosRequest.get(`/result`, { params: query });
        const { results, pagination, recentYear } = data;
        setCurrentSession(recentYear)

        setResults(results);
        setPaginationInfo(pagination);
        setLoad(false);
      };
      getResults();
    }
  }, [role, filter, page]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(term || year || name){
      updateFilter({
        ...filterObj,
        term,
        year,
        name
      });
      console.log(term, year, name)
    }
     const rebase = ()=>{
       setTerm('')
       setYear('')
       setName('')
      //  updateFilter({
      //    term: '',
      //    year: '',
      //    name: '',
      //  })
     }
     rebase()
  }

  const deleteItem = async (id) => {
    try {
      setResults(results.filter((s) => s.id !== id));
      await axiosRequest.delete(`/result/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // if (isStudent(role)) return <h1>You are not allowed to view this page</h1>;

  return (
    <>
    {loading || load ? <h1 className="loading-text">
      <Loading />
    </h1> : 
    <div className="dashboard">
      <form className="filterForm" onSubmit={handleSubmit}>
        <select
          value={term}
          name='term'
          onChange={(e) => {
            updateFilter({
              ...filterObj,
              term: e.target.value,
            });
            // setTerm(e.target.value)
          }}
        >
          <option value={DEFAULT_TERM}>All terms</option>
          {/* <option value={''}>All terms</option> */}
          <option value="first">first</option>
          <option value="second">second term</option>
          <option value="third">third term</option>
        </select>
        <select
          value={year}
          name='year'
          onChange={(e) => {
            setCurrentSession(e.target.value)
            updateFilter({
              ...filterObj,
              year: e.target.value,
            });
            // setYear(e.target.value)
          }}
        >
          <option value={DEFAULT_YEAR}>Default Session</option>
          {
            sessions.map(session => (
              <option key={session._id} value={session?.year}>{session?.year + "/" + Number(session?.year + 1)}</option>
            ))
          }
        </select>
       
        <input type="text" 
          onChange={(e) => {
            if(e.target.value.length < 4) return
            updateFilter({
              ...filterObj,
              name: e.target.value,
            });
            // setName(e.target.value)
          }}

          value={name}
          placeholder='Enter Name...'
          name='name'
        />
        {/* <button type="submit">Search</button> */}
        <span style={{fontSize: 12}}>Session: {currentSession}</span>
      </form>
          <h1 className="dashboardBodyHeading">All Results</h1>
          {results.length > 0 ?
          <>
          <table className="viewClassTable">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Student</th>
                <th>Session</th>
                {role === "teacher" && <th>Class</th>}
                <th>Term</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => {
                const zeroToOneIndex = idx + 1;
                const serialNo = zeroToOneIndex + paginationInfo?.startIndex;

                return (
                  <tr key={result?._id}>
                    <td>{serialNo}</td>
                    <td>{result?.student?.firstName}</td>
                    <td>
                      {result?.session?.year}/{result?.session?.year + 1}
                    </td>
                    {role === "teacher" && <td>{result.student.class.name}</td>}
                    <td>{result?.term}</td>
                    <td>
                      <Link to={`/viewResult/${result?._id}`}>
                        <button>
                          <EditOutlined className="edit-btn" />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => deleteItem(result?._id)}>
                        <DeleteOutlined className="del-btn" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
         
      {paginationInfo && <Pagination {...paginationInfo} />}
      </>
      :  <h1 style={{ textAlign: "center", fontSize: "45px", color: "gray" }}>
                     No Result Found
           </h1>
    }
      <Link className="viewClassLink" to="/createResult">
        Create Result
      </Link>
    </div>
    }
    </>
  );
}

export default ViewResult;
