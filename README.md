# 🎨 AI Meme, Logo & Poster Generator

A full-stack web application that leverages Artificial Intelligence to generate custom memes, logos, and posters from simple text prompts. 

## 🚀 Features

* **Three-in-One Generator:** Dedicated modes for generating Memes, Logos, and Posters based on user input.
* **Modern & Responsive UI:** A clean, intuitive interface built with React and styled with Tailwind CSS.
* **Secure Backend Processing:** A robust Java Spring Boot backend that safely handles API keys and processes requests to external AI image generation services.
* **Image Delivery:** Seamless fetching and displaying of AI-generated images directly in the browser.

## 💻 Tech Stack

**Frontend:**
* React.js (via Vite)
* Tailwind CSS
* JavaScript

**Backend:**
* Java
* Spring Boot (REST APIs)
* Spring Web

**Database & AI:**
* Oracle Database / MySQL (For storing generation history and user data)
* External AI Image API (e.g., OpenAI DALL-E 3, Stability AI)

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (v17 or higher)
* [Maven](https://maven.apache.org/) (for backend dependency management)
* An active API key from your chosen AI Image provider.

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/pallelliTulasi/AI_MEME_LOGO_POSTER-Generator.git](https://github.com/pallelliTulasi/AI_MEME_LOGO_POSTER-Generator.git)
cd AI_MEME_LOGO_POSTER-Generator


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
