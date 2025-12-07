

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Upload } from "lucide-react";



export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/30 p-8">
      <div className="max-w-3xl space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            RAG Knowledge Base Chatbot
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Upload your PDF documents and chat with them instantly using AI. Login to get started!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/chat" className="group">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Chat with AI</CardTitle>
                
                <CardDescription>
                  Ask questions and get answers based on your uploaded documents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full hover:cursor-pointer">Start Chatting</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/upload" className="group">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Upload Documents</CardTitle>
                
                
                <CardDescription>
                  Add new PDFs to the knowledge base for the AI to learn from.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full hover:cursor-pointer">Upload Files</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}