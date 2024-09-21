import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "../assets/footer_links";
import { FOOTER_CONTACT_INFO } from "../assets/footer_contact";
import { RiInstagramFill } from "react-icons/ri";
import {FaFacebookF , FaTiktok}  from 'react-icons/fa'


const socialLinks = [
  {
    url: "https://www.facebook.com",
    icon: <FaFacebookF />,
  },
  {
    url: "https://www.instagram.com/corebasics.eg?igsh=MTE2OHJubmdsbDBzaw%3D%2D&utm_source=qr",
    icon: <RiInstagramFill />,
  },
  {
    url: "https://www.tiktok.com/@corebasics.eg?_t=8lTNz8C62uU&_r=1",
    icon: <FaTiktok />,
  },
];

const Footer = () => {
  return (
    <footer className="flexCenter pb-24 pt-5">
      <div className="max_padd_container flex w-full flex-col gap-14">
        <div className="flex flex-col items-start gap-[10%] md:flex-row">
          <Link to="/" className="mb-10 bold-20 ">
            Core Basics
          </Link>
        </div>
        <div className="flex flex-wrap gap-8 sm:justify-between md:flex-1">
          {FOOTER_LINKS.map((col) => (
            <FooterColumn title={col.title} key={col.title}>
              <ul className="flex flex-col gap-4 regular-14 text-gray-20">
                {col.links.map((link) => (
                  <Link to="/" key={link}>
                    {link}
                  </Link>
                ))}
              </ul>
            </FooterColumn>
          ))}
          <div className="flex flex-col gap-5 ">
            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              {FOOTER_CONTACT_INFO.links.map((link) => (
                <Link
                  to="/"
                  key={link.label}
                  className="flex gap-4 md:flex-col lg:flex-row"
                >
                  <p>{link.label}:</p> <p>{link.value}</p>
                </Link>
              ))}
            </FooterColumn>
          </div>
          <div className="flex">
            <FooterColumn>
              <ul className="flex gap-4 ">
                {socialLinks.map((link) => (
                  <Link to={link.url} key={link.url} target="_blank" className="bold-22">
                    {link.icon}
                  </Link>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>
        <div className="border bg-gray-20"></div>
        <p className="text-center text-gray-30 regular-14">
          2024 Core Basics | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// eslint-disable-next-line react/prop-types
const FooterColumn = ({ title, children }) => {
  return (
    <div className="flex flex-col gap -5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
