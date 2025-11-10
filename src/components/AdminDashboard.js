"use client";

import ContactsTable from "./ContactsTable";

export default function AdminDashboard({ session }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <ContactsTable />
    </div>
  );
}
