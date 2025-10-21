import { GoogleGenAI, Type } from "@google/genai";
import type { Software, SystemSpecs, CompatibilityReport } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const compatibilityReportSchema = {
  type: Type.OBJECT,
  properties: {
    isCompatible: { type: Type.BOOLEAN, description: "True if the user's system meets the recommended requirements, false otherwise." },
    estimatedPerformance: { type: Type.STRING, description: "A string estimating the performance. For games, this should be an FPS range (e.g., '60-75 FPS'). For applications, it should be a qualitative description (e.g., 'Smooth for 1080p video editing')." },
    analysis: { type: Type.STRING, description: "A detailed but concise analysis (2-3 sentences) of the compatibility, highlighting strengths and weaknesses of the user's system for this specific software." },
    componentCheck: {
      type: Type.OBJECT,
      properties: {
        cpu: { type: Type.OBJECT, properties: { meetsMinimum: { type: Type.BOOLEAN }, meetsRecommended: { type: Type.BOOLEAN }, details: { type: Type.STRING, description: "Brief comment on CPU performance." } } },
        gpu: { type: Type.OBJECT, properties: { meetsMinimum: { type: Type.BOOLEAN }, meetsRecommended: { type: Type.BOOLEAN }, details: { type: Type.STRING, description: "Brief comment on GPU performance." } } },
        ram: { type: Type.OBJECT, properties: { meetsMinimum: { type: Type.BOOLEAN }, meetsRecommended: { type: Type.BOOLEAN }, details: { type: Type.STRING, description: "Brief comment on RAM amount." } } }
      }
    }
  },
  required: ['isCompatible', 'estimatedPerformance', 'analysis', 'componentCheck']
};

const softwareDetailsSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique slug-style ID for the software, like 'adobe-photoshop-2024'." },
        name: { type: Type.STRING, description: "The official name of the software." },
        posterUrl: { type: Type.STRING, description: "A publicly accessible URL for the official software cover art, box art, or icon. Must be high-resolution and an accurate representation. Absolutely NO screenshots, fan art, unrelated images, or low-quality placeholders. If a suitable image that meets these strict criteria cannot be found, return the exact string 'NO_IMAGE'." },
        minReqs: { type: Type.OBJECT, properties: { cpu: { type: Type.STRING }, gpu: { type: Type.STRING }, ram: { type: Type.STRING }, os: { type: Type.STRING }, }, required: ['cpu', 'gpu', 'ram', 'os'] },
        recReqs: { type: Type.OBJECT, properties: { cpu: { type: Type.STRING }, gpu: { type: Type.STRING }, ram: { type: Type.STRING }, os: { type: Type.STRING }, }, required: ['cpu', 'gpu', 'ram', 'os'] }
    },
    required: ['id', 'name', 'posterUrl', 'minReqs', 'recReqs']
};

const softwareSearchSchema = {
    type: Type.OBJECT,
    properties: {
        software: {
            type: Type.ARRAY,
            description: "A list of found software. Contains a single item for a direct match, or up to 3 for an ambiguous query.",
            items: softwareDetailsSchema
        }
    },
    required: ['software']
};

export async function getCompatibilityReport(software: Software, userSpecs: SystemSpecs): Promise<CompatibilityReport> {
  const prompt = `
    Analyze the user's PC specifications for running the software "${software.name}".
    Software Minimum Requirements: - CPU: ${software.minReqs.cpu} - GPU: ${software.minReqs.gpu} - RAM: ${software.minReqs.ram} - OS: ${software.minReqs.os}
    Software Recommended Requirements: - CPU: ${software.recReqs.cpu} - GPU: ${software.recReqs.gpu} - RAM: ${software.recReqs.ram} - OS: ${software.recReqs.os}
    User's System Specifications: - CPU: ${userSpecs.cpu} - GPU: ${userSpecs.gpu} - RAM: ${userSpecs.ram} - OS: ${userSpecs.os}
    Provide a compatibility report. 'isCompatible' is true ONLY if the system meets RECOMMENDED requirements. Estimate performance for standard use (e.g., 1080p medium settings for a game, or typical project work for an application).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json", responseSchema: compatibilityReportSchema },
    });
    return JSON.parse(response.text.trim()) as CompatibilityReport;
  } catch (error) {
    console.error("Error generating compatibility report:", error);
    throw new Error("Failed to communicate with the AI service for the report.");
  }
}

export async function searchForSoftware(softwareName: string): Promise<Software[] | null> {
    const prompt = `
        Find the complete PC system requirements for the video game or application titled: "${softwareName}".
        1. If the name is ambiguous (e.g., "Photoshop"), provide a list of the top 3 most popular and relevant versions.
        2. If the name is a clear match, provide a list with just that single software.
        3. For each result, find both Minimum and Recommended PC requirements (CPU, GPU, RAM, OS).
        4. For each result, you must find the official, primary cover art, box art, or application icon. The image must be high quality and clearly represent the title provided. Absolutely no gameplay screenshots, fan art, movie adaptations, concept art, or other irrelevant imagery. Prioritize the most recognizable international version of the cover/icon. If a perfect, high-quality image that meets these criteria cannot be found, you must return the exact string 'NO_IMAGE' for the posterUrl field.
        5. Return the result as a single JSON object. If you cannot find the software, return a JSON object with an empty "software" array.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: softwareSearchSchema },
        });
        const data = JSON.parse(response.text.trim());
        return data.software || null;
    } catch (error) {
        console.error("Error searching for software:", error);
        throw new Error("AI service failed to retrieve software data.");
    }
}