import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import './TestimonialCarousel.css'

const testimonials = [
  {
    name: "Prashant",
    feedback:
      "Truly to the name, Very Reliable & truly dependable. One can be rest assured that you will be hand held right across the entire process & deal with utter transparency & honesty. Had the opportunity to deal with Virendrasingh Deshmukh & was truly satisfied with the support provided. He is very responsive & prompt in replies & clearing your queries. I strongly recommend his services for all real estate transactions. You will skip his shop as it is not on the ground floor so one will not get it but his excellent services ensures that he gets clients from word of mouth advertising & references from earlier clients. Strong recommendation 💪!! And the search ends with him. Thank you Mr Deshmukh for the support!",
    rating:"⭐⭐⭐⭐⭐"
  },
  {
    name: "Shailesh Kulkarni",
    feedback:
      "Truly to the name Reliable and truly dependable. One can trust Mr Deshmukh for hassle free dealings. He is having very good knowledge in this space of real estate dealings. He gave me a lot of support even after the deal was done even though it was not in his scope. I would recommend Deshmukh Saheb if you want to do any Buy/Sell transactions in Nandedcity.",
    rating:"⭐⭐⭐⭐⭐"
  },
  {
    name: "Siddhi Hegishte",
    feedback:
      "We bought a flat in Nanded City through 'Reliable Deals Real Estate' services. As per the name they are very Reliable and dependable. We had an opportunity to deal with Mr. Virendrasingh Deshmukh and we were very satisfied with the service and support provided. He is very responsive and a honest person. Strongly recommended for your real estate needs and deals. Thank you Mr. Deshmukh for all your support and guidance throughout our deal! 🙏🏻",
    rating:"⭐⭐⭐⭐⭐"
  },
  {
    name: "Sukhada Bakshi",
    feedback:"We had very good experience for our residential property deal with Mr Deshmukh, all document work and formalities were taken care by him only. As owner was not in pune coordination also was required regarding bank loan and NOC etc. He is quite understanding and considerate of the client needs and situation and thats the best thing. Would like to thank him for the support throughout. If you are looking for some property deal you can truly be 'Reliable' on Deshmukh sir.",
    rating:"⭐⭐⭐⭐⭐"
  },
  {
    name: "Anita & Rajesh Kulkarni ",
    feedback:'"VM Prosperity Group made the entire buying process smooth and stress-free. They were honest, clear, and genuinely cared about our needs."',
    rating:"“Professional & Transparent” "
  },
  {
    name: "Sanjay Patwardhan",
    feedback:'"With their guidance, I invested in a plot that doubled in value in just 3 years. I couldn’t be happier with the outcome!"',
    rating:"“Best Investment Decision” "
  },
  {
    name: "Priya Nair",
    feedback:' "From day one, I felt I was dealing with people I could trust. They kept every promise and delivered beyond expectations."',
    rating:"“Trustworthy & Reliable”"
  },

];

export default function TestimonialCarousel() {
  return (
    <div className=" py-5 testimonial">

      <h2 className="text-center my-5 text-white">What Our Clients Say</h2>
      
      <div
        id="testimonialCarousel"
        className="carousel slide mx-2 h-50"
        data-bs-ride="carousel"
        data-bs-interval="4000" 
      >
        <div className="carousel-inner my-auto">
          {testimonials.map((item, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="d-flex justify-content-center">
                <div className="card p-4 shadow" style={{ maxWidth: "600px",maxHeight:"400px" }}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="mx-auto text-center">
                      <h5 className="mb-0">{item.name}</h5>
                      <p className="text-muted fw-bold ">{item.rating}</p>
                    </div>
                  </div>
                  <p className="mb-0 fst-italic fw-normal text-muted">"{item.feedback}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

            <div className="">
            <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide="prev"
                    >
                    <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button
                    className="carousel-control-next text-dark"
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide="next"
                    >
                    <span className="carousel-control-next-icon"></span>
                    </button>
            </div>
       
      </div>

    </div>
  );
}
