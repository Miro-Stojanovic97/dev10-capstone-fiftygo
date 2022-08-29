import '../home.css';
import mkeViews from '../images/HomePage-IMG.jpg';

//Was trying something that would make our stats cycle from 0
//up to the number as a visual but I gave up quickly.
    // let PureCounter = new PureCounter(); 
//I wasnt entirely sure how the Logis project example does it in regards to accessing the PureCounter
//The only reason to keep the stats in a <span/> is to get this visual to work, otherwise lets change it
//to something thats easier to edit since it's overlapping in a weird way.

//TODO: Format the divs and padding/margins properly so the page looks nice, while not 
//interfering with the header/footer positions.



//TODO: See TODO on line 9 of home.css. Footer is acting up


function Home() {
    return (
        <>
           
            <main id="homeMain">


                <section id="about" className="about">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-6 position-relative align-self-start order-lg-last order-first">
                                <img src={mkeViews} className="img-fluid" alt="Travel_Milwaukee" />
                            </div>
                            <div className="col-lg-6 content order-last order-lg-first">
                                <h3>About Us</h3>
                                <p>
                                Carefully crafted by a team of fresh developers with a fresh vision for travel. 
                                FiftyGO is your favorite travel journal and travel companion all in one. No matter where you've been, where you want to go, or what you want to do; FiftyGO will help you to get there. An Operation Alkemi product. 
                                </p>
                                <ul>
                                    <li data-aos="fade-up" data-aos-delay="100">
                                        <i className="bi bi-diagram-3"></i>
                                        <div>
                                            <h5>For Adventurers, By Adventurers</h5>
                                            <p>Pins allow you to precisely craft your adventures!</p>
                                        </div>
                                    </li>
                                    <li data-aos="fade-up" data-aos-delay="200">
                                        <i className="bi bi-fullscreen-exit"></i>
                                        <div>
                                            <h5>Blah blah</h5>
                                            <p>Blah Blah</p>
                                        </div>
                                    </li>
                                    <li data-aos="fade-up" data-aos-delay="300">
                                        <i className="bi bi-broadcast"></i>
                                        <div>
                                            <h5>Blah Blah</h5>
                                            <p>Blah Blah</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="stats-counter" className="stats-counter pt-0">
                    <div className="container" data-aos="fade-up">

                        <div className="row gy-4">

                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <span id="span-one" data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span>
                                    <p>Number of Users</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <span id="span-two" data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter"></span>
                                    <p>Pins Placed</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <span id="span-three" data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="1" className="purecounter"></span>
                                    <p>Trips Completed</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="stats-item text-center w-100 h-100">
                                    <span id="span-four" data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1" className="purecounter"></span>
                                    <p>Google Rating</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
                <section id="team" className="team pt-0">
                    <div className="container" data-aos="fade-up">

                        <div className="section-header">
                            <span>Our Team</span>
                            <h2>Our Team</h2>

                        </div>

                        <div className="row" data-aos="fade-up" data-aos-delay="100">

                            <div className="col-lg-4 col-md-6 d-flex">
                                <div className="member">
                                    <img src="assets/img/team/team-1.jpg" className="img-fluid" alt="" />
                                    <div className="member-content">
                                        <h4>Kelie Berendt</h4>
                                        <span>Full-Stack Developer</span>
                                        <p>
                                            Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 d-flex">
                                <div className="member">
                                    <img src="assets/img/team/team-2.jpg" className="img-fluid" alt="" />
                                    <div className="member-content">
                                        <h4>Allison Geiger</h4>
                                        <span>Full-Stack Developer</span>
                                        <p>
                                            Repellat fugiat adipisci nemo illum nesciunt voluptas repellendus. In architecto rerum rerum temporibus
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 d-flex">
                                <div className="member">
                                    <img src="assets/img/team/team-3.jpg" className="img-fluid" alt="" />
                                    <div className="member-content">
                                        <h4>Miro Stojanovic</h4>
                                        <span>Full-Stack Developer</span>
                                        <p>
                                            Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>


                <section id="testimonials" className="testimonials">
                    <div className="container">
                        <div className="slides-1 swiper" data-aos="fade-up">
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        {/* <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img" alt="" /> */}
                                        <h3>Dario Fanta</h3>
                                        <h4>FiftyGo user since July 2022</h4>
                                        <p>
                                            <i className="bi bi-quote quote-icon-left"></i>
                                            "I don't know what I'd do without FiftyGO! They've changed the way I think of traveling."
                                            <i className="bi bi-quote quote-icon-right"></i>
                                        </p>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        {/* <img src="assets/img/testimonials/testimonials-2.jpg" className="testimonial-img" alt="" /> */}
                                        <h3>Sara Wilsson</h3>
                                        <h4>FiftyGO user since March 2022</h4>
                                        <p>
                                            <i className="bi bi-quote quote-icon-left"></i>
                                        "When I first downloaded FiftyGO, I had been to seven states. Now I've doubled it."
                                            <i className="bi bi-quote quote-icon-right"></i>
                                        </p>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        {/* <img src="assets/img/testimonials/testimonials-3.jpg" className="testimonial-img" alt="" /> */}
                                        <h3>Jena Karlis</h3>
                                        <h4>FiftyGO user since June 2022</h4>
                                        <p>
                                            <i className="bi bi-quote quote-icon-left"></i>
                                            "It's like combining my Pinterest with my travel Excel spreadsheets. I'm addicted!"
                                            <i className="bi bi-quote quote-icon-right"></i>
                                        </p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </section>


                <section id="faq" className="faq">
                    <div className="container" data-aos="fade-up">
                        <div className="section-header">
                            <span>Frequently Asked Questions</span>
                            <h2>Frequently Asked Questions</h2>
                        </div>

                        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="200">
                            <div className="col-lg-10">

                                <div className="accordion accordion-flush" id="faqlist">

                                    <div className="accordion-item">
                                        <h3 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-1">
                                                <i className="bi bi-question-circle question-icon"></i>
                                                What is a Pin?
                                            </button>
                                        </h3>
                                        <div id="faq-content-1" className="accordion-collapse collapse" data-bs-parent="#faqlist">
                                            <div className="accordion-body">
                                                A pin is any activity you'd like to do, in a city you'd like to travel to. Just like putting red pins on a map, you can put your pins on ours!
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h3 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-2">
                                                <i className="bi bi-question-circle question-icon"></i>
                                                 What is the difference between a Trip and a Pin?
                                            </button>
                                        </h3>
                                        <div id="faq-content-2" className="accordion-collapse collapse" data-bs-parent="#faqlist">
                                            <div className="accordion-body">
                                                Simple, and glad you asked :). A pin is one activity, in one location (hopefully of your dreams). A trip is a collection of pins that you can plan. Some users prefer to use FiftyGO mainly to keep track of Pins, while some users use the app to plan Trips. We're here to help! 
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="accordion-item">
                                        <h3 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-3">
                                                <i className="bi bi-question-circle question-icon"></i>
                                                How much does it cost?
                                            </button>
                                        </h3>
                                        <div id="faq-content-3" className="accordion-collapse collapse" data-bs-parent="#faqlist">
                                            <div className="accordion-body">
                                                Our app is completely free for most users! For some users who prefer to have more than 50pins and 10 trips at one time, we do offer Premium access for only $10 per month.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h3 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-4">
                                                <i className="bi bi-question-circle question-icon"></i>
                                                What is MapView?
                                            </button>
                                        </h3>
                                        <div id="faq-content-4" className="accordion-collapse collapse" data-bs-parent="#faqlist">
                                            <div className="accordion-body">
                                                MapView is our cutting-edge travel planning map that allows you to physically see your Pins and Trips on the U.S. map! Users say this helps them visualize and plan their travels, and makes the process fun for them.  
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h3 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-5">
                                                <i className="bi bi-question-circle question-icon"></i>
                                                What is in future development for the application?
                                            </button>
                                        </h3>
                                        <div id="faq-content-5" className="accordion-collapse collapse" data-bs-parent="#faqlist">
                                            <div className="accordion-body">
                                                <i className="bi bi-question-circle question-icon"></i>
                                                FiftyGo's mission is to connect the world via travel, one Pin at a time. That mission requires that we expand to iOS and Android, and eventually expand our MapView and database features to include the entire world. 
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;