import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Send } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); 
  // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/maqdpqvz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => {
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com/mpangilinann" },
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/mikko-pangilinan-2a6345336/" },
    { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/m.pangilinan20/" },
  ];

  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <Helmet>
        <title>Contact | Mikko Pangilinan</title>
        <meta
          name="description"
          content="Get in touch with Mikko Pangilinan for collaboration, internship opportunities, or front-end development projects."
        />
      </Helmet>

      <section className="px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              GET IN TOUCH
            </h1>

            <div
              className="h-0.5 w-24 mx-auto my-6 rounded-full"
              style={{ backgroundColor: "var(--text-color)" }}
            />

            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I’ll try my best to get back to you.
            </p>
          </motion.div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* CONTACT FORM */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* NAME */}
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2 opacity-70">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border outline-none transition"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                    color: "var(--text-color)",
                  }}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2 opacity-70">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border outline-none transition"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                    color: "var(--text-color)",
                  }}
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2 opacity-70">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="6"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border outline-none resize-none transition"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                    color: "var(--text-color)",
                  }}
                />
              </div>

              {/* BUTTON */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={status === "sending"}
                className="w-full py-4 rounded-full uppercase text-sm tracking-widest font-medium flex items-center justify-center gap-2 transition"
                style={{
                  backgroundColor: "var(--text-color)",
                  color: "var(--bg-color)",
                  opacity: status === "sending" ? 0.6 : 1,
                }}
              >
                {status === "sending" && "Sending..."}
                {status === "success" && "Message Sent!"}
                {status === "error" && "Something went wrong"}
                {status === "idle" && (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* RIGHT SIDE INFO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center space-y-12"
            >
              {/* DIRECT EMAIL */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Direct Contact
                </h2>
                <a
                  href="mailto:mikko.pangilinan@email.com"
                  className="flex items-center gap-3 text-lg opacity-80 hover:opacity-100 transition"
                >
                  <Mail size={20} />
                  mikkopangilinan39@gmail.com
                </a>
              </div>

              {/* SOCIALS */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Connect With Me
                </h2>

                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="p-4 rounded-xl border transition"
                      style={{
                        borderColor: "var(--card-border)",
                        backgroundColor: "var(--card-bg)",
                      }}
                    >
                      <social.icon size={22} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* STATUS CARD */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <h3 className="font-bold mb-3">
                  Current Status
                </h3>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="opacity-80">
                    Available for opportunities
                  </span>
                </div>

                <p className="text-sm opacity-70 leading-relaxed">
                  I'm actively seeking internship or junior developer positions
                  where I can contribute and grow as a front-end developer.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}