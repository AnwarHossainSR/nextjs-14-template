'use client';

import tailwindColors from 'tailwindcss/colors';

// @ts-ignore
import { theme as tailwindTheme } from '../../tailwind.config';

type TailwindColors = typeof tailwindColors;
type CustomColors = typeof tailwindTheme.extend.colors;

export const QUERIES = {
  /** +500px */
  smallTabletAndUp: `(min-width: ${tailwindTheme.extend.screens.sm})`,
  /** +800px */
  ipadProAndUp: `(min-width: ${tailwindTheme.extend.screens.md})`,
  /** +1200px */
  laptopAndUp: `(min-width: ${tailwindTheme.extend.screens.lg})`,
  /** +1536px */
  desktopAndUp: `(min-width: ${tailwindTheme.extend.screens.xl})`,
};

interface Theme {
  colors: TailwindColors & CustomColors;
  screens: typeof tailwindTheme.extend.screens;
  queries: typeof QUERIES;
}

export const theme: Theme = {
  colors: { ...tailwindColors, ...tailwindTheme.extend.colors },
  screens: tailwindTheme.screens,
  queries: QUERIES,
};
