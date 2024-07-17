// pages/app/signals/import/page.tsx
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, ArrowRight } from "lucide-react";

const ImportPage = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold md:text-3xl">Import Tutorial</h1>
      </div>
      <Tabs defaultValue="pc">
        <TabsList className="mb-6 flex space-x-2">
          <TabsTrigger value="pc" className="flex-1">PC</TabsTrigger>
          <TabsTrigger value="android" className="flex-1">Android</TabsTrigger>
          <TabsTrigger value="ios" className="flex-1">iOS</TabsTrigger>
        </TabsList>
        <TabsContent value="pc">
          <h2 className="text-lg font-bold">Choose a Method</h2>
          <div className="flex flex-col md:flex-row gap-4 my-4">
            <Button variant="default">Automatic</Button>
            <Button variant="default">Manual 1</Button>
            <Button variant="default">Manual 2</Button>
          </div>
          <div className="bg-background p-5 rounded-md border border-muted">
            <ol className="relative border-l border-muted-foreground ml-3 space-y-10 list-none">
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
                  1
                </span>
                <div className="flex-grow">
                  <h3 className="mb-1 font-semibold text-base text-foreground">First, launch Zenless Zone Zero and Open Your In-game Signal Records History</h3>
                  <p className="mb-4 font-normal text-sm text-muted-foreground">Afterwards, open Windows PowerShell, and then paste the following script.</p>
                  <div className="relative mt-2">
                    <pre className="bg-muted p-4 rounded-md">
                      <code>iwr -useb stardb.gg/signal | iex</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2"
                      // onClick={() => handleCopy("iwr -useb stardb.gg/signal | iex")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs">Note: The script does not edit your files, it simply extracts the URL from your logs.</p>
                </div>
              </li>
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
                  2
                </span>
                <div className="flex-grow">
                  <h3 className="mb-1 font-semibold text-base text-foreground">Paste the URL Here</h3>
                  <Input placeholder="Your Signal History URL" className="mt-2" />
                </div>
              </li>
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
                  3
                </span>
                <div className="flex-grow">
                  <h3 className="mb-1 font-semibold text-base text-foreground">Press the "Import History" Button on this Website</h3>
                  <Button className="mt-2">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Import History
                  </Button>
                </div>
              </li>
            </ol>
          </div>
        </TabsContent>
        <TabsContent value="android">
          <div className="text-muted-foreground">Android import instructions will go here.</div>
        </TabsContent>
        <TabsContent value="ios">
          <div className="text-muted-foreground">iOS import instructions will go here.</div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ImportPage;
