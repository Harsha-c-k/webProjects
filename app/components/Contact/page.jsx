'use client'
import { useState } from 'react';
import NavBar from '../NavBar/page';
import Styles from '../../css/contact.module.css';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

   const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

   const isValidPhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/;  
    return phonePattern.test(phone);
  };

  const LoggedUsername = JSON.parse(localStorage.getItem("userData"))?.username || "guest";
  const LoggedEmail = JSON.parse(localStorage.getItem("userData"))?.email || "guest";
   
   const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!phone || !isValidPhone(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!message) {
      toast.warn("Please enter a message");
      return;
    }
  
     if (confirm("Ready to send the message?")) {
      try {
        const response = await axios.post('/api/contactUs', {
          email,
          phone,
          message,
          LoggedUsername,
          LoggedEmail
        });
  
        if (response.status === 200) {
          setEmail('');
          setPhone('');
          setMessage('');
          setIsChecked(false);  
          toast.success("Your message has been sent successfully!");
        }  
      } catch (err) {
        console.log(err);
        toast.error('An error occurred while sending your message.');
      }
    } else {
      toast.warn("Message not sent.");
    }
  };
  
  return (
    <>
      <div className={Styles.container}>
      <ToastContainer />
        <div className={Styles.main}>
          <NavBar />
          <div className={Styles.contact}>
            <div className={Styles.left}>
              <div>Get in touch</div>
             
              <div>
                Chat to us
                <p>Our friendly team is here to help</p>
                <p>
                  <a href="mailto:godrwt@gmail.com">hello.car@rent.com</a>
                </p>
              </div>
              <div>
                Call us
                <p>Mon - Fri from 8am - 5pm</p>
                <p>+91 9025305010</p>
              </div>
              <div>
                Social Media
                <p>
                  <Image
                    src="/svg/twitter.svg"
                    width={30}
                    height={30}
                    alt='Twitter'
                    onClick={() => window.open('https://x.com/IphoneRudy')}
                  />
                </p>
              </div>
            </div>

            <div className={Styles.right}>
              <div className={Styles.wrapper}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={Styles.betterOutline}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={Styles.betterOutline}
                />
              </div>
              <div className={Styles.message}>
                <div>Message</div>
                <textarea
                  placeholder="Tell us what we can help you with"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className={Styles.message} style={{ background: 'none', fontSize: '1.7dvh' }}>
                <p>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  &nbsp;I'd like to receive more information about the company. I understand and agree to the
                  Privacy Policy
                </p>
              </div>
              <div className={Styles.button}>
                <button onClick={handleSubmit}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
