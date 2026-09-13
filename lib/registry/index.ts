import { ToolDefinition, ToolCategory } from "./types";
import { CATEGORIES } from "./categories";

export const TOOL_REGISTRY: ToolDefinition[] = [
  // ==========================================
  // IMAGE TOOLS (MVP)
  // ==========================================
  {
    id: "img-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    shortDescription: "Compress PNG, JPG, and WEBP images locally without quality loss.",
    longDescription: "Reduce image file size significantly while retaining maximum visual clarity. All processing happens entirely inside your browser—no files are uploaded to any server.",
    category: "image",
    icon: "Minimize2",
    tags: ["compress", "optimize", "reduce size", "jpg", "png", "webp"],
    status: "active",
    featured: true,
    trending: true,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: true,
    inputTypes: ["image/jpeg", "image/png", "image/webp"],
    outputTypes: ["image/jpeg", "image/png", "image/webp"],
    version: "1.0.0",
    sortOrder: 1,
    seo: {
      title: "Image Compressor — Free & Private In-Browser Image Optimization",
      description: "Compress JPG, PNG, and WEBP files instantly in your browser with real-time compression savings. 100% private, no uploads.",
      keywords: ["image compressor", "compress jpeg", "compress png", "reduce image size", "browser image compression"]
    },
    faq: [
      { question: "Are my photos uploaded to a server?", answer: "No. All compression is executed locally inside your browser using HTML5 Canvas APIs." },
      { question: "Can I compress multiple images at once?", answer: "Yes, you can drop multiple images and download each compressed result." }
    ],
    relatedSlugs: ["image-resizer", "image-converter", "jpg-to-png", "png-to-jpg"]
  },
  {
    id: "img-converter",
    slug: "image-converter",
    name: "Image Converter",
    shortDescription: "Convert between JPG, PNG, WEBP, and BMP formats instantly.",
    longDescription: "A versatile universal image converter running directly in your web browser. Select your target format and quality setting to download high-fidelity converted files.",
    category: "image",
    icon: "RefreshCw",
    tags: ["convert", "format", "png", "jpg", "webp", "bmp"],
    status: "active",
    featured: true,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: true,
    inputTypes: ["image/*"],
    outputTypes: ["image/jpeg", "image/png", "image/webp"],
    version: "1.0.0",
    sortOrder: 2,
    seo: {
      title: "Image Converter — Free Universal Browser Image Conversion",
      description: "Convert images between PNG, JPG, and WEBP formats client-side with zero data uploads.",
      keywords: ["image converter", "convert photo", "png to jpg", "jpg to webp", "image format changer"]
    },
    faq: [
      { question: "What formats are supported?", answer: "We support PNG, JPEG/JPG, WEBP, and standard web image formats." }
    ],
    relatedSlugs: ["image-compressor", "jpg-to-png", "png-to-jpg", "image-resizer"]
  },
  {
    id: "img-resizer",
    slug: "image-resizer",
    name: "Image Resizer",
    shortDescription: "Resize image dimensions by exact pixels or percentage with aspect lock.",
    longDescription: "Quickly resize image width and height with optional aspect ratio preservation and scaling presets (25%, 50%, 75%). Fast, client-side, and crystal clear.",
    category: "image",
    icon: "Maximize2",
    tags: ["resize", "dimensions", "scale", "pixels", "aspect ratio"],
    status: "active",
    featured: false,
    trending: true,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["image/*"],
    outputTypes: ["image/jpeg", "image/png", "image/webp"],
    version: "1.0.0",
    sortOrder: 3,
    seo: {
      title: "Image Resizer — Resize Dimensions Online Free",
      description: "Scale and resize photos by pixels or percentage with aspect ratio lock directly in your browser.",
      keywords: ["image resizer", "resize image pixels", "photo scaler", "resize jpg"]
    },
    faq: [
      { question: "Does resizing degrade image sharpness?", answer: "Our engine uses high-quality bicubic canvas interpolation to preserve clarity." }
    ],
    relatedSlugs: ["image-compressor", "image-converter", "jpg-to-png"]
  },
  {
    id: "img-jpg-to-png",
    slug: "jpg-to-png",
    name: "JPG to PNG",
    shortDescription: "Fast dedicated conversion from JPG to lossless PNG format.",
    longDescription: "Convert JPEG/JPG images to PNG format with maximum color depth and lossless output. Ideal for graphics, design assets, and crisp text overlays.",
    category: "image",
    icon: "FileImage",
    tags: ["jpg to png", "jpeg to png", "lossless", "image conversion"],
    status: "active",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: true,
    inputTypes: ["image/jpeg"],
    outputTypes: ["image/png"],
    version: "1.0.0",
    sortOrder: 4,
    seo: {
      title: "JPG to PNG Converter — Fast & Free Online Tool",
      description: "Convert JPG and JPEG files to transparent-ready lossless PNG format in seconds.",
      keywords: ["jpg to png", "convert jpg to png", "jpeg to png converter free"]
    },
    faq: [
      { question: "Is this conversion lossless?", answer: "Yes, PNG is an inherently lossless container format." }
    ],
    relatedSlugs: ["png-to-jpg", "image-converter", "image-compressor"]
  },
  {
    id: "img-png-to-jpg",
    slug: "png-to-jpg",
    name: "PNG to JPG",
    shortDescription: "Convert PNG images into lightweight JPG format with quality tuning.",
    longDescription: "Transform transparent or heavy PNG assets into compact JPEG images with configurable quality settings and background color fill.",
    category: "image",
    icon: "FileImage",
    tags: ["png to jpg", "png to jpeg", "photo format"],
    status: "active",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: true,
    inputTypes: ["image/png"],
    outputTypes: ["image/jpeg"],
    version: "1.0.0",
    sortOrder: 5,
    seo: {
      title: "PNG to JPG Converter — Fast & Free Online Tool",
      description: "Convert PNG files to optimized JPG images with custom quality settings.",
      keywords: ["png to jpg", "convert png to jpg", "png to jpeg converter"]
    },
    faq: [
      { question: "What happens to PNG transparency?", answer: "Transparent areas are rendered cleanly onto your chosen solid background before saving." }
    ],
    relatedSlugs: ["jpg-to-png", "image-converter", "image-compressor"]
  },

  // ==========================================
  // PDF TOOLS (MVP)
  // ==========================================
  {
    id: "pdf-jpg-to-pdf",
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    shortDescription: "Convert single or multiple images into a clean, unified PDF document.",
    longDescription: "Assemble your photos, receipts, or document scans into a standardized, ready-to-share PDF document right inside your browser using client-side PDF assembly.",
    category: "pdf",
    icon: "FileInput",
    tags: ["jpg to pdf", "images to pdf", "photo to pdf", "document builder"],
    status: "active",
    featured: true,
    trending: true,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: true,
    inputTypes: ["image/jpeg", "image/png"],
    outputTypes: ["application/pdf"],
    version: "1.0.0",
    sortOrder: 6,
    seo: {
      title: "JPG to PDF Converter — Turn Images into PDF Documents Online",
      description: "Convert multiple JPG/PNG images into a single combined PDF document instantly. Private and free.",
      keywords: ["jpg to pdf", "images to pdf", "photos to pdf converter"]
    },
    faq: [
      { question: "Can I combine multiple pictures into one PDF?", answer: "Yes, you can upload multiple images and they will be bound into consecutive PDF pages." }
    ],
    relatedSlugs: ["pdf-to-jpg", "merge-pdf", "split-pdf"]
  },
  {
    id: "pdf-pdf-to-jpg",
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    shortDescription: "Extract PDF pages as individual high-resolution JPG images.",
    longDescription: "Render and download every page of your PDF document as crisp, separate JPG files without uploading your private documents to external clouds.",
    category: "pdf",
    icon: "FileOutput",
    tags: ["pdf to jpg", "pdf to image", "extract pdf pages", "pdf converter"],
    status: "active",
    featured: false,
    trending: true,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["application/pdf"],
    outputTypes: ["image/jpeg"],
    version: "1.0.0",
    sortOrder: 7,
    seo: {
      title: "PDF to JPG Converter — Extract PDF Pages to Images",
      description: "Convert PDF pages to high-resolution JPG images client-side. Fast, safe, and free.",
      keywords: ["pdf to jpg", "extract pages from pdf", "pdf to image converter"]
    },
    faq: [
      { question: "Is my confidential PDF safe?", answer: "Yes, the document is rendered directly within your browser session and never sent to any server." }
    ],
    relatedSlugs: ["jpg-to-pdf", "split-pdf", "merge-pdf"]
  },
  {
    id: "pdf-merge-pdf",
    slug: "merge-pdf",
    name: "Merge PDF",
    shortDescription: "Combine multiple PDF files into one single organized document.",
    longDescription: "Easily merge two or more PDF files into a single master document. Reorder files before stitching them together using client-side `pdf-lib`.",
    category: "pdf",
    icon: "Layers",
    tags: ["merge pdf", "combine pdf", "join pdf", "pdf binder"],
    status: "active",
    featured: true,
    trending: true,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: true,
    inputTypes: ["application/pdf"],
    outputTypes: ["application/pdf"],
    version: "1.0.0",
    sortOrder: 8,
    seo: {
      title: "Merge PDF Online — Combine Multiple PDFs into One Document",
      description: "Join multiple PDF files into a single organized document. Private, in-browser PDF merging.",
      keywords: ["merge pdf", "combine pdf files", "join pdf documents online"]
    },
    faq: [
      { question: "Is there a limit on how many PDFs I can merge?", answer: "You can merge dozens of standard documents without issue directly in your browser." }
    ],
    relatedSlugs: ["split-pdf", "jpg-to-pdf", "pdf-to-jpg"]
  },
  {
    id: "pdf-split-pdf",
    slug: "split-pdf",
    name: "Split PDF",
    shortDescription: "Extract specific page ranges or split a PDF into separate files.",
    longDescription: "Extract selected pages (e.g. pages 1-3, 5, 8-10) or break large PDF documents into manageable fragments with complete client-side processing.",
    category: "pdf",
    icon: "Scissors",
    tags: ["split pdf", "extract pages", "divide pdf", "cut pdf"],
    status: "active",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["application/pdf"],
    outputTypes: ["application/pdf"],
    version: "1.0.0",
    sortOrder: 9,
    seo: {
      title: "Split PDF Online — Extract Specific Pages from Any PDF",
      description: "Separate pages or extract specific page intervals from your PDF files with full browser privacy.",
      keywords: ["split pdf", "extract pdf pages", "cut pdf pages online"]
    },
    faq: [
      { question: "How do I specify ranges?", answer: "Use syntax like '1-3, 5, 7-9' to specify exact pages for your new document." }
    ],
    relatedSlugs: ["merge-pdf", "jpg-to-pdf", "pdf-to-jpg"]
  },

  // ==========================================
  // DEVELOPER TOOLS (MVP)
  // ==========================================
  {
    id: "dev-json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Prettify, format, and indent messy JSON data with 1-click copy.",
    longDescription: "Format and beautify unformatted or minified JSON data with customizable indentation (2 spaces, 4 spaces, tabs). Includes validation feedback and quick copy.",
    category: "developer",
    icon: "Braces",
    tags: ["json formatter", "prettify json", "beautify json", "json indent"],
    status: "active",
    featured: true,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["text/plain", "application/json"],
    outputTypes: ["application/json"],
    version: "1.0.0",
    sortOrder: 10,
    seo: {
      title: "JSON Formatter & Beautifier — Free Online JSON Prettifier",
      description: "Format, beautify, and indent JSON data with clean syntax display and 1-click clipboard copy.",
      keywords: ["json formatter", "prettify json online", "json beautifier", "format json string"]
    },
    faq: [
      { question: "Can it handle large JSON payloads?", answer: "Yes, it parses and beautifies large payloads instantly using native browser JSON engines." }
    ],
    relatedSlugs: ["json-validator", "word-counter", "character-counter"]
  },
  {
    id: "dev-json-validator",
    slug: "json-validator",
    name: "JSON Validator",
    shortDescription: "Validate JSON syntax, pinpoint exact error positions, and auto-repair.",
    longDescription: "Check whether your JSON payload is syntactically valid. Pinpoints line and column coordinates of syntax errors and provides intelligent fixes for trailing commas and unquoted keys.",
    category: "developer",
    icon: "CheckCheck",
    tags: ["json validator", "lint json", "json syntax check", "fix json"],
    status: "active",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["text/plain", "application/json"],
    outputTypes: ["application/json"],
    version: "1.0.0",
    sortOrder: 11,
    seo: {
      title: "JSON Validator & Linter — Pinpoint Syntax Errors Instantly",
      description: "Validate JSON strings with precise line/column error diagnostics and smart repair options.",
      keywords: ["json validator", "validate json online", "json syntax checker", "json error finder"]
    },
    faq: [
      { question: "Does this identify unquoted property names?", answer: "Yes, our validator identifies missing quotes, trailing commas, and malformed objects." }
    ],
    relatedSlugs: ["json-formatter", "word-counter"]
  },

  // ==========================================
  // TEXT TOOLS (MVP)
  // ==========================================
  {
    id: "txt-word-counter",
    slug: "word-counter",
    name: "Word Counter",
    shortDescription: "Count words, characters, sentences, paragraphs, and reading time.",
    longDescription: "Detailed text analytics tool calculating total words, characters, sentences, paragraphs, estimated reading time, speaking pace, and top keyword frequencies in real-time.",
    category: "text",
    icon: "AlignLeft",
    tags: ["word counter", "character count", "reading time", "text metrics", "keyword density"],
    status: "active",
    featured: true,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["text/plain"],
    outputTypes: ["application/json"],
    version: "1.0.0",
    sortOrder: 12,
    seo: {
      title: "Word Counter & Text Analyzer — Accurate Word & Reading Time Metrics",
      description: "Count words, characters, paragraphs, and calculate reading time and keyword frequency live.",
      keywords: ["word counter", "word count tool", "character counter", "reading time calculator"]
    },
    faq: [
      { question: "How is reading time calculated?", answer: "It is calculated based on the standard average silent reading speed of 225 words per minute." }
    ],
    relatedSlugs: ["character-counter", "json-formatter"]
  },
  {
    id: "txt-character-counter",
    slug: "character-counter",
    name: "Character Counter",
    shortDescription: "Track characters, spaces, UTF-8 byte size, and social media limits.",
    longDescription: "Analyze characters with and without whitespace, compute byte lengths, and check exact progress against character limits for Twitter/X (280), Instagram (2,200), LinkedIn (3,000), and Meta descriptions (160).",
    category: "text",
    icon: "Type",
    tags: ["character counter", "social media limits", "byte counter", "letter counter"],
    status: "active",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["text/plain"],
    outputTypes: ["application/json"],
    version: "1.0.0",
    sortOrder: 13,
    seo: {
      title: "Character Counter & Social Media Limit Tracker",
      description: "Real-time character counting with dedicated limit trackers for X/Twitter, Instagram captions, and SEO meta tags.",
      keywords: ["character counter", "character count online", "twitter character limit", "letter counter"]
    },
    faq: [
      { question: "Does it count emojis correctly?", answer: "Yes, it uses unicode-aware grapheme splitting for precise emoji counting." }
    ],
    relatedSlugs: ["word-counter", "caption-generator"]
  },

  // ==========================================
  // STUDENT TOOLS (MVP)
  // ==========================================
  {
    id: "stu-percentage-calc",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    shortDescription: "Calculate percentages, percentage change, increase, and decrease easily.",
    longDescription: "Solve 5 distinct percentage calculations with step-by-step mathematical working: percentage of a number, ratio percentage, percentage increase/decrease, and addition/subtraction.",
    category: "student",
    icon: "Percent",
    tags: ["percentage calculator", "percent change", "discount calculator", "math helper"],
    status: "active",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["number"],
    outputTypes: ["number"],
    version: "1.0.0",
    sortOrder: 14,
    seo: {
      title: "Percentage Calculator — 5-in-1 Fast Percentage & Ratio Solver",
      description: "Calculate what is X% of Y, percentage increase/decrease, and step-by-step percentage formulas instantly.",
      keywords: ["percentage calculator", "calculate percentage", "percent increase calculator", "percentage formula"]
    },
    faq: [
      { question: "Can it calculate percentage decrease and discounts?", answer: "Yes, choose the 'Percentage Increase / Decrease' tab to compute exact deltas." }
    ],
    relatedSlugs: ["age-calculator", "unit-converter"]
  },
  {
    id: "stu-age-calc",
    slug: "age-calculator",
    name: "Age Calculator",
    shortDescription: "Calculate exact age in years, months, days, hours, and next birthday countdown.",
    longDescription: "Determine your precise chronological age down to the day and hour. Includes live countdown until your next birthday, days lived, and zodiac profile.",
    category: "student",
    icon: "Calendar",
    tags: ["age calculator", "birthday countdown", "exact age", "days lived"],
    status: "active",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["date"],
    outputTypes: ["application/json"],
    version: "1.0.0",
    sortOrder: 15,
    seo: {
      title: "Age Calculator — Exact Age in Years, Months, Days & Birthday Countdown",
      description: "Calculate your exact age, total days lived, and see a real-time countdown to your next birthday.",
      keywords: ["age calculator", "calculate age from dob", "how old am i", "birthday countdown"]
    },
    faq: [
      { question: "Does it account for leap years?", answer: "Yes, full calendar leap year calculations are handled accurately." }
    ],
    relatedSlugs: ["percentage-calculator", "unit-converter"]
  },
  {
    id: "stu-unit-converter",
    slug: "unit-converter",
    name: "Unit Converter",
    shortDescription: "Convert length, weight, temperature, area, volume, storage, and speed.",
    longDescription: "All-in-one universal conversion engine covering 8 essential measurement domains: metric and imperial lengths, masses, temperatures, digital bytes, and velocities.",
    category: "student",
    icon: "ArrowLeftRight",
    tags: ["unit converter", "metric to imperial", "length converter", "weight converter", "temperature converter"],
    status: "active",
    featured: true,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["number"],
    outputTypes: ["number"],
    version: "1.0.0",
    sortOrder: 16,
    seo: {
      title: "Unit Converter — Metric, Imperial, Digital Storage & Temperature",
      description: "Convert between metric and imperial units across 8 measurement domains instantly.",
      keywords: ["unit converter", "length converter", "kg to lbs", "celsius to fahrenheit", "digital storage converter"]
    },
    faq: [
      { question: "Are conversions updated in real time?", answer: "Yes, both directions update immediately as you type." }
    ],
    relatedSlugs: ["percentage-calculator", "age-calculator"]
  },

  // ==========================================
  // CREATOR TOOLS (MVP)
  // ==========================================
  {
    id: "cre-viral-reel",
    slug: "viral-reel-idea-generator",
    name: "Viral Reel Idea Generator",
    shortDescription: "Flagship creator engine: hooks, retention structures, scripts, and captions.",
    longDescription: "Our flagship creator utility. Select your niche, audience, platform (Instagram Reels, TikTok, YouTube Shorts), tone, and objective to generate structured viral concepts complete with hooks, retention mechanisms, emotional triggers, scene outlines, captions, and hashtags.",
    category: "creator",
    icon: "Sparkles",
    tags: ["viral reels", "instagram reels", "tiktok ideas", "youtube shorts", "creator hooks", "script generator"],
    status: "active",
    featured: true,
    trending: true,
    requiresAuth: false,
    requiresAI: true,
    supportsBatch: true,
    inputTypes: ["form"],
    outputTypes: ["application/json"],
    version: "1.0.0",
    sortOrder: 17,
    seo: {
      title: "Viral Reel Idea Generator — High-Retention Reel & TikTok Concepts",
      description: "Generate structured viral short-form video concepts with psychology-driven hooks, scene blueprints, captions, and retention mechanics.",
      keywords: ["viral reel idea generator", "instagram reels ideas", "tiktok hook generator", "short-form script generator"]
    },
    faq: [
      { question: "Can I customize the generation for my specific niche?", answer: "Yes, you can specify your niche, target audience, platform, tone, and specific topic." },
      { question: "Can I iterate on the generated hooks?", answer: "Yes, one-click variation tools allow you to make hooks more controversial, emotional, or concise." }
    ],
    relatedSlugs: ["viral-hook-generator", "caption-generator"]
  },
  {
    id: "cre-viral-hook",
    slug: "viral-hook-generator",
    name: "Viral Hook Generator",
    shortDescription: "Generate 10+ psychological hooks categorized by proven viral frameworks.",
    longDescription: "Generate irresistible opening lines structured around 5 proven psychological frameworks: Curiosity Gap, Negative/Contrarian, Relatable Story, Bold Claim, and Secret/Hack.",
    category: "creator",
    icon: "Flame",
    tags: ["viral hooks", "hook generator", "video intro", "curiosity gap", "reels hooks"],
    status: "active",
    featured: true,
    trending: true,
    requiresAuth: false,
    requiresAI: true,
    supportsBatch: false,
    inputTypes: ["text"],
    outputTypes: ["application/json"],
    version: "1.0.0",
    sortOrder: 18,
    seo: {
      title: "Viral Hook Generator — 10+ Psychology-Driven Video Openings",
      description: "Create scroll-stopping video hooks using proven viral frameworks for TikTok, Reels, and YouTube Shorts.",
      keywords: ["viral hook generator", "reels hooks", "tiktok hook generator", "video hook ideas"]
    },
    faq: [
      { question: "What frameworks are used?", answer: "Curiosity Gap, Contrarian/Negative, Relatable Story, Bold Claim, and Secret/Hack." }
    ],
    relatedSlugs: ["viral-reel-idea-generator", "caption-generator"]
  },
  {
    id: "cre-caption-gen",
    slug: "caption-generator",
    name: "Caption Generator",
    shortDescription: "Generate formatted social media captions with hashtags and call-to-actions.",
    longDescription: "Craft compelling captions for Instagram, TikTok, LinkedIn, or YouTube with clean paragraph spacing, optional emojis, clear calls to action, and tiered hashtags.",
    category: "creator",
    icon: "PenTool",
    tags: ["caption generator", "instagram captions", "social media copy", "hashtag generator"],
    status: "active",
    featured: false,
    trending: true,
    requiresAuth: false,
    requiresAI: true,
    supportsBatch: false,
    inputTypes: ["text"],
    outputTypes: ["text/plain"],
    version: "1.0.0",
    sortOrder: 19,
    seo: {
      title: "Social Media Caption Generator — Engaging Copy & Tiered Hashtags",
      description: "Generate structured social media captions with clean spacing, strong calls to action, and targeted hashtags.",
      keywords: ["caption generator", "instagram caption maker", "social media caption generator", "reels captions"]
    },
    faq: [
      { question: "Can I adjust the tone?", answer: "Yes, choose from Casual, Professional, Punchy, Storytelling, or Witty." }
    ],
    relatedSlugs: ["viral-reel-idea-generator", "viral-hook-generator", "character-counter"]
  },

  // ==========================================
  // COMING SOON EXPANSIONS (Registry Breadth)
  // ==========================================
  {
    id: "pdf-compress-pdf",
    slug: "pdf-compressor",
    name: "PDF Compressor",
    shortDescription: "Compress large PDF documents without sacrificing readability.",
    longDescription: "Upcoming tool to optimize and shrink heavy PDF files for email attachments and uploads.",
    category: "pdf",
    icon: "FileArchive",
    tags: ["compress pdf", "shrink pdf", "reduce pdf size"],
    status: "coming-soon",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["application/pdf"],
    outputTypes: ["application/pdf"],
    version: "0.9.0",
    sortOrder: 20,
    seo: {
      title: "PDF Compressor — Coming Soon to Kunalistic",
      description: "Upcoming in-browser PDF compression utility.",
      keywords: ["compress pdf", "pdf compressor"]
    },
    faq: []
  },
  {
    id: "img-cropper",
    slug: "image-cropper",
    name: "Image Cropper",
    shortDescription: "Crop photos to exact ratios for avatars, stories, and thumbnails.",
    longDescription: "Upcoming interactive canvas crop tool with standard social aspect ratios (1:1, 9:16, 16:9, 4:5).",
    category: "image",
    icon: "Crop",
    tags: ["crop image", "aspect ratio", "avatar crop"],
    status: "coming-soon",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["image/*"],
    outputTypes: ["image/*"],
    version: "0.9.0",
    sortOrder: 21,
    seo: {
      title: "Image Cropper — Coming Soon to Kunalistic",
      description: "Upcoming interactive image cropping tool.",
      keywords: ["image cropper", "crop photo online"]
    },
    faq: []
  },
  {
    id: "dev-jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    shortDescription: "Decode JSON Web Tokens and inspect header, payload, and expiry dates.",
    longDescription: "Upcoming client-side JWT inspector for developers to verify token claims securely.",
    category: "developer",
    icon: "ShieldAlert",
    tags: ["jwt decoder", "token decode", "jwt claims"],
    status: "coming-soon",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["text/plain"],
    outputTypes: ["application/json"],
    version: "0.9.0",
    sortOrder: 22,
    seo: {
      title: "JWT Decoder — Coming Soon to Kunalistic",
      description: "Upcoming client-side JSON Web Token decoder.",
      keywords: ["jwt decoder", "decode jwt"]
    },
    faq: []
  },
  {
    id: "stu-cgpa-calc",
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    shortDescription: "Calculate cumulative grade point average with semester credit weighting.",
    longDescription: "Upcoming student GPA/CGPA computation tool with customizable grading scales.",
    category: "student",
    icon: "Award",
    tags: ["cgpa calculator", "gpa calculator", "grade calculator"],
    status: "coming-soon",
    featured: false,
    trending: false,
    requiresAuth: false,
    requiresAI: false,
    supportsBatch: false,
    inputTypes: ["number"],
    outputTypes: ["number"],
    version: "0.9.0",
    sortOrder: 23,
    seo: {
      title: "CGPA Calculator — Coming Soon to Kunalistic",
      description: "Upcoming student CGPA calculator.",
      keywords: ["cgpa calculator", "gpa calculator"]
    },
    faq: []
  }
];

// ==========================================
// REGISTRY QUERY HELPERS
// ==========================================

export function getAllTools(): ToolDefinition[] {
  return [...TOOL_REGISTRY].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOL_REGISTRY.find((t) => t.slug === slug);
}

export function getFeaturedTools(): ToolDefinition[] {
  return TOOL_REGISTRY.filter((t) => t.featured && t.status === "active").sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getTrendingTools(): ToolDefinition[] {
  return TOOL_REGISTRY.filter((t) => t.trending && t.status === "active").sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getRecentlyAddedTools(): ToolDefinition[] {
  return TOOL_REGISTRY.filter((t) => t.status === "active").slice(-6);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return TOOL_REGISTRY.filter((t) => t.category === category).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getRelatedTools(slug: string, limit: number = 4): ToolDefinition[] {
  const current = getToolBySlug(slug);
  if (!current) return [];

  // 1. Explicit related slugs
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const related = current.relatedSlugs
      .map((s) => getToolBySlug(s))
      .filter((t): t is ToolDefinition => !!t && t.status === "active");
    if (related.length >= limit) return related.slice(0, limit);
  }

  // 2. Fallback to same category
  const sameCategory = TOOL_REGISTRY.filter(
    (t) => t.category === current.category && t.slug !== current.slug && t.status === "active"
  );

  return sameCategory.slice(0, limit);
}

export function searchTools(query: string, category?: ToolCategory): ToolDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q && !category) return getAllTools();

  return TOOL_REGISTRY.filter((t) => {
    if (category && t.category !== category) return false;
    if (!q) return true;

    return (
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.slug.toLowerCase().includes(q)
    );
  });
}

export function getCategoriesWithCount() {
  return CATEGORIES.map((cat) => {
    const count = TOOL_REGISTRY.filter((t) => t.category === cat.id && t.status === "active").length;
    return { ...cat, itemCount: count };
  });
}
