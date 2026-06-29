import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Gemini SDK client initialization
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini AI Client initialized successfully.");
  } else {
    console.warn("GEMINI_API_KEY is not set in environment variables. Server running with fallback mode.");
  }

  // API Route to handle Gemini Gap Analysis report generation
  app.post("/api/analysis/generate", async (req, res) => {
    try {
      if (!ai) {
        return res.status(500).json({ 
          error: "Gemini AI Client is not initialized. Please verify that the GEMINI_API_KEY secret is configured in the Settings > Secrets panel in AI Studio." 
        });
      }

      const { organization, clausesStats, annexStats, majorGaps, customNotes } = req.body;

      if (!organization || !clausesStats || !annexStats) {
        return res.status(400).json({ error: "Missing required assessment parameters." });
      }

      const prompt = `
You are a senior auditor and leading expert in AI Governance, specifically ISO/IEC 42001 (Artificial Intelligence Management System - AIMS).
Conduct a formal, executive-level Gap Analysis & Roadmap report for the following organization.

---
ORGANIZATION DETAILS:
- Name: ${organization.name}
- Industry: ${organization.industry || "General / Technology"}
- Primary AI Use Case: ${organization.aiUseCase || "Not specified"}
- Target Certification Date: ${organization.targetDate || "Not specified"}
- AI Core Technologies: ${organization.aiTech || "General AI systems"}
- Maturity Level: ${organization.maturityLevel || "Level 2 (Repeatable)"}
- Lead Auditor: ${organization.leadAssessor || "Internal Assessor"}

ASSESSMENT METRICS:
- Clauses 4-10 (Core Framework): 
  - Total Compliant: ${clausesStats.compliant}
  - Total Partial: ${clausesStats.partial}
  - Total Gaps (Non-compliant): ${clausesStats.gap}
- Annex A (AI Controls):
  - Total Compliant: ${annexStats.compliant}
  - Total Partial: ${annexStats.partial}
  - Total Gaps (Non-compliant): ${annexStats.gap}

IDENTIFIED MAIN GAPS & WEAKNESSES:
${JSON.stringify(majorGaps, null, 2)}

ADDITIONAL ASSESSOR NOTES & EVIDENCE:
${customNotes || "No custom assessor notes provided."}
---

Your task is to generate a comprehensive, highly professional, executive-ready HTML executive summary of findings and a strategic roadmap to achieve full ISO 42001 certification.
The response must be in strict valid JSON format with the following keys:
1. "executiveSummary": A beautifully phrased, 3-4 paragraph summary of the current AIMS posture, emphasizing the strategic importance of compliance in their industry.
2. "strategicRoadmap": A detailed, step-by-step roadmap divided into phases (Phase 1: Foundation & Alignment, Phase 2: Implementation & Controls, Phase 3: Audit Preparation) with estimated durations and critical milestones, specifically tailored to their use case.
3. "keyFindings": An array of objects, each containing:
   - "title": Title of the finding
   - "riskLevel": "High" | "Medium" | "Low"
   - "clauseOrControl": Which clause or Annex A control this relates to
   - "description": Why it is a risk
   - "recommendation": How to remediate and close the gap
4. "requiredPolicies": A recommended list of specific policies and procedures they must draft (e.g., AI Policy, AI System Impact Assessment Procedure, AI Data Governance Policy) with brief descriptions.
5. "immediateActionPlan": An array of 5-7 concrete, actionable next steps they should take in the next 30-90 days.

Use clear, authoritative, professional guidance. Return ONLY the raw JSON object. Do not wrap it in markdown codeblocks (such as \`\`\`json ... \`\`\`).
`;

      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      let responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini AI.");
      }

      let textToParse = responseText.trim();
      // Safely strip any markdown code blocks
      if (textToParse.includes("```")) {
        textToParse = textToParse.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      }

      try {
        const result = JSON.parse(textToParse);
        res.json(result);
      } catch (parseError: any) {
        console.error("JSON parse error of response:", responseText);
        // Fallback: If JSON parsing fails, try to extract JSON using a regex matcher
        const jsonMatch = textToParse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const result = JSON.parse(jsonMatch[0]);
            res.json(result);
          } catch (nestedError: any) {
            throw new Error("Invalid JSON structure returned by Gemini: " + parseError?.message);
          }
        } else {
          throw new Error("Invalid JSON structure returned by Gemini: " + parseError?.message);
        }
      }

    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({ 
        error: "Failed to generate report analysis. " + (error?.message || error) 
      });
    }
  });

  // Serve static assets in production, otherwise Vite dev server handles it
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
