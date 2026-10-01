# MindDock

MindDock is a small AI knowledge assistant I built as a portfolio project.

The idea is simple: upload your own documents, let the app index them, and then ask questions about their content. Instead of sending everything to a cloud AI provider, MindDock is designed to work with local models through Ollama.

It is an educational project, not a finished commercial product.

## What it does

At the moment, MindDock supports:

- email/password authentication;
- protected dashboard routes;
- persistent chat history;
- streamed AI responses;
- automatic chat title generation;
- chat rename and delete;
- document upload;
- `.txt`, `.md`, and text-based `.pdf` files;
- document chunking;
- vector embeddings;
- semantic search with `pgvector`;
- RAG-based answers using uploaded documents;
- local AI through Ollama;
- multilingual routing for English, Spanish, and Polish.

A typical flow looks like this:

```text
Upload document
    ↓
Extract text
    ↓
Split text into chunks
    ↓
Generate embeddings
    ↓
Store vectors in PostgreSQL
    ↓
Ask a question
    ↓
Find similar chunks with pgvector
    ↓
Send relevant context to the LLM
    ↓
Stream the answer back to the UI
```

## Tech stack

- **Next.js 16** with App Router
- **React**
- **TypeScript**
- **Tailwind CSS 4**
- **SCSS / Sass Modules**
- **PostgreSQL**
- **Drizzle ORM**
- **pgvector**
- **Better Auth**
- **Ollama**
- **Qwen3 4B**
- **Qwen3 4B Instruct**
- **EmbeddingGemma**
- **unpdf**
- **Zod**
- **Vitest**
- **React Testing Library**
- **Playwright**
- **Oxlint**
- **GitHub Actions**

## Local AI setup

The project uses Ollama locally.

Current models:

```text
Chat:       qwen3:4b
Titles:     qwen3:4b-instruct
Embeddings: embeddinggemma
```

The chat model is used for normal conversations.

The instruct model is used for lightweight utility tasks, for example generating a short chat title.

EmbeddingGemma is used to generate vectors for both document chunks and user queries.

## RAG implementation

The RAG flow is intentionally kept straightforward.

When a document is uploaded:

1. The file is validated.
2. Text is extracted.
3. The text is split into chunks.
4. Each chunk is converted into an embedding.
5. The chunk and its vector are stored in PostgreSQL.

When the user asks a question:

1. The question is converted into an embedding.
2. `pgvector` searches for the most similar stored chunks.
3. The relevant chunks are added to the LLM context.
4. The answer is streamed back to the client.

The embedding format currently follows EmbeddingGemma retrieval prompts.

For queries:

```text
task: search result | query: <question>
```

For documents:

```text
title: <document name> | text: <chunk content>
```

## Authentication

Authentication is implemented with Better Auth and Drizzle.

The project currently supports:

- registration with email and password;
- login;
- logout;
- server-side session checks;
- protected routes.

The Better Auth handler is mounted under:

```text
/api/v1/auth/*
```

## Chat flow

For a new chat, the current flow is:

```text
User sends the first message
    ↓
Create a chat in the database
    ↓
Receive the chat ID
    ↓
Navigate to /chat/:id
    ↓
Add "New chat" to the sidebar
    ↓
Start streaming the answer
    ↓
Generate a title
    ↓
Update the chat title in the sidebar
```

The chat state is kept high enough in the component tree so that streaming can continue while the route changes from `/chat` to `/chat/:id`.

## Internationalization

The app uses URL-based localization.

Supported languages:

```text
en
es
pl
```

English is the default language.

The project supports both the default English routes:

```text
/
/login
/chat
```

and locale-prefixed routes such as:

```text
/en/chat
/es/chat
/pl/chat
```

The i18n layer includes:

- typed language constants;
- dictionaries;
- language context for client components;
- translation context;
- localized links;
- localized router helpers;
- localized server-side redirects;
- localized metadata.

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:dmitrySheshko/minddock.git
cd minddock
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create `.env.local`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/minddock

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-secure-secret

AI_PROVIDER=ollama

OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_CHAT_MODEL=qwen3:4b
OLLAMA_UTILITY_MODEL=qwen3:4b-instruct
OLLAMA_EMBEDDING_MODEL=embeddinggemma

E2E_EMAIL=test@test.te
E2E_PASSWORD=StrongPsw123
```

Add IP address (for mobile app) in the file below
```text
frontend-backend/src/modules/auth/auth.ts

trustedOrigins: [
        'minddock://',
        ...(process.env.NODE_ENV === 'development'
            ? [
                'exp://',
                'exp://**',
                'exp://172.16.*.*:*/**',
                'exp://192.168.*.*:*/**',
            ]
            : []),
    ],
```

A Better Auth secret can be generated with:

```bash
npx auth@latest secret
```

### 4. Start PostgreSQL

PostgreSQL runs in Docker.

```bash
docker compose up -d
```

The project expects a PostgreSQL database with `pgvector` enabled.

### 5. Set up Ollama and download the AI models

By default, MindDock runs Ollama in a Docker container. You do not need to install Ollama separately to get the project running.

The Ollama service is already included in `docker-compose.yml` and exposes the API at:

```text
http://127.0.0.1:11434
```

Check that the Ollama container is running:

```bash
docker compose ps
```

The project currently uses three Ollama models:

- `qwen3:4b` — main chat model
- `qwen3:4b-instruct` — lightweight utility tasks such as chat title generation
- `embeddinggemma` — document and query embeddings used by the RAG pipeline

Download the models inside the Ollama container:

```bash
docker compose exec ollama ollama pull qwen3:4b
docker compose exec ollama ollama pull qwen3:4b-instruct
docker compose exec ollama ollama pull embeddinggemma
```

You can check the installed models with:

```bash
docker compose exec ollama ollama list
```

The downloaded models are stored in the Docker volume, so they are preserved when the container is stopped or recreated.

#### Performance note

Running Ollama in Docker is the easiest way to start MindDock because it keeps the whole local infrastructure reproducible and requires less manual setup.

However, Ollama running inside Docker can be noticeably slower, especially on macOS, where a Docker container may not have access to the same native hardware acceleration available to Ollama running directly on the host.

If AI responses or embedding generation are too slow, you can install Ollama directly on your machine instead.

After installing Ollama locally, download the same models:

```bash
ollama pull qwen3:4b
ollama pull qwen3:4b-instruct
ollama pull embeddinggemma
```

Check that they are available:

```bash
ollama list
```

Ollama should then be available at:

```text
http://127.0.0.1:11434
```

If you use the local Ollama installation, stop the Docker Ollama service first to avoid a port conflict:

```bash
docker compose stop ollama
```

Then start the local Ollama server if it is not already running:

```bash
ollama serve
```

No application configuration changes are required as long as MindDock uses:

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
```

You can therefore choose between:

```text
Docker Ollama
    → easiest setup
    → reproducible environment
    → models stored in a Docker volume
    → may be slower on macOS

Local Ollama
    → requires Ollama to be installed separately
    → usually better performance on macOS
    → recommended if local inference in Docker is too slow
```

### 6. Run database migrations

```bash
npm run db:migrate
```

If you change the Drizzle schema:

```bash
npm run db:generate
npm run db:migrate
```

To inspect the database:

```bash
npm run db:studio
```

### 7. Start the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Document support

Current supported formats:

```text
.txt
.md
.pdf
```

PDF support currently works with PDFs that contain a text layer.

Scanned PDFs or image-only PDFs are not supported yet because OCR is not implemented.

## Tests

The project uses:

- Vitest for unit tests;
- React Testing Library for UI tests;
- Playwright for end-to-end tests.

The authentication flow is covered by E2E scenarios such as login, invalid credentials, authenticated navigation, and logout.

## Code quality and CI

I added a few automated checks to keep the project consistent and catch common problems before changes are merged.

The web/backend application uses:

- **Oxlint** for linting;
- **TypeScript** for static type checking;
- **Vitest** for unit tests;
- **Playwright** for end-to-end tests;
- **Husky** for local Git hooks;
- **GitHub Actions** for CI.

The idea is to run important checks at two different stages.

### Local Git hooks

Husky runs checks before code is committed.

The `pre-commit` hook runs the web/backend validation command:

```bash
npm run check
```

which currently includes:

```text
lint
  ↓
typecheck
  ↓
unit tests
```

There is also a `commit-msg` hook that checks commit messages against a simple Conventional Commits format.

Examples of valid commits:

```text
feat: add document upload
fix(auth): handle expired session
refactor(chat): extract stream service
test(rag): add citation tests
docs: update README
```

This is intentionally a small setup, but it helps catch basic problems before they reach the remote repository and keeps the commit history easier to read.

### Continuous Integration

The same idea continues in CI.

GitHub Actions runs automated checks against pushed changes so the repository does not rely only on a developer's local environment.

The web/backend CI flow includes:

```text
lint
    ↓
typecheck
    ↓
unit tests
    ↓
Next.js build
    ↓
end-to-end tests
```

This gives me two levels of validation:

```text
Local development
    ↓
Husky
    ↓
GitHub push / pull request
    ↓
GitHub Actions
```

The local hooks are mainly for fast feedback, while CI is the final reproducible check performed in a clean environment.

### Husky setup

Husky is configured at the repository level and is automatically initialized after dependencies are installed.

After cloning the repository, it is enough to run:

```bash
npm install
```

The `prepare` script in the root `package.json` installs the Git hooks automatically:

```json
{
    "scripts": {
        "prepare": "husky"
    }
}
```

The current hooks are stored in:

```text
.husky/
├── pre-commit
└── commit-msg
```

No additional Husky initialization is required after cloning the repository.

## Notes

MindDock is mainly a learning project.

I deliberately kept the AI stack local so I could experiment with RAG and document processing without depending on an external LLM API.

The project is not meant to be presented as a finished production service, but as a practical implementation of the concepts above.
