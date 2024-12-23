import React from 'react'
import './Footer.css'
import user_icon from '../../assets/home/user_icon.svg'
import linkedin from '../../assets/home/linkedin.png'
import github from '../../assets/home/github.png'
import instagram_icon from '../../assets/home/instagram_icon.png'
import facebook_icon from '../../assets/home/facebook_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        
        <div className="footer-top">
            <div className="footer-top-left">
                <h1>TDM</h1>
                <p>
                  I’m excited to keep growing, sharing and learning in this ever-evolving various fields like technology, science ect. 
                  Stay connected for future updates.
                </p>
            </div>

            <div className="footer-top-right">
                <div className="footer-email-input">
                    <img src={user_icon} alt="" />
                    <input type="email" placeholder='Enter your email'/>
                </div>
                <div className="footer-subscribe">Subscribe</div>
            </div>
        </div>
        <hr />

        <div className="footer-icons">
            <a href="https://web.facebook.com/tharindu.dmadushanka" target='_blank'><img src={facebook_icon} alt="" /></a>
            <a href="https://www.instagram.com/tharindud_madushanka/" target='_blank'><img src={instagram_icon} alt="" /></a>
            <a href="https://github.com/TharinduDMadushanka" target='_blank'><img src={github} alt="" /></a>
            <a href="https://www.linkedin.com/in/tharindu-d-madushanaka-94a958306/" target='_blank'><img src={linkedin} alt="" /></a>
        </div>

        <p className='copyright-text'>@ 2024 Tharindu Madushanka. All rights reserved.</p>

    </div>
  )
}

export default Footer
