import '../features.css';
import planeWindow from '../images/window.jpg';
import greenWindow from '../images/windowGREEN.jpg'

function Features() {

  const handleSubmit = (event) => {
    window.confirm("Your message has been sent to the Operation Alkemi Team!");
  }

    return (
        <>
 
        <section id="pricing" className="pricing">
      <div className="container">

      <div className="section-header mt-5">
          <span>Memberships</span>
          <h2>Memberships</h2>
      </div>

        <div className="row gy-4">

          <div className="col-lg-4">
            <div className="pricing-item">
              <h3>Free Plan</h3>
              <h4><sup>$</sup>0<span> / month</span></h4>
              <ul>
                <li><i className="bi bi-check"></i> 10 Trips</li>
                <li><i className="bi bi-check"></i> 50 Pins</li>
                <li className="na"><i className="bi bi-x"></i> <span>View Trips and Pins on the Map</span></li>
              </ul>
            </div>
          </div> 

          <div className="col-lg-4" data-aos-delay="200">
            <div className="pricing-item featured">
              <h3>Premium Plan</h3>
              <h4><sup>$</sup>10<span> / month</span></h4>
              <ul>
                <li><i className="bi bi-check"></i> Unlimited Trips</li>
                <li><i className="bi bi-check"></i> Unlimited Pins</li>
                <li><i className="bi bi-check"></i> <span>View Trips and Pins on the Map</span></li>
              </ul>
              <a href="/upgrade" className="btn btn-primary">Upgrade Now</a>
            </div>
          </div>

          <div className="col-12 offset-1 col-lg-4 offset-lg-0">
          <img src={greenWindow} className="img-fluid window" alt="Travel" />
          </div>

        </div>

      </div>
    </section>

    {/* <!-- ======= Contact Section ======= --> */}
    <section id="contact" className="contact">
      <div className="container">

      <div className="section-header mt-5">
          <span>Contact Us</span>
          <h2>Contact Us</h2>
      </div>

        {/* If we want to have a Google Maps location? */}
        {/* <div>
          <iframe style="border:0; width: 100%; height: 340px;" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" allowfullscreen></iframe>
        </div> */}

        <div className="row gy-4 mb-5">

          <div className="col-lg-4">

            <div className="info-item d-flex">
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h4>Location:</h4>
                <p>1234 Smith St, Milwaukee WI 53201</p>
              </div>
            </div>

            <div className="info-item d-flex">
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h4>Email:</h4>
                <p>fiftyGO@OperationAlkemi.com</p>
              </div>
            </div>

            <div className="info-item d-flex">
              <i className="bi bi-phone flex-shrink-0"></i>
              <div>
                <h4>Call:</h4>
                <p>+1 (123) 456 7890</p>
              </div>
            </div>

          </div>

          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
         <div className="form-group mt-3">
           <label htmlFor="contactName">Your Name:</label>
           <input id="contactName" name="contactName" type="text" className="form-control"/>
         </div>
         <div className="form-group mt-3">
           <label htmlFor="contactEmail">Email:</label>
           <input id="contactEmail" name="contactEmail" type="email" className="form-control"/>
         </div>
         <div className="form-group mt-3">
           <label htmlFor="contactSubject">Subject</label>
           <input id="contactSubject" name="contactSubject" type="text" className="form-control"/>
         </div>
         <div className="form-group mt-3">
           <label htmlFor="contactMessage">Message:</label>
           <textarea className="form-control" name="message" rows="5" ></textarea>
         </div>
         <div className="mt-4">
           <button className="btn btn-primary mr-2" type="submit">
             <i className="bi bi-file-earmark-check"></i>Submit
           </button>
         </div>
       </form>

          </div>
        </div>
      </div>
    </section>


        </>
    )
}

export default Features;