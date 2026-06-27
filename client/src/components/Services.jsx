import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import weddingImg from "../assets/images/wedding.jpg";
import wedding2Img from "../assets/images/wedding2.jpg";
import coupleImg from "../assets/images/couple.jpg";
import portraitImg from "../assets/images/portrait1.jpg";
import outdoorImg from "../assets/images/outdoor.jpg";
import corporateImg from "../assets/images/corporate.jpg";
import cinematicImg from "../assets/images/cinematic.jpg";
import portrait2Img from "../assets/images/portrait2.jpg";

const SERVICES = [
  { 
    title: "Wedding Photography", 
    image: weddingImg,
    span: "lg:col-span-2 lg:row-span-2"
  },
  { 
    title: "Traditional Wedding", 
    image: wedding2Img,
    span: "lg:col-span-1"
  },
  { 
    title: "Couple Shoot", 
    image: coupleImg,
    span: "lg:col-span-1"
  },
  { 
    title: "Portrait Photography", 
    image: portraitImg,
    span: "lg:col-span-1"
  },
  { 
    title: "Outdoor Photography", 
    image: outdoorImg,
    span: "lg:col-span-1"
  },
  { 
    title: "Corporate Events", 
    image: corporateImg,
    span: "lg:col-span-1"
  },
  { 
    title: "Birthday Shoot", 
    image: portrait2Img,
    span: "lg:col-span-1"
  },
  { 
    title: "Cinematic Reels", 
    image: cinematicImg,
    span: "lg:col-span-1"
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="services" 
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5F2EE 0%, #FAF8F5 50%, #F5F2EE 100%)" }}
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
            <span className="block w-16 h-[1px]" style={{ background: "linear-gradient(to right, transparent, rgba(197,106,69,0.4))" }} />
            <span className="text-[10px] uppercase tracking-[0.35em] font-medium" style={{ color: "#6B5F5A" }}>
              What We Offer
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
            Photography Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-[16px] max-w-2xl mx-auto leading-[1.7]"
            style={{ color: "#6B5F5A" }}
          >
            From intimate moments to grand celebrations, we offer comprehensive photography services tailored to your unique story
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px]">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[24px] cursor-pointer ${service.span}`}
              style={{ 
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid rgba(255,255,255,0.4)"
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.9) saturate(1.1)" }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Dark Gradient Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(to top, rgba(26,22,20,0.92) 0%, rgba(26,22,20,0.6) 45%, rgba(26,22,20,0.3) 70%, transparent 100%)",
                }}
              />

              {/* Hover Gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(to top, rgba(197,106,69,0.7) 0%, rgba(197,106,69,0.3) 50%, transparent 100%)",
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="flex items-end justify-between">
                  <h3 
                    className="font-display text-white text-[22px] font-light leading-[1.2] group-hover:translate-y-[-4px] transition-transform duration-500"
                    style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                  >
                    {service.title}
                  </h3>

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 45 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <FiArrowUpRight className="text-lg" style={{ color: "#1A1614" }} />
                  </motion.div>
                </div>
              </div>

              {/* Glass Border on Hover */}
              <div 
                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ border: "1px solid rgba(255,255,255,0.5)" }} 
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm mb-6" style={{ color: "#6B5F5A" }}>
            Not sure which service fits your needs?
          </p>
          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-[15px] rounded-full text-[13px] font-medium glass-strong transition-smooth"
            style={{
              color: "#1A1614",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
              letterSpacing: "0.01em"
            }}
          >
            Let's Talk About Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
