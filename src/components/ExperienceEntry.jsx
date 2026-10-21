export default function ExperienceEntry({ experience, preview = false }) {
  return (
    <article
      className="p-6 md:p-8 border rounded-2xl"
      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="text-xl font-bold mb-1">{experience.role}</h3>
          <p className="font-medium break-words">{experience.company}</p>
          {!preview && <p className="text-sm opacity-70 mt-1">{experience.department}</p>}
        </div>
        <div className="text-sm opacity-70 md:text-right md:shrink-0">
          <p>{experience.period}</p>
          <p className="mt-1">{experience.arrangement}</p>
        </div>
      </div>
      <p className="leading-relaxed opacity-90">{preview ? experience.preview : experience.summary}</p>
      {!preview && experience.responsibilities?.length > 0 && (
        <ul className="mt-5 list-disc pl-5 space-y-3 text-sm leading-relaxed opacity-90">
          {experience.responsibilities.map(responsibility => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
