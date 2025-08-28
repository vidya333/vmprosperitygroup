import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AddProject = ({ editId, initialData, setEditId }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    features: "",
    images: [],
    brochure: null,
    whatsappNumber: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        description: initialData.description || "",
        features: initialData.features
          ? initialData.features.join(", ")
          : "",
        images: [],
        brochure: null,
        whatsappNumber: initialData.whatsappNumber || "",
        email: initialData.email || "",
      });
    }
    if (formRef.current) {
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
   }

  }, [initialData]);

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File change handler
  const handleFileChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    } else if (e.target.name === "brochure") {
      setFormData({ ...formData, brochure: e.target.files[0] });
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();

      fd.append("title", formData.title);
      fd.append("subtitle", formData.subtitle);
      fd.append("description", formData.description);
      fd.append("features", formData.features);
      fd.append("whatsappNumber", formData.whatsappNumber);
      fd.append("email", formData.email);

      // images
      formData.images.forEach((file) => fd.append("images", file));

      // brochure
      if (formData.brochure) {
        fd.append("brochure", formData.brochure);
      }

      let res;
      if (editId) {
        res = await fetch(`http://localhost:5000/api/projects/${editId}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        res = await fetch("http://localhost:5000/api/projects", {
          method: "POST",
          body: fd,
        });
      }

      if (res.ok) {
        alert(editId ? "Project updated successfully!" : "Project added successfully!");
        setEditId(null);
        setFormData({
          title: "",
          subtitle: "",
          description: "",
          features: "",
          images: [],
          brochure: null,
          whatsappNumber: "",
          email: "",
        });
            if (!editId) {
                navigate("/");   // ✅ navigate only on Add
            }      } 
        else {
        alert("Failed to save project");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
<div className="container-fluid pt-5 property-form" ref={formRef}>
      <h2 className="mb-4 text-center text-dark mt-4">
        {editId ? "Edit Project" : "Add New Project"}
      </h2>

      <form onSubmit={handleSubmit} className="container bg-form p-3 rounded">
        <div className="row g-3">
          {/* Title */}
          <div className="col-md-6">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Subtitle */}
          <div className="col-md-6">
            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows={3}
              required
            ></textarea>
          </div>

          {/* Features */}
          <div className="col-12">
            <textarea
              name="features"
              placeholder="Enter features separated by commas"
              value={formData.features}
              onChange={handleChange}
              className="form-control"
              rows={2}
            ></textarea>
          </div>

          {/* Images */}
          <div className="col-md-6">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          {/* Brochure */}
          <div className="col-md-6">
            <input
              type="file"
              name="brochure"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          {/* WhatsApp Number */}
          <div className="col-md-6">
            <input
              type="text"
              name="whatsappNumber"
              placeholder="WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              placeholder="Contact Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-12 text-center mb-5">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary px-5"
            >
              {submitting
                ? "Submitting..."
                : editId
                ? "Update Project"
                : "Add Project"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
