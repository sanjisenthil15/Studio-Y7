import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { galleryAPI } from "../services/api";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Fallback images from assets
import wedding from "../assets/images/wedding.jpg";
import wedding2 from "../assets/images/wedding2.jpg";
import couple from "../assets/images/couple.jpg";
import portrait1 from "../assets/images/portrait1.jpg";
import portrait2 from "../assets/images/portrait2.jpg";
import outdoor from "../assets/images/outdoor.jpg";
import corporate from "../assets/images/corporate.jpg";
import cinematic from "../assets/images/cinematic.jpg";

const CATEGORIES = ["All", "Wedding", "Couple", "Portrait", "Outdoor", "Events"];

// Default fallback images if no images in database
const DEFAULT_IMAGES = [
  { _id: "default-1", title: "Wedding Ceremony", imageUrl: wedding, category: "Wedding" },
  { _id: "default-2", title: "Wedding Reception", imageUrl: wedding2, category: "Wedding" },
  { _id: "default-3", title: "Couple Session", imageUrl: couple, category: "Couple" },
  { _id: "default-4", title: "Portrait Photography", imageUrl: portrait1, category: "Portrait" },
  { _id: "default-5", title: "Studio Portrait", imageUrl: portrait2, category: "Portrait" },
  { _id: "default-6", title: "Outdoor Shoot", imageUrl: outdoor, category: "Outdoor" },
  { _id: "default-7", title: "Corporate Event", imageUrl: corporate, category: "Events" },
  { _id: "default-8", title: "Cinematic Video", imageUrl: cinematic, category: "Events" },
];

function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-4 mb-10"
      >
        <span className="block w-16 h-[1px]" style={{ background: "linear-gradient(to right, transparent, rgba(197,106,69,0.4))" }} />
        <span className="text-[10px] uppercase tracking-[0.35em] font-medium" style={{ color: "#6B5F5A" }}>
          Portfolio
        </span>
        <span className="block w-16 h-[1px]" style={{ background: "linear-gradient(to left, transparent, rgba(197,106,69,0.4))" }} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light tracking-tight mb-6"
        style={{ color: "#1A1614", letterSpacing: "-0.02em" }}
      >
        Our Work
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base sm:text-[16px] max-w-2xl mx-auto leading-[1.7]"
        style={{ color: "#6B5F5A" }}
      >
        Every image tells a unique story—explore moments captured with passion and precision
      </motion.p>
    </div>
  );
}

function FilterBar({ active, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="flex flex-wrap items-center justify-center gap-2 mb-16"
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-8 py-2.5 text-[13px] font-medium rounded-full transition-all duration-500"
            style={{
              color: isActive ? "#FFFFFF" : "#6B5F5A",
              background: isActive ? "linear-gradient(135deg, #C56A45 0%, #B85A38 100%)" : "transparent",
              border: isActive ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: isActive ? "0 8px 20px rgba(197, 106, 69, 0.28)" : "none",
              letterSpacing: "0.01em"
            }}
          >
            {cat}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function Tile({ image, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer mb-4 break-inside-avoid"
      style={{
        borderRadius: "20px",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",
      }}
    >
      <img
        src={image.imageUrl}
        alt={image.title}
        loading="lazy"
        className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-[1.06]"
        style={{ filter: "brightness(0.96) saturate(1.02) contrast(1.01)" }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        style={{
          background: "linear-gradient(to top, rgba(26,22,20,0.88) 0%, rgba(26,22,20,0.4) 45%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-600">
        <div className="flex items-end justify-between">
          <div>
            <span
              className="inline-block text-[11px] font-medium px-4 py-2 rounded-full mb-3"
              style={{
                color: "#FFFFFF",
                background: "rgba(197, 106, 69, 0.95)",
                backdropFilter: "blur(10px)",
                letterSpacing: "0.02em"
              }}
            >
              {image.category}
            </span>
            <h3 className="text-white text-sm font-light">{image.title}</h3>
          </div>

          <motion.div
            whileHover={{ scale: 1.12, rotate: 45 }}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M11 5L5 11M11 5H7M11 5v4"
                stroke="#1A1614"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({ images, index, direction, onClose, onPrev, onNext }) {
  const image = images[index];

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(250, 248, 245, 0.98)",
          backdropFilter: "blur(40px)",
        }}
      />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium" style={{ color: "#6B5F5A" }}>
            {index + 1} / {images.length}
          </span>
          <span className="w-px h-4" style={{ background: "rgba(107, 95, 90, 0.2)" }} />
          <span
            className="text-xs font-medium px-4 py-2 rounded-full"
            style={{
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #C56A45, #B85A38)",
            }}
          >
            {image.category}
          </span>
        </div>
        
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-pointer"
        >
          <FiX className="text-xl" style={{ color: "#1A1614" }} />
        </motion.button>
      </div>

      {/* Image */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-20 py-24" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.figure
            key={image._id}
            custom={direction}
            initial={(d) => ({ opacity: 0, x: d > 0 ? 100 : -100, scale: 0.9 })}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={(d) => ({ opacity: 0, x: d > 0 ? -100 : 100, scale: 0.9 })}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[85vh] max-w-6xl"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="max-h-[85vh] max-w-full w-auto h-auto object-contain soft-shadow-lg"
              style={{
                borderRadius: "20px",
              }}
            />
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        whileHover={{ scale: 1.1, x: -4 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-8 z-10 w-14 h-14 rounded-full glass-strong flex items-center justify-center cursor-pointer"
      >
        <FiChevronLeft className="text-2xl" style={{ color: "#1A1614" }} />
      </motion.button>

      <motion.button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        whileHover={{ scale: 1.1, x: 4 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-8 z-10 w-14 h-14 rounded-full glass-strong flex items-center justify-center cursor-pointer"
      >
        <FiChevronRight className="text-2xl" style={{ color: "#1A1614" }} />
      </motion.button>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from API
  const fetchImages = useCallback(async () => {
    try {
      const res = await galleryAPI.getAll();
      if (res.data && res.data.length > 0) {
        setImages(res.data);
      } else {
        // Use fallback images if no images in database
        setImages(DEFAULT_IMAGES);
      }
    } catch (error) {
      console.log('Using fallback images');
      setImages(DEFAULT_IMAGES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
    
    // Auto-refresh every 10 seconds to detect new uploads
    const interval = setInterval(fetchImages, 10000);
    
    return () => clearInterval(interval);
  }, [fetchImages]);

  const filtered = activeCategory === "All" ? images : images.filter(img => img.category === activeCategory);

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setDirection(1);
    setLightboxIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setLightboxIndex(null);
  }, []);

  return (
    <>
      <section
        id="portfolio"
        className="relative section-padding overflow-hidden"
        style={{ background: "linear-gradient(180deg, #F5F2EE 0%, #FAF8F5 50%, #F5F2EE 100%)" }}
      >
        <div className="mx-auto px-6 sm:px-8 max-w-7xl">
          <SectionHeader />
          <FilterBar active={activeCategory} onChange={handleCategoryChange} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-5"
            >
              {loading ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-sm" style={{ color: "#6B5F5A" }}>Loading gallery...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-sm" style={{ color: "#6B5F5A" }}>No images found in this category</p>
                </div>
              ) : (
                filtered.map((image, i) => (
                  <Tile key={image._id} image={image} onClick={() => openLightbox(i)} />
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 text-center"
          >
            <p className="text-sm mb-7" style={{ color: "#6B5F5A" }}>
              Ready to create your own story?
            </p>
            <motion.button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="px-11 py-[17px] rounded-full text-[13px] font-medium text-white transition-smooth"
              style={{
                background: "linear-gradient(135deg, #C56A45 0%, #B85A38 100%)",
                boxShadow: "0 12px 32px rgba(197, 106, 69, 0.28)",
                letterSpacing: "0.01em"
              }}
            >
              Book Your Session
            </motion.button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            direction={direction}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
