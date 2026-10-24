const hasText = value => typeof value === "string" && value.trim().length > 0;
const textList = value => Array.isArray(value) ? value.filter(hasText) : [];

// Optional content stays catalog-owned; empty or duplicate entries create no UI.
export function getProjectDetails(project) {
  const seenImages = new Set([project.image]);
  return {
    type: hasText(project.type) ? project.type : null,
    status: hasText(project.status) ? project.status : null,
    teamContext: hasText(project.teamContext) ? project.teamContext : null,
    targetUsers: textList(project.targetUsers),
    sections: [
      { id: "contributions", title: "My Contributions", items: textList(project.contributions) },
      { id: "challenges", title: "Challenges", items: textList(project.challenges) },
      { id: "lessons", title: "Lessons Learned", items: textList(project.lessons) },
    ].filter(section => section.items.length > 0),
    gallery: (Array.isArray(project.gallery) ? project.gallery : []).filter(image => {
      if (!image || !hasText(image.src) || !hasText(image.alt) || seenImages.has(image.src)) return false;
      seenImages.add(image.src);
      return true;
    }),
  };
}
