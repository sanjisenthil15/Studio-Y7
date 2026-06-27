import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMapPin, FiCalendar, FiHeart, FiCamera } from "react-icons/fi";
import couple from "../assets/images/couple.jpg";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
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
              Our Story
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
            Capturing Life's
            <br />
            <span style={{ fontStyle: "italic", color: "#C56A45" }}>Most Beautiful Moments</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-[16px] max-w-2xl mx-auto leading-[1.7]"
            style={{ color: "#6B5F5A" }}
          >
            Every photograph tells a story. We're here to tell yours with authenticity and artistry.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[28px] shadow-2xl" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.1)" }}>
              <img
                src={couple}
                alt="Studio Y7 Photography"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "4/5" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-[28px] font-light mb-4" style={{ color: "#1A1614", letterSpacing: "-0.01em" }}>
                Studio Story
              </h3>
              <p className="text-[15px] leading-[1.75] mb-4" style={{ color: "#6B5F5A" }}>
                Started in 2021, Studio Y7 is a creative photography studio based in Tiruchengode, dedicated to capturing life's most precious moments with authenticity and artistry.
              </p>
              <p className="text-[15px] leading-[1.75]" style={{ color: "#6B5F5A" }}>
                With 5 years of experience, we specialize in wedding photography, portraits, and event coverage—creating timeless images that tell your unique story.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FiCalendar, label: "Started in 2021" },
                { icon: FiMapPin, label: "Tiruchengode" },
                { icon: FiHeart, label: "5 Years Experience" },
                { icon: FiCamera, label: "Editorial Style" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 p-4 rounded-2xl glass-strong"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(197,106,69,0.12), rgba(197,106,69,0.05))" }}>
                    <item.icon className="text-base" style={{ color: "#C56A45" }} />
                  </div>
                  <p className="text-[13px] font-medium leading-[1.4]" style={{ color: "#1A1614" }}>
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
