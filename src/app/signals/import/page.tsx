// app/signals/import/page.tsx

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ImportButton } from '@/components/ImportButton';

const ImportPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:px-0">
      <Card>
        <CardHeader>
          <CardTitle>Signal Import</CardTitle>
          <CardDescription>Import and save your signal history.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-lg font-bold">Windows Only</h2>
            <ol className="list-decimal ml-6 space-y-2 mt-2">
              <li>Start Zenless Zone Zero on your PC and open your signal records history</li>
              <li>Open Windows Powershell. You can do this by searching for "PowerShell" in the Windows search bar</li>
              <li>Copy and paste one of the following commands, depending on your account region, into Powershell and press Enter:</li>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input readOnly value="iwr -useb signaltracker.gg/signal | iex" />
                  <ImportButton text="iwr -useb signaltracker.gg/signal | iex" />
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Input readOnly value="iwr -useb signaltracker.gg/signal_cn | iex" />
                  <ImportButton text="iwr -useb signaltracker.gg/signal_cn | iex" />
                </div> */}
              </div>
              <li>Paste the output of the command into the input below</li>
            </ol>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Paste your signal URL here</label>
            <Input placeholder="Paste your signal URL here..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <ImportButton text="Import" />
        </CardFooter>
      </Card>
    </main>
  );
};

export default ImportPage;
