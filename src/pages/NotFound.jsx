import { Link } from "react-router-dom";
import PageMetadata from "../components/PageMetadata";

export default function NotFound() {
  return (
    <section className="min-h-[75vh] px-6 py-24 flex flex-col items-center justify-center text-center gap-6">
      <PageMetadata title="Page Not Found | Mikko Pangilinan" />
      <h1 className="text-5xl font-bold tracking-tight">Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="px-8 py-4 rounded-full border" style={{ borderColor: "var(--text-color)" }}>Back to Home</Link>
    </section>
  );
}
