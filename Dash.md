# Supplier Registration Form-to-Dashboard Pipeline

## Architecture Overview
* **Frontend (React 18 / Vite / Tailwind CSS):** Captures user input and sends a `POST` request. A separate Dashboard component fetches and displays the data via a `GET` request.
* **Backend (.NET 8 Web API):** Receives the request, validates the data, and prepares it for storage.
* **Database (Entity Framework Core):** Writes the data permanently. For initial setup, an in-memory SQLite database is used, which can be swapped for SQL Server or PostgreSQL later.

## Form Fields Extracted
* Material Group
* Date
* Supplier Name
* Address 
* Postal Code
* City
* State
* Country
* Telephone
* Telephone-2
* E-mail
* Order Currency
* Payment Terms
* Incoterms
* Contact Person
* Mobile No.
* GST No.
* PAN No.
* Reason
* One Time Vendor (Yes/No)
* Expected Yearly PVO

---

## Claude VS Code Prompt

**Copy and paste the following into Claude:**

Act as an expert full-stack developer. I need to build a form-to-dashboard pipeline. Please generate the boilerplate code for a .NET 8 Web API backend and a React 18 frontend (using Vite and Tailwind CSS).

**1. The Data Model:** Create a C# class and a corresponding TypeScript interface for a 'Supplier' with the following fields: 
MaterialGroup (string), RegistrationDate (DateTime), SupplierName (string), Address (string), PostalCode (string), City (string), State (string), Country (string), Telephone (string), Telephone2 (string, nullable), Email (string), OrderCurrency (string), PaymentTerms (string), Incoterms (string), ContactPerson (string), MobileNo (string), GstNo (string), PanNo (string), Reason (string), IsOneTimeVendor (boolean), ExpectedYearlyPvo (decimal).

**2. Backend (.NET 8):** Set up a Minimal API with Entity Framework Core using an SQLite in-memory database for local testing. Create a POST endpoint to receive new supplier data and a GET endpoint to return all suppliers. Include the necessary CORS configuration to allow local frontend requests.

**3. Frontend (React 18):** Create a clean form component styled with Tailwind CSS to capture these fields and POST them to the API. Then, create a Dashboard component that fetches the data and displays the suppliers in a simple, styled data table.