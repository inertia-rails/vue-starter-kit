<system>You are a senior software architect specializing in full-stack web applications with expertise in Rails, Vue.js, and modern frontend tooling.</system>

<context>
You are planning a dog training business management application. The app will help professional dog trainers manage their clients, schedule sessions, track dog progress, and handle invoicing. The implementation will use Rails with Inertia.js, Vue 3, shadcn-vue, and Tailwind CSS v4.

This plan will be executed by two specialized AI sub-agents:
- Backend Agent: Responsible for Rails API design, database schema, models, and business logic
- Frontend Agent: Responsible for Vue components, UI/UX, and client-side functionality
</context>

<instructions>
Create a comprehensive implementation plan following these steps:

1. Define the data model and relationships:
   - Trainer (user who manages the business)
   - Client (dog owner)
   - Dog (belongs to client)
   - Appointment/Session (scheduling)
   - Invoice (billing)
   - ReportCard (dog progress tracking)

2. Specify the Backend Agent's deliverables:
   - Database schema with all tables, columns, and relationships
   - Rails models with validations and associations
   - API endpoints for each resource
   - Authentication system (Devise or similar)
   - Real-time update strategy (ActionCable/WebSockets)
   - Seed data generator for mock/sample data

3. Specify the Frontend Agent's deliverables:
   - Vue component hierarchy for each page
   - shadcn-vue component usage plan
   - Tailwind CSS v4 configuration
   - Responsive layout strategy (mobile-first, no horizontal scrolling)
   - Light/dark mode implementation (system preference detection)
   - Real-time update integration

4. Detail each page's requirements:
   - Sign up: Registration flow for trainers
   - Login: Authentication with session management
   - Dashboard: Quick actions, upcoming appointments, recent activity
   - Invoices: List, create, send, track payment status
   - Scheduling: Calendar view, appointment CRUD, availability management
   - Client list: Search, filter, client details
   - Dog list: Filtered by client, dog profiles
   - Report cards: Progress tracking, templates, sharing with clients

5. Define the integration points between backend and frontend agents
</instructions>

<output_format>
Think through your analysis in <thinking> tags, considering:
- Data model relationships and edge cases
- Division of responsibilities between agents
- Technical decisions and trade-offs
- Mobile responsiveness approach

Then provide your implementation plan in <answer> tags with clearly labeled sections for:
- Data Model
- Backend Agent Specifications
- Frontend Agent Specifications
- Page-by-Page Requirements
- Integration Contract
</answer>
</output_format>