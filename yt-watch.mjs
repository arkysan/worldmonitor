import { Innertube } from "youtubei.js";
import fs from "fs";
import path from "path";

const OUT = path.join(process.env.TEMP, "yt-transcripts");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const videos = [
  { id: "BacJ6sEhqMo", title: "The Four Types of Memory Every AI Agent Needs" },
  { id: "ClSQEOMopNc", title: "Claude room redesign disruption" },
  { id: "oGEEto8LWWo", title: "How To Build an AI Influencer In 10 Minutes" }
];

const yt = await Innertube.create({ retrieve_player: false });
const results = [];

for (const v of videos) {
  const result = { id: v.id, title: v.title, meta: null, transcript: "", description: "" };
  try {
    const info = await yt.getInfo(v.id);
    result.meta = {
      title: info.basic_info?.title,
      author: info.basic_info?.author,
      duration: info.basic_info?.duration,
      views: info.basic_info?.view_count,
      keywords: info.basic_info?.keywords?.slice(0, 15)
    };
    result.description = info.basic_info?.short_description?.substring(0, 1500) || "";

    try {
      const t = await info.getTranscript();
      const segs = t?.transcript?.content?.body?.initial_segments || [];
      result.transcript = segs.map(s => s.snippet?.text).filter(Boolean).join(" ");
    } catch(te) { result.transcript = ""; }

    console.log(`\n=== ${result.meta.title} ===`);
    console.log(`Author: ${result.meta.author} | Duration: ${result.meta.duration}s`);
    console.log(`Keywords: ${(result.meta.keywords||[]).join(", ")}`);
    console.log(`Description:\n${result.description.substring(0,500)}`);
    if (result.transcript) {
      console.log(`Transcript (first 500):\n${result.transcript.substring(0,500)}`);
    } else {
      console.log("No transcript — using description + metadata");
    }
    fs.writeFileSync(path.join(OUT, v.id + ".json"), JSON.stringify(result, null, 2));
  } catch(e) { console.log(`Error ${v.id}: ${e.message}`); }
  results.push(result);
}

fs.writeFileSync(path.join(OUT, "all-videos.json"), JSON.stringify(results, null, 2));
console.log("\nAll done.");
