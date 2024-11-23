# Create directories
New-Item -ItemType Directory -Force -Path "src"
New-Item -ItemType Directory -Force -Path "public"

# Create index.html in public folder
@"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="BP Quote Tool" />
    <title>BP Quote Tool</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
"@ | Out-File -FilePath "public\index.html" -Encoding UTF8

# Create index.css
@"
@tailwind base;
@tailwind components;
@tailwind utilities;
"@ | Out-File -FilePath "src\index.css" -Encoding UTF8

# Create index.js
@"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"@ | Out-File -FilePath "src\index.js" -Encoding UTF8

# Create package.json
@"
{
  "name": "bp-quote-tool",
  "version": "0.1.0",
  "homepage": "https://hostmateio.github.io/bp-quote-tool",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "gh-pages": "^6.1.1",
    "tailwindcss": "^3.4.1"
  }
}
"@ | Out-File -FilePath "package.json" -Encoding UTF8

# Create tailwind.config.js
@"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#00B5B5'
        }
      }
    },
  },
  plugins: [],
}
"@ | Out-File -FilePath "tailwind.config.js" -Encoding UTF8

# Create App.js with our quote tool component
@"
import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Download, Plus, X } from 'lucide-react';

const QuoteTool = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    userType: '',
    deploymentType: 'cloud',
    selectedProducts: [],
    billingCycle: 'monthly'
  });

  // Progress Steps Component
  const ProgressSteps = () => (
    <div className="max-w-2xl mx-auto flex items-center justify-between mb-12 pt-8">
      {[
        { num: 1, label: 'Use Case' },
        { num: 2, label: 'Products' },
        { num: 3, label: 'Details' }
      ].map((s, i) => (
        <React.Fragment key={s.num}>
          <div className="flex flex-col items-center">
            <div 
              className={\`w-8 h-8 rounded-full flex items-center justify-center mb-2
                \${step === s.num ? 'bg-teal-500 text-white' : 
                  step > s.num ? 'bg-teal-100 text-teal-500' : 
                  'bg-gray-100 text-gray-400'}\`}
            >
              {step > s.num ? '✓' : s.num}
            </div>
            <span className={\`text-sm \${step === s.num ? 'text-teal-500' : 'text-gray-500'}\`}>
              {s.label}
            </span>
          </div>
          {i < 2 && (
            <div className={\`flex-1 h-px mx-4 \${step > s.num + 1 ? 'bg-teal-500' : 'bg-gray-200'}\`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Add the rest of your component code here...

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressSteps />
      <div className="bg-white min-h-screen pb-12">
        {step === 1 && <UseCaseStep />}
        {step === 2 && <ProductStep />}
        {step === 3 && <ConfigureStep />}
      </div>
    </div>
  );
};

export default QuoteTool;
"@ | Out-File -FilePath "src\App.js" -Encoding UTF8

# Create .gitignore
@"
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8

Write-Host "Files created successfully! Now run:"
Write-Host "npm install"
Write-Host "npm start"