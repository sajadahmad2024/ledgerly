# Ledgerly Frontend Design Specification

Version: 1.0

---

# Overview

Ledgerly is a modern personal finance platform focused on simplicity, speed, and beautiful user experience.

This is **not** a traditional admin dashboard.

The UI should feel closer to:

- Linear
- Arc Browser
- Stripe Dashboard
- Vercel
- Notion

The application should be elegant, spacious, modern and minimal.

Avoid looking like Bootstrap admin templates.

---

# Tech Stack

Framework:

- Next.js 15 (App Router)

Language:

- TypeScript

Styling:

- Tailwind CSS

Components:

- ShadCN UI

Icons:

- Lucide React

Charts:

- Recharts

Forms:

- React Hook Form
- Zod

State:

- TanStack Query
- Zustand (UI state only)

Animations:

- Framer Motion

---

# Theme

Dark mode only.

Future support for light mode should be possible.

Background

#09090B

Card

#18181B

Border

#27272A

Primary

Emerald 500

Success

Green

Danger

Red

Warning

Amber

Text

White

Secondary Text

Gray-400

---

# Typography

Use Geist font.

Large headings.

Comfortable spacing.

Generous padding.

Rounded corners.

Subtle shadows.

Minimal gradients.

---

# Layout

Desktop First.

Responsive.

Top Navigation.

No left sidebar.

Navigation

---

Ledgerly Logo

Dashboard

Accounts

Categories

Transactions

Profile

---

Right Side

Search

Notifications

Avatar

---

# Navigation Pages

1 Dashboard

2 Accounts

3 Categories

4 Transactions

5 Profile

---

# Authentication

Pages

/login

/register

Card centered vertically and horizontally.

Simple layout.

Logo

Heading

Form

CTA

No unnecessary illustrations.

---

# Login Screen

Fields

Email

Password

Remember Me

Forgot Password

Primary Button

Login

Secondary Link

Create Account

---

# Register Screen

Fields

Full Name

Email

Password

Confirm Password

Create Account

Already have an account?

Login

---

# Dashboard

Dashboard should feel premium.

Sections

Welcome Message

Good Morning, Sajad

Current Date

Quick Add Expense Button

Summary Cards

Total Balance

Monthly Income

Monthly Expense

Savings

Cards should animate slightly on hover.

---

Charts

Monthly Spending

Bar Chart

Expense Categories

Pie Chart

Income vs Expense

Line Chart

---

Recent Transactions

Modern table

Icon

Title

Category

Amount

Date

Status

Clickable row

---

Accounts Page

Grid layout.

Each account is a card.

Card contains

Icon

Account Name

Balance

Currency

Account Type

Actions Menu

Floating Add Account Button.

Clicking a card opens details drawer.

---

Account Details Drawer

Account Information

Recent Transactions

Current Balance

Edit Button

Delete Button

---

Categories Page

Grid of category cards.

Each card contains

Emoji or Icon

Category Name

Color

Transactions Count

Amount Spent

Add Category Button

Edit/Delete actions.

---

Transactions Page

Most important page.

Toolbar

Search

Account Filter

Category Filter

Date Range

Type Filter

Sort

Add Transaction Button

---

Transactions Table

Columns

Type

Category

Account

Description

Amount

Date

Actions

Expense rows

Red

Income rows

Green

Transfer rows

Blue

---

Clicking a row opens

Transaction Drawer

instead of another page.

---

Transaction Drawer

Amount

Category

Account

Description

Date

Edit

Delete

---

Profile Page

User Avatar

Name

Email

Currency

Timezone

Language

Theme

Security Section

Change Password

Logout

Delete Account

---

Dialogs

Delete Account

Delete Transaction

Delete Category

Delete Account

All destructive actions should use Alert Dialog.

---

Forms

Every form should use

React Hook Form

Zod Validation

Inline validation errors.

---

Buttons

Primary

Emerald

Secondary

Outline

Danger

Red

Ghost

Icon Only

---

Cards

Rounded XL

Soft border

Hover elevation

Subtle animation

---

Tables

Sticky Header

Column Sorting

Pagination

Search

Empty States

Loading Skeleton

---

Loading

Skeleton loaders.

Avoid spinners where possible.

---

Empty States

Beautiful illustration icon.

Helpful text.

Primary CTA.

Example

No transactions yet.

Add your first expense.

---

Notifications

Toast notifications.

Success

Error

Warning

Info

---

Accessibility

Keyboard navigation.

Focus states.

ARIA labels.

Proper contrast.

---

Performance

Use Server Components where appropriate.

Client Components only when necessary.

Lazy load charts.

Lazy load dialogs.

---

Folder Structure

src/

app/

components/

components/ui/

features/

auth/

dashboard/

accounts/

categories/

transactions/

profile/

hooks/

services/

lib/

types/

utils/

constants/

providers/

styles/

---

Component Rules

Every feature should have

components

hooks

types

services

Example

features/

transactions/

components/

hooks/

services/

types/

---

Design Principles

Minimal.

Premium.

Fast.

Professional.

No visual clutter.

Whitespace is important.

Avoid unnecessary colors.

Avoid oversized icons.

Avoid gradients everywhere.

Animations should feel subtle.

---

Future Features

The architecture should allow easy addition of

Budgets

Reports

Analytics

Recurring Transactions

Savings Goals

Notifications

AI Insights

CSV Import

Dark/Light Theme

PWA

Mobile App

without redesigning the UI.

---

Overall Goal

The final application should look like a premium SaaS product rather than a simple CRUD application.

Someone visiting the project should immediately feel that this is a polished, production-ready personal finance platform.
