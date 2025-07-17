import { useEffect, useState } from "react";
import "./Header.css";

const menuItems = [
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Ideas", path: "/ideas" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  return (
    <header className={`site-header ${showHeader ? "visible" : "hidden"} ${showHeader ? "transparent" : ""}`}>
      <div className="logo">suit<span>media</span></div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activePath === item.path ? "active" : ""}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}