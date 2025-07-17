import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Banner.css";


export default function Banner() {
  const API_URL = "/api/ideas";

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [bannerImage, setBannerImage] = useState(null);

  // Fetch banner image dari API
  const fetchBannerImage = async () => {
    try {
      const res = await axios.get(API_URL, {
        params: {
          "page[number]": 1,
          "page[size]": 1,
          append: ["medium_image"],
        },
      });
      console.log("Banner image response:", res.data);
      const img = res.data.data?.[0]?.medium_image?.url;
      if (img) setBannerImage(img);
    } catch (err) {
      console.error(" Gagal ambil gambar banner:", err);
    }
  };

  useEffect(() => {
    fetchBannerImage();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="banner">
      {bannerImage && (
        <img
          ref={imageRef}
          className="banner-image"
          src={bannerImage}
          alt="Banner"
        />
      )}
      <div className="banner-text" ref={textRef}>
        <h1>Ideas</h1>
        <p>Where all our great things begin</p>
      </div>
    </section>
  );
}