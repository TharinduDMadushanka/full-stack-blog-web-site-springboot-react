import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate(); // Use navigate hook

  return (
    <div className='nav'>
      <div className="nav-logo">TDM</div>

      <ul className="nav-menu">
        {/* Wrapping navigation call inside an anonymous function */}
        {/* <li onClick={() => navigate('/')}>Home</li>
        <li onClick={()=> navigate('/tech')}>Technology</li>
        <li>Science</li>
        <li onClick={() => navigate('/travel')}>Travel</li>
        <li>Entertainment</li>
        <li>About me</li> */}
        <li className='nav-contact' onClick={navigate('/user-login')}>Get Started</li>
      </ul>
    </div>
  );
}

export default Navbar;
