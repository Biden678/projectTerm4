import React from 'react';
import '../../css/about/aboutUs.css';

const AboutUs = () => (
  <div>
    <BannerAbout />
    <div className="bg-white py-5">
      <div className="container py-5">
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 order-2 order-lg-1">
            <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
            <h2 className="font-weight-light">All your Medicine needs in one place</h2>
            <p className="font-italic text-muted mb-4">
              <div class="div-33">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7ab3ff0078491ad2cfa36d6465e566ceb6d6744bad7b268a969c05f7e9fd9d9?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-8"
                />
                <div class="div-34">Search and find all kind of drugs</div>
              </div>
              <div class="div-35">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7ab3ff0078491ad2cfa36d6465e566ceb6d6744bad7b268a969c05f7e9fd9d9?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-9"
                />
                <div class="div-36">We have drugs for soecial case treatments</div>
              </div>
              <div class="div-37">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7ab3ff0078491ad2cfa36d6465e566ceb6d6744bad7b268a969c05f7e9fd9d9?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-10"
                />
                <div class="div-38">Get notified when your drug is available</div>
              </div>
            </p>
            <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
          </div>
          <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
            <img
              loading="lazy"
              srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/921353f8eb9484433b3b0b2949fb72f0dc34bca631d2c39be0230142c00da36b?apiKey=8990ebece86d4b28a19261f078704439&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/921353f8eb9484433b3b0b2949fb72f0dc34bca631d2c39be0230142c00da36b?apiKey=8990ebece86d4b28a19261f078704439&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/921353f8eb9484433b3b0b2949fb72f0dc34bca631d2c39be0230142c00da36b?apiKey=8990ebece86d4b28a19261f078704439&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/921353f8eb9484433b3b0b2949fb72f0dc34bca631d2c39be0230142c00da36b?apiKey=8990ebece86d4b28a19261f078704439&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/921353f8eb9484433b3b0b2949fb72f0dc34bca631d2c39be0230142c00da36b?apiKey=8990ebece86d4b28a19261f078704439&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/921353f8eb9484433b3b0b2949fb72f0dc34bca631d2c39be0230142c00da36b?apiKey=8990ebece86d4b28a19261f078704439&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/921353f8eb9484433b3b0b2949fb72f0dc34bca631d2c39be0230142c00da36b?apiKey=8990ebece86d4b28a19261f078704439&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/921353f8eb9484433b3b0b2949fb72f0dc34bca631d2c39be0230142c00da36b?apiKey=8990ebece86d4b28a19261f078704439&"
              class="img-12"
              className="img-fluid mb-4 mb-lg-0"
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-5 px-5 mx-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c982e7474271e8e0a3ef929d31a9817b3ee56b3e9db8ff05cc6119335cd51d3?apiKey=8990ebece86d4b28a19261f078704439&"
              class="img-13"
              className="img-fluid mb-4 mb-lg-0"
            />
          </div>
          <div className="col-lg-6">
            {/* <i className="fa fa-leaf fa-2x mb-3 text-primary"></i> */}
            <h2 className="font-weight-light">Get your drugs at your doorstep</h2>
            <p className="font-italic text-muted mb-4">
              <div class="div-45">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/07ec41f974de3717e7347a6e1bfda197d7f38715995abc686e0c09eb6fc18297?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-14"
                />
                <div class="div-46">Get straigh delivery to your doorstep</div>
              </div>
              <div class="div-47">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/07ec41f974de3717e7347a6e1bfda197d7f38715995abc686e0c09eb6fc18297?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-15"
                />
                <div class="div-48">We deliver within 24hrs of request</div>
              </div>
              <div class="div-49">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/07ec41f974de3717e7347a6e1bfda197d7f38715995abc686e0c09eb6fc18297?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-16"
                />
                <div class="div-50">We guarantee speedily response</div>
              </div>
            </p>
            <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-lg-6 order-2 order-lg-1">
            <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
            <h2 className="font-weight-light">Set up your profile and get refill easily</h2>
            <p className="font-italic text-muted mb-4">
              <div class="div-57">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8593e855a630d420b44ab1031e4d2111a0557050ed5d7292157178562a331f9c?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-18"
                />
                <div class="div-58">
                  When you are a member your refill is easier
                </div>
              </div>
              <div class="div-59">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8593e855a630d420b44ab1031e4d2111a0557050ed5d7292157178562a331f9c?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-19"
                />
                <div class="div-60">
                  With one click your medicine is on it’s way
                </div>
              </div>
              <div class="div-61">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8593e855a630d420b44ab1031e4d2111a0557050ed5d7292157178562a331f9c?apiKey=8990ebece86d4b28a19261f078704439&"
                  class="img-20"
                />
                <div class="div-62">Select a health care specialist</div>
              </div>
            </p>
            <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
          </div>
          <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/668f4d3dafc726a0c68e69e979614f25c2cfafd8369d0bc265bca414d233e4bc?apiKey=8990ebece86d4b28a19261f078704439&"
              class="img-12"
              className="img-fluid mb-4 mb-lg-0"
            />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-5 px-5 mx-auto">
            <img
              loading="lazy"
              srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a63005ad5e37a1a9911934cb1c508bf213386979e8c88bae72134298da526748?apiKey=8990ebece86d4b28a19261f078704439&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a63005ad5e37a1a9911934cb1c508bf213386979e8c88bae72134298da526748?apiKey=8990ebece86d4b28a19261f078704439&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a63005ad5e37a1a9911934cb1c508bf213386979e8c88bae72134298da526748?apiKey=8990ebece86d4b28a19261f078704439&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a63005ad5e37a1a9911934cb1c508bf213386979e8c88bae72134298da526748?apiKey=8990ebece86d4b28a19261f078704439&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a63005ad5e37a1a9911934cb1c508bf213386979e8c88bae72134298da526748?apiKey=8990ebece86d4b28a19261f078704439&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a63005ad5e37a1a9911934cb1c508bf213386979e8c88bae72134298da526748?apiKey=8990ebece86d4b28a19261f078704439&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a63005ad5e37a1a9911934cb1c508bf213386979e8c88bae72134298da526748?apiKey=8990ebece86d4b28a19261f078704439&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a63005ad5e37a1a9911934cb1c508bf213386979e8c88bae72134298da526748?apiKey=8990ebece86d4b28a19261f078704439&"
              class="img-13"
              className="img-fluid mb-4 mb-lg-0"
            />
          </div>
          <div className="col-lg-6">
            {/* <i className="fa fa-leaf fa-2x mb-3 text-primary"></i> */}
            <h2 className="font-weight-light">Get your drugs at your doorstep</h2>
            <p className="font-italic text-muted mb-4">
              <div class="div-68">What Our Clients Say</div>
              <div class="div-69"><div class="div-70"></div></div>
              <div class="div-71">
                “The ease of delivery is one that I depended on when I was bedriden
                and couldn’t even walk. Their services is awesome”
              </div>
              <div class="div-72">- Gerald Maldiliene</div>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-light py-5">
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-lg-5">
            <h2 className="display-4 font-weight-light">Our team</h2>
            <p className="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="row text-center">
          <TeamMember
            name="Manuella Nevoresky"
            title="CEO - Founder"
            image="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png"
          />
          <TeamMember
            name="Samuel Hardy"
            title="CEO - Founder"
            image="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png"
          />
          <TeamMember
            name="Tom Sunderland"
            title="CEO - Founder"
            image="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png"
          />
          <TeamMember
            name="John Tarly"
            title="CEO - Founder"
            image="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png"
          />
        </div>
      </div>
    </div>
  </div>
);

const BannerAbout = () => (
  <div className="banner" style={{ marginTop: '4%' }}>
    <div className="banner-content">
      <h2>About Us<span>.</span></h2>
    </div>
  </div>
);

const TeamMember = ({ name, title, image }) => (
  <div className="col-xl-3 col-sm-6 mb-5">
    <div className="bg-white rounded shadow-sm py-5 px-4">
      <img src={image} alt={name} width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
      <h5 className="mb-0">{name}</h5>
      <span className="small text-uppercase text-muted">{title}</span>
      <ul className="social mb-0 list-inline mt-3">
        <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
        <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
        <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
        <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
      </ul>
    </div>
  </div>
);

export default AboutUs;
