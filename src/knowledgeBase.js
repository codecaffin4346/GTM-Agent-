// ============================================================
// OUTREACHIQ — SYNTHETIC MULTIVARIATE KNOWLEDGE BASE
// ============================================================
// All synthetic training data used as RAG context for Gemini.
// Data is multivariate: each record has 6-8 feature dimensions.
// ============================================================

// -----------------------------------------------------------
// 1. LEAD SCORING TRAINING DATA
//    20 synthetic leads × 8 features + score label
// -----------------------------------------------------------
export const LEAD_SCORING_DATA = [
  { id: 1,  company: "CloudSync",         industry: "B2B SaaS",       employees: 45,  salesTeamSize: 4,  tools: ["Slack", "HubSpot", "Notion"],                  painPoints: ["manual reporting", "slow follow-ups"],                   decisionMaker: "Head of Growth",  fundingStage: "Series A",  score: 9 },
  { id: 2,  company: "RetailEdge",         industry: "E-commerce",     employees: 300, salesTeamSize: 25, tools: ["Salesforce", "Shopify"],                        painPoints: ["inventory management"],                                  decisionMaker: "CTO",             fundingStage: "Series C",  score: 3 },
  { id: 3,  company: "DataPulse",          industry: "B2B SaaS",       employees: 80,  salesTeamSize: 6,  tools: ["Slack", "ClickUp", "HubSpot", "Notion"],        painPoints: ["repetitive outreach", "no automation"],                  decisionMaker: "VP Sales",        fundingStage: "Series A",  score: 10 },
  { id: 4,  company: "HealthBridge",       industry: "HealthTech",     employees: 150, salesTeamSize: 8,  tools: ["Slack", "Notion"],                              painPoints: ["compliance tracking", "manual reporting"],               decisionMaker: "VP Sales",        fundingStage: "Series B",  score: 7 },
  { id: 5,  company: "FinLedger",          industry: "FinTech",        employees: 500, salesTeamSize: 40, tools: ["Salesforce", "Jira"],                            painPoints: ["regulatory compliance"],                                 decisionMaker: "CFO",             fundingStage: "Series D",  score: 2 },
  { id: 6,  company: "GrowthLoop",         industry: "B2B SaaS",       employees: 30,  salesTeamSize: 3,  tools: ["Slack", "HubSpot", "ClickUp"],                  painPoints: ["manual outreach", "lack of automation", "slow pipeline"],decisionMaker: "Founder",         fundingStage: "Seed",      score: 9 },
  { id: 7,  company: "EduNova",            industry: "EdTech",         employees: 200, salesTeamSize: 10, tools: ["Google Workspace", "Slack"],                     painPoints: ["enrollment tracking"],                                   decisionMaker: "Head of Marketing",fundingStage: "Series B", score: 5 },
  { id: 8,  company: "LogiTrack",          industry: "Logistics",      employees: 1200,salesTeamSize: 60, tools: ["SAP", "Salesforce"],                             painPoints: ["fleet management"],                                      decisionMaker: "COO",             fundingStage: "IPO",       score: 1 },
  { id: 9,  company: "PropelCRM",          industry: "B2B SaaS",       employees: 60,  salesTeamSize: 5,  tools: ["HubSpot", "Slack", "Notion", "Zapier"],          painPoints: ["repetitive tasks", "manual reporting"],                  decisionMaker: "Head of Growth",  fundingStage: "Series A",  score: 10 },
  { id: 10, company: "MediaBlitz",         industry: "AdTech",         employees: 90,  salesTeamSize: 7,  tools: ["Slack", "Notion", "HubSpot"],                   painPoints: ["campaign tracking", "outreach automation"],              decisionMaker: "VP Marketing",    fundingStage: "Series A",  score: 8 },
  { id: 11, company: "NexaBuild",          industry: "Construction",   employees: 400, salesTeamSize: 15, tools: ["Monday.com", "Excel"],                           painPoints: ["project scheduling"],                                    decisionMaker: "Operations Director",fundingStage: "Private", score: 2 },
  { id: 12, company: "SaaSMetrics",        industry: "B2B SaaS",       employees: 25,  salesTeamSize: 2,  tools: ["Slack", "HubSpot", "ClickUp", "Notion"],         painPoints: ["no CRM automation", "manual lead scoring"],              decisionMaker: "Founder",         fundingStage: "Pre-seed",  score: 9 },
  { id: 13, company: "AutoPilotHR",        industry: "HRTech",         employees: 110, salesTeamSize: 8,  tools: ["Slack", "BambooHR", "Notion"],                   painPoints: ["repetitive onboarding", "manual workflows"],            decisionMaker: "VP People",       fundingStage: "Series A",  score: 7 },
  { id: 14, company: "FarmIQ",             industry: "AgriTech",       employees: 50,  salesTeamSize: 3,  tools: ["WhatsApp", "Excel"],                             painPoints: ["crop tracking"],                                         decisionMaker: "Founder",         fundingStage: "Seed",      score: 3 },
  { id: 15, company: "DevStreamIO",        industry: "B2B SaaS",       employees: 75,  salesTeamSize: 5,  tools: ["Slack", "Linear", "HubSpot", "Notion"],          painPoints: ["sales pipeline visibility", "outreach personalization"], decisionMaker: "Head of Growth",  fundingStage: "Series A",  score: 9 },
  { id: 16, company: "TravelMesh",         industry: "Travel",         employees: 350, salesTeamSize: 20, tools: ["Zendesk", "Salesforce"],                         painPoints: ["customer support volume"],                                decisionMaker: "CTO",             fundingStage: "Series B",  score: 3 },
  { id: 17, company: "InsightLayer",       industry: "B2B SaaS",       employees: 40,  salesTeamSize: 4,  tools: ["Slack", "Notion", "HubSpot"],                    painPoints: ["dashboard fatigue", "manual reporting"],                 decisionMaker: "VP Sales",        fundingStage: "Seed",      score: 8 },
  { id: 18, company: "CodeShip",           industry: "DevTools",       employees: 160, salesTeamSize: 9,  tools: ["Slack", "GitHub", "Linear"],                     painPoints: ["developer adoption tracking"],                           decisionMaker: "VP Engineering",  fundingStage: "Series B",  score: 5 },
  { id: 19, company: "BrightFunnel",       industry: "B2B SaaS",       employees: 55,  salesTeamSize: 4,  tools: ["Slack", "HubSpot", "Notion", "ClickUp"],         painPoints: ["lead follow-up", "outreach automation", "reporting"],    decisionMaker: "Founder",         fundingStage: "Seed",      score: 10 },
  { id: 20, company: "SecureVault",        industry: "CyberSecurity",  employees: 220, salesTeamSize: 12, tools: ["Jira", "Confluence"],                             painPoints: ["threat monitoring"],                                      decisionMaker: "CISO",            fundingStage: "Series C",  score: 3 },
];

// -----------------------------------------------------------
// 2. OUTREACH PERFORMANCE DATA
//    12 synthetic email templates × 5 performance metrics
// -----------------------------------------------------------
export const OUTREACH_TEMPLATES = [
  { id: 1,  name: "Pain-first opener",        tone: "empathetic",   wordCount: 87,  openRate: 0.62, replyRate: 0.18, conversionRate: 0.07, personalizationScore: 9, toneScore: 8,  template: "Hi {name}, I noticed {company} is scaling fast — which usually means {pain_point} becomes a real bottleneck. We built something that fixes that in under 2 weeks. Mind if I show you a 3-min demo?" },
  { id: 2,  name: "Insight lead",             tone: "authoritative",wordCount: 92,  openRate: 0.58, replyRate: 0.15, conversionRate: 0.06, personalizationScore: 8, toneScore: 9,  template: "Hi {name}, most {industry} teams at your stage waste 10+ hrs/week on manual {pain_point}. We automated that for 30+ companies like yours. Here's how: {one_line_value_prop}. Worth a 15-min call?" },
  { id: 3,  name: "Social proof hook",        tone: "confident",    wordCount: 78,  openRate: 0.55, replyRate: 0.14, conversionRate: 0.05, personalizationScore: 7, toneScore: 8,  template: "Hi {name}, {similar_company} cut their outreach time by 60% using our AI agent. {company} looks like a great fit for the same approach. Can I share how?" },
  { id: 4,  name: "Question-first",           tone: "curious",      wordCount: 65,  openRate: 0.60, replyRate: 0.20, conversionRate: 0.08, personalizationScore: 8, toneScore: 7,  template: "Hi {name}, quick question — how does {company} currently handle {pain_point}? I ask because we've been helping similar teams automate that entirely. Happy to share what worked." },
  { id: 5,  name: "Direct value prop",        tone: "confident",    wordCount: 95,  openRate: 0.50, replyRate: 0.12, conversionRate: 0.05, personalizationScore: 6, toneScore: 8,  template: "Hi {name}, ThinklyLabs builds AI agents that live inside your existing stack — Slack, HubSpot, Notion. We automate {pain_point} so your team can focus on closing. First agent live in 2 weeks. Interested?" },
  { id: 6,  name: "Compliment opener",        tone: "friendly",     wordCount: 82,  openRate: 0.57, replyRate: 0.16, conversionRate: 0.06, personalizationScore: 9, toneScore: 7,  template: "Hi {name}, been following {company}'s growth — impressive trajectory. Teams at your stage usually hit a wall with {pain_point}. We built AI agents specifically for that. Worth a quick chat?" },
  { id: 7,  name: "Metric-driven",            tone: "data-focused", wordCount: 88,  openRate: 0.53, replyRate: 0.13, conversionRate: 0.05, personalizationScore: 7, toneScore: 9,  template: "Hi {name}, our clients see 40% less time on manual reporting and 3x faster lead follow-up after deploying our AI agents. If {company} is dealing with {pain_point}, it might be worth exploring." },
  { id: 8,  name: "Founder-to-founder",       tone: "casual",       wordCount: 70,  openRate: 0.65, replyRate: 0.22, conversionRate: 0.09, personalizationScore: 10,toneScore: 8,  template: "Hey {name}, founder here — I know how brutal manual {pain_point} is at {company}'s size. We built something that kills it. 3 min to show you, no fluff. Game?" },
  { id: 9,  name: "Trigger event",            tone: "timely",       wordCount: 90,  openRate: 0.64, replyRate: 0.19, conversionRate: 0.08, personalizationScore: 9, toneScore: 8,  template: "Hi {name}, saw {company} just {trigger_event} — congrats! Teams at this stage usually start feeling {pain_point}. We've helped 30+ companies automate through exactly this inflection point." },
  { id: 10, name: "Problem agitation",        tone: "empathetic",   wordCount: 110, openRate: 0.48, replyRate: 0.10, conversionRate: 0.04, personalizationScore: 6, toneScore: 7,  template: "Hi {name}, {pain_point} doesn't just slow teams down — it kills momentum and burns out your best reps. We built purpose-built AI agents that eliminate it. {company} looks like a fit. Want to see how?" },
  { id: 11, name: "Micro-CTA",               tone: "minimal",      wordCount: 45,  openRate: 0.68, replyRate: 0.25, conversionRate: 0.10, personalizationScore: 7, toneScore: 9,  template: "Hi {name}, we automate {pain_point} for {industry} teams. 15 min to show you? If not, no worries at all." },
  { id: 12, name: "Case study teaser",        tone: "authoritative",wordCount: 98,  openRate: 0.54, replyRate: 0.14, conversionRate: 0.06, personalizationScore: 8, toneScore: 8,  template: "Hi {name}, a {industry} company similar to {company} was spending 15 hrs/week on {pain_point}. After deploying our AI agent, they cut that to under 2 hrs. I wrote up the case study — want me to send it over?" },
];

// -----------------------------------------------------------
// 3. ICP DIMENSION WEIGHTS & SCORING MATRIX
// -----------------------------------------------------------
export const ICP_DIMENSIONS = {
  industry:       { weight: 0.25, ideal: ["B2B SaaS", "MarTech", "RevOps", "HRTech", "DevTools"],   partial: ["FinTech", "HealthTech", "EdTech", "AdTech"] },
  companySize:    { weight: 0.20, ideal: { min: 10, max: 200 },   partial: { min: 5, max: 500 } },
  salesTeamSize:  { weight: 0.15, ideal: { min: 2, max: 10 },     partial: { min: 1, max: 20 } },
  toolStack:      { weight: 0.15, idealTools: ["Slack", "HubSpot", "Notion", "ClickUp", "Zapier"], minMatch: 2 },
  painPoints:     { weight: 0.15, idealPains: ["manual reporting", "repetitive outreach", "lack of automation", "slow pipeline", "manual lead scoring", "no CRM automation", "outreach personalization", "dashboard fatigue"] },
  decisionMaker:  { weight: 0.10, ideal: ["Founder", "Head of Growth", "VP Sales", "VP Marketing", "Head of Marketing"], partial: ["CTO", "COO", "VP People"] },
};

// -----------------------------------------------------------
// 4. COMPANY INTELLIGENCE PROFILES
//    12 synthetic company profiles × 6 dimensions
// -----------------------------------------------------------
export const COMPANY_PROFILES = [
  { company: "CloudSync",    industry: "B2B SaaS",     employees: 45,  founded: 2021, techStack: ["React", "Node.js", "AWS"],      recentNews: "Raised $5M Series A, tripled headcount in 6 months",                  keyChallenge: "Scaling outbound without adding headcount" },
  { company: "DataPulse",    industry: "B2B SaaS",     employees: 80,  founded: 2020, techStack: ["Python", "GCP", "Kubernetes"],   recentNews: "Launched enterprise tier, hired VP Sales",                             keyChallenge: "Sales ops bottleneck — manual CRM updates eating rep time" },
  { company: "GrowthLoop",   industry: "B2B SaaS",     employees: 30,  founded: 2022, techStack: ["Next.js", "Vercel", "Supabase"], recentNews: "Accepted into Y Combinator W24 batch",                                 keyChallenge: "Founder-led sales hitting ceiling, need automation" },
  { company: "PropelCRM",    industry: "B2B SaaS",     employees: 60,  founded: 2019, techStack: ["Ruby", "Heroku", "PostgreSQL"],  recentNews: "Acquired a competitor, integrating teams",                             keyChallenge: "Merging two sales processes, need unified automation" },
  { company: "SaaSMetrics",  industry: "B2B SaaS",     employees: 25,  founded: 2023, techStack: ["Vue", "Firebase"],               recentNews: "Closed first 10 enterprise deals",                                    keyChallenge: "No dedicated sales ops — founders doing everything manually" },
  { company: "MediaBlitz",   industry: "AdTech",       employees: 90,  founded: 2020, techStack: ["Python", "AWS", "Redis"],        recentNews: "Pivoted from self-serve to enterprise sales model",                    keyChallenge: "Building outbound motion from scratch" },
  { company: "InsightLayer", industry: "B2B SaaS",     employees: 40,  founded: 2022, techStack: ["React", "Supabase", "Vercel"],   recentNews: "Hit $1M ARR, looking to hire first SDR team",                          keyChallenge: "Transitioning from inbound-only to outbound + inbound" },
  { company: "AutoPilotHR",  industry: "HRTech",       employees: 110, founded: 2018, techStack: ["Java", "Azure", "MongoDB"],      recentNews: "Expanded to European market",                                          keyChallenge: "Localizing outreach for new markets, keeping quality high" },
  { company: "BrightFunnel", industry: "B2B SaaS",     employees: 55,  founded: 2021, techStack: ["Node.js", "PostgreSQL", "AWS"],  recentNews: "Series A round in progress, scaling GTM team",                         keyChallenge: "Need to 3x pipeline with same team size" },
  { company: "DevStreamIO",  industry: "B2B SaaS",     employees: 75,  founded: 2020, techStack: ["Go", "Kubernetes", "GCP"],       recentNews: "Launched Slack integration, seeing PLG traction",                      keyChallenge: "Converting free users to enterprise deals" },
  { company: "HealthBridge",  industry: "HealthTech",  employees: 150, founded: 2017, techStack: ["Python", "AWS", "PostgreSQL"],   recentNews: "Won three hospital network contracts",                                 keyChallenge: "Long sales cycles, need better lead qualification" },
  { company: "CodeShip",      industry: "DevTools",    employees: 160, founded: 2019, techStack: ["Rust", "AWS", "Terraform"],      recentNews: "Launched AI code review product, hiring aggressively",                 keyChallenge: "Developer-focused GTM motion, not traditional sales" },
];

// -----------------------------------------------------------
// 5. CORE KNOWLEDGE DOCUMENTS
// -----------------------------------------------------------
export const ICP_DOCUMENT = `Our ideal customer is a B2B SaaS company with 10-200 employees, a sales or marketing team of 2-10 people, using tools like Slack, Notion, HubSpot, ClickUp. They are frustrated with manual reporting, repetitive outreach, and lack of automation. Decision maker is typically a Head of Growth, VP Sales, or Founder.`;

export const PRODUCT_DOCUMENT = `ThinklyLabs builds purpose-built AI agents that live inside your existing tools. We automate: outreach emails, lead scoring, sales briefs, ops dashboards, and reporting. We integrate with 100+ tools. Our process: Audit → Strategy → Build → Handover → Support. Timeline: first agent live in 2-4 weeks.`;

export const OUTREACH_GUIDELINES = `Successful outreach is: short (under 150 words), personalized to their specific pain, leads with insight not product pitch, has one clear CTA, avoids buzzwords like synergy/leverage/circle back.`;

// -----------------------------------------------------------
// 6. SYSTEM PROMPT BUILDER
// -----------------------------------------------------------
export function buildSystemPrompt(mode) {
  const basePrompt = `You are OutreachIQ, a GTM co-pilot built by ThinklyLabs. You help sales and marketing teams score leads, write outreach, generate briefs, and match ICPs. You are direct, sharp, and output-focused. You never give generic advice. Every response is specific, actionable, and grounded in the knowledge base provided.

=== KNOWLEDGE BASE ===

--- ICP DOCUMENT ---
${ICP_DOCUMENT}

--- PRODUCT DOCUMENT ---
${PRODUCT_DOCUMENT}

--- OUTREACH GUIDELINES ---
${OUTREACH_GUIDELINES}

--- LEAD SCORING TRAINING DATA (${LEAD_SCORING_DATA.length} historical records) ---
Use these scored examples to calibrate your scoring methodology. Each record has: company, industry, employees, salesTeamSize, tools, painPoints, decisionMaker, fundingStage, and a score out of 10.
${JSON.stringify(LEAD_SCORING_DATA, null, 1)}

--- OUTREACH TEMPLATE PERFORMANCE DATA (${OUTREACH_TEMPLATES.length} templates) ---
Reference these high-performing templates and their metrics (openRate, replyRate, conversionRate, personalizationScore, toneScore) when generating emails.
${JSON.stringify(OUTREACH_TEMPLATES, null, 1)}

--- ICP DIMENSION WEIGHTS ---
Use these weighted dimensions to calculate ICP match percentages.
${JSON.stringify(ICP_DIMENSIONS, null, 1)}

--- COMPANY INTELLIGENCE DATABASE (${COMPANY_PROFILES.length} profiles) ---
Reference these if user mentions any known company. Each has: industry, employees, founded, techStack, recentNews, keyChallenge.
${JSON.stringify(COMPANY_PROFILES, null, 1)}

=== END KNOWLEDGE BASE ===`;

  const modeInstructions = {
    'lead-scorer': `
MODE: LEAD SCORER
You score leads on a scale of 1-10. For each lead, analyze these dimensions using the training data as calibration:
- Industry fit (is it B2B SaaS or adjacent?)
- Company size (10-200 employees is ideal)
- Sales team size (2-10 people is ideal)
- Tool stack overlap (Slack, HubSpot, Notion, ClickUp)
- Pain point alignment (manual reporting, outreach, automation gaps)
- Decision maker seniority (Founder, Head of Growth, VP Sales)
- Funding stage (Seed to Series B is sweet spot)

Output format:
1. **Score: X/10** (prominent)
2. **Verdict**: 🟢 STRONG FIT (8-10) | 🟡 POTENTIAL FIT (5-7) | 🔴 POOR FIT (1-4)
3. **Breakdown**: Score each dimension with reasoning
4. **Recommendation**: One clear next action`,

    'outreach': `
MODE: OUTREACH EMAIL GENERATOR
Generate personalized cold emails using the outreach performance data as a guide. Follow these rules:
- Keep under 150 words
- Lead with insight about their specific pain, NOT a product pitch
- One clear CTA
- No buzzwords (synergy, leverage, circle back, etc.)
- Confident but not salesy tone
- Reference the highest-performing template patterns from the training data

Output format:
1. **Subject Line** (compelling, personalized)
2. **Email Body** (formatted, ready to send)
3. **Why This Works**: Brief explanation of template strategy used
4. **Performance Prediction**: Expected open/reply rate based on similar templates`,

    'brief': `
MODE: BRIEF GENERATOR
Create comprehensive sales briefs. Leverage the company intelligence database if the company is listed. Always structure output as:

1. **Company Snapshot**: Who they are, size, industry, tech stack
2. **Likely Pain Points**: Specific to their stage and industry, mapped to ThinklyLabs solutions
3. **Positioning Strategy**: How to position ThinklyLabs specifically for this prospect
4. **Suggested Talking Points**: 3-5 bullet points, each with a hook and value prop
5. **Risk Factors**: What might make this deal difficult
6. **Recommended Approach**: First outreach strategy`,

    'icp-matcher': `
MODE: ICP MATCHER
Compare leads against the Ideal Customer Profile using the weighted ICP dimensions. Calculate a precise match percentage.

For each dimension, score 0-100%:
- Industry (weight: 25%): Ideal = B2B SaaS/MarTech/RevOps, Partial = FinTech/HealthTech/EdTech
- Company Size (weight: 20%): Ideal = 10-200 employees
- Sales Team (weight: 15%): Ideal = 2-10 people
- Tool Stack (weight: 15%): Match against Slack, HubSpot, Notion, ClickUp, Zapier
- Pain Points (weight: 15%): Match against ideal pain points list
- Decision Maker (weight: 10%): Ideal = Founder/Head of Growth/VP Sales

Output format:
1. **Overall Match: X%** (prominent, color-coded)
2. **Dimension Breakdown**: Table with each dimension's score and reasoning
3. **✅ What Fits**: Strongest alignment points
4. **❌ What Doesn't Fit**: Gaps and concerns
5. **Verdict**: Pursue / Maybe / Pass with reasoning`,
  };

  return basePrompt + (modeInstructions[mode] || '');
}
