/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/SwaggerUIClone.tsx
"use client";

import { useState } from "react";
import { Loader2, ChevronDown } from "lucide-react";

// --- SHADCN/UI Imports ---
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils"; // Make sure this path is correct

// --- MOCK API DATA (Simplified OpenAPI Spec) ---
const mockApiSpec = {
  info: {
    title: "My Pet Store API",
    description: "This is a sample server for a pet store.",
    termsOfService: "http://example.com/terms/",
    contact: { email: "api@example.com" },
  },
  tags: [
    { name: "pet", description: "Everything about your Pets" },
    { name: "store", description: "Access to Petstore orders" },
  ],
  paths: {
    "/pet": {
      post: {
        tags: ["pet"],
        summary: "Add a new pet to the store",
        requestBody: {
          description: "Pet object that needs to be added",
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Pet" },
              example: {
                name: "doggie",
                photoUrls: ["http://example.com/img.png"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                example: { id: 10, name: "doggie", status: "available" },
              },
            },
          },
          "405": { description: "Invalid input" },
        },
      },
    },
    "/pet/findByStatus": {
      get: {
        tags: ["pet"],
        summary: "Finds Pets by status",
        parameters: [
          {
            name: "status",
            in: "query",
            description: "Status values to filter by",
            required: true,
            schema: { type: "string", enum: ["available", "pending", "sold"] },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            content: {
              "application/json": {
                example: [{ id: 10, name: "doggie", status: "available" }],
              },
            },
          },
          "400": { description: "Invalid status value" },
        },
      },
    },
    "/pet/{petId}": {
      get: {
        tags: ["pet"],
        summary: "Find pet by ID",
        parameters: [
          {
            name: "petId",
            in: "path",
            description: "ID of pet to return",
            required: true,
            schema: { type: "integer", format: "int64" },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            content: {
              "application/json": {
                example: { id: 10, name: "doggie", status: "available" },
              },
            },
          },
          "404": { description: "Pet not found" },
        },
      },
    },
  },
  components: {
    schemas: {
      Pet: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int64" },
          name: { type: "string" },
          status: { type: "string", enum: ["available", "pending", "sold"] },
        },
      },
    },
  },
};
// --- END MOCK API DATA ---

type ApiResponse = {
  status: number;
  data: any;
  headers: Record<string, string>;
};
type ApiError = {
  status: number;
  message: string;
};

/**
 * ApiEndpoint Component
 * Renders a single, interactive endpoint
 */
type ApiEndpointProps = {
  path: string;
  method: string;
  data: any;
};

function ApiEndpoint({ path, method, data }: ApiEndpointProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTryOut, setIsTryOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [bodyValue, setBodyValue] = useState(() => {
    try {
      return JSON.stringify(
        data.requestBody?.content["application/json"].example,
        null,
        2
      );
    } catch {
      return "";
    }
  });

  const methodClass = `method-${method.toLowerCase()}`;
  const allParams = data.parameters || [];

  const handleParamChange = (name: string, value: string) => {
    setParamValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleExecute = () => {
    setIsLoading(true);
    setApiResponse(null);
    setApiError(null);

    // --- Simulate API Call ---
    setTimeout(() => {
      // 1. Check for required params
      for (const param of allParams) {
        if (param.required && !paramValues[param.name]) {
          setApiError({
            status: 400,
            message: `Missing required ${param.in} parameter: ${param.name}`,
          });
          setIsLoading(false);
          return;
        }
      }

      // 2. Check for required requestBody
      if (data.requestBody?.required && !bodyValue) {
        setApiError({ status: 400, message: "Request body is required" });
        setIsLoading(false);
        return;
      }

      // 3. Find a success response (e.g., 200)
      const successCode = Object.keys(data.responses).find((code) =>
        code.startsWith("2")
      );

      if (successCode) {
        const responseData = data.responses[successCode].content?.[
          "application/json"
        ]?.example || { message: "Operation successful" };

        setApiResponse({
          status: parseInt(successCode),
          data: responseData,
          headers: {
            "content-type": "application/json",
            date: new Date().toUTCString(),
          },
        });
      } else {
        // Fallback if no 2xx response is defined
        setApiResponse({
          status: 204,
          data: { message: "No content" },
          headers: { date: new Date().toUTCString() },
        });
      }

      setIsLoading(false);
    }, 1000); // 1-second delay
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* 1. Endpoint Header (Clickable) */}
      <div
        className={cn(
          "flex items-center space-x-4 p-3 cursor-pointer",
          isOpen && "border-b"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${methodClass} text-sm font-bold uppercase px-3 py-1 rounded`}
        >
          {method.toUpperCase()}
        </span>
        <span className="text-lg font-mono font-bold">{path}</span>
        <span className="text-sm text-muted-foreground">{data.summary}</span>
        <ChevronDown
          className={cn(
            "ml-auto h-5 w-5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* 2. Endpoint Body (Collapsible) */}
      {isOpen && (
        <div className="p-4 space-y-6">
          <div className="flex justify-end">
            <Button
              variant={isTryOut ? "outline" : "default"}
              onClick={() => setIsTryOut(!isTryOut)}
            >
              {isTryOut ? "Cancel" : "Try it out"}
            </Button>
          </div>

          {/* --- Parameters --- */}
          {allParams.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Parameters</h4>
              {allParams.map((p: any) => (
                <div key={p.name} className="space-y-2">
                  <Label htmlFor={p.name} className="flex justify-between">
                    <span>
                      {p.name}{" "}
                      {p.required && (
                        <span className="text-destructive">* required</span>
                      )}
                    </span>
                    <span className="text-muted-foreground font-mono">
                      {p.schema.type} ({p.in})
                    </span>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {p.description}
                  </p>
                  <Input
                    id={p.name}
                    type="text"
                    placeholder={p.name}
                    disabled={!isTryOut}
                    value={paramValues[p.name] || ""}
                    onChange={(e) => handleParamChange(p.name, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* --- Request Body --- */}
          {data.requestBody && (
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">
                Request body
                {data.requestBody.required && (
                  <span className="text-sm text-destructive font-bold ml-2">
                    * required
                  </span>
                )}
              </h4>
              <Tabs defaultValue="example">
                <TabsList>
                  <TabsTrigger value="example">Example</TabsTrigger>
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                </TabsList>
                <TabsContent value="example" className="mt-4">
                  <Textarea
                    className="w-full h-48 font-mono text-sm"
                    value={bodyValue}
                    onChange={(e) => setBodyValue(e.target.value)}
                    disabled={!isTryOut}
                  />
                </TabsContent>
                <TabsContent value="schema" className="mt-4">
                  <pre className="p-4 border rounded-md overflow-auto text-sm font-mono">
                    {JSON.stringify(
                      mockApiSpec.components.schemas.Pet, // Faking schema lookup
                      null,
                      2
                    )}
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* --- Execute Button --- */}
          {isTryOut && (
            <div>
              <Button onClick={handleExecute} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Executing..." : "Execute"}
              </Button>
            </div>
          )}

          {/* --- Server Response --- */}
          {(isLoading || apiResponse || apiError) && (
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Server Response</h4>
              {isLoading && (
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Waiting for response...</span>
                </div>
              )}
              {apiError && (
                <Alert variant="destructive">
                  <AlertTitle>Error: {apiError.status}</AlertTitle>
                  <AlertDescription>{apiError.message}</AlertDescription>
                </Alert>
              )}
              {apiResponse && (
                <Alert>
                  <AlertTitle>Success: {apiResponse.status}</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <pre className="p-4 bg-secondary text-secondary-foreground rounded-md overflow-auto text-sm font-mono">
                      {JSON.stringify(apiResponse.data, null, 2)}
                    </pre>
                    <h5 className="font-semibold">Headers</h5>
                    <pre className="p-4 bg-secondary text-secondary-foreground rounded-md overflow-auto text-sm font-mono">
                      {JSON.stringify(apiResponse.headers, null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* --- Static Responses --- */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Responses</h4>
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(data.responses).map(
                ([code, resp]: [string, any]) => (
                  <AccordionItem value={code} key={code}>
                    <AccordionTrigger>
                      <span className="font-mono font-bold w-12">{code}</span>
                      <span className="text-sm text-muted-foreground">
                        {resp.description}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      {resp.content ? (
                        <pre className="p-4 bg-secondary text-secondary-foreground rounded-md overflow-auto text-sm font-mono">
                          {JSON.stringify(
                            resp.content["application/json"].example,
                            null,
                            2
                          )}
                        </pre>
                      ) : (
                        <p className="text-sm italic p-4">
                          No example content.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Main Swagger UI Clone Component
 */
export default function SwaggerUIClone() {
  const [apiUrl, setApiUrl] = useState(
    "https://api.example.com/v1/openapi.json"
  );
  const apiData = mockApiSpec; // Using mock data

  return (
    <div className="antialiased">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-10 p-4 border-b shadow-sm bg-background">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">API Documentation</h1>
          <div className="flex-1 flex gap-2">
            <Input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
            <Button>Explore</Button>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* API Info Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            {apiData.info.title}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            {apiData.info.description}
          </p>
          <div className="mt-4 space-x-4 text-sm">
            {apiData.info.termsOfService && (
              <Button variant="link" asChild className="p-0">
                <a href={apiData.info.termsOfService}>Terms of Service</a>
              </Button>
            )}
            {apiData.info.contact && (
              <Button variant="link" asChild className="p-0">
                <a href={`mailto:${apiData.info.contact.email}`}>
                  Contact Developer
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* API Groups (Data-Driven with shadcn/ui Accordion) */}
        <Accordion
          type="multiple"
          defaultValue={["pet"]}
          className="w-full space-y-8"
        >
          {apiData.tags.map((tag) => {
            const taggedPaths = Object.entries(apiData.paths).flatMap(
              ([path, methods]) =>
                Object.entries(methods)
                  .filter(([, data]) =>
                    data.tags.includes(tag.name.toLowerCase())
                  )
                  .map(([method, data]) => ({ path, method, data }))
            );

            return (
              <AccordionItem
                value={tag.name}
                key={tag.name}
                className="border-none"
              >
                <AccordionTrigger className="text-2xl font-semibold uppercase p-4 rounded-lg bg-muted data-[state=open]:rounded-b-none">
                  <div className="flex justify-between items-center w-full pr-4">
                    <span>{tag.name}</span>
                    <span className="text-sm font-normal normal-case text-muted-foreground max-w-md">
                      {tag.description}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-2 md:p-4 space-y-4 border border-t-0 rounded-lg rounded-t-none">
                  {taggedPaths.map(({ path, method, data }) => (
                    <ApiEndpoint
                      key={path + method}
                      path={path}
                      method={method}
                      data={data}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}

          {/* Schemas Section */}
          <AccordionItem value="schemas" className="border-none">
            <AccordionTrigger className="text-2xl font-semibold uppercase p-4 rounded-lg bg-muted data-[state=open]:rounded-b-none">
              Schemas
            </AccordionTrigger>
            <AccordionContent className="p-2 md:p-4 space-y-4 border border-t-0 rounded-lg rounded-t-none">
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(apiData.components.schemas).map(
                  ([name, schema]) => (
                    <AccordionItem value={name} key={name}>
                      <AccordionTrigger>
                        <span className="font-mono text-base">{name}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="p-4 bg-secondary text-secondary-foreground rounded-md overflow-auto text-sm font-mono">
                          {JSON.stringify(schema, null, 2)}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
