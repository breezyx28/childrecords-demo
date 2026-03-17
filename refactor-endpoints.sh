#!/bin/bash

# List of endpoint files to refactor
files=(
  "applications.ts"
  "chat.ts"
  "conference.ts"
  "contact.ts"
  "documents.ts"
  "growth-chart.ts"
  "lessons.ts"
  "newsletter.ts"
  "profile.ts"
  "report.ts"
  "services.ts"
  "statistics.ts"
  "subscription.ts"
  "tips.ts"
  "visitor.ts"
)

cd "d:/Workspace/Projects/Child Record - Nextjs/child-record/child-record/redux/endpoints"

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Refactoring $file..."
    
    # Replace imports
    sed -i 's/import { createApi, fetchBaseQuery } from "@reduxjs\/toolkit\/query\/react";/import { createApi } from "@reduxjs\/toolkit\/query\/react";\nimport { apiBaseQuery } from "..\/baseQuery";/g' "$file"
    
    # Remove API_URL and prepareHeaders imports
    sed -i '/^import API_URL from/d' "$file"
    sed -i '/^import { prepareHeaders } from/d' "$file"
    
    # Replace baseQuery definition
    sed -i 's/baseQuery: fetchBaseQuery({ baseUrl: `\${API_URL}\/`, prepareHeaders })/baseQuery: apiBaseQuery/g' "$file"
    
    echo "✓ $file refactored"
  fi
done

echo "All files refactored!"
