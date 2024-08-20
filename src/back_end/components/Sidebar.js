import React, { useContext, useEffect } from 'react';
import '../assets/css/styles.min.css';
import '../assets/css/icons/tabler-icons/fonts/tabler-icons.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Sidebar(props) {
    const { logoutAdmin } = useContext(AuthContext)

    const navigate = useNavigate();
    useEffect(() => {
        const admin = JSON.parse(sessionStorage.getItem("admin"));
        if (!admin) {
            navigate('/loginadmin');  // Use absolute path to navigate to login

        }
    }, []);

    return (
        <div>
            {/* <!-- Sidebar Start --> */}
            <aside className="left-sidebar">
                {/* <!-- Sidebar scroll--> */}
                <div>
                    <div className="brand-logo d-flex align-items-center justify-content-between">
                        <div className="close-btn d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                            <h1>Elixir AD</h1>
                        </div>
                    </div>
                    {/* <!-- Sidebar navigation--> */}
                    <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Home</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/homeAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-layout-dashboard"></i>
                                    </span>
                                    <span className="hide-menu">Dashboard</span>
                                </Link>
                            </li>


                            <hr />



                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Products</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/categoryAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-category"></i>
                                    </span>
                                    <span className="hide-menu">Category</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/whoUseAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-user-check"></i>
                                    </span>
                                    <span className="hide-menu">Who Use</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/countryAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-language"></i>
                                    </span>
                                    <span className="hide-menu">Country</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/prescribeAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-clipboard-heart"></i>
                                    </span>
                                    <span className="hide-menu">Prescribe</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/brandAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-brand-zeit"></i>
                                    </span>
                                    <span className="hide-menu">Brand</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/productAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-medical-cross"></i>
                                    </span>
                                    <span className="hide-menu">Products</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/orderAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti">&#xec4b;</i>
                                    </span>
                                    <span className="hide-menu">Orders</span>
                                </Link>
                            </li>

                            <hr />




                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Account</span>
                            </li>


                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/manageuser" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-user nav-small-cap-icon fs-4"></i>
                                    </span>
                                    <span className="hide-menu">User</span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/manageadmin" aria-expanded="false">
                                    <span>
                                        <i className="ti nav-small-cap-icon fs-4">&#xea02;</i>
                                    </span>
                                    <span className="hide-menu">Admin</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/managecontact" aria-expanded="false">
                                    <span>
                                        <i className="fa-regular fa-message"></i>
                                    </span>
                                    <span className="hide-menu">Contact</span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/manageforbiddenword" aria-expanded="false">
                                    <span>
                                        <i className="fa-regular fa-message"></i>
                                    </span>
                                    <span className="hide-menu">Forbidden word</span>
                                </Link>
                            </li>

                            {/* ly */}

                            <hr />

                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Blog</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/typeAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-cards"></i>
                                    </span>
                                    <span className="hide-menu">Blog Type</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/blogAdminPage" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-alert-circle"></i>
                                    </span>
                                    <span className="hide-menu">Blog</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/cmtAdminPage" aria-expanded="false">
                                    <span>
                                        <i class="fa fa-comment" ></i>
                                    </span>
                                    <span className="hide-menu">Comment</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/wordAdminPage" aria-expanded="false">
                                    <span>
                                        <i class="fa fa-ban" ></i>
                                    </span>
                                    <span className="hide-menu">Forbidden Word</span>
                                </Link>
                            </li>
                            {/* nhi */}
                            <hr />
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Health</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/topicAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti">&#xed76;</i>
                                    </span>
                                    <span className="hide-menu">Topic</span>
                                </Link>
                            </li>
                            {/* <li className="sidebar-item">
                                <Link className="sidebar-link" to="/questionAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-question"></i>
                                    </span>
                                    <span className="hide-menu">Question</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/answerAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-answer"></i>
                                    </span>
                                    <span className="hide-menu">Answer</span>
                                </Link>
                            </li> */}
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/resultAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti">&#xeecb;</i>
                                    </span>
                                    <span className="hide-menu">Result</span>
                                </Link>
                            </li>


                            <hr />

                            {/* <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">About Us</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/areaAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-mood-happy"></i>
                                    </span>
                                    <span className="hide-menu">Areas</span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/companyAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-aperture"></i>
                                    </span>
                                    <span className="hide-menu">Company Addresses</span>
                                </Link>
                            </li>

                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/expense" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-aperture"></i>
                                    </span>
                                    <span className="hide-menu">Expense</span>
                                </Link>
                            </li>

                            <hr />




                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">WPA</span>
                            </li>
                            <li className="sidebar-item">
                                <Link className="sidebar-link" to="/warrantyPolicyAdmin" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-file-description"></i>
                                    </span>
                                    <span className="hide-menu">Warranty Policy  </span>
                                </Link>
                            </li>*/}

                            <button className="btn btn-outline-primary d-block" style={{ width: '100%' }} onClick={logoutAdmin}>Logout</button>

                        </ul>


                        <br />
                        <br />
                    </nav>
                    {/* <!-- End Sidebar navigation --> */}
                </div>
                {/* <!-- End Sidebar scroll--> */}
            </aside>
            {/* <!--  Sidebar End --> */}
        </div>
    );
}

export default Sidebar;