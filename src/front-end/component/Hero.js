import img1 from '../img/hero-img-1.png';
import img2 from '../img/hero-img-1.png';
function Hero() {
    const image1 = [img1];
    const image2 = [img2];
    return (
        <div>
            {/* <!-- Hero Start --> */}
            <div className="container-fluid py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-secondary">100% Natural Vitamin C++</h4>
                            <h1 className="mb-5 display-3 text-primary">I WILL MAKE YOU HEALTHY LIKE A BUFFALO</h1>
                            {/* <div className="position-relative mx-auto">
                            <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search"/>
                            <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ top: 0, right: '25%' }}>Submit Now</button>
                        </div> */}
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <img src="https://i.pinimg.com/564x/0f/18/9a/0f189affa0460678be412c190bf9c4ea.jpg" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Hero End --> */}
        </div>
    );
}

export default Hero;