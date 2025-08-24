import React, { useState, useEffect } from "react";
import axios from "axios";

const GalleryUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  // Fetch existing uploaded images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/media");
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload(res.data);
      setImages([...images, res.data]); // add new uploaded image to table
      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/media/${id}`);
      setImages(images.filter((img) => img._id !== id)); 
      alert("Deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div>
      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="mt-4 bg-light w-auto text-center p-2 rounded">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          disabled={loading}
        />
        <button
          type="submit"
          className="btn btn-primary ms-2"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Uploaded Images Table */}
      {images.length > 0 && (
        <table className="table table-bordered table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>Preview</th>
              <th>File Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {images.map((img) => (
                <tr key={img._id}>
                  <td>
                    {img.type === "image" ? (
                      <img
                        src={`http://localhost:5000${img.src}`}
                        alt="uploaded"
                        width="60" height="60"
                        className="rounded"
                      />
                    ) : (
                      <video width="100" controls>
                        <source src={`http://localhost:5000${img.src}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </td>
                  <td>{img.src.split("/").pop()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(img._id)}
                    >
                      <i className="">Delete</i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>
      )}
    </div>
  );
};

export default GalleryUpload;
