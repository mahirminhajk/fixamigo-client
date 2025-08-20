# Styling

This document explains the styling approach used in the Fixamigo client application. The project uses [Tailwind CSS](https://tailwindcss.com/) v4, a utility-first CSS framework for rapidly building custom designs.

## Configuration

The Tailwind CSS configuration is primarily located in two files:

- **`postcss.config.mjs`**: This file configures PostCSS to use the Tailwind CSS plugin.
- **`app/globals.css`**: This file contains the base styles, theme configuration, and custom variants for the application.

### `postcss.config.mjs`

This file is straightforward and simply registers the `@tailwindcss/postcss` plugin.

### `app/globals.css`

This file is the main entry point for the application's styles. It includes:

- **`@import "tailwindcss"`**: Imports the Tailwind CSS utilities.
- **`@plugin "tailwindcss-animate"`**: Imports the `tailwindcss-animate` plugin for animations.
- **`@custom-variant dark (&:is(.dark *))`**: Defines a custom `dark` variant for dark mode.
- **`@theme`**: Defines the application's theme, including fonts, colors, and other design tokens.
- **`@layer base`**: Defines the base styles for the application, such as the default background and text colors.

## Utility Classes

The application uses Tailwind's utility classes extensively for styling components. This approach allows for rapid development and easy maintenance of the UI.

## Component-Specific Styles

For component-specific styles, the application uses the `@apply` directive in CSS modules or directly in the component files. This allows for a clean separation of concerns and keeps the component's styles co-located with the component itself.

## Shadcn/UI

The project uses [shadcn/ui](https://ui.shadcn.com/), a collection of reusable components built with Radix UI and Tailwind CSS. The base UI components are located in the `/components/ui` directory and are customized to match the application's design system.
