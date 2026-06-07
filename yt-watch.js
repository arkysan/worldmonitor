const { Innertube } = require("youtubei.js");
const fs = require("fs");
const OUT = process.env.TEMP + "\\yt-transcripts";
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const videos = [
  { id: "BacJ6sEhqMo", title: "The Four Types of Memory Every AI Agent Needs" },
  { id: "ClSQEOMopNc", title: "Claude room redesign disruption" },
  { id: "oGEEto8LWWo", title: "How To Build an AI Influencer In 10 Minutes" }
];

(async () => {
  const yt = await Innertube.create({ retrieve_player: false });
  const results = [];

  for (const v of videos) {
    const result = { id: v.id, title: v.title, meta: null, transcript: null, description: null };
    try {
      const info = await yt.getInfo(v.id);
      result.meta = {
        title: info.basic_info?.title,
        author: info.basic_info?.author,
        duration: info.basic_info?.duration,
        views: info.basic_info?.view_count,
        keywords: info.basic_info?.keywords?.slice(0, 15)
      };
      result.description = info.basic_info?.short_description?.substring(0, 1000);
      try {
        const t = await info.getTranscript();
        const segs = t?.transcript?.content?.body?.initial_segments || [];
        result.transcript = segs.map(s => s.snippet?.text).filter(Boolean).join(" ");
      } catch {}

      console.log(`\n=== ${result.meta.title} ===`);
      console.log(`Author: ${result.meta.author} | Duration: ${result.meta.duration}s | Views: ${result.meta.views}`);
      console.log(`Keywords: ${(result.meta.keywords||[]).join(", ")}`);
      console.log(`Description: ${result.description?.substring(0,300)}`);
      console.log(`Transcript: ${result.transcript ? result.transcript.substring(0,400) : "NONE — will use description+title+keywords"}`);
      fs.writeFileSync(`${OUT}\\${v.id}.json`, JSON.stringify(result, null, 2));
    } catch(e) {
      console.log(`Error ${v.id}: ${e.message}`);
    }
    results.push(result);
  }
  fs.writeFileSync(`${OUT}\\all-videos.json`, JSON.stringify(results, null, 2));
  process.exit(0);
})();
