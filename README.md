# Employee Management System

A web application for mid-sized IT companies to manage employees, departments, projects, attendance, and leave requests.

## Tech Stack
- **Backend:** ASP.NET Core, Azure Functions, EF Core, SQL Server, Clean Architecture, CQRS/MediatR
- **Frontend:** React, TypeScript, Tailwind CSS
- **Testing:** Postman (API), Manual QA

## Features
- Role-based access control (RBAC)
- Employee CRUD operations with validation
- Department and project management
- Attendance tracking
- Leave request workflows

## QA Testing Coverage

### API Testing (Postman)
- **CRUD Operations:** POST /employees, GET /employees, PUT, DELETE
- **Validation:** FluentValidation error responses (400 with field-level details)
- **Duplicate Prevention:** Email and JMBG uniqueness constraints verified
- **Soft-Delete Logic:** Verified IsDeleted records don't block new registrations
- **Status Codes:** 201 Created, 200 OK, 404 Not Found, 409 Conflict

### Key Bugs Found & Fixed
1. **Soft-Delete Duplicate Check** — Duplicate prevention query wasn't filtering IsDeleted=true records. Result: Deleted users blocked new registrations with same email. Fixed by updating query filter.

2. **Pagination Edge Case** — Verified pagination metadata returns correct totals and offsets under various dataset sizes.

### Test Results
✅ All critical CRUD flows verified  
✅ Duplicate prevention working across all constraint types  
✅ Soft-delete recovery tested  
✅ Validation error responses correct  

## How to Run
```bash
git clone https://github.com/djordjejo/Employee-management-system
cd Employee-management-system
npm install
npm run dev
```

## API Documentation
Full Postman collections and test cases in `/docs/api-testing`

---
