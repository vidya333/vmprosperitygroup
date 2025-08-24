import React, { useState, useMemo, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { getStoredUser, isAdminUser } from '../utils/auth';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(() => getStoredUser());
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = useMemo(() => isAdminUser(user), [user]);

  const onLoginSuccess = (u) => setUser(u);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        className={`shadow-sm py-0 fixed-top ${scrolled ? 'scrolled' : 'bg-fade'}`}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="bg-transparent my-0 py-0">
            {/* logo */}
            <img src='./images/vmlogo.png' width={66} height={66} alt='vm-logo' className='bg-transparent'/>
            <span className='fw-semilight' style={{color:'#dfb83bff'}}>VM Prosperity Group</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav " />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={scrolled ? 'text-dark' : 'text-light'}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Home
              </Nav.Link>
              <Nav.Link
              as={Link}
                to="/about-us"
                className={scrolled ? 'text-dark' : 'text-light'}
              >
                About Us
              </Nav.Link>
              <Nav.Link
              as={Link}
                to="/gallery"
                className={scrolled ? 'text-dark' : 'text-light'}
              >
                Gallery
              </Nav.Link>
              <Nav.Link
                href="#contact"
                className={scrolled ? 'text-dark' : 'text-light'}
              >
                Contact
              </Nav.Link>

              {isAdmin && (
                <button
                  className={`standard-btn px-3 py-1 rounded ms-2 ${scrolled ? 'text-dark border-dark' : 'text-white'}`}
                  onClick={() => navigate('/add-property')}
                >
                  Dashboard
                </button>
              )}

              {user ? (
                <button className="btn btn-outline-danger ms-2" onClick={logout}>
                  Logout
                </button>
              ) : (
                <button
                  className={`btn standard-btn ms-2 ${scrolled ? 'btn-dark' : ''}`}
                  onClick={() => setShowAuth(true)}
                >
                  Login
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal
        show={showAuth}
        onClose={() => setShowAuth(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </>
  );
};

export default Header;
