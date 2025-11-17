# ⚡ Prompt-to-Site Builder

*URL*: https://prompt-site-creator-80-48667vacy-rishikesh-sararngis-projects.vercel.app

Prompt-to-Site Builder is an AI-powered web platform that enables non-technical users to **create, edit, and publish full-featured websites or online stores** simply through natural language prompts.
Built with **React, TypeScript, Supabase**, and integrated **AI generation**, it empowers creators to launch products, manage content, and customize sites effortlessly.

---

## 🚀 Features

* 🧠 **AI-Assisted Website Builder** — Create and customize complete websites from text prompts.
* 🛒 **Product Management System** — Add, edit, and update store products via an intuitive UI.
* 🖼️ **Dynamic Image Upload** — Supports product images with live preview and cloud storage.
* ⚙️ **Hooks-Based Architecture** — Modular React hooks for managing products, builders, and sites.
* 🔐 **Authentication & Ownership** — Manage user-based stores with secure access.
* 💾 **Supabase Integration** — Real-time data storage and image hosting.
* 🌐 **Responsive Design** — Optimized for both mobile and desktop using Tailwind CSS.
* 🔄 **AI Integration Layer** — Uses LLM APIs for smart content generation.

---

## 🧩 Folder Structure

```
src/
├── components/
│   ├── builder/
│   │   ├── ProductEditor.tsx
│   │   ├── ImageUpload.tsx
│   │   └── index.ts
│   ├── ui/
│   └── layout/
├── lib/
│   ├── api/
│   ├── hooks/
│   ├── types/
│   └── utils/
└── styles/
```

---

## 🛠️ Tech Stack

| Category             | Technologies                          |
| -------------------- | ------------------------------------- |
| **Frontend**         | React, TypeScript, Tailwind CSS       |
| **Backend / API**    | Node.js, Supabase, Next.js API Routes |
| **AI Models**        | OpenAI API / Ollama (Local LLMs)      |
| **Storage**          | Supabase Storage                      |
| **State Management** | React Hooks, SWR                      |
| **Build Tool**       | Vite / Next.js                        |
| **Version Control**  | Git & GitHub                          |

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/prompt-to-site.git
   cd prompt-to-site
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your environment variables**
   Create a `.env` file:

   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   OPENAI_API_KEY=your_openai_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   npm start
   ```

---

## 💡 Future Enhancements

* Multi-page AI layout generation
* Theme customization with prompt styling
* Drag-and-drop page builder
* SEO & performance analyzer integration

---

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome!
Fork the repo, make your changes, and submit a pull request.

---

## 🧑‍💻 Author

**Rishikesh Sarangi**
🚀 AI Developer | Web Engineer | Open Source Enthusiast
📧 [Email Me](mailto:rishikeshsarangi56@gmail.com)


---

## 📜 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for details.
