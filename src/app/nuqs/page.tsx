"use client";

import { useQueryState } from "nuqs";
import { parseAsBoolean } from "nuqs";

const ToggleExample = () => {
  const [isEnabled, setIsEnabled] = useQueryState(
    "enabled",
    parseAsBoolean.withDefault(false)
  );

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-neutral-900 border border-neutral-700 rounded-lg">
      <h3 className="text-xl font-semibold text-blue-300">Toggle Example</h3>
      <button
        type="button"
        onClick={handleToggle}
        className={`px-6 py-3 rounded-md font-semibold transition-all ${
          isEnabled
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-600 hover:bg-gray-700 text-gray-200"
        }`}
        aria-label={isEnabled ? "Disable" : "Enable"}
        tabIndex={0}
      >
        {isEnabled ? "Enabled" : "Disabled"}
      </button>
      <p className="text-sm text-gray-400">
        Current state: <span className="font-mono text-blue-400">{String(isEnabled)}</span>
      </p>
    </div>
  );
};

const SwitchExample = () => {
  const [darkMode, setDarkMode] = useQueryState(
    "darkMode",
    parseAsBoolean.withDefault(false)
  );

  const handleSwitch = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-neutral-900 border border-neutral-700 rounded-lg">
      <h3 className="text-xl font-semibold text-blue-300">Dark Mode Switch</h3>
      <div className="flex items-center gap-4">
        <span className="text-gray-300">Light</span>
        <button
          type="button"
          onClick={handleSwitch}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            darkMode ? "bg-blue-600" : "bg-gray-600"
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          tabIndex={0}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              darkMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-gray-300">Dark</span>
      </div>
      <p className="text-sm text-gray-400">
        Dark mode: <span className="font-mono text-blue-400">{String(darkMode)}</span>
      </p>
    </div>
  );
};

const MultipleBooleansExample = () => {
  const [showDetails, setShowDetails] = useQueryState(
    "details",
    parseAsBoolean.withDefault(false)
  );
  const [showAdvanced, setShowAdvanced] = useQueryState(
    "advanced",
    parseAsBoolean.withDefault(false)
  );

  const handleDetailsToggle = () => {
    setShowDetails(!showDetails);
  };

  const handleAdvancedToggle = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-neutral-900 border border-neutral-700 rounded-lg">
      <h3 className="text-xl font-semibold text-blue-300 mb-2">
        Multiple Boolean Params
      </h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label htmlFor="details" className="text-gray-300">
            Show Details
          </label>
          <button
            type="button"
            id="details"
            onClick={handleDetailsToggle}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              showDetails
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
            aria-label={showDetails ? "Hide details" : "Show details"}
            tabIndex={0}
          >
            {showDetails ? "ON" : "OFF"}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="advanced" className="text-gray-300">
            Advanced Options
          </label>
          <button
            type="button"
            id="advanced"
            onClick={handleAdvancedToggle}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              showAdvanced
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
            aria-label={showAdvanced ? "Hide advanced" : "Show advanced"}
            tabIndex={0}
          >
            {showAdvanced ? "ON" : "OFF"}
          </button>
        </div>
      </div>
      <div className="mt-4 p-3 bg-neutral-800 rounded border border-neutral-600">
        <p className="text-xs text-gray-400 font-mono">
          URL params: details={String(showDetails)}, advanced={String(showAdvanced)}
        </p>
      </div>
    </div>
  );
};

export default function NuqsBooleanPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-100 mb-2 drop-shadow">
          nuqs Boolean Example
        </h1>
        <p className="text-gray-400 mb-8">
          Examples demonstrating boolean URL search parameters with nuqs
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <ToggleExample />
          <SwitchExample />
        </div>

        <div className="mt-6">
          <MultipleBooleansExample />
        </div>

        <div className="mt-8 p-6 bg-neutral-900 border border-neutral-700 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            How it works
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Use <code className="bg-neutral-800 px-2 py-1 rounded text-blue-400">useQueryState</code> with{" "}
              <code className="bg-neutral-800 px-2 py-1 rounded text-blue-400">parseAsBoolean</code> to manage boolean URL params
            </li>
            <li>
              The boolean value is synced with the URL search parameters
            </li>
            <li>
              Use <code className="bg-neutral-800 px-2 py-1 rounded text-blue-400">withDefault(false)</code> to set a default value
            </li>
            <li>
              Toggle the values and watch the URL update automatically
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

