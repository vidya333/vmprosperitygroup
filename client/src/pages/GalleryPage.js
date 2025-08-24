import React, { useEffect, useState } from "react";
import axios from "axios";
import Gallery from "../components/Gallery";

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
    <div className="container my-5 py-5">
      
      <Gallery items={items} />
    </div>
  );
}

export default GalleryPage;
