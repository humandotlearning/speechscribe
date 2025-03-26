"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HelpCircle, ArrowLeft } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SettingsPage() {
  const navigate = useNavigate()
  const [useApi, setUseApi] = useState(true)
  const [language, setLanguage] = useState("en")
  const [temperature, setTemperature] = useState("0.0")
  const [initialPrompt, setInitialPrompt] = useState("")
  const [apiProvider, setApiProvider] = useState("openai")
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState("whisper-1")

  const handleSave = () => {
    // Save settings logic here
    navigate("/")
  }

  const handleReset = () => {
    setUseApi(true)
    setLanguage("en")
    setTemperature("0.0")
    setInitialPrompt("")
    setApiProvider("openai")
    setApiKey("")
    setModel("whisper-1")
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <Tabs defaultValue="model" className="w-full">
            <TabsList className="w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="model"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Model options
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Recording options
              </TabsTrigger>
              <TabsTrigger
                value="post"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Post processing
              </TabsTrigger>
              <TabsTrigger
                value="misc"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Misc
              </TabsTrigger>
            </TabsList>

            <TabsContent value="model" className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Label htmlFor="use-api" className="text-base">
                  Use API:
                </Label>
                <Switch id="use-api" checked={useApi} onCheckedChange={setUseApi} />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">API usage info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enable to use external API for speech recognition</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <h3 className="font-medium mb-4">Common</h3>

                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="language" className="w-32">
                        Language:
                      </Label>
                      <Input
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="max-w-[200px]"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                              <HelpCircle className="h-4 w-4" />
                              <span className="sr-only">Language info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Language code (e.g., en, fr, es)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label htmlFor="temperature" className="w-32">
                        Temperature:
                      </Label>
                      <Input
                        id="temperature"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="max-w-[200px]"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                              <HelpCircle className="h-4 w-4" />
                              <span className="sr-only">Temperature info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Controls randomness (0.0 to 1.0)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label htmlFor="initial-prompt" className="w-32">
                        Initial prompt:
                      </Label>
                      <Input
                        id="initial-prompt"
                        value={initialPrompt}
                        onChange={(e) => setInitialPrompt(e.target.value)}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                              <HelpCircle className="h-4 w-4" />
                              <span className="sr-only">Initial prompt info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Text to guide the model's initial response</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                {useApi && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="font-medium mb-4">API</h3>

                    <div className="space-y-4">
                      <RadioGroup value={apiProvider} onValueChange={setApiProvider}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="openai" id="openai" />
                          <Label htmlFor="openai" className="font-medium">
                            OpenAI
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="azure" id="azure" />
                          <Label htmlFor="azure" className="font-medium">
                            Azure
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="google" id="google" />
                          <Label htmlFor="google" className="font-medium">
                            Google
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="grid gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="api-key" className="w-32">
                            API key:
                          </Label>
                          <Input
                            id="api-key"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor="model" className="w-32">
                            Model:
                          </Label>
                          <Input id="model" value={model} onChange={(e) => setModel(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recording" className="p-6">
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Recording options will be available here
              </div>
            </TabsContent>

            <TabsContent value="post" className="p-6">
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Post-processing options will be available here
              </div>
            </TabsContent>

            <TabsContent value="misc" className="p-6">
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Miscellaneous options will be available here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  )
}

