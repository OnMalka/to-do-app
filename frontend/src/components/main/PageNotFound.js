import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
      <div className='not-found-div'>
            <div>404: Page not found</div>  
            <Link to='/tasks'>
                  Back to your tasks
            </Link>
      </div>
);

export default PageNotFound;