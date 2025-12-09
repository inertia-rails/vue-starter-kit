---
name: Dog Training Business App
overview: Build a comprehensive dog training business management application on top of the existing Rails 8 + Vue 3 + Inertia.js starter kit. The app enables professional dog trainers to manage clients, schedule sessions, track dog progress, and handle invoicing.
todos:
  - id: epic-1-data-layer
    content: "Epic 1: Create database migrations for clients, dogs, appointments, invoices, invoice_line_items, report_cards tables with all associations and indexes"
    status: pending
  - id: epic-1-models
    content: "Epic 1: Create Rails models with validations, associations, scopes, and status enums"
    status: pending
  - id: epic-1-seeds
    content: "Epic 1: Create comprehensive seed data (5 clients, 10+ dogs, 20 appointments, 5 invoices, 10 report cards)"
    status: pending
  - id: epic-2-client-backend
    content: "Epic 2: Create ClientsController with Inertia responses for index, show, new, create, edit, update, destroy (soft delete)"
    status: pending
  - id: epic-2-client-frontend
    content: "Epic 2: Create Vue pages for clients (index with search/filter, show with tabs, new/edit forms) using shadcn Table component"
    status: pending
  - id: epic-2-dog-backend
    content: "Epic 2: Create DogsController with nested routes under clients"
    status: pending
  - id: epic-2-dog-frontend
    content: "Epic 2: Create Vue pages for dogs (show profile, edit form) with report card history"
    status: pending
  - id: epic-3-appointment-backend
    content: "Epic 3: Create AppointmentsController with calendar API endpoint for date range queries"
    status: pending
  - id: epic-3-calendar-frontend
    content: "Epic 3: Add shadcn Calendar component and create AppointmentCalendar.vue with month/week views"
    status: pending
  - id: epic-3-appointment-frontend
    content: "Epic 3: Create appointment CRUD pages with client/dog selector and service type dropdown"
    status: pending
  - id: epic-4-invoice-backend
    content: "Epic 4: Create InvoicesController with line items, status transitions (draft -> sent -> paid), and total calculation"
    status: pending
  - id: epic-4-invoice-frontend
    content: "Epic 4: Create invoice pages with dynamic line item management, status badges, and print-friendly view"
    status: pending
  - id: epic-5-reportcard-backend
    content: "Epic 5: Create ReportCardsController with shareable public links via signed tokens"
    status: pending
  - id: epic-5-reportcard-frontend
    content: "Epic 5: Create report card pages with score visualization (rings/gauges) and share functionality"
    status: pending
  - id: epic-6-dashboard
    content: "Epic 6: Enhance dashboard with StatsCard, UpcomingAppointments, RecentActivity widgets"
    status: pending
  - id: epic-7-navigation
    content: "Epic 7: Update AppLayout sidebar with new navigation items (Clients, Dogs, Schedule, Invoices, Report Cards)"
    status: pending
  - id: epic-7-types
    content: "Epic 7: Add TypeScript interfaces for all new entities (Client, Dog, Appointment, Invoice, InvoiceLineItem, ReportCard)"
    status: pending
  - id: epic-7-realtime
    content: "Epic 7: Implement ActionCable channel for live appointment updates on calendar"
    status: pending
---

# Dog Training Business Management Application

## Data Model

### Entity Relationship Diagram

```
User (Trainer)
├── has_many :clients
├── has_many :appointments
└── has_many :invoices

Client (Dog Owner)
├── belongs_to :user (trainer)
├── has_many :dogs
├── has_many :appointments
├── has_many :invoices
└── fields: name, email, phone, address, notes, archived_at

Dog
├── belongs_to :client
├── has_many :appointments
├── has_many :report_cards
└── fields: name, breed, age, weight, notes, photo_url

Appointment
├── belongs_to :user (trainer)
├── belongs_to :client
├── belongs_to :dog
├── has_one :report_card
└── fields: scheduled_at, duration_minutes, service_type, status, notes, price_cents

Invoice
├── belongs_to :user (trainer)
├── belongs_to :client
├── has_many :invoice_line_items
└── fields: status, due_date, paid_at, total_cents, notes

InvoiceLineItem
├── belongs_to :invoice
├── belongs_to :appointment (optional)
└── fields: description, quantity, unit_price_cents

ReportCard
├── belongs_to :dog
├── belongs_to :appointment
└── fields: behavior_score, obedience_score, socialization_score, notes, shared_at
```

### Database Schema Additions

```ruby
# clients table
create_table :clients do |t|
  t.references :user, null: false, foreign_key: true
  t.string :name, null: false
  t.string :email
  t.string :phone
  t.text :address
  t.text :notes
  t.datetime :archived_at
  t.timestamps
end

# dogs table
create_table :dogs do |t|
  t.references :client, null: false, foreign_key: true
  t.string :name, null: false
  t.string :breed
  t.integer :age_months
  t.decimal :weight_kg, precision: 5, scale: 2
  t.text :notes
  t.string :photo_url
  t.timestamps
end

# appointments table
create_table :appointments do |t|
  t.references :user, null: false, foreign_key: true
  t.references :client, null: false, foreign_key: true
  t.references :dog, null: false, foreign_key: true
  t.datetime :scheduled_at, null: false
  t.integer :duration_minutes, default: 60
  t.string :service_type, null: false
  t.string :status, default: 'scheduled'
  t.text :notes
  t.integer :price_cents
  t.timestamps
end

# invoices table
create_table :invoices do |t|
  t.references :user, null: false, foreign_key: true
  t.references :client, null: false, foreign_key: true
  t.string :status, default: 'draft'
  t.date :due_date
  t.datetime :paid_at
  t.integer :total_cents, default: 0
  t.text :notes
  t.timestamps
end

# invoice_line_items table
create_table :invoice_line_items do |t|
  t.references :invoice, null: false, foreign_key: true
  t.references :appointment, foreign_key: true
  t.string :description, null: false
  t.integer :quantity, default: 1
  t.integer :unit_price_cents, null: false
  t.timestamps
end

# report_cards table
create_table :report_cards do |t|
  t.references :dog, null: false, foreign_key: true
  t.references :appointment, foreign_key: true
  t.integer :behavior_score
  t.integer :obedience_score
  t.integer :socialization_score
  t.text :notes
  t.datetime :shared_at
  t.timestamps
end
```

---

## Backend Agent Specifications

### Phase 1: Core Models and Migrations

| File | Description |

|------|-------------|

| `db/migrate/*_create_clients.rb` | Clients migration |

| `db/migrate/*_create_dogs.rb` | Dogs migration |

| `db/migrate/*_create_appointments.rb` | Appointments migration |

| `db/migrate/*_create_invoices.rb` | Invoices migration |

| `db/migrate/*_create_invoice_line_items.rb` | Line items migration |

| `db/migrate/*_create_report_cards.rb` | Report cards migration |

| `app/models/client.rb` | Client model with validations |

| `app/models/dog.rb` | Dog model with validations |

| `app/models/appointment.rb` | Appointment model with scopes |

| `app/models/invoice.rb` | Invoice model with status machine |

| `app/models/invoice_line_item.rb` | Line item model |

| `app/models/report_card.rb` | Report card model |

### Phase 2: Controllers (Inertia-style)

```ruby
# app/controllers/clients_controller.rb
class ClientsController < ApplicationController
  def index    # List all clients for current user
  def show     # Client detail with dogs
  def new      # New client form
  def create   # Create client
  def edit     # Edit client form
  def update   # Update client
  def destroy  # Archive client (soft delete)
end

# Similar pattern for:
# - DogsController
# - AppointmentsController
# - InvoicesController
# - ReportCardsController
```

### Phase 3: Routes

```ruby
# config/routes.rb additions
resources :clients do
  resources :dogs, shallow: true
end

resources :appointments do
  resource :report_card, only: [:show, :create, :update]
end

resources :invoices do
  member do
    post :send_to_client
    post :mark_paid
  end
end

namespace :api do
  resources :calendar_events, only: [:index]
end
```

### Phase 4: Seed Data

- 5 sample clients with varied profiles
- 2-3 dogs per client
- 20 appointments across different statuses
- 5 invoices in various states
- 10 report cards with realistic scores

---

## Frontend Agent Specifications

### Required shadcn/vue Components to Add

| Component | Purpose |

|-----------|---------|

| Table | Client, dog, invoice lists |

| Calendar | Appointment scheduling |

| Select | Dropdowns for service types, status |

| Badge | Status indicators |

| Tabs | Organizing page sections |

| Textarea | Notes fields |

| Progress | Score visualization |

| Popover | Calendar date picker |

### Vue Component Hierarchy

```
pages/
├── dashboard/
│   └── index.vue (enhanced with widgets)
├── clients/
│   ├── index.vue (list with search/filter)
│   ├── show.vue (detail with dogs tab)
│   ├── new.vue (create form)
│   └── edit.vue (edit form)
├── dogs/
│   ├── show.vue (profile with report cards)
│   └── edit.vue (edit form)
├── appointments/
│   ├── index.vue (calendar view)
│   ├── show.vue (detail with report card)
│   └── new.vue (booking form)
├── invoices/
│   ├── index.vue (list with status filters)
│   ├── show.vue (detail/printable)
│   └── new.vue (create with line items)
└── report_cards/
    ├── show.vue (shareable view)
    └── new.vue (create after appointment)

components/
├── dashboard/
│   ├── StatsCard.vue
│   ├── UpcomingAppointments.vue
│   └── RecentActivity.vue
├── clients/
│   └── ClientCard.vue
├── dogs/
│   ├── DogCard.vue
│   └── DogSelector.vue
├── appointments/
│   ├── AppointmentCalendar.vue
│   └── AppointmentForm.vue
├── invoices/
│   ├── InvoiceLineItemRow.vue
│   └── InvoiceStatusBadge.vue
└── report_cards/
    ├── ScoreRing.vue
    └── ReportCardPreview.vue
```

### TypeScript Types

```typescript
// app/frontend/types/index.d.ts additions

export interface Client {
  id: number
  name: string
  email: string | null
  phone: string | null
  address: string | null
  notes: string | null
  dogs_count: number
  created_at: string
}

export interface Dog {
  id: number
  client_id: number
  name: string
  breed: string | null
  age_months: number | null
  weight_kg: number | null
  notes: string | null
  photo_url: string | null
}

export interface Appointment {
  id: number
  client: Pick<Client, 'id' | 'name'>
  dog: Pick<Dog, 'id' | 'name'>
  scheduled_at: string
  duration_minutes: number
  service_type: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  notes: string | null
  price_cents: number | null
}

export interface Invoice {
  id: number
  client: Pick<Client, 'id' | 'name' | 'email'>
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  due_date: string | null
  paid_at: string | null
  total_cents: number
  line_items: InvoiceLineItem[]
}

export interface InvoiceLineItem {
  id: number
  description: string
  quantity: number
  unit_price_cents: number
}

export interface ReportCard {
  id: number
  dog: Pick<Dog, 'id' | 'name'>
  appointment_id: number | null
  behavior_score: number | null
  obedience_score: number | null
  socialization_score: number | null
  notes: string | null
  shared_at: string | null
}
```

---

## Page-by-Page Requirements

### 1. Dashboard (Enhanced)

**Route:** `GET /dashboard`

**Widgets:**

- Stats row: Total clients, Active dogs, This week's appointments, Outstanding invoices
- Upcoming appointments (next 7 days)
- Recent activity feed (last 10 actions)
- Quick actions: New Client, New Appointment, Create Invoice

**Mobile:** Stack widgets vertically, collapsible sections

### 2. Clients List

**Route:** `GET /clients`

**Features:**

- Search by name, email, phone
- Filter: Active / Archived
- Sort: Name, Created date, Last appointment
- Card or table view toggle
- Click to view client detail

**Mobile:** Card view only, sticky search bar

### 3. Client Detail

**Route:** `GET /clients/:id`

**Sections (tabs):**

- Overview: Contact info, notes, quick stats
- Dogs: List of dogs with add button
- Appointments: History and upcoming
- Invoices: Payment history

**Actions:** Edit, Archive, New Dog, New Appointment

### 4. Dog Profile

**Route:** `GET /dogs/:id`

**Content:**

- Photo, name, breed, age, weight
- Notes/medical info
- Report card history (chart of scores over time)
- Appointment history

**Actions:** Edit, View/Create Report Card

### 5. Appointments Calendar

**Route:** `GET /appointments`

**Features:**

- Monthly calendar view (default)
- Week view option
- Day view on mobile
- Color-coded by status
- Click date to create appointment
- Click appointment to view/edit
- Drag to reschedule (desktop)

### 6. Invoice Management

**Route:** `GET /invoices`

**Features:**

- Filter by status: Draft, Sent, Paid, Overdue
- Sort by date, amount, client
- Bulk actions: Send reminders

**Invoice Detail:** Line items, total, payment status, send/print actions

### 7. Report Cards

**Route:** `GET /report_cards/:id`

**Features:**

- Visual score display (rings/gauges)
- Trainer notes
- Share link generation (public URL for client)
- PDF export option

---

## Integration Contract

### Shared Props Pattern

All authenticated pages receive via Inertia:

```typescript
interface PageProps {
  auth: Auth           // Current user/session
  flash: Flash         // Alert/notice messages
  // + page-specific props
}
```

### API Endpoints (for calendar)

```
GET /api/calendar_events?start=YYYY-MM-DD&end=YYYY-MM-DD
Response: { events: Appointment[] }
```

### Real-time Updates (ActionCable)

```ruby
# app/channels/appointments_channel.rb
class AppointmentsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
```

Frontend subscribes via `@rails/actioncable` for live calendar updates.

### Navigation Updates

Add to sidebar (`app/frontend/layouts/AppLayout.vue`):

- Clients (Users icon)
- Dogs (PawPrint icon)  
- Schedule (Calendar icon)
- Invoices (Receipt icon)
- Report Cards (ClipboardCheck icon)

---

## Implementation Order

1. **Epic 1: Data Layer** - Migrations, models, associations, seed data
2. **Epic 2: Client Management** - CRUD for clients and dogs
3. **Epic 3: Scheduling** - Appointments with calendar UI
4. **Epic 4: Invoicing** - Invoice creation, line items, status workflow
5. **Epic 5: Report Cards** - Progress tracking and sharing
6. **Epic 6: Dashboard** - Enhanced dashboard with widgets
7. **Epic 7: Polish** - Mobile optimization, real-time updates, PDF export