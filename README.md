# Email Screening Test

A coding challenge boilerplate featuring an Express.js server with TypeScript and OpenAI integration for email screening functionality.

## Prerequisites

- Node.js
- npm or yarn

## Getting Started

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory and add the OpenAI API key (this will be provided to you):

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 3. Build the Project

```bash
npm run build
```

### 4. Start the Development Server

For development with hot reload:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### POST /chat
Send a message to the AI chat system.

**Request Body:**
```json
{
  "userId": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "reply": "AI response string"
}
```

### POST /emails
Process multiple emails for screening.

**Request Body:**
```json
{
  "emails": [
    {
      // Email object structure
    }
  ]
}
```

**Response:**
```json
{
  "success": true
}
```

## Project Structure

```
src/
├── llm/
│   └── createChatCompletion.ts    # OpenAI integration
├── services/
│   ├── emailService.ts            # Email processing service
│   ├── messageDb.ts               # Message database service
│   ├── supportTicketService.ts    # Support ticket handling
│   └── index.ts                   # Service exports
├── utils/
│   ├── makeId.ts                  # ID generation utility
│   └── repository.ts              # Data repository utilities
└── server.ts                      # Main Express server
```

## Development

- The project uses TypeScript for type safety
- Hot reload is available with `npm run dev`
- Build output goes to the `dist/` directory

## Notes for Applicants

This is a coding challenge template. You'll be working with:
- Express.js REST API
- TypeScript
- OpenAI GPT integration
- In-memory data storage
- Email processing workflows

You will be given the challenge at the beginning of our call to complete.