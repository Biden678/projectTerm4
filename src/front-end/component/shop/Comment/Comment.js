function Comment() {

    return (

        <div>
            <form action="#">
                <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="border-bottom rounded">
                            <input type="text" className="form-control border-0 me-4" placeholder="Yur Name *" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="border-bottom rounded">
                            <input type="email" className="form-control border-0" placeholder="Your Email *" />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="border-bottom rounded my-4">
                            <textarea name="" id="" className="form-control border-0" cols="30" rows="8" placeholder="Your Review *" spellcheck="false"></textarea>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-between py-3 mb-5">
                            <div className="d-flex align-items-center">
                                <p className="mb-0 me-3">Please rate:</p>
                                <div className="d-flex align-items-center" style={{ fontSize: '12px' }}>
                                    <i className="fa fa-star text-muted"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                            <a href="#" className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</a>
                        </div>
                    </div>
                </div>
            </form>

            <div>
                <div className="d-flex">
                    <div style={{ width: '101%' }}>
                        <p className="mb-2" style={{ fontSize: '14px' }}>April 12, 2024</p>
                        <div className="d-flex justify-content-between">
                            <h5>Jason Smith</h5>
                            <div className="d-flex mb-3">
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star"></i>
                            </div>
                        </div>
                        <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                            words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                    </div>
                </div>
                <div className="d-flex">
                    <div style={{ width: '101%' }}>
                        <p className="mb-2" style={{ fontSize: '14px' }}>April 12, 2024</p>
                        <div className="d-flex justify-content-between">
                            <h5>Sam Peters</h5>
                            <div className="d-flex mb-3">
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                        </div>
                        <p className="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                            words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                    </div>
                </div>
            </div>
            <div className="tab-pane" id="nav-vision" role="tabpanel">
                <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                    amet diam et eos labore. 3</p>
                <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                    Clita erat ipsum et lorem et sit</p>
            </div>

        </div>

    );

}

export default Comment;