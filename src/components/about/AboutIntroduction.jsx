import { MapPin } from "lucide-react";
import OptimizedImage from "../OptimizedImage";
import { ActionLink, Reveal } from "../home/Primitives";
import { profile } from "../../data/profile";
import { contact } from "../../data/contact";

export default function AboutIntroduction() {
  return <section className="about-introduction" aria-labelledby="page-heading">
    <Reveal className="about-intro-copy"><p className="about-label">About</p><h1 id="page-heading">{profile.name}</h1>
      <p className="about-role">{profile.title}</p><p className="about-location"><MapPin size={14} aria-hidden="true" />{contact.location}</p>
      <div className="about-story">{profile.aboutParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      <div className="about-actions"><ActionLink href={contact.resumePath} external primary>View Résumé PDF</ActionLink><ActionLink to="/contact">Contact Me</ActionLink></div>
    </Reveal>
    <Reveal className="about-portrait-reveal"><figure className="about-portrait">
      <OptimizedImage src="/profile-pic.jpg" alt="Portrait of Mikko Pangilinan" sizes="(max-width: 767px) clamp(200px, 60vw, 230px), (max-width: 1023px) 240px, 300px" loading="eager" fetchPriority="high" />
    </figure></Reveal>
  </section>;
}
