import { google } from '@ai-sdk/google';
import { embed,embedMany } from 'ai';

const model = google.textEmbedding('gemini-embedding-001');

//This is for search queries
export async function generateEmbedding(text: string) {
    const input = text.replace("\n", " ");
    
    const { embedding } = await embed({
    model,
    value: input,
    providerOptions: {
        google: {
        outputDimensionality: 1536, 
        },
    },
    });
    return embedding;
}


//This is for pdfs
export async function generateEmbeddings(texts: string[]) {
    const inputs = texts.map(text => text.replace("\n", " "));
    
    const { embeddings } = await embedMany({
    model,
    values: inputs,
    providerOptions: {
        google: {
        outputDimensionality: 1536, 
        },
    },
    });
    return embeddings;
}