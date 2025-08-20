# Project Documentation

Welcome to the project documentation for the Fixamigo client application. This documentation is intended to help developers understand the project structure, technologies used, and how to contribute to the project.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Routing](./ROUTING.md)
- [Components](./COMPONENTS.md)
- [State Management](./STATE_MANAGEMENT.md)
- [Data Fetching](./DATA_FETCHING.md)
- [Styling](./STYLING.md)
- [SEO](./SEO.md)

## Project Overview

This project is a Next.js 15 application that serves as the client-side for the Fixamigo platform. It allows users to browse repair services, book appointments, and manage their service requests.

## Getting Started

To get started with the project, you need to have Node.js and pnpm installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) 15 (with Turbopack)
- **UI:** [React](https://reactjs.org/) 19, [Tailwind CSS](https://tailwindcss.com/) 4, [Radix UI](https://www.radix-ui.com/)
- **Styling:** [tailwind-merge](https://github.com/dcastil/tailwind-merge), [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate), [class-variance-authority](https://github.com/joe-bell/cva), [clsx](https://github.com/lukeed/clsx)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Date/Time:** [Moment.js](https://momentjs.com/) with [Moment Timezone](https://momentjs.com/timezone/)
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/react), [React Icons](https://react-icons.github.io/react-icons/)
- **Linting:** [ESLint](https://eslint.org/)
- **TypeScript:** [TypeScript](https://www.typescriptlang.org/) 5
