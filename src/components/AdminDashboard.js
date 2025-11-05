"use client";

import ContactsTable from "./ContactsTable";

export default function AdminDashboard({ session }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow">
          <ContactsTable />
        </div>
      </div>
    </div>
  );
}
