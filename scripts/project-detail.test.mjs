import test from "node:test";
import assert from "node:assert/strict";
import { getProjectDetails } from "../src/utils/projectDetail.js";

test("absent and whitespace-only optional content produces no empty sections", () => {
  const result = getProjectDetails({ image: "/primary.png", status: "  ", teamContext: "", contributions: ["", "  ", null] });
  assert.deepEqual(result.sections, []);
  assert.deepEqual(result.gallery, []);
  assert.deepEqual(result.targetUsers, []);
  assert.equal(result.type, null);
  assert.equal(result.status, null);
  assert.equal(result.teamContext, null);
});

test("populated optional facts and lists retain wording and order without mutation", () => {
  const project = { type: "Fixture type", status: "Fixture status", teamContext: "Fixture team", targetUsers: ["First audience", "Second audience"], contributions: ["First contribution", "Second contribution"], challenges: ["A challenge"], lessons: ["A lesson"] };
  const before = structuredClone(project);
  const result = getProjectDetails(project);
  assert.equal(result.type, project.type);
  assert.equal(result.status, project.status);
  assert.equal(result.teamContext, project.teamContext);
  assert.deepEqual(result.targetUsers, project.targetUsers);
  assert.deepEqual(result.sections.map(section => [section.id, section.items]), [["contributions", project.contributions], ["challenges", project.challenges], ["lessons", project.lessons]]);
  assert.deepEqual(project, before);
});

test("gallery excludes primary, duplicate and incomplete images while retaining captions", () => {
  const project = { image: "/primary.png", gallery: [
    { src: "/primary.png", alt: "Primary repeated" },
    { src: "/second.png", alt: "Second interface", caption: "Existing caption" },
    { src: "/second.png", alt: "Duplicate" },
    { src: "/third.png", alt: "Third interface" },
    { src: "/invalid.png", alt: " " }, null,
  ] };
  const before = structuredClone(project);
  assert.deepEqual(getProjectDetails(project).gallery, [project.gallery[1], project.gallery[3]]);
  assert.deepEqual(project, before);
});
