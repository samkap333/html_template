import{useNavigate} from 'react-router-dom';
import { useEffect,useState} from 'react';
import React from 'react';
import { useAuth } from './Authcontext';


function Sidebar(){
    const [userType, setUserType] = useState(null);
    const { isAuthenticated,logout } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated) {
          
            const loggedInUserRole = localStorage.getItem('loggedInUserRole');
            setUserType(loggedInUserRole);
        }
      }, [isAuthenticated]);


   
      const handleLogout = () => {
        localStorage.removeItem('token');
        logout();

        navigate('/login');
      };

    if (!isAuthenticated) {
        return (
          <div>
            
          </div>
        );
      }
    

      return (
        <>
            {isAuthenticated ? (
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="/">
                            <span className="align-middle">AdminKit</span>
                        </a>
    
                        <ul className="sidebar-nav">
                            <li className="sidebar-item">
                                <a className="sidebar-link" onClick={() => navigate('/dashboard')}>
                                    <i className="align-middle" data-feather="sliders"></i>
                                    <span className="align-middle">Dashboard</span>
                                </a>
                            </li>
    
                            {userType === 'admin' && (
                                <React.Fragment>
                                    <li className="sidebar-item">
                                        <a className="sidebar-link" onClick={() => navigate('/profile')}>
                                            <i className="align-middle" data-feather="user"></i>
                                            <span className="align-middle">Profile</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a className="sidebar-link" onClick={() => navigate('/users')}>
                                            <i className="align-middle" data-feather="user"></i>
                                            <span className="align-middle">Users</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a className="sidebar-link" onClick={() => navigate('/loanoffer')}>
                                            <i className="align-middle" data-feather="log-in"></i>
                                            <span className="align-middle">Create Loan Offers</span>
                                        </a>
                                    </li>
    
                                </React.Fragment>
                            )}
    
                            {userType === 'user' && (
                                <li className="sidebar-item">
                                    <a className="sidebar-link" onClick={() => navigate('/loanoffer')}>
                                        <i className="align-middle" data-feather="log-in"></i>
                                        <span className="align-middle">Create Loan Offers</span>
                                    </a>
                                </li>
                            )}
                            <li className="sidebar-item">
                                <a className="sidebar-link" onClick={() => navigate('/post')}>
                                    <i className="align-middle" data-feather="sliders"></i>
                                    <span className="align-middle">Create a post</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" onClick={() => navigate('/viewpost')}>
                                    <i className="align-middle" data-feather="sliders"></i>
                                    <span className="align-middle">All post</span>
                                </a>
                            </li>
    
                            <li className="sidebar-item">
                                <a className="sidebar-link" onClick={() => navigate('/loanactivity')}>
                                    <i className="align-middle" data-feather="user-plus"></i>
                                    <span className="align-middle">Loan Activity</span>
                                </a>
                            </li>
                        </ul>
    
                        <div className="sidebar-cta">
                            <li className="sidebar-item" onClick={handleLogout}>
                                <a className="sidebar-link">
                                    <i className="align-middle" data-feather="bar-chart-2"></i>
                                    <span className="align-middle">Logout</span>
                                </a>
                            </li>
                        </div>
                    </div>
                </nav>
            ) : (
                    <div></div>
                )
            }
        </>
    );
        }    

export default Sidebar;
