import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ tasksCounter })=>{

    return(
        <div className='header'>
            <NavLink to='/tasks' className={(navData) => navData.isActive ? 'active-nav' : ''}>Task List App</NavLink>
            <span>Tasks : { tasksCounter }</span>
        </div>
    )
};

export default Header;