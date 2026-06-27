import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../services/store";
import { galleryAPI, heroAPI, bookingAPI, contactAPI, testimonialAPI, pricingAPI } from "../services/api";
import { FaImage, FaCalendar, FaEnvelope, FaStar, FaUpload, FaTrash, FaSignOutAlt, FaHome } from "react-icons/fa";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [images, setImages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadData, setUploadData] = useState({ title: "", category: "Wedding", featured: false });
  const [testimonialForm, setTestimonialForm] = useState({ name: "", role: "", content: "", rating: 5 });
  const [testimonialFile, setTestimonialFile] = useState(null);
  const [pricingForm, setPricingForm] = useState({ name: "", price: "", description: "", features: [""], recommended: false });
  const [editingPricing, setEditingPricing] = useState(null);
  
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();

  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  useEffect(() => {
    if (activeTab === "overview") {
      loadGallery();
      loadBookings();
      loadContacts();
      loadTestimonials();
    }
    if (activeTab === "gallery") loadGallery();
    if (activeTab === "bookings") loadBookings();
    if (activeTab === "contacts") loadContacts();
    if (activeTab === "testimonials") loadTestimonials();
    if (activeTab === "pricing") loadPricing();
  }, [activeTab]);

  const loadGallery = async () => {
    try {
      const { data } = await galleryAPI.getAll();
      setImages(data);
    } catch (err) {}
  };

  const loadBookings = async () => {
    try {
      const { data } = await bookingAPI.getAll();
      setBookings(data);
    } catch (err) {}
  };

  const loadContacts = async () => {
    try {
      const { data } = await contactAPI.getAll();
      setContacts(data);
    } catch (err) {}
  };

  const loadTestimonials = async () => {
    try {
      const { data } = await testimonialAPI.getAll();
      setTestimonials(data);
    } catch (err) {}
  };

  const loadPricing = async () => {
    try {
      const { data } = await pricingAPI.getAll();
      setPricing(data);
    } catch (err) {}
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Please select an image file");
      return;
    }
    
    const formData = new FormData();
    formData.append("image", uploadFile);
    formData.append("title", uploadData.title);
    formData.append("category", uploadData.category);
    formData.append("featured", uploadData.featured);

    try {
      await galleryAPI.upload(formData);
      setUploadFile(null);
      setUploadData({ title: "", category: "Wedding", featured: false });
      document.querySelector('input[type="file"]').value = '';
      loadGallery();
      alert("Image uploaded successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to upload image";
      alert(errorMessage);
      console.error('Upload error:', err);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!confirm("Delete this image?")) return;
    try {
      await galleryAPI.delete(id);
      loadGallery();
    } catch (err) {}
  };

  const handleHeroUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await heroAPI.upload(formData);
      alert("Hero image updated successfully!");
    } catch (err) {
      alert("Failed to update hero image");
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      await bookingAPI.updateStatus(id, { status });
      loadBookings();
    } catch (err) {}
  };

  const handleDeleteBooking = async (id) => {
    if (!confirm("Delete this booking?")) return;
    try {
      await bookingAPI.delete(id);
      loadBookings();
    } catch (err) {}
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Testimonial Handlers
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", testimonialForm.name);
    formData.append("role", testimonialForm.role);
    formData.append("content", testimonialForm.content);
    formData.append("rating", testimonialForm.rating);
    if (testimonialFile) formData.append("image", testimonialFile);

    try {
      await testimonialAPI.create(formData);
      setTestimonialForm({ name: "", role: "", content: "", rating: 5 });
      setTestimonialFile(null);
      document.querySelector('input[type="file"][name="testimonial"]').value = '';
      loadTestimonials();
      alert("Testimonial added successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add testimonial";
      alert(errorMessage);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await testimonialAPI.delete(id);
      loadTestimonials();
    } catch (err) {}
  };

  // Pricing Handlers
  const handlePricingSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...pricingForm,
      features: pricingForm.features.filter(f => f.trim() !== "")
    };

    try {
      if (editingPricing) {
        await pricingAPI.update(editingPricing, data);
        setEditingPricing(null);
      } else {
        await pricingAPI.create(data);
      }
      setPricingForm({ name: "", price: "", description: "", features: [""], recommended: false });
      loadPricing();
      alert(editingPricing ? "Pricing updated!" : "Pricing added!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to save pricing";
      alert(errorMessage);
    }
  };

  const handleEditPricing = (pkg) => {
    setEditingPricing(pkg._id);
    setPricingForm({
      name: pkg.name,
      price: pkg.price,
      description: pkg.description || "",
      features: pkg.features && pkg.features.length > 0 ? pkg.features : [""],
      recommended: pkg.recommended
    });
  };

  const handleDeletePricing = async (id) => {
    if (!confirm("Delete this pricing package?")) return;
    try {
      await pricingAPI.delete(id);
      loadPricing();
    } catch (err) {}
  };

  const addFeatureField = () => {
    setPricingForm({ ...pricingForm, features: [...pricingForm.features, ""] });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...pricingForm.features];
    newFeatures[index] = value;
    setPricingForm({ ...pricingForm, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = pricingForm.features.filter((_, i) => i !== index);
    setPricingForm({ ...pricingForm, features: newFeatures });
  };

  return (
    <div className="min-h-screen" style={{ background: "#F7F5F2" }}>
      {/* Header */}
      <div className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <h1 className="font-display text-2xl font-semibold" style={{ color: "#1F1F1F" }}>Studio Y7 Dashboard</h1>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
            style={{ background: "rgba(197, 106, 69, 0.1)", color: "#C56A45" }}
          >
            <FaHome /> View Site
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
            style={{ background: "rgba(197, 106, 69, 0.1)", color: "#C56A45" }}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 p-6 glass" style={{ minHeight: "calc(100vh - 80px)", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: FaHome },
              { id: "gallery", label: "Gallery", icon: FaImage },
              { id: "hero", label: "Hero Image", icon: FaUpload },
              { id: "bookings", label: "Bookings", icon: FaCalendar },
              { id: "contacts", label: "Contacts", icon: FaEnvelope },
              { id: "pricing", label: "Pricing", icon: FaStar },
              { id: "testimonials", label: "Testimonials", icon: FaStar },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveTab(item.id)}
                className="w-full px-4 py-3 rounded-2xl text-left text-sm font-medium flex items-center gap-3 transition-all"
                style={{
                  background: activeTab === item.id ? "rgba(197, 106, 69, 0.1)" : "transparent",
                  color: activeTab === item.id ? "#C56A45" : "#666666",
                }}
              >
                <item.icon /> {item.label}
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "overview" && (
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: "#1F1F1F" }}>Dashboard Overview</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: "Total Images", value: images.length, icon: FaImage },
                  { label: "Bookings", value: bookings.length, icon: FaCalendar },
                  { label: "Contacts", value: contacts.length, icon: FaEnvelope },
                  { label: "Testimonials", value: testimonials.length, icon: FaStar },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass soft-shadow p-6 rounded-3xl"
                  >
                    <stat.icon className="text-3xl mb-3" style={{ color: "#C56A45" }} />
                    <h3 className="font-display text-3xl font-bold mb-1" style={{ color: "#1F1F1F" }}>{stat.value}</h3>
                    <p className="text-sm" style={{ color: "#666666" }}>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: "#1F1F1F" }}>Gallery Management</h2>
              
              {/* Upload Form */}
              <form onSubmit={handleImageUpload} className="glass soft-shadow p-6 rounded-3xl mb-6">
                <h3 className="font-semibold mb-4" style={{ color: "#1F1F1F" }}>Upload New Image</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Image Title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    required
                    className="px-4 py-2 rounded-xl glass text-sm"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                  />
                  <select
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                    className="px-4 py-2 rounded-xl glass text-sm"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Couple">Couple</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  required
                  className="mb-4 text-sm"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 rounded-full text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #C56A45, #D88165)" }}
                >
                  Upload Image
                </motion.button>
              </form>

              {/* Image Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div key={img._id} className="glass soft-shadow rounded-2xl overflow-hidden">
                    <img src={img.imageUrl} alt={img.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-sm mb-1" style={{ color: "#1F1F1F" }}>{img.title}</h4>
                      <p className="text-xs mb-3" style={{ color: "#666666" }}>{img.category}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteImage(img._id)}
                        className="px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2"
                        style={{ background: "rgba(197, 106, 69, 0.1)", color: "#C56A45" }}
                      >
                        <FaTrash /> Delete
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: "#1F1F1F" }}>Hero Image</h2>
              <div className="glass soft-shadow p-6 rounded-3xl">
                <h3 className="font-semibold mb-4" style={{ color: "#1F1F1F" }}>Upload New Hero Image</h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroUpload}
                  className="text-sm"
                />
                <p className="text-xs mt-2" style={{ color: "#666666" }}>This will replace the current hero image on the homepage</p>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: "#1F1F1F" }}>Bookings</h2>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="glass soft-shadow p-6 rounded-3xl">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold" style={{ color: "#1F1F1F" }}>{booking.name}</h3>
                        <p className="text-sm" style={{ color: "#666666" }}>{booking.email} • {booking.phone}</p>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: booking.status === "Approved" ? "rgba(115, 133, 109, 0.2)" : "rgba(197, 106, 69, 0.2)",
                          color: booking.status === "Approved" ? "#73856D" : "#C56A45",
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm mb-3" style={{ color: "#666666" }}>
                      <p>Event: {booking.eventType}</p>
                      <p>Date: {new Date(booking.eventDate).toLocaleDateString()}</p>
                      <p>Package: {booking.package}</p>
                      <p>Location: {booking.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleUpdateBookingStatus(booking._id, "Approved")}
                        className="px-4 py-2 rounded-full text-xs font-medium"
                        style={{ background: "rgba(115, 133, 109, 0.1)", color: "#73856D" }}
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="px-4 py-2 rounded-full text-xs font-medium"
                        style={{ background: "rgba(197, 106, 69, 0.1)", color: "#C56A45" }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: "#1F1F1F" }}>Contact Enquiries</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="glass soft-shadow p-6 rounded-3xl">
                    <h3 className="font-semibold mb-1" style={{ color: "#1F1F1F" }}>{contact.name}</h3>
                    <p className="text-sm mb-2" style={{ color: "#666666" }}>{contact.email} • {contact.phone}</p>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#1F1F1F" }}>{contact.subject}</p>
                    <p className="text-sm" style={{ color: "#666666" }}>{contact.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: "#1F1F1F" }}>Pricing Management</h2>
              
              {/* Pricing Form */}
              <form onSubmit={handlePricingSubmit} className="glass soft-shadow p-6 rounded-3xl mb-6">
                <h3 className="font-semibold mb-4" style={{ color: "#1F1F1F" }}>
                  {editingPricing ? "Edit" : "Add New"} Pricing Package
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Package Name"
                    value={pricingForm.name}
                    onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                    required
                    className="px-4 py-2 rounded-xl glass text-sm"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                  />
                  <input
                    type="text"
                    placeholder="Price (e.g. ₹50,000 or Contact for pricing)"
                    value={pricingForm.price}
                    onChange={(e) => setPricingForm({ ...pricingForm, price: e.target.value })}
                    required
                    className="px-4 py-2 rounded-xl glass text-sm"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                  />
                </div>
                <textarea
                  placeholder="Description (optional)"
                  value={pricingForm.description}
                  onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })}
                  rows="2"
                  className="w-full px-4 py-2 rounded-xl glass text-sm mb-4 resize-none"
                  style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                />
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#1F1F1F" }}>Features</label>
                  {pricingForm.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Feature description"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl glass text-sm"
                        style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => removeFeature(index)}
                        className="px-4 py-2 rounded-xl text-xs font-medium"
                        style={{ background: "rgba(197, 106, 69, 0.1)", color: "#C56A45" }}
                      >
                        Remove
                      </motion.button>
                    </div>
                  ))}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={addFeatureField}
                    className="text-xs font-medium px-4 py-2 rounded-xl"
                    style={{ background: "rgba(197, 106, 69, 0.1)", color: "#C56A45" }}
                  >
                    + Add Feature
                  </motion.button>
                </div>

                <label className="flex items-center gap-2 mb-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pricingForm.recommended}
                    onChange={(e) => setPricingForm({ ...pricingForm, recommended: e.target.checked })}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: "#C56A45" }}
                  />
                  <span className="text-sm" style={{ color: "#666666" }}>Mark as "Most Popular"</span>
                </label>

                <div className="flex gap-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-full text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #C56A45, #D88165)" }}
                  >
                    {editingPricing ? "Update" : "Add"} Package
                  </motion.button>
                  {editingPricing && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setEditingPricing(null);
                        setPricingForm({ name: "", price: "", description: "", features: [""], recommended: false });
                      }}
                      className="px-6 py-2 rounded-full text-sm font-medium"
                      style={{ background: "rgba(107, 95, 90, 0.1)", color: "#666666" }}
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </form>

              {/* Pricing List */}
              <div className="grid md:grid-cols-3 gap-4">
                {pricing.map((pkg) => (
                  <div key={pkg._id} className="glass soft-shadow rounded-2xl p-6">
                    {pkg.recommended && (
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                        style={{ background: "linear-gradient(135deg, #C56A45, #D88165)" }}>
                        Most Popular
                      </div>
                    )}
                    <h4 className="font-semibold text-lg mb-2" style={{ color: "#1F1F1F" }}>{pkg.name}</h4>
                    <p className="text-sm mb-2" style={{ color: "#C56A45" }}>{pkg.price}</p>
                    {pkg.description && <p className="text-xs mb-3" style={{ color: "#666666" }}>{pkg.description}</p>}
                    <ul className="text-xs mb-4 space-y-1" style={{ color: "#666666" }}>
                      {pkg.features?.map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleEditPricing(pkg)}
                        className="flex-1 px-4 py-2 rounded-full text-xs font-medium"
                        style={{ background: "rgba(115, 133, 109, 0.1)", color: "#73856D" }}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleDeletePricing(pkg._id)}
                        className="flex-1 px-4 py-2 rounded-full text-xs font-medium"
                        style={{ background: "rgba(197, 106, 69, 0.1)", color: "#C56A45" }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: "#1F1F1F" }}>Testimonials Management</h2>
              
              {/* Testimonial Form */}
              <form onSubmit={handleTestimonialSubmit} className="glass soft-shadow p-6 rounded-3xl mb-6">
                <h3 className="font-semibold mb-4" style={{ color: "#1F1F1F" }}>Add New Testimonial</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    required
                    className="px-4 py-2 rounded-xl glass text-sm"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                  />
                  <input
                    type="text"
                    placeholder="Role/Title"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    required
                    className="px-4 py-2 rounded-xl glass text-sm"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                  />
                </div>
                <textarea
                  placeholder="Testimonial Content"
                  value={testimonialForm.content}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-2 rounded-xl glass text-sm mb-4 resize-none"
                  style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#1F1F1F" }}>Rating</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                    className="px-4 py-2 rounded-xl glass text-sm"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", outline: "none" }}
                  >
                    {[5, 4, 3, 2, 1].map(num => (
                      <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#1F1F1F" }}>Customer Image (Optional)</label>
                  <input
                    name="testimonial"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTestimonialFile(e.target.files[0])}
                    className="text-sm"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 rounded-full text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #C56A45, #D88165)" }}
                >
                  Add Testimonial
                </motion.button>
              </form>

              {/* Testimonials List */}
              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="glass soft-shadow rounded-2xl p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-[#C56A45]">★</span>
                      ))}
                    </div>
                    <p className="text-sm mb-3" style={{ color: "#666666" }}>"{testimonial.content}"</p>
                    <div className="flex items-center gap-3 mb-3">
                      {testimonial.imageUrl ? (
                        <img src={testimonial.imageUrl} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                          style={{ background: "linear-gradient(135deg, #C56A45, #D88165)" }}>
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-sm" style={{ color: "#1F1F1F" }}>{testimonial.name}</h4>
                        <p className="text-xs" style={{ color: "#666666" }}>{testimonial.role}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleDeleteTestimonial(testimonial._id)}
                      className="px-4 py-2 rounded-full text-xs font-medium"
                      style={{ background: "rgba(197, 106, 69, 0.1)", color: "#C56A45" }}
                    >
                      Delete
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
