import React, { useEffect, useState } from "react";
import axios from "axios";
import Gallery from "../components/Gallery";
import OurPromise from "../components/OurPromise";

function GalleryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await axios.get("http://localhost:5000/api/media");
    setItems(res.data);
  };

  

  return (
    <div className="container-fluid  pt-5">
      <Gallery items={items} />
      <OurPromise/>
    </div>
  );
}

export default GalleryPage;
