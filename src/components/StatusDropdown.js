"use client";

import { Select, SelectItem } from "@nextui-org/react";

const statusOptions = [
  { value: "PENDING", label: "Pending", color: "warning" },
  { value: "ATTENDED", label: "Attended", color: "success" },
  { value: "SPAM", label: "Spam", color: "danger" },
];

export default function StatusDropdown({
  contactId,
  currentStatus,
  onStatusChange,
}) {
  const handleChange = async (e) => {
    const newStatus = e.target.value;
    if (!newStatus || newStatus === currentStatus) return;

    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onStatusChange(contactId, newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Select
      size="sm"
      selectedKeys={[currentStatus]}
      onChange={handleChange}
      className="w-32"
      aria-label="Status"
      classNames={{
        trigger: "min-h-8 h-8",
        value: "text-xs",
      }}
    >
      {statusOptions.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
