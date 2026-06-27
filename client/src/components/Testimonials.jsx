import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { testimonialAPI } from "../services/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await testimonialAPI.getAll();
      setTestimonials(res.data);
    } catch (error) {
      console.log('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
    
    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchTestimonials, 15000);
    
    return () => clearInterval(interval);
  }, [fetchTestimonials]);

  return (
    <section 
      id="testimonials" 
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FAF8F5 0%, #F5F2EE 100%)" }}
    >
      <div className="mx-auto px-6 sm:px-8 max-w-7xl">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="block w-12 h-px bg-gradient-to-r from-transparent via-[#C56A45]/30 to-transparent" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: "#6B5F5A" }}>
              Testimonials
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
            Kind Words from Clients
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-[16px] max-w-2xl mx-auto leading-[1.7]"
            style={{ color: "#6B5F5A" }}
          >
            What our clients say about their experience with Studio Y7
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: "#6B5F5A" }}>Loading testimonials...</p>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-strong soft-shadow-lg rounded-[28px] p-7 transition-smooth"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                    >
                      <FaStar className="text-[#C56A45]" size={16} />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed mb-8 font-light" style={{ color: "#6B5F5A" }}>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonial.imageUrl ? (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-[#C56A45]/20" 
                    />
                  ) : (
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display text-xl"
                      style={{ background: "linear-gradient(135deg, #C56A45, #B85A38)" }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-sm mb-1" style={{ color: "#1A1614" }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-xs" style={{ color: "#6B5F5A" }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center glass rounded-3xl p-12"
          >
            <p className="text-sm" style={{ color: "#6B5F5A" }}>
              Client testimonials will appear here soon
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
