import { Link } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";
import { contact } from "../../data/contact";

export default function ResumeActions({ includeDownload = true }) {
  return <div className="resume-actions">
    <a href={contact.resumePath} target="_blank" rel="noopener noreferrer" className="soft-button is-primary" aria-label="View PDF résumé (opens in a new tab)">
      View PDF Résumé <ArrowUpRight size={16} aria-hidden="true" />
    </a>
    {includeDownload && <a href={contact.resumePath} download className="soft-button" aria-label="Download PDF résumé">Download PDF <Download size={16} aria-hidden="true" /></a>}
    <Link to="/contact" className="soft-button">Contact Me <ArrowUpRight size={16} aria-hidden="true" /></Link>
  </div>;
}
