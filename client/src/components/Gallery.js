import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Gallery.css";

const Gallery = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const BASE_URL = "http://localhost:5000";

  return (
    <div className="container my-4">
      <h2 className="text-center my-4 pt-5">View Gallery</h2>

      <div className="gallery">
        {items.map((item, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => setSelectedItem(item)}
          >
            {item.type === "image" ? (
              <img
                src={`${BASE_URL}${item.src}`}   // ✅ prepend backend base URL
                alt={`media-${index}`}
                className="img-fluid rounded shadow-sm"
              />
            ) : (
              <video
                src={`${BASE_URL}${item.src}`}   // ✅ prepend backend base URL
                muted
                loop
                playsInline
                autoPlay
                className="w-100 rounded shadow-sm"
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setSelectedItem(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent mx-auto p-0">
              <div className="modal-body text-center p-0">
                {selectedItem.type === "image" ? (
                  <img
                    src={`${BASE_URL}${selectedItem.src}`}  // ✅
                    alt="zoomed"
                    className="img-fluid rounded"
                  />
                ) : (
                  <video
                    src={`${BASE_URL}${selectedItem.src}`}  // ✅
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-100 rounded"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
