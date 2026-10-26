import { MapPin } from "lucide-react";
import OptimizedImage from "../OptimizedImage";
import { ActionLink, Reveal } from "../home/Primitives";
import { profile } from "../../data/profile";
import { contact } from "../../data/contact";
import { motionTiming } from "../../utils/motion";

export default function AboutIntroduction() {
  return <section className="about-introduction" aria-labelledby="page-heading">
    <div className="about-intro-copy"><Reveal as="p" className="about-label" entrance preset="fade">About</Reveal><Reveal as="h1" id="page-heading" entrance preset="mask" delay={motionTiming.stagger}>{profile.name}</Reveal>
      <Reveal as="p" className="about-role" entrance preset="rise" delay={5 * motionTiming.stagger}>{profile.title}</Reveal><Reveal as="p" className="about-location" entrance preset="fade" delay={5 * motionTiming.stagger}><MapPin size={14} aria-hidden="true" />{contact.location}</Reveal>
      <Reveal className="about-story" entrance preset="soft" delay={2 * motionTiming.stagger}>{profile.aboutParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</Reveal>
      <Reveal className="about-actions" entrance preset="fade" delay={6 * motionTiming.stagger}><ActionLink href={contact.resumePath} external primary>View Résumé PDF</ActionLink><ActionLink to="/contact">Contact Me</ActionLink></Reveal>
    </div>
    <Reveal className="about-portrait-reveal" entrance preset="portrait" delay={4 * motionTiming.stagger} duration={0.7}><figure className="about-portrait">
      <OptimizedImage src="/profile-pic.jpg" alt="Portrait of Mikko Pangilinan" sizes="(max-width: 767px) clamp(200px, 60vw, 230px), (max-width: 1023px) 240px, 300px" loading="eager" fetchPriority="high" />
    </figure></Reveal>
  </section>;
}
