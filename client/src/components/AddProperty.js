import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';
import './AddProperty.css';
import PropertyTable from './PropertyTable';
import AddProject from './AddProject';
import ProjectsTable from './ProjectsTable';
import axios from 'axios';
import GalleryUpload from './GalleryUpload';

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    rent: '',
    description: '',
    images: '',
    imageUrl: '',
    brokerName: '',
    brokerEmail: '',
    brokerPhone: '',
    type: '',
    imageFile: null,
    // new fields
    flatType: '',
    availableFor: '',
    deposit: '',
    carpetArea: '',
    parking: '',
    furnished: '',
    facing: '',
    locationPin: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null); // ✅ track edit mode

  const propertyTypes = [
    { type: "residential-apartment", label: "Residential Apartment" },
    { type: "residential-land", label: "Residential Land" },
    { type: "independent-house-villa", label: "Independent House / Villa" },
    { type: "builder-floor", label: "Builder Floor" },
    { type: "1rk-studio-apartment", label: "1 RK / Studio Apartment" },
    { type: "farm-house", label: "Farm House" },
    { type: "serviced-apartment", label: "Serviced Apartments" },
    { type: "commercial-property", label: "Commercial Property" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    const fd = new FormData();

    // Append only non-empty values
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
        if (key === "imageFiles" && formData.imageFiles?.length > 0) {
          formData.imageFiles.forEach(file => fd.append("images", file));
        } else if (key !== "imageFiles") {
          fd.append(key, formData[key]);
        }
      }
    });

    let res;
    if (editId) {
      res = await fetch(`http://localhost:5000/api/properties/${editId}`, {
        method: "PUT",
        body: fd
      });
    } else {
      res = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        body: fd
      });
    }

    if (res.ok) {
      alert(editId ? "Property updated successfully!" : "Property added successfully!");
      setEditId(null);
      setFormData({
        title: '',
        location: '',
        price: '',
        rent: '',
        description: '',
        images: '',
        imageUrl: '',
        brokerName: '',
        brokerEmail: '',
        brokerPhone: '',
        type: '',
        imageFile: null,
        flatType: '',
        availableFor: '',
        deposit: '',
        carpetArea: '',
        parking: '',
        furnished: '',
        facing: '',
        locationPin: ''
      });
      navigate('/');
    } else {
      alert("Failed to save property");
    }
  } catch (err) {
    console.error(err);
    alert("Error submitting property");
  } finally {
    setSubmitting(false);
  }
};


  const handleEditProperty = (property) => {
    setEditId(property._id); // ✅ set ID to update
    setFormData({
      title: property.title || '',
      location: property.location || '',
      price: property.price || '',
      rent: property.rent || '',
      description: property.description || '',
      images: property.images || '',
      imageUrl: property.imageUrl || '',
      brokerName: property.brokerName || '',
      brokerEmail: property.brokerEmail || '',
      brokerPhone: property.brokerPhone || '',
      type: property.type || '',
      imageFile: null 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

// For Projects

const [projectEditId, setProjectEditId] = useState(null);
const [projectFormData, setProjectFormData] = useState(null);

const handleEditProject = (project) => {
  setProjectEditId(project._id);
  setProjectFormData(project); 
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// Media
const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await axios.get("http://localhost:5000/api/media");
    setItems(res.data);
  };

  const handleUpload = (newMedia) => {
    setItems([newMedia, ...items]); 
  };

  return (
    <div className="container-fluid pt-5 property-form">
      {/* Form to add properties */}
      <h2 className="mb-4 text-center text-dark mt-4">{editId ? 'Edit Property' : 'Add New Property'}</h2>
      <form onSubmit={handleSubmit} className='container bg-form p-3 rounded'>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <input
              type="number"
              name="rent"
              placeholder="Rent (optional)"
              value={formData.rent}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-12">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-control"
              rows={3}
            ></textarea>
          </div>

          <div className="col-md-6">
             <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={(e) => setFormData({ ...formData, imageFiles: Array.from(e.target.files) })}
                className="form-control"
                />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="brokerName"
              placeholder="Consultant Name"
              value={formData.brokerName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <input
              type="email"
              name="brokerEmail"
              placeholder="Consultant Email"
              value={formData.brokerEmail}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <input
              type="tel"
              name="brokerPhone"
              placeholder="Consultant Phone (Include 91 at starting Eg.918564799885)"
              value={formData.brokerPhone}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map((property) => (
                <option key={property.type} value={property.type}>
                  {property.label}
                </option>
              ))}
            </select>
          </div>
          {/* new */}
          {/* Flat Type */}
            <div className="col-md-6">
              <select
                name="flatType"
                value={formData.flatType}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Flat Type</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="2.5BHK">2.5 BHK</option>
                <option value="3BHK">3 BHK</option>
                <option value="4BHK">4 BHK</option>
                <option value="5BHK">5 BHK</option>
              </select>
            </div>

            {/* Available For */}
            <div className="col-md-6">
              <select
                name="availableFor"
                value={formData.availableFor}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Available For</option>
                <option value="rent">Rent</option>
                <option value="resale">Resale</option>
                <option value="purchase">Purchase</option>
              </select>
            </div>

            {/* Deposit */}
            <div className="col-md-6">
              <input
                type="number"
                name="deposit"
                placeholder="Deposit Amount"
                value={formData.deposit}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Carpet Area */}
            <div className="col-md-6">
              <input
                type="number"
                name="carpetArea"
                placeholder="Carpet Area (sq.ft)"
                value={formData.carpetArea}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Parking */}
            <div className="col-md-6">
              <select
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Parking</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Furnished */}
            <div className="col-md-6">
              <select
                name="furnished"
                value={formData.furnished}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Furnishing</option>
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-furnished</option>
                <option value="furnished">Furnished</option>
              </select>
            </div>

            {/* Facing */}
            <div className="col-md-6">
              <input
                type="text"
                name="facing"
                placeholder="Facing (e.g. East)"
                value={formData.facing}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Location Pin */}
            <div className="col-md-6">
              <input
                type="url"
                name="locationPin"
                placeholder="Google Maps Link"
                value={formData.locationPin}
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
              {submitting ? 'Submitting...' : editId ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </div>
      </form>

      {/* Table to show all properties */}
      <PropertyTable onEdit={handleEditProperty} />

      {/*project */}
      <AddProject editId={projectEditId} initialData={projectFormData} setEditId={setProjectEditId} />
      <ProjectsTable onEdit={handleEditProject} />

      {/* Media upload */}
      <h4 className='text-dark mt-5'>Upload photos in Gallery</h4>
      <GalleryUpload onUpload={handleUpload} />

\    </div>
  );
};

export default AddProperty;
