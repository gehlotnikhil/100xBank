import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
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
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-b1f3c6e3a90c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Your Financial <br />
              <span className="text-yellow-300">Future</span>, Simplified
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg mx-auto md:mx-0">
              Take control of your money with tools designed to save, grow, and thrive—securely and effortlessly.
            </p>
            
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
       
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why 100xBank?
          </motion.h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            We’re here to make banking intuitive, secure, and tailored to your needs.
          </p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Effortless Banking",
                desc: "Access your accounts, transfer funds, and pay bills in seconds.",
                icon: "⚡",
              },
              {
                title: "Unbreakable Security",
                desc: "Multi-layered encryption and real-time fraud monitoring.",
                icon: "🛡️",
              },
              {
                title: "Smart Insights",
                desc: "Personalized tools to track spending and plan your future.",
                icon: "📈",
              },
              {
                title: "Always Available",
                desc: "24/7 support via chat, phone, or email—whenever you need us.",
                icon: "📞",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                variants={itemVariants}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Your Financial Journey Starts Here
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "Step 1: Sign Up",
                desc: "Create your account in under 2 minutes with no fees.",
                icon: "✨",
              },
              {
                step: "Step 2: Explore",
                desc: "Discover tools to manage, save, and grow your money.",
                icon: "🔍",
              },
              {
                step: "Step 3: Succeed",
                desc: "Achieve your goals with our expert guidance and insights.",
                icon: "🏆",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
                variants={itemVariants}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-lg font-bold w-12 h-12 flex items-center justify-center rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{step.step}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Join Our Community
          </motion.h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Hear from customers who’ve transformed their financial lives with 100xBank.
          </p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                quote: "Switching to 100xBank was a game-changer. I save time and feel secure!",
                author: "Emily R.",
                role: "Small Business Owner",
              },
              {
                quote: "The budgeting tools helped me plan my dream vacation in just six months.",
                author: "Michael K.",
                role: "Teacher",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
                variants={itemVariants}
              >
                <p className="text-gray-600 text-lg italic mb-4">"{testimonial.quote}"</p>
                <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 tracking-tight">
            Ready to Transform Your Banking?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Open your account today and experience banking designed for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-yellow-500 transition duration-200"
          >
            Get Started for Free
          </motion.button>
          <p className="mt-4 text-sm opacity-80">
            No fees, no hassle—just smarter banking.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">100xBank</h3>
            <p className="text-sm text-gray-400">
              Your trusted partner for modern, secure, and simple banking.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/personal" className="hover:text-yellow-400 transition">Personal Banking</a>
              </li>
              <li>
                <a href="/business" className="hover:text-yellow-400 transition">Business Banking</a>
              </li>
              <li>
                <a href="/savings" className="hover:text-yellow-400 transition">Savings Plans</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="hover:text-yellow-400 transition">FAQ</a>
              </li>
              <li>
                <a href="/blog" className="hover:text-yellow-400 transition">Blog</a>
              </li>
              <li>
                <a href="/support" className="hover:text-yellow-400 transition">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm text-gray-400">Email: gehlotnikhil38@gmail.com</p>
            <p className="text-sm text-gray-400">Phone: (+91) 7357120937</p>
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