import { ChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let model: GenerativeModel | null = null;
let currentSystemInstruction: string | undefined;

let chat: ChatSession | null = null;

/**
 * Initialize or update the model with a new system instruction.
 * Reuses the existing model if the instruction hasn't changed.
 * @param {string | undefined} newSystemInstruction
 * @returns {GenerativeModel | null}
 */
function getOrCreateModel(newSystemInstruction?: string): GenerativeModel | null {
    if (!GEMINI_API_KEY) {
        console.error("No GEMINI_API_KEY provided...");
        return null;
    }

    if (model && currentSystemInstruction === newSystemInstruction) {
        console.log("Model is already initialized with the same system instruction.");
        return model;
    }

    console.log("Initializing or updating the model...");
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    currentSystemInstruction = newSystemInstruction;
    model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: currentSystemInstruction,
    });

    return model;
}

/**
 * Gets the existing model or initializes it if not already done.
 * @param {string | undefined} systemInstruction
 * @returns {GenerativeModel | null}
 */
export function getModel(systemInstruction?: string): GenerativeModel | null {
    return model || getOrCreateModel(systemInstruction);
}

/**
 * Updates the model only if the system instruction has changed.
 * @param {string | undefined} newSystemInstruction
 * @returns {GenerativeModel | null}
 */
export function updateModel(newSystemInstruction?: string): GenerativeModel | null {
    if (!model) {
        console.error("Model not initialized. Initializing now...");
        return getOrCreateModel(newSystemInstruction);
    }

    if (currentSystemInstruction === newSystemInstruction) {
        console.log("System instruction unchanged. No update required.");
        return model;
    }

    return getOrCreateModel(newSystemInstruction);
}

export async function getChat(model: GenerativeModel) {
    if (chat) {
        console.log("Chat is already initiated");
        return chat;
    }

    console.log("Initiating chat...");
    chat = model.startChat();

    return chat
}
