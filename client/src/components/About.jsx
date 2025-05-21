import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Empowering Your Financial Journey
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            At 100xBank, we’re redefining banking to be simple, secure, and centered around you.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition duration-200"
          >
            Join Us Today
          </motion.button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              We believe banking should empower, not overwhelm. Our mission is to provide intuitive tools, unbreakable security, and personalized support to help you achieve your financial dreams—whether it’s saving for a home, growing a business, or planning for the future.
            </p>
            <p className="text-gray-600 text-lg">
              Founded in 2020, 100xBank combines cutting-edge technology with a human touch to make banking accessible for everyone.
            </p>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow">
              🌍 Serving Globally
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Core Values
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Transparency",
                desc: "No hidden fees or surprises—just clear, honest banking.",
                icon: "🔎",
              },
              {
                title: "Innovation",
                desc: "Cutting-edge tools to simplify and enhance your experience.",
                icon: "💡",
              },
              {
                title: "Customer First",
                desc: "Your goals drive everything we do, every day.",
                icon: "❤️",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                variants={itemVariants}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Meet Our Leadership
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Alex Carter",
                role: "CEO & Founder",
                desc: "Leading with a vision to make banking simple and accessible for all.",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Maya Patel",
                role: "Chief Technology Officer",
                desc: "Driving innovation with secure, user-friendly technology.",
                img: "https://images.unsplash.com/photo-1573496359142-b8d877c828f0?auto=format&fit=crop&w=400&q=80",
              },
              {
                name: "Liam Chen",
                role: "Head of Customer Success",
                desc: "Ensuring every customer feels supported and empowered.",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                variants={itemVariants}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Ready to Experience Better Banking?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join 100xBank and discover a banking experience built for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition duration-200"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">100xBank</h3>
            <p className="text-sm text-gray-400">
              Simplifying your financial journey with trust and innovation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-yellow-400 transition">About Us</a>
              </li>
              <li>
                <a href="/careers" className="hover:text-yellow-400 transition">Careers</a>
              </li>
              <li>
                <a href="/blog" className="hover:text-yellow-400 transition">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="hover:text-yellow-400 transition">FAQ</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-400 transition">Contact Us</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <p className="text-sm text-gray-400">Email: support@100xbank.com</p>
            <p className="text-sm text-gray-400">Phone: (888) 555-1234</p>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
          © 2025 100xBank. All rights reserved.
        </div>
      </footer>
    </div>
  );
}