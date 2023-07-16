import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footermenu = [
  { name: "About us", link: "/about-us" },
  { name: "Press", link: "/press" },
  { name: "Blog", link: "/blog" },
  { name: "Ios", link: "/ios" },
  { name: "Android", link: "/android" },
];

const SocialMedia = [
  { name: "Facebook", icon: <FaFacebook />, link: "www.facebook.com" },
  { name: "Twitter", icon: <FaTwitter />, link: "www.twitter.com" },
  { name: "TikTok", icon: <FaTiktok />, link: "www.tiktok.com" },
  { name: "Instagram", icon: <FaInstagram />, link: "www.instagram.com" },
];

// console.log(FaFacebook);
const Footer = () => {
  return (
    <footer className="flex justify-between relative w-full p-5 left-0 bottom-0">
      <ul className="flex gap-[4.7rem]">
        {Footermenu.map((item, idx) => (
          <li key={idx}>
            <NavLink to={item.link} className={"hover:text-venture-green-hovered"}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
      <ul className="flex gap-[1.4rem]">
        {SocialMedia.map((item, idx) => (
          <li key={idx}>
            <a href={item.link} target="_blank">
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
