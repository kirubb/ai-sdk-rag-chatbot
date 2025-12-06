// src/app/upload/actions.ts
"use server";

import PDFParser from "pdf2json";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Wrap the event-based parser in a Promise so we can 'await' it
    return new Promise(async (resolve, reject) => {
      
      // Initialize parser (null = no specialized config, true = enable raw text extraction)
      const pdfParser = new PDFParser(null, true);

      // 1. Handle Errors
      pdfParser.on("pdfParser_dataError", (errData: any) => {
        console.error("PDF Parser Error:", errData.parserError);
        resolve({ success: false, error: "Failed to parse PDF text" });
      });

      // 2. Handle Success
      pdfParser.on("pdfParser_dataReady", async () => {
        try {
          // Extract text using the library's built-in method
          const text = pdfParser.getRawTextContent();

          if (!text || text.trim().length === 0) {
            resolve({ success: false, error: "No text found in PDF" });
            return;
          }

          // Chunk the text
          const chunks = await chunkContent(text);

          // Generate embeddings
          const embeddings = await generateEmbeddings(chunks);

          // Prepare database records
          const records = chunks.map((chunk, index) => ({
            content: chunk,
            embedding: embeddings[index],
          }));

          // Save to DB
          await db.insert(documents).values(records);

          resolve({
            success: true,
            message: `Successfully processed PDF. Created ${records.length} searchable chunks.`,
          });
          
        } catch (innerError) {
          console.error("Processing Logic Error:", innerError);
          resolve({ success: false, error: "Failed during chunking or embedding" });
        }
      });

      // 3. Start Parsing
      try {
        pdfParser.parseBuffer(buffer);
      } catch (e) {
        console.error("Buffer Parsing Error:", e);
        resolve({ success: false, error: "File buffer is corrupt" });
      }
    });

  } catch (error) {
    console.error("Upload Handler Error:", error);
    return {
      success: false,
      error: "Failed to process PDF upload",
    };
  }
}