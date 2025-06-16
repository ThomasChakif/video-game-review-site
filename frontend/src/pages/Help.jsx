import * as React from 'react';
import AppHeader from "../components/AppHeader";
import '../styles/Help.css'



function Help () {

    const submitForm = async (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        const form = event.target;
        const name = form.name.value;
        const subject = form.subject.value;
        const phone = form.phoneNumber.value;
        const email = form.email.value;
        const message = form.message.value;
    
        fetch("https://formsubmit.co/ajax/thomaschakif3@gmail.com", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, subject, message })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Form submitted successfully:", data);
            alert("Thank you! Your message has been sent.");
            form.reset(); // Reset the form after successful submission
        })
        .catch(error => {
            console.error("Error submitting form:", error);
            alert("There was an issue submitting the form. Please try again.");
        });
    }

    return(
        <div>
            <AppHeader />
            <div classname="formContainer">
                <h1 className="aboutHeader">Contact Us</h1>
                <p className="aboutInfo">Fill out the form below to get in contact with us!</p>
                <form id='contact' onSubmit={submitForm}>
                    <h3 className="contactFormHeader">Name<span className="asterisk">*</span></h3>
                    <fieldset>
                        <input type="text" name="name" className="form-control" placeholder="Your Name" required/>
                    </fieldset>
                    <h3 className="contactFormHeader">Email<span className="asterisk">*</span></h3>
                    <fieldset>
                        <input type="email" name="email" className="form-control" placeholder="Your Email Address" required/>
                    </fieldset>
                    <h3 className="contactFormHeader">Phone Number</h3>
                    <fieldset>
                        <input type="tel" name="phoneNumber" className="form-control" placeholder="Your Phone Number (optional)"/>
                    </fieldset>
                    <h3 className="contactFormHeader">Subject<span className="asterisk">*</span></h3>
                    <fieldset>
                        <input type="text" name="subject" className="form-control" placeholder="Subject" required/>
                    </fieldset>
                    <h3 className="contactFormHeader">Your Message<span className="asterisk">*</span></h3>
                    <fieldset>
                        <textarea placeholder="Type your message here..." className="form-control" name="message" rows="10" required></textarea>
                    </fieldset>
                    <div className="centerButton">
                        <fieldset>
                            <button type="submit" className="btn btn-lg btn-dark btn-block">Submit Form</button>
                        </fieldset>
                    </div>
                    <h3 className="contactFormFooter">* indicates a required field</h3>
                </form>
            </div>
        </div>
    )
}

export default Help