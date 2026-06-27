import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { bookingAPI } from "../services/api";

const STEPS = ["Details", "Event Info", "Package", "Confirm"];
const PACKAGES = ["Mini Session", "Wedding Essentials", "Complete Celebration"];
const EVENT_TYPES = ["Wedding", "Pre-Wedding", "Engagement", "Birthday", "Corporate Event", "Other"];

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", eventType: "", eventDate: "", location: "", package: "", message: ""
  });
  const [status, setStatus] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async () => {
    try {
      await bookingAPI.create(formData);
      setStatus("success");
      setTimeout(() => {
        setFormData({ name: "", phone: "", email: "", eventType: "", eventDate: "", location: "", package: "", message: "" });
        setCurrentStep(0);
        setStatus("");
      }, 3000);
    } catch (error) {
      setStatus("error");
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <section 
      id="booking" 
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EFE9E4 0%, #FAF8F5 100%)" }}
    >
      <div className="mx-auto px-6 sm:px-8 max-w-4xl">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="block w-12 h-px bg-gradient-to-r from-transparent via-[#C56A45]/30 to-transparent" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: "#6B5F5A" }}>
              Book a Session
            </span>
            <span className="block w-12 h-px bg-gradient-to-r from-transparent via-[#C56A45]/30 to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light tracking-tight mb-5"
            style={{ color: "#1A1614", letterSpacing: "-0.02em" }}
          >
            Let's Create
            <br />
            Something Beautiful
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-[16px] leading-[1.7]"
            style={{ color: "#6B5F5A" }}
          >
            Share your details and we'll get back to you within 24 hours
          </motion.p>
        </div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-between mb-12 max-w-2xl mx-auto"
        >
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  animate={{
                    background: i <= currentStep 
                      ? "linear-gradient(135deg, #C56A45, #B85A38)" 
                      : "rgba(107, 95, 90, 0.1)",
                    scale: i === currentStep ? 1.1 : 1
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-smooth"
                  style={{ color: i <= currentStep ? "#FFF" : "#6B5F5A" }}
                >
                  {i < currentStep ? <FiCheck /> : i + 1}
                </motion.div>
                <span className="text-xs mt-2 hidden sm:block" style={{ color: "#6B5F5A" }}>
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-2" style={{ background: "rgba(107, 95, 90, 0.1)" }}>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: i < currentStep ? "100%" : "0%" }}
                    className="h-full"
                    style={{ background: "linear-gradient(135deg, #C56A45, #B85A38)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-strong soft-shadow-lg rounded-[28px] p-8"
        >
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl glass text-sm transition-smooth focus:ring-2 focus:ring-[#C56A45]/20"
                  style={{ border: "1px solid rgba(107, 95, 90, 0.1)", outline: "none", color: "#1A1614" }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl glass text-sm transition-smooth focus:ring-2 focus:ring-[#C56A45]/20"
                  style={{ border: "1px solid rgba(107, 95, 90, 0.1)", outline: "none", color: "#1A1614" }}
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl glass text-sm transition-smooth focus:ring-2 focus:ring-[#C56A45]/20"
                  style={{ border: "1px solid rgba(107, 95, 90, 0.1)", outline: "none", color: "#1A1614" }}
                />
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl glass text-sm transition-smooth focus:ring-2 focus:ring-[#C56A45]/20"
                  style={{ border: "1px solid rgba(107, 95, 90, 0.1)", outline: "none", color: "#1A1614" }}
                >
                  <option value="">Select Event Type *</option>
                  {EVENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl glass text-sm transition-smooth focus:ring-2 focus:ring-[#C56A45]/20"
                  style={{ border: "1px solid rgba(107, 95, 90, 0.1)", outline: "none", color: "#1A1614" }}
                />
                <input
                  type="text"
                  placeholder="Event Location *"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl glass text-sm transition-smooth focus:ring-2 focus:ring-[#C56A45]/20"
                  style={{ border: "1px solid rgba(107, 95, 90, 0.1)", outline: "none", color: "#1A1614" }}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {PACKAGES.map(pkg => (
                  <motion.button
                    key={pkg}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, package: pkg })}
                    className="w-full px-6 py-5 rounded-2xl text-left transition-smooth"
                    style={{
                      background: formData.package === pkg 
                        ? "linear-gradient(135deg, #C56A45, #B85A38)" 
                        : "rgba(255, 252, 248, 0.5)",
                      color: formData.package === pkg ? "#FFF" : "#1A1614",
                      border: `1px solid ${formData.package === pkg ? 'transparent' : 'rgba(107, 95, 90, 0.1)'}`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pkg}</span>
                      {formData.package === pkg && <FiCheck />}
                    </div>
                  </motion.button>
                ))}
                <textarea
                  placeholder="Additional Message (Optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="4"
                  className="w-full px-5 py-3.5 rounded-2xl glass text-sm resize-none transition-smooth focus:ring-2 focus:ring-[#C56A45]/20"
                  style={{ border: "1px solid rgba(107, 95, 90, 0.1)", outline: "none", color: "#1A1614" }}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {status === "success" ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #73856D, #8A9B84)" }}
                    >
                      <FiCheck className="text-white text-3xl" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-light mb-3" style={{ color: "#1A1614" }}>
                      Booking Received!
                    </h3>
                    <p className="text-sm" style={{ color: "#6B5F5A" }}>
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="glass rounded-2xl p-6 space-y-3 text-sm">
                      <div className="flex justify-between"><span style={{ color: "#6B5F5A" }}>Name:</span><span style={{ color: "#1A1614" }}>{formData.name}</span></div>
                      <div className="flex justify-between"><span style={{ color: "#6B5F5A" }}>Email:</span><span style={{ color: "#1A1614" }}>{formData.email}</span></div>
                      <div className="flex justify-between"><span style={{ color: "#6B5F5A" }}>Event:</span><span style={{ color: "#1A1614" }}>{formData.eventType}</span></div>
                      <div className="flex justify-between"><span style={{ color: "#6B5F5A" }}>Package:</span><span style={{ color: "#1A1614" }}>{formData.package}</span></div>
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-center" style={{ color: "#C56A45" }}>
                        Failed to submit. Please try again.
                      </p>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {status !== "success" && (
            <div className="flex gap-4 mt-8">
              {currentStep > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  className="flex-1 py-4 rounded-full text-sm font-medium transition-smooth"
                  style={{ color: "#C56A45", border: "1px solid rgba(197, 106, 69, 0.3)" }}
                >
                  Back
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={currentStep === 3 ? handleSubmit : nextStep}
                className="flex-1 py-4 rounded-full text-sm font-medium text-white transition-smooth"
                style={{ background: "linear-gradient(135deg, #C56A45, #B85A38)" }}
              >
                {currentStep === 3 ? "Submit Booking" : "Continue"}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
