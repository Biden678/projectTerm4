import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

function Header() {
    const { logout } = useContext(AuthContext)
    const user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();
    // const [cartNumsLength, setCartNumsLength] = useState(0);
    // useEffect(() => {
    //     async function handleCartsByCusId() {
    //         if (user) {
    //             try {
    //                 const response = await axios.get(`http://localhost:9999/api/carts/${user?.cus_id}`);
    //                 if (response.status === 200) {
    //                     setCartNumsLength(response.data.length); // Set the length of cartNums
    //                 }
    //             } catch (error) {
    //                 console.log("Something went wrong:", error);
    //             }
    //         }
    //     }
    //     handleCartsByCusId();
    // }, []);

    return (
        <div>
            {/* <!-- Spinner Start --> */}
            {/* <div id="spinner" className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
            <div className="spinner-grow text-primary" role="status"></div>
        </div> */}
            {/* <!-- Spinner End --> */}


            {/* <!-- Navbar start --> */}
            <div className="container-fluid fixed-top">
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3">{user?.email ? <> <i className="fas fa-envelope me-2 text-secondary"></i><a className="text-white">{user?.email}</a></> : ''}</small>
                        </div>
                        <div className="top-link pe-2">
                            {user ?
                                (
                                    <>
                                        <button onClick={logout} className="text-white mx-2">Logout</button>

                                    </>
                                ) :
                                (
                                    <>
                                        <a href="/login" className="text-white"><small className="">Login</small>/</a>
                                        <a href="/register" className="text-white"><small className="text-white mx-2">Register</small></a>
                                    </>
                                )}


                        </div>
                    </div>
                </div>

                {user ? (
                    <>
                        <div className="container px-0">
                            <nav className="navbar navbar-light bg-white navbar-expand-xl">
                                <a onClick={() => navigate('/')} className="navbar-brand"><h1 className="text-primary display-6">Elixir</h1></a>
                                <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                    <span className="fa fa-bars text-primary"></span>
                                </button>
                                <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                                    <div className="navbar-nav mx-auto">
                                        <a onClick={() => navigate('/')} className="nav-item nav-link active">Home</a>
                                        <a onClick={() => navigate('/shop')} className="nav-item nav-link">Shop</a>
                                        <a onClick={() => navigate('/blog')} className="nav-item nav-link">Blog</a>
                                        <a onClick={() => navigate('/contact')} className="nav-item nav-link">Contact</a>
                                        <div className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>

                                            <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                                {/* <a href="cart.html" className="dropdown-item">Cart</a> */}
                                                <button className="dropdown-item" onClick={() => navigate('/forgetpass')}>Cart</button>
                                                <a href="chackout.html" className="dropdown-item">Chackout</a>
                                                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                                <a href="404.html" className="dropdown-item">404 Page</a>
                                            </div>
                                        </div>
                                        <a href="contact.html" className="nav-item nav-link">Contact</a>
                                    </div>
                                    <div className="d-flex m-3 me-0">
                                        <a href="/cart" className="position-relative me-4 my-auto">
                                            <i class="fa fa-shopping-cart fa-2x"></i>
                                            {/* <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: '15px', height: '20px', minWidth: '20px' }}>{cartNumsLength}</span> */}
                                        </a>



                                        {/* <div className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                                {user.email}

                                            </a>
                                            <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                                <a href="cart.html" className="dropdown-item">Cart</a>
                                                <a href="chackout.html" className="dropdown-item">Chackout</a>
                                                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                                <a href="404.html" className="dropdown-item">404 Page</a>
                                            </div>
                                        </div> */}
                                        <a href="/order" className="position-relative me-4 my-auto">
                                            <i className="fa fa-shopping-bag fa-2x"></i>
                                        </a>
                                        <div className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                            <i class="fa fa-user fa-2x" ></i>
                                            </a>
                                            <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                                {/* <a href="cart.html" className="dropdown-item">Cart</a>
                                        <a href="chackout.html" className="dropdown-item">Chackout</a>
                                        <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                        <a href="404.html" className="dropdown-item">404 Page</a> */}
                                                {/* <a href="cart.html" className="dropdown-item">Cart</a> */}
                                                <button className="dropdown-item" onClick={() => navigate('/changepass')}>Change Password</button>
                                                <button className="dropdown-item" onClick={() => navigate('/information')}>View Your Information</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </nav>
                        </div>
                    </>)
                    :
                    (
                        <>
                            <div className="container px-0">
                                <nav className="navbar navbar-light bg-white navbar-expand-xl">
                                    <a href="/" className="navbar-brand"><h1 className="text-primary display-6">Elixir</h1></a>
                                    <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                        <span className="fa fa-bars text-primary"></span>
                                    </button>
                                    <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                                        <div className="navbar-nav mx-auto">
                                            <a href="/" className="nav-item nav-link active">Home</a>
                                            <a href="shop" className="nav-item nav-link">Shop</a>
                                            <a onClick={() => navigate('/blog')} className="nav-item nav-link">Blog</a>
                                            <a onClick={() => navigate('/contact')} className="nav-item nav-link">Contact</a>
                                            <div className="nav-item dropdown">
                                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                                    {/* <a href="cart.html" className="dropdown-item">Cart</a> */}
                                                    <button className="dropdown-item" onClick={() => navigate('/forgetpass')}>Cart</button>
                                                    <a href="chackout.html" className="dropdown-item">Chackout</a>
                                                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                                    <a href="404.html" className="dropdown-item">404 Page</a>
                                                </div>
                                            </div>
                                            <a href="contact.html" className="nav-item nav-link">Contact</a>
                                        </div>
                                        <div className="d-flex m-3 me-0">
                                            <a href="/cart" className="position-relative me-4 my-auto">
                                                <i className="fa fa-shopping-bag fa-2x"></i>
                                            </a>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </>
                    )}

            </div>
            {/* <!-- Navbar End --> */}


            {/* <!-- Modal Search Start --> */}
            <div className="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                {/* modal-fullscreen */}
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal Search End --> */}
        </div>
    );
}

export default Header;