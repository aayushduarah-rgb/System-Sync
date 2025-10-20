import { GoogleGenAI, Type } from "@google/genai";
import type { Game, SystemSpecs, CompatibilityReport } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const compatibilityReportSchema = {
  type: Type.OBJECT,
  properties: {
    isCompatible: { type: Type.BOOLEAN, description: "True if the user's system meets the recommended requirements, false otherwise." },
    estimatedFps: { type: Type.INTEGER, description: "A numerical estimation of the Frames Per Second the user's system can achieve at 1080p resolution on medium settings." },
    analysis: { type: Type.STRING, description: "A detailed but concise analysis (2-3 sentences) of the compatibility, highlighting strengths and weaknesses of the user's system for this specific game." },
    componentCheck: {
      type: Type.OBJECT,
      properties: {
        cpu: { type: Type.OBJECT, properties: { meetsMinimum: { type: Type.BOOLEAN }, meetsRecommended: { type: Type.BOOLEAN }, details: { type: Type.STRING, description: "Brief comment on CPU performance." } } },
        gpu: { type: Type.OBJECT, properties: { meetsMinimum: { type: Type.BOOLEAN }, meetsRecommended: { type: Type.BOOLEAN }, details: { type: Type.STRING, description: "Brief comment on GPU performance." } } },
        ram: { type: Type.OBJECT, properties: { meetsMinimum: { type: Type.BOOLEAN }, meetsRecommended: { type: Type.BOOLEAN }, details: { type: Type.STRING, description: "Brief comment on RAM amount." } } }
      }
    }
  },
  required: ['isCompatible', 'estimatedFps', 'analysis', 'componentCheck']
};

const gameDetailsSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique slug-style ID for the game, like 'the-witcher-3-wild-hunt'." },
        name: { type: Type.STRING, description: "The official name of the game." },
        posterUrl: { type: Type.STRING, description: "A publicly accessible URL for the official video game cover art or promotional poster. It must match the correct video game, avoiding movies or fan art. The image should feature authentic visuals like characters, scenes, or logos from the game. If a suitable, high-quality image that meets these criteria cannot be found, return the exact string 'NO_IMAGE' instead of a URL." },
        minReqs: { type: Type.OBJECT, properties: { cpu: { type: Type.STRING }, gpu: { type: Type.STRING }, ram: { type: Type.STRING }, os: { type: Type.STRING }, }, required: ['cpu', 'gpu', 'ram', 'os'] },
        recReqs: { type: Type.OBJECT, properties: { cpu: { type: Type.STRING }, gpu: { type: Type.STRING }, ram: { type: Type.STRING }, os: { type: Type.STRING }, }, required: ['cpu', 'gpu', 'ram', 'os'] }
    },
    required: ['id', 'name', 'posterUrl', 'minReqs', 'recReqs']
};

const gameSearchSchema = {
    type: Type.OBJECT,
    properties: {
        games: {
            type: Type.ARRAY,
            description: "A list of found games. Contains a single item for a direct match, or up to 3 for an ambiguous query.",
            items: gameDetailsSchema
        }
    },
    required: ['games']
};

export async function getCompatibilityReport(game: Game, userSpecs: SystemSpecs): Promise<CompatibilityReport> {
  const prompt = `
    Analyze the user's PC specifications for playing the game "${game.name}".
    Game Minimum Requirements: - CPU: ${game.minReqs.cpu} - GPU: ${game.minReqs.gpu} - RAM: ${game.minReqs.ram} - OS: ${game.minReqs.os}
    Game Recommended Requirements: - CPU: ${game.recReqs.cpu} - GPU: ${game.recReqs.gpu} - RAM: ${game.recReqs.ram} - OS: ${game.recReqs.os}
    User's System Specifications: - CPU: ${userSpecs.cpu} - GPU: ${userSpecs.gpu} - RAM: ${userSpecs.ram} - OS: ${userSpecs.os}
    Provide a compatibility report. 'isCompatible' is true ONLY if the system meets RECOMMENDED requirements. Estimate FPS for 1080p medium settings.
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

export async function searchForGame(gameName: string): Promise<Game[] | null> {
    const prompt = `
        Find the complete PC system requirements for the video game titled: "{game_name}".
        1.  If the name is ambiguous (e.g., "Call of Duty"), provide a list of the top 3 most popular and relevant games.
        2.  If the name is a clear match, provide a list with just that single game.
        3.  For each game, find both Minimum and Recommended PC requirements (CPU, GPU, RAM, OS).
        4.  For each game, retrieve a publicly accessible URL for its official video game cover art or promotional poster. It must match the correct video game, not movies, fan art, or unrelated objects. The image must only include authentic visuals from the game—characters, scenes, or logos from the correct title. If you cannot find an exact cover that meets these criteria, return the string 'NO_IMAGE' for the posterUrl field.
        5.  Return the result as a single JSON object. If you cannot find the game, return a JSON object with an empty "games" array.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt.replace('{game_name}', gameName),
            config: { responseMimeType: "application/json", responseSchema: gameSearchSchema },
        });
        const gameData = JSON.parse(response.text.trim());
        return gameData.games || null;
    } catch (error) {
        console.error("Error searching for game:", error);
        throw new Error("AI service failed to retrieve game data.");
    }
}