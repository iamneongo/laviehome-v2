// ============================================================
// User Service â€” Data Access Layer
// ============================================================
// This is the ONLY file you modify when connecting to your backend.
// Queries (queries.ts) and components import from here â€” they never change.
//
// Pick your pattern and replace the function bodies below:
//
// 1. Server Actions + ORM (Prisma / Drizzle / Supabase)
//    â†’ Add 'use server' at the top of this file
//    â†’ Call your ORM directly in each function
//
// 2. Route Handlers + ORM
//    â†’ import { apiClient } from '@/starter/lib/api-client'
//    â†’ return apiClient<UsersResponse>('/users?...')
//    â†’ Replace mock calls in route handlers (src/app/api/users/) with ORM
//
// 3. BFF â€” Route Handlers proxy to external backend (Laravel, Go, etc.)
//    â†’ import { apiClient } from '@/starter/lib/api-client'
//    â†’ return apiClient<UsersResponse>('/users?...')
//    â†’ Route handlers proxy requests to your external backend service
//
// 4. Direct external API (frontend-only, no Next.js backend)
//    â†’ const res = await fetch('https://your-api.com/users?...')
//    â†’ return res.json()
//
// Current: Mock (in-memory fake data for demo/prototyping)
// ============================================================

import { fakeUsers } from '@/constants/mock-api-users';
import type { UserFilters, UsersResponse, UserMutationPayload } from './types';

export async function getUsers(filters: UserFilters): Promise<UsersResponse> {
  return fakeUsers.getUsers(filters);
}

export async function createUser(data: UserMutationPayload) {
  return fakeUsers.createUser(data);
}

export async function updateUser(id: number, data: UserMutationPayload) {
  return fakeUsers.updateUser(id, data);
}

export async function deleteUser(id: number) {
  return fakeUsers.deleteUser(id);
}

