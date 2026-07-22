/* ============================================================
   STILL WATERS — VIDEO LIBRARY
   ============================================================
   HOW TO ADD A NEW VIDEO (takes ~30 seconds):

   1. Find the YouTube video's ID. It's the part after "v=" or after
      "youtu.be/" in the link, and it stops at any "?" or "&":
        https://www.youtube.com/watch?v=7NnY1kp3OSE   → ID is 7NnY1kp3OSE
        https://youtu.be/7NnY1kp3OSE?si=abc123        → ID is 7NnY1kp3OSE

   2. Copy one of the blocks below (from "{" to "},") and paste it
      into the list you want — "christian" or "selfimprovement".
      The order here is the order shown on the page.
      https://youtu.be/XuwYGnvFlNs?si=aBeZzA-UZsl9-AEE


   3. Fill in:
        id:      the YouTube ID from step 1 (in quotes)
        title:   the video's title
        speaker: who is speaking (shown under the title)
        note:    optional one-line description (or leave as "")

   4. Save the file, upload it to GitHub replacing js/videos-data.js,
      and commit. Done — the new video card appears automatically.

   Example of a new entry ready to paste:
      { id: "XXXXXXXXXXX", title: "My New Talk", speaker: "Speaker Name", note: "" },
   ============================================================ */

const VIDEOS = {
  christian: [
    { id: "7NnY1kp3OSE", title: "Be Not Afraid", speaker: "Bishop Robert Barron", note: "Sunday Sermon" },
    { id: "tIMUWGpw66U", title: "You Need God", speaker: "Sr. Miriam James Heidland, SOLT", note: "SEEK26" },
    { id: "EpQJyaAz4gU", title: "What Do You Still Lack?", speaker: "Sr. Miriam James Heidland, SOLT", note: "SEEK25" },
    { id: "6bDzXBgb2_A", title: "A Powerful Rosary Testimony", speaker: "T.K. Coleman", note: "" },
    { id: "RHO8L9477aU", title: "Every Scientifically Proven Eucharistic Miracle", speaker: "", note: "" },
    { id: "VCts0fjsmug", title: "On Taking the Discipline", speaker: "Bishop Robert Barron", note: "" },
    { id: "frcI6OD0IbY", title: "Are You Anxious and Worried About Many Things?", speaker: "Bishop Robert Barron", note: "Sunday Sermon" },
    { id: "Mm9MaX_8Z24", title: "Listening, Humility, and Unity", speaker: "Pope Leo XIV", note: "Homily · September 1, 2025" },
    { id: "VwCtggPcI9g", title: "“Do Not Give Up”", speaker: "Biblical Motivation", note: "" },
    { id: "Dn-1j5QWsAM", title: "Seek God’s Plan", speaker: "Nick Vujicic", note: "" }
  ],

  selfimprovement: [
    { id: "-ki9-oaPwHs", title: "How to Believe in Yourself", speaker: "Jim Cathcart", note: "TEDxDelrayBeach" },
    { id: "1XDpa2HLXV0", title: "Beautiful Minds Are Free from Fear", speaker: "Robert Grant", note: "TEDxOrangeCoast" },
    { id: "SbyCtcvLRh8", title: "Become the Person You Can’t Imagine", speaker: "Norman Bacal", note: "TEDxRyersonU" },
    { id: "YiQQ1EWMFHg", title: "Mindset Is More Important Than Strategy", speaker: "Preston Pugmire", note: "TEDxRexburg" },
    { id: "xF80HzqvAoA", title: "The Art of Focus — a Crucial Ability", speaker: "Christina Bengtsson", note: "TEDxGöteborg" },
    { id: "PBaFURjVrm0", title: "How to Hack Your Brain for Better Focus", speaker: "Sasha Hamdani", note: "TEDxKC" },
    { id: "Lp7E973zozc", title: "How to Stop Screwing Yourself Over", speaker: "Mel Robbins", note: "TEDxSF" },
    { id: "pxBQLFLei70", title: "Make Your Bed — 2014 Commencement Address", speaker: "Admiral William H. McRaven", note: "University of Texas at Austin" },
    { id: "CzII3W2MLYY", title: "Inspirational Speech", speaker: "Barack Obama", note: "" },
    { id: "pqWUuYTcG-o", title: "2024 Commencement Address at Dartmouth", speaker: "Roger Federer", note: "Darthmouth College" }
    { id: "XuwYvFlNGns", title: "How philosophy can save your life", speaker: "Jules Evans", note: "TEDxBreda"}
    { id: "BAswj8evFZk", title: "How Ethics Can Help You Make Better Decisions", speaker: "Michael Schur ", note: "TEDxVancouver" }
    { id: "8GQZuzIdeQQ", title: "How to make hard choices ", speaker: "Ruth Chang", note: "TEDxNewYork" }
    { id: "JD4Fhh6GDcY", title: "A philosopher’s argument against the cult of achievement", speaker: "Zena Hitz", note: "Big Think" }
    { id: "7vVIkdn_ljs", title: "My Time Will Come ", speaker: "Ian Manuel", note: "Perception Box" }
    { id: "0barY2A6dpU", title: "Discipline sets creativity free", speaker: "David Epstein", note: "Big Think" }
    { id: "kz-I5zIGbj4", title: "Why I Love My Bad Days", speaker: "Alexi Pappas", note: "TED" }
    { id: "xSBGYoS6z68", title: "Thinkers vs. Do-ers: Why You Suck At Following Through", speaker: "HealthyGamerGG", note: "Dr.K" }
    { id: "fxbCHn6gE3U", title: "The surprising habits of original thinkers", speaker: "Adam Grant", note: "TEDxVancouver" }
    { id: "N7wF2AdVy2Q", title: "How frustration can make us more creative", speaker: "Tim Harford", note: "TEDxLondon" }
  ]
};
