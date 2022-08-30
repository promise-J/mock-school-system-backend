import { 
    CardGiftcard,
    Class,
    Feedback,
    Healing,
    Home, 
    Message, 
    PersonAdd, 
    Subject,
    TapAndPlay, 
}
 from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { isPrincipal } from '../../utils/roleChecks'
import './sidebar.css'



const Sidebar = () => {
    const { user, role } = useSelector((state) => state.auth);
    const loca = useLocation()

    const [location, setLocation] = useState('')

    useEffect(()=>{
      setLocation(loca.pathname.split('/')[1])
    },[loca.pathname])

    return (
        <div className='sidebar' scroll='no'>
            <div className="sidebarWrapper">
            {/* <h1 className='sidebarTitle'>{user?.user?.loginID}. </h1> */}
               {user && <div title={user?.user?.loginID} className="profile">{user?.user?.loginID[0]}</div>}
                <ul className="sidebarList">
                    <Link to='/dashboard' className='link'><li className={location==='dashboard' ? 'sidebarListItem active' : 'sidebarListItem'}><Home className='sidebarListItemIcon' /> Home</li></Link>
                    </ul>
                    <h1 className="sidebarTitle">Classes</h1>
                    <ul className="sidebarList">
                    <Link to='/viewClass' className='link'><li className={location==='viewClass' ? 'sidebarListItem active' : 'sidebarListItem'}><Class className='sidebarListItemIcon' /> Manage Classes</li></Link>
                    </ul>
                    <h1 className="sidebarTitle">Students</h1>
                    <ul className="sidebarList">
                    <Link to='/viewStudent' className='link'><li className={location==='viewStudent' ? 'sidebarListItem active' : 'sidebarListItem'}><PersonAdd className='sidebarListItemIcon' /> Manage Students</li></Link>
                    </ul>
                    {
                        isPrincipal(role)  && <>
                    <h1 className="sidebarTitle">Subjects</h1>
                    <ul className="sidebarList">
                    <Link to='/viewSubject' className='link'><li className={location==='viewSubject' ? 'sidebarListItem active' : 'sidebarListItem'}><Subject className='sidebarListItemIcon' /> Manage Subjects</li></Link>
                    </ul>
                    <h1 className="sidebarTitle">Teachers</h1>
                    <ul className="sidebarList">
                    <Link to='/viewTeachers' className='link'><li className={location==='viewTeachers' ? 'sidebarListItem active' : 'sidebarListItem'}><Healing className='sidebarListItemIcon' /> Manage Teachers</li></Link>
                    </ul>
                    </>
                    }

                    <h1 className="sidebarTitle">Results</h1>
                    <ul className="sidebarList">
                    <Link to='/viewResult' className='link'><li className={location==='viewResult' ? 'sidebarListItem active' : 'sidebarListItem'}><Feedback className='sidebarListItemIcon' /> Manage Results</li></Link>
                    </ul>
                    {isPrincipal(role) &&
                    <><h1 className="sidebarTitle">Sessions</h1>
                    <ul className="sidebarList">
                    <Link to='/viewSession' className='link'><li className={location==='viewSession' ? 'sidebarListItem active' : 'sidebarListItem'}><Home className='sidebarListItemIcon' /> Manage Sessions</li></Link>
                    </ul></>}
                <h1 className='sidebarTitle'>Admin Space</h1>
                <ul className="sidebarList">
                    {
                    isPrincipal(role) &&
                    <Link to='/adminPassword' className='link'>
                    <li className="sidebarListItem"><TapAndPlay className={location==='adminPassword' ? 'sidebarListItem active' : 'sidebarListItem'} /> Admin App Settings</li>
                    </Link>
                    }
                    <Link to='/staffMessage'>
                    <li className="sidebarListItem"><Message className={location==='staffMessage' ? 'sidebarListItem active' : 'sidebarListItem'} /> Messages</li>
                    </Link>
                    <Link to='/viewScratch'>
                    <li className="sidebarListItem"><CardGiftcard className={location==='viewScratch' ? 'sidebarListItem active' : 'sidebarListItem'} /> View Scratch Card</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
