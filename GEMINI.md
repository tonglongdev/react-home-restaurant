# Project Overview: Family Restaurant Website

This is a full-stack one-page restaurant website built with a modern tech stack.

## Tech Stack
- **Frontend**: React + TypeScript + TailwindCSS + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Prisma ORM
- **Data Fetching**: TanStack Query (React Query) + Axios
- **Icons & Animations**: Lucide React + Framer Motion

## Folder Structure
- `/src`: Frontend React application
  - `/api`: Axios instance and API calls
  - `/components`: Reusable UI components (Hero, Menu, FoodCard, Footer)
  - `/types`: TypeScript interfaces
- `/server`: Backend Express application
  - `/prisma`: Schema and seed data
  - `/src`: Server entry point and routes

## Getting Started

### 1. Prerequisites
- Node.js installed
- A PostgreSQL database (e.g., NeonDB)

### 2. Backend Setup
1. `cd server`
2. `npm install`
3. Create a `.env` file with `DATABASE_URL`
4. `npx prisma migrate dev --name init`
5. `npx prisma db seed` (optional, for demo data)
6. `npm run dev`

### 3. Frontend Setup
1. In the root directory: `npm install`
2. `npm run dev`

## Features
- **Auto-sliding Hero Carousel**: Promotional messages with smooth transitions.
- **Categorized Menu**: Food items grouped by category with filtering.
- **Interactive Food Cards**: Hover behavior to expand full description (only one expanded at a time).
- **Pagination**: Efficiently browse through the menu.
- **Responsive Design**: Fully responsive using TailwindCSS.
