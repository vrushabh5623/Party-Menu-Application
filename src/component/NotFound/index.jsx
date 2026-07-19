import { Link } from 'react-router-dom';
import './index.css'

const NotFound = () =>{
  return(
    <div className='notfound-bg'>
      <h1 className='not-found-head'>404</h1>
      <h1 className='not-found-head2'>Page Not Found</h1>
      <p className='not-found-para'>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="link">
        <button className='not-found-btn'>
          Back to Menu
        </button>
      </Link>
    </div>
  )
}
export default NotFound;