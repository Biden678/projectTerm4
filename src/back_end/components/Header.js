import React from 'react';
import '../assets/css/styles.min.css';

function Header(props) {

    return (
        <div> 

            <header class="app-header">
                <nav class="navbar navbar-expand-lg navbar-light">
                   
                    <div class="px-0" id="navbarNav">
                        
                        <ul className="navbar-nav flex-row ms-auto align-items-center">
                            <li className="nav-item dropdown">
                                <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <img src="https://i.pinimg.com/564x/eb/df/f1/ebdff1c41a3597fd4b98f5c7c04bdd3f.jpg" alt="" width="35" height="35" className="rounded-circle" />
                                </a>
                                {/* <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                    <div className="message-body">
                                        <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="ti ti-user fs-6"></i>
                                            <p className="mb-0 fs-3">My Profile</p>
                                        </a>
                                        <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="ti ti-mail fs-6"></i>
                                            <p className="mb-0 fs-3">My Account</p>
                                        </a>
                                        <a href="javascript:void(0)" className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="ti ti-list-check fs-6"></i>
                                            <p className="mb-0 fs-3">My Task</p>
                                        </a>
                                        <a href="./authentication-login.html" className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</a>
                                        <a href="/loginAdminPage" className="btn btn-outline-success mx-3 mt-2 d-block">Login</a>
                                    </div>
                                </div> */}
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            
        </div>
    );
}

export default Header;