import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App, { Config } from './App.tsx';
import './index.css';

export function initSDK(container: HTMLElement, config: Config): void {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App config={config} />
    </StrictMode>
  );
}
