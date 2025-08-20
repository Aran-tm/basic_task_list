import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

// Definir un tema azul personalizado
const customBlueTheme = {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{blue.600}',
          inverseColor: '#ffffff',
          hoverColor: '{blue.700}',
          activeColor: '{blue.800}'
        },
        highlight: {
          background: '{blue.50}',
          focusBackground: '{blue.100}',
          color: '{blue.700}',
          focusColor: '{blue.800}'
        }
      },
      dark: {
        primary: {
          color: '{blue.400}',
          inverseColor: '{surface.900}',
          hoverColor: '{blue.300}',
          activeColor: '{blue.200}'
        },
        highlight: {
          background: 'rgba(59, 130, 246, 0.16)',
          focusBackground: 'rgba(59, 130, 246, 0.24)',
          color: '{blue.300}',
          focusColor: '{blue.200}'
        }
      }
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: customBlueTheme,
        options: {
          darkMode: false,
          prefix: 'p',
        },
      },
    }),
  ],
};
