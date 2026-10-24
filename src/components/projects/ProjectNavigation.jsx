import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectNavigation({ previous, next }) {
  return <nav className="case-navigation" aria-label="Project navigation">
    {previous && <Link to={`/projects/${previous.slug}`} className="case-neighbor" rel="prev">
      <span><ArrowLeft size={15} aria-hidden="true" /> Previous project</span><strong>{previous.title}</strong>
    </Link>}
    <Link to="/projects" className="case-all-projects">Back to all projects</Link>
    {next && <Link to={`/projects/${next.slug}`} className="case-neighbor is-next" rel="next">
      <span>Next project <ArrowRight size={15} aria-hidden="true" /></span><strong>{next.title}</strong>
    </Link>}
  </nav>;
}
