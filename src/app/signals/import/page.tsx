// pages/app/signals/import/page.tsx
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, TriangleAlert } from "lucide-react";
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton'; // Import the CopyButton component

const ImportPage = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold md:text-3xl">Import</h1>
        <Button asChild variant="destructive" size="sm">
          <Link href="/signals">Cancel</Link>
        </Button>
      </div>
      <Tabs defaultValue="pc">
        <TabsList className="mb-6 flex space-x-2">
          <TabsTrigger value="pc" className="flex-1">PC</TabsTrigger>
          <TabsTrigger value="android" className="flex-1">Android</TabsTrigger>
          <TabsTrigger value="ios" className="flex-1">iOS</TabsTrigger>
        </TabsList>
        <TabsContent value="pc">
          <Card className="bg-transparent border-transparent p-0">
            <ol className="relative border-l border-muted-foreground ml-3 space-y-10 list-none">
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-tertiary text-tertiary-foreground rounded-full">
                  1
                </span>
                <div className="flex-grow">
                  <h3 className="mb-1 font-semibold text-base text-foreground">Launch Zenless Zone Zero on PC and open your in-game Signal Search History</h3>                  
                </div>
              </li>
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-tertiary text-tertiary-foreground rounded-full">
                  2
                </span>
                <div className="flex-grow">
                  <h3 className="mb-1 font-semibold text-base text-foreground">Open Windows PowerShell by searching for &quot;PowerShell&quot; within Windows Search.</h3>
                  <p className="mt-2 text-xs text-muted-foreground">Note: If you are having any issues, you can try running it as Administrator.</p>                  
                </div>
              </li>
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-tertiary text-tertiary-foreground rounded-full">
                  3
                </span>
                <div className="flex-grow">
                  <h3 className="mb-5 font-semibold text-base text-foreground">Copy one of the following commands, paste it into Powershell, then press enter.</h3>
                  <Tabs defaultValue='global'>
                    <TabsList className="mb-3 flex space-x-2">
                      <TabsTrigger value="global" className="flex-1">Global Client</TabsTrigger>
                      <TabsTrigger value="cn" className="flex-1">CN Client</TabsTrigger>
                    </TabsList>
                    <TabsContent value='global'>
                      <div className="relative mt-2 flex flex-col md:flex-row items-start overflow-x-auto">
                        <pre className="border border-input py-2 px-3 rounded-md flex-grow w-full whitespace-pre-wrap break-words">
                          <code className="text-sm">iwr -useb signaltracker.gg/api/getUrlG | iex</code>
                        </pre>
                        <CopyButton textToCopy="iwr -useb signaltracker.gg/getUrlG | iex" />
                      </div>
                    </TabsContent>
                    <TabsContent value='cn'>
                      <div className="relative mt-2 flex flex-col md:flex-row items-start overflow-x-auto">
                        <pre className="border border-input py-2 px-3 rounded-md flex-grow whitespace-pre-wrap break-words">
                          <code className="text-sm">iwr -useb signaltracker.gg/api/getUrlCN | iex</code>
                        </pre>
                        <CopyButton textToCopy="iwr -useb signaltracker.gg/getUrlCN | iex" />
                      </div>
                    </TabsContent>
                  </Tabs>
                  <p className="mt-2 text-xs text-muted-foreground">Note: The script does not edit your files, it simply extracts the URL from your logs. You can view the script <span className="text-primary underline hover:text-primary-foreground cursor-pointer">here</span>.</p>
                </div>
              </li>
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-tertiary text-tertiary-foreground rounded-full">
                  4
                </span>
                <div className="flex-grow">
                  <h3 className="mb-1 font-semibold text-base text-foreground">Paste the URL Here</h3>
                  <Input placeholder="Your Signal History URL" className="mt-2" />
                </div>
              </li>
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-tertiary text-tertiary-foreground rounded-full">
                  5
                </span>
                <div className="flex-grow">
                  <h3 className="mb-1 font-semibold text-base text-foreground">Press the &quot;Import&quot; button below</h3>
                  <Button className="mt-2" variant="tertiary">
                    Import
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </li>
              <li className="mb-10 ml-8 flex items-start">
                <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-yellow-400 text-tertiary-foreground rounded-full">
                  <TriangleAlert className="h-5 w-5 -mt-1" />
                </span>
                <div className="flex-grow">
                  <h3 className="mb-1 font-semibold text-base text-foreground">If you have any issues, visit our <span className="text-primary underline hover:text-primary-foreground cursor-pointer">Discord Server</span> for help</h3>
                </div>
              </li>
            </ol>
          </Card>
        </TabsContent>
        <TabsContent value="android">
          <div className="text-muted-foreground">Android import instructions will go here.</div>
        </TabsContent>
        <TabsContent value="ios">
          <div className="text-muted-foreground">iOS import instructions will go here.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportPage;
