import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroAPI } from "../services/api";
import couple from "../assets/images/couple.jpg";

export default function Hero() {
  const [heroImage, setHeroImage] = useState(couple);
  const sectionRef = useRef(null);

  useEffect(() => {
    heroAPI.get().then(res => {
      if (res.data?.imageUrl) setHeroImage(res.data.imageUrl);
    }).catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen flex overflow-hidden"
    >
      {/* Left Side - Text Content with Dark Background */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 w-full lg:w-[45%] flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-20"
        style={{ 
          background: "#2C2826"
        }}
      >
        <div className="max-w-lg w-full">
          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex items-center gap-4"
          >
            <span className="block w-12 h-[1px]" style={{ background: "#C56A45" }} />
            <span
              className="text-[9px] tracking-[0.4em] uppercase font-semibold"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              STUDIO Y7
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mb-7"
            style={{ 
              color: "#FFFFFF",
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.01em"
            }}
          >
            Where Every Moment
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#D17A56" }}>Becomes Timeless</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[14px] sm:text-[15px] mb-12 leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Premium photography for weddings, portraits,
            <br />
            and life's most meaningful celebrations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.button
              onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full text-[13px] font-medium text-white transition-all duration-300"
              style={{
                background: "#C56A45",
                letterSpacing: "0.02em"
              }}
            >
              Explore Our Work
            </motion.button>

            <motion.button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ y: -2, scale: 1.02, borderColor: "rgba(255,255,255,0.6)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full text-[13px] font-medium transition-all duration-300"
              style={{
                color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.35)",
                letterSpacing: "0.02em"
              }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Hero Image */}
      <motion.div 
        style={{ y: imageY }} 
        className="absolute lg:relative right-0 top-0 w-full lg:w-[55%] h-full z-10 opacity-25 lg:opacity-100"
      >
        <div className="w-full h-full relative">
          <img
            src={heroImage}
            alt="Studio Y7 Photography"
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: "center center"
            }}
            loading="eager"
          />
          
          {/* Gradient blend on mobile */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background: "linear-gradient(to right, #2C2826 0%, rgba(44,40,38,0.8) 30%, transparent 70%)",
            }}
          />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5"
      >
        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
        <span
          className="text-[8px] uppercase tracking-[0.35em] font-medium"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          SCROLL TO EXPLORE
        </span>
      </motion.div>
    </section>
  );
}
