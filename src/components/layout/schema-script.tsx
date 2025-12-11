interface SchemaScriptProps {
  schemas: Record<string, unknown>[];
}

// This component intentionally remains a server component so the JSON-LD
// is rendered during SSR (no client JS is required). Removing `use client`
// prevents this file from being bundled into the client chunk.
export default function SchemaScript({ schemas }: SchemaScriptProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
