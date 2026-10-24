import { MapPin } from "lucide-react";
import OptimizedImage from "../OptimizedImage";
import { ActionLink, Reveal } from "../home/Primitives";
import { profile } from "../../data/profile";
import { contact } from "../../data/contact";
import usePointerSurface from "../../hooks/usePointerSurface";

export default function AboutIntroduction() {
  const depth = usePointerSurface({ tilt: .4 });
  return <section className="about-introduction" aria-labelledby="page-heading">
    <Reveal className="about-intro-copy"><p className="about-label">About</p><h1 id="page-heading">{profile.name}</h1>
      <p className="about-role">{profile.title}</p><p className="about-location"><MapPin size={14} aria-hidden="true" />{contact.location}</p>
      <div className="about-story">{profile.aboutParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      <div className="about-actions"><ActionLink href={contact.resumePath} external primary>View Résumé PDF</ActionLink><ActionLink to="/contact">Contact Me</ActionLink></div>
    </Reveal>
    <Reveal className="about-portrait-reveal"><div className="about-portrait-depth" {...depth}><figure className="about-portrait">
      <OptimizedImage src="/profile-pic.jpg" alt="Portrait of Mikko Pangilinan" sizes="(max-width: 767px) 180px, (max-width: 1023px) 240px, 280px" loading="eager" fetchPriority="high" />
    </figure></div></Reveal>
  </section>;
}
