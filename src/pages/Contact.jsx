import PageMetadata from "../components/PageMetadata";
import { socialLinks } from "../data/socialLinks";
import { contact } from "../data/contact";
import { profile } from "../data/profile";
import { useState, useRef, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { contactLimits, validateContactFields } from "../lib/contactValidation";
import useReducedMotion from "../hooks/useReducedMotion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); 
  const [errors, setErrors] = useState({});
  const requestController = useRef(null);
  const inFlight = useRef(false);
  const startedAt = useRef(Date.now());
  const reducedMotion = useReducedMotion();
  const [feedback, setFeedback] = useState("");

  useEffect(() => () => requestController.current?.abort("unmount"), []);

  const validate = field => validateContactFields({ [field.name]: field.value }).errors[field.name] || "";
  const handleBlur = event => {
    const field = event.target;
    setErrors(previous => ({ ...previous, [field.name]: validate(field) }));
  };
  const handleChange = event => {
    const field = event.target;
    setFormData(previous => ({ ...previous, [field.name]: field.value }));
    setErrors(previous => previous[field.name] ? { ...previous, [field.name]: validate(field) } : previous);
    if (status === "success") { setStatus("idle"); setFeedback(""); }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const { values, errors: validationErrors } = validateContactFields(formData);
    setErrors(validationErrors);
    const firstInvalid = Object.keys(validationErrors)[0];
    if (firstInvalid) {
      setStatus("idle");
      setFeedback("Please correct the highlighted fields.");
      requestAnimationFrame(() => form.elements.namedItem(firstInvalid)?.focus());
      return;
    }
    inFlight.current = true;
    const controller = new AbortController();
    requestController.current = controller;
    const timeout = setTimeout(() => controller.abort("timeout"), 15_000);
    setFormData(values);
    setStatus("sending");
    setFeedback("Sending your message...");
    const website = form.elements.namedItem("website").value;
    try {
      const response = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, website, startedAt: startedAt.current }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => null);
      if (response.ok && payload?.success === true) {
        setStatus("success");
        setFeedback("Your message has been sent. Thank you for getting in touch!");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        startedAt.current = Date.now();
      } else {
        // Only known, locally authored field errors reach the page.
        const fieldErrors = {};
        for (const field of Object.keys(contactLimits)) {
          if (payload?.errors?.[field]) fieldErrors[field] = validateContactFields(values).errors[field] || "Please check this field and try again.";
        }
        setErrors(fieldErrors);
        setStatus("error");
        setFeedback(response.status === 400 && !Object.keys(fieldErrors).length
          ? "Please take a moment, check your entries, and try again."
          : "We couldn't confirm your message was sent. Your text is still here; please try again later.");
      }
    } catch {
      if (controller.signal.reason !== "unmount") {
        setStatus("error");
        setFeedback("We couldn't confirm your message was sent. Your text is still here; please try again later.");
      }
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      if (requestController.current === controller) requestController.current = null;
    }
  };


  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
        <PageMetadata />

      <section className="px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <Motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 id="page-heading" className="text-5xl md:text-7xl font-bold tracking-tight">
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
          </Motion.div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* CONTACT FORM */}
            <Motion.form
              noValidate
              onSubmit={handleSubmit}
              initial={reducedMotion ? false : { opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="sr-only" aria-hidden="true" inert>
                <label htmlFor="contact-website">Leave this field empty</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              {/* NAME */}
              <div>
                <label htmlFor="contact-name" className="block text-sm uppercase tracking-widest mb-2 opacity-70">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  minLength={contactLimits.name.min}
                  maxLength={contactLimits.name.max}
                  readOnly={status === "sending"}
                  autoComplete="name"
                  onBlur={handleBlur}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
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
                {errors.name && <p id="contact-name-error" className="text-sm mt-2">{errors.name}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="contact-email" className="block text-sm uppercase tracking-widest mb-2 opacity-70">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  minLength={contactLimits.email.min}
                  maxLength={contactLimits.email.max}
                  readOnly={status === "sending"}
                  autoComplete="email"
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
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
                {errors.email && <p id="contact-email-error" className="text-sm mt-2">{errors.email}</p>}
              </div>

              {/* MESSAGE */}
              <div>
                <label htmlFor="contact-message" className="block text-sm uppercase tracking-widest mb-2 opacity-70">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  minLength={contactLimits.message.min}
                  maxLength={contactLimits.message.max}
                  readOnly={status === "sending"}
                  autoComplete="off"
                  onBlur={handleBlur}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-hint contact-message-error" : "contact-message-hint"}
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
                <p id="contact-message-hint" className="text-sm mt-2 opacity-70">10–5,000 characters. Please avoid sharing sensitive information.</p>
                {errors.message && <p id="contact-message-error" className="text-sm mt-2">{errors.message}</p>}
              </div>

              {/* BUTTON */}
              <Motion.button
                type="submit"
                aria-busy={status === "sending"}
                whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                disabled={status === "sending"}
                aria-label={status === "sending" ? "Sending message" : status === "success" ? "Message sent. Send another message" : status === "error" ? "Try sending again" : "Send Message"}
                className="w-full py-4 rounded-full uppercase text-sm tracking-widest font-medium flex items-center justify-center gap-2 transition"
                style={{
                  backgroundColor: "var(--text-color)",
                  color: "var(--bg-color)",
                  opacity: status === "sending" ? 0.6 : 1,
                }}
              >
                {status === "sending" && "Sending..."}
                {status === "success" && "Message Sent!"}
                {status === "error" && "Try sending again"}
                {status === "idle" && (
                  <>
                    Send Message
                    <Send aria-hidden="true" size={16} />
                  </>
                )}
              </Motion.button>
              <p id="contact-feedback" className="text-sm leading-relaxed" role="status" aria-live="polite" aria-atomic="true" aria-relevant="text">{feedback || (Object.values(errors).some(Boolean) ? "Please correct the highlighted fields." : "")}</p>
            </Motion.form>

            {/* RIGHT SIDE INFO */}
            <Motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center space-y-12"
            >
              {/* DIRECT EMAIL */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Direct Contact
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-lg opacity-80 hover:opacity-100 transition"
                >
                  <Mail aria-hidden="true" size={20} />
                  {contact.email}
                </a>
              </div>

              {/* SOCIALS */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Connect With Me
                </h2>

                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Motion.a
                      key={social.label}
                      href={social.url}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={reducedMotion ? undefined : { scale: 1.1, y: -3 }}
                      className="p-4 rounded-xl border transition"
                      style={{
                        borderColor: "var(--card-border)",
                        backgroundColor: "var(--card-bg)",
                      }}
                    >
                      <social.icon aria-hidden="true" size={22} />
                    </Motion.a>
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
                <h2 className="font-bold mb-3">
                  Current Status
                </h2>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="opacity-80">
                    Available for opportunities
                  </span>
                </div>

                <p className="text-sm opacity-70 leading-relaxed">
                  {profile.opportunityText}
                </p>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
