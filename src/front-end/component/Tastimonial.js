import { useState } from 'react';
import img1 from '../img/best-product-1.jpg';


function Tastimonial() {

    const image1 = [img1];

    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    };

    return (
        <div>



            <div id="demo" className="carousel slide p-5" data-bs-ride="carousel">


                {/* The slideshow/carousel */}

                <div className="carousel-inner">
                <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
                        <div className="testimonial-item img-border-radius bg-light rounded p-4">
                            <div className="position-relative">
                                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ position: 'fixed', bottom: '30px', right: '0' }}></i>
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    </p>
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img src={img1} className="img-fluid rounded" style={{ width: '100px', height: '100px' }} alt="" />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Mlem 1</h4>
                                        <p className="m-0 pb-3">Profession</p>
                                        <div className="d-flex pe-5">
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
                        <div className="testimonial-item img-border-radius bg-light rounded p-4">
                            <div className="position-relative">
                                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ position: 'fixed', bottom: '30px', right: '0' }}></i>
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    </p>
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img src={img1} className="img-fluid rounded" style={{ width: '100px', height: '100px' }} alt="" />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Mlem 2</h4>
                                        <p className="m-0 pb-3">Profession</p>
                                        <div className="d-flex pe-5">
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
                        <div className="testimonial-item img-border-radius bg-light rounded p-4">
                            <div className="position-relative">
                                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ position: 'fixed', bottom: '30px', right: '0' }}></i>
                                <div className="mb-4 pb-4 border-bottom border-secondary">
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    </p>
                                </div>
                                <div className="d-flex align-items-center flex-nowrap">
                                    <div className="bg-secondary rounded">
                                        <img src={img1} className="img-fluid rounded" style={{ width: '100px', height: '100px' }} alt="" />
                                    </div>
                                    <div className="ms-4 d-block">
                                        <h4 className="text-dark">Mlem 3</h4>
                                        <p className="m-0 pb-3">Profession</p>
                                        <div className="d-flex pe-5">
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                            <i className="fas fa-star text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Left and right controls/icons --> */}
                <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>

            </div>






        </div>
    );
}
export default Tastimonial;