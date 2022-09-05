import { Check, Clear, DeleteOutline } from '@material-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Loading from '../../components/loading/Loading';
import Pagination from '../../components/pagination/Pagination';
import './scratch.css'

const ViewScratchCard = () => {
  const [noOfPages, setNoOfPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [scratchs, setScratchs] = useState([])
  const [loading, setLoading] = useState(false)

  // const { user } = useSelector((state) => state.auth);


  useEffect(()=>{
    const getScratch = async()=>{
      setLoading(true)
      const res = await axios.get(`/scratch?page=${pageNumber}`)
      setScratchs(res.data.cards)
      setNoOfPages(res.data.totalPages)
      setLoading(false)
    }
    getScratch()
  },[pageNumber])

  const pages = new Array(noOfPages).fill(null).map((s, i) => i);

  const prevPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const nextPage = () => {
    setPageNumber(Math.min(noOfPages - 1, pageNumber + 1));
  };

  const deleteCard = async(id)=>{
      setScratchs(scratchs.filter(s=> s.id !== id))
      try {
          await axios.delete(`/scratch/${id}`)
        } catch (error) {
        console.log(error)
    }
  }

  return <Layout>
  <div className='requestScratchCard'>

    { loading ? <Loading /> :
    <div className="content">
    <Link style={{border: '1px solid gray', margin: '10px', padding: 2, fontSize: 11}} to='/requestCard'>Purchase Cards!</Link>
    <h1>View Scratch Card</h1>
    { scratchs?.length > 0 &&  <>
        <table>
            <thead>
            <tr>
                <th>S. No.</th>
                <th>No of count</th>
                <th>Available</th>
                <th>Issued to</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {
                scratchs?.map(s=>(
                <tr key={s?._id}>
                    <td>{s?.card}</td>
                    <td style={{color: s?.usageCount > 1 ? 'red': 'green', fontWeight: 600}}>{s?.usageCount}</td>
                    <td style={{textDecoration: s?.usageCount>=1 && 'line-through', color: s?.usageCount >=1 && 'gray', fontWeight: 600}}>{s?.usageCount >= 1 ?
                     <Clear style={{color: 'red', fontWeight: 600, transition: 'all 1s ease-in-out', animation: 'scalar 2s infinite'}} />: 
                    <Check style={{color: 'green', fontWeight: 600}} />}</td>
                    <td>{s?.result?.student?.loginID}</td>
                    <td><DeleteOutline className='del-btn' onClick={()=> deleteCard(s.id)} /></td>
                </tr>
                ))
            }
            </tbody>
        </table>
        <Pagination
          noOfPages={noOfPages}
          prevPage={prevPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
          pages={pages}
          setPageNumber={setPageNumber}
        />
         </>
        //  : <p>There is no scratch card available</p>
         }
    </div>
    }
  </div>
  </Layout>;
};

export default ViewScratchCard;
