# RAG Chatbot from Scratch

This project demonstrates how to build a **Retrieval-Augmented Generation (RAG) chatbot** that transforms PDF documents into an instant **AI-powered knowledge base**. The application covers the complete pipeline—from document ingestion and vector storage to semantic search, authentication, and a real-time streaming chat interface—resulting in a **production-ready RAG system**.

---

## 🚀 Features

* **Real-time Streaming Chat Interface**
  A responsive chat UI with token-by-token streaming responses.

* **PDF Upload and Processing (Admin-only)**
  Upload and process PDF documents with server-side text extraction, chunking, and embedding generation.

* **Vector Embeddings for Semantic Search**
  Converts text chunks into numerical vectors using **Gemini embedding models** to enable semantic retrieval.

* **Production-Ready Database with Neon**
  Uses **Neon serverless PostgreSQL** for storing document content and vector embeddings.

* **pgvector + Drizzle ORM Integration**
  Implements efficient vector similarity search using `pgvector` with schema and queries managed by **Drizzle ORM**.

* **User Authentication & Role-Based Access Control**
  Secures the application using **Clerk**, with admin-only access for document uploads.

* **Modern UI with Shadcn UI and AI Elements**
  Built on **Next.js** and **TypeScript** with clean, responsive components.

* **Text Chunking Utility**
  Breaks large documents into optimal chunks for embedding and retrieval.

* **Server Actions for Document Processing**
  Handles PDF parsing, chunking, embedding generation, and database insertion securely on the server.

* **AI SDK Integration**
  Uses the **Next.js AI SDK** to integrate Gemini models and manage streaming chat state.

---

## 🛠️ Technologies Used

* Next.js
* TypeScript
* React
* Next.js AI SDK (Gemini)
* Gemini API (Embeddings + Chat)
* Neon (PostgreSQL)
* Drizzle ORM
* pgvector
* Clerk Authentication
* Shadcn UI
* AI Elements
* Tailwind CSS
* PDF-Parse
* LangChain Text Splitters (`@langchain/textsplitters`)

---

## 🚀 Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm or Yarn

---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/gopinav/Next.js-AI-SDK-RAG-Chatbot.git
cd Next.js-AI-SDK-RAG-Chatbot
```

### Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root and add the following:

```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEON_DATABASE_URL=your_neon_database_url
```

---

## 🗄️ Database Setup

### Enable `pgvector`

Generate a custom migration:

```bash
npx drizzle-kit generate --custom
```

Edit the generated migration file inside `migrations/` and add:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

Run the migration:

```bash
npx drizzle-kit migrate
```

---

### Generate and Apply Schema Migrations

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open in your browser:

```
http://localhost:3000
```

---

## 🔑 Authentication & Role-Based Access Control

Authentication is handled using **Clerk**.

### Admin-only PDF Upload

PDF uploads are restricted to users with the **admin** role.

#### Set User Role (Public Metadata)

In the Clerk Dashboard, add the following to the user’s **Public Metadata**:

```json
{
  "role": "admin"
}
```

#### Expose Metadata via Session Claims

In the Clerk **JWT Templates**, add the following to **Session Claims**:

```json
{
  "metadata": "{{user.public_metadata}}"
}
```

Only users with `metadata.role === "admin"` are allowed to access the `/upload` route.

---

## 📂 PDF Upload

Navigate to:

```
http://localhost:3000/upload
```

Admins can upload PDF documents, which are:

* Parsed on the server
* Split into chunks
* Embedded using Gemini models
* Stored in Neon PostgreSQL with `pgvector`

---

## 💬 Chatbot Usage

After authentication, navigate to:

```
http://localhost:3000/chat
```

The chatbot retrieves relevant document chunks using vector similarity search and generates responses using **Gemini**, grounded in the uploaded documents.

## RAG LOGIC

![alt text](IMG_1709.jpeg)