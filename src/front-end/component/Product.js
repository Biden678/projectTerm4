function Product() {
    return (
        <div>
            {/* <!-- Vesitable Shop Start--> */}
            <div className="container-fluid vesitable py-5">
                <div className="container py-5">
                    <h1 className="mb-0">Fresh Organic Vegetables</h1>
                    <div className="owl-carousel vegetable-carousel justify-content-center row">
                    <div className="border border-primary rounded position-relative vesitable-item col-3">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ position: 'absolute', top: '10px', right: '10px' }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border border-primary rounded position-relative vesitable-item col-3">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ position: 'absolute', top: '10px', right: '10px' }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border border-primary rounded position-relative vesitable-item col-3">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ position: 'absolute', top: '10px', right: '10px' }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border border-primary rounded position-relative vesitable-item col-3">
                            <div className="vesitable-img">
                                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                            </div>
                            <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ position: 'absolute', top: '10px', right: '10px' }}>Vegetable</div>
                            <div className="p-4 rounded-bottom">
                                <h4>Parsely</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                    <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Vesitable Shop End --> */}
        </div>
    );
}

export default Product;