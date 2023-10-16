# Hico Test Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

This is a Next.js application for creating and storing employee data. 

The live version of this application is hosted on Vercel. You can access it [here](https://hico-test-frontend.vercel.app).


### Key Technologies Used

#### Next.js for Modern Web Development

The application is powered by Next.js, a React framework known for its simplicity and performance. Leveraging server-side rendering and a powerful plugin system, Next.js enables a smooth development workflow and optimal user experiences.
Tailwind CSS for Stylish User Interfaces
Styling is crafted with Tailwind CSS, a utility-first CSS framework. Tailwind streamlines the styling process, allowing for rapid development and easy maintenance. The utility classes provided by Tailwind offer a flexible and responsive design system.

#### Axios for Efficient API Requests

API requests are managed with Axios, a popular HTTP client. Axios simplifies data fetching and manipulation, enhancing the application's ability to communicate with backend services and retrieve or update employee data seamlessly.

#### Jest for Testing

Ensuring the reliability of the application, Jest is employed for testing. Jest provides a comprehensive testing suite with features like snapshot testing and test-driven development (TDD), guaranteeing the stability of the codebase across updates and new features.

#### Vercel for Cloud Deployment

The application is deployed on Vercel, a cloud platform that automates the deployment process. With Vercel, deploying updates and scaling the application becomes a straightforward task, providing a reliable and performant hosting solution.

#### Jenkins for CI/CD Pipeline Automation

Continuous Integration and Continuous Deployment (CI/CD) are orchestrated through Jenkins. This automation tool facilitates the building, testing, and deployment of the application. The CI/CD pipeline includes building Docker images and pushing them to a Docker registry, ensuring a streamlined and efficient release process.

#### Docker for Local Server Deployment

Docker is integrated into the CI/CD pipeline, allowing the application to run on a local server. Docker containers provide consistency across different environments, making it easy for developers to replicate the production environment on their local machines for testing and debugging.


## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Contributing](#contributing)


## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/hico-test-frontend.git`
2. Open the project in a code editor and navigate to the project directory: `cd hico-test-frontend`
3. Install dependencies: `npm install`


# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.



## Scripts

- dev: Start the Next.js development server.
- build: Build the Next.js application for production.
- start: Start the Next.js production server.
- lint: Run linting using ESLint.
- test: Run tests using Jest.


## Folder Structure

The project follows a well-organized folder structure to enhance code readability, maintainability, and scalability. Here's a brief overview of the main directories:

### components: 

This directory holds reusable UI components that are used across different parts of the application. Examples include buttons, inputs, and other presentational components.

### pages: 

The pages directory is a core part of Next.js and contains the index file for the main page. Additionally, it serves as the home for all application pages. Each file in this directory corresponds to a page in your app, making it easy to navigate and understand the application's structure.

### services: 

In the services directory, Axios requests are defined. This separation allows for a clear distinction between UI components and the logic responsible for fetching data. It enhances modularity and maintainability by encapsulating data fetching within dedicated service files.

### styles: 

The styles directory contains style files for the project. It includes the styling logic, such as CSS, to maintain a consistent and visually appealing appearance throughout the application.

### utils: 

The utils directory is home to reusable helper functions that can be utilized across different parts of the application. These functions may include common logic, calculations, or operations that are not specific to a particular component or service.

### tests: 

The __tests__ directory is dedicated to housing test files for the application. This folder typically contains unit tests, integration tests, or end-to-end tests to ensure the robustness and correctness of the codebase. 


This folder structure aims to provide a logical organization of code, making it easier for developers to locate, understand, and extend the functionality of the application. As you navigate through the project, you'll find that each directory serves a specific purpose, contributing to the overall maintainability and scalability of the codebase.



## Dependencies

- axios: HTTP client for making API requests.
- next: Next.js framework for building React applications.
- react: JavaScript library for building user interfaces.
- react-dom: Entry point for DOM-specific methods in React.



## Dev Dependencies
- @testing-library/jest-dom: Testing utilities for Jest.
- @testing-library/react: Testing utilities for React.
- @types/jest: TypeScript types for Jest.
- @types/node: TypeScript types for Node.js.
- @types/react: TypeScript types for React.
- @types/react-dom: TypeScript types for React DOM.
- autoprefixer: PostCSS plugin to parse CSS and add vendor prefixes.
- eslint: JavaScript and TypeScript linter.
- eslint-config-next: ESLint configuration for Next.js.
- jest: JavaScript testing framework.
- jest-environment-jsdom: Jest environment for DOM testing.
- postcss: Tool for transforming CSS with JavaScript plugins.
- tailwindcss: Utility-first CSS framework.
- typescript: TypeScript language support for JavaScript.


## Contributing

Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.
