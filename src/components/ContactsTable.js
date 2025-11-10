"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Select,
  SelectItem,
  Card,
  CardBody,
} from "@heroui/react";
import StatusDropdown from "./StatusDropdown";
import StatusBadge from "./StatusBadge";
import {
  ATTENDED_CONTACT_STATUS,
  PENDING_CONTACT_STATUS,
  SPAM_CONTACT_STATUS,
} from "@/utils/helper";

export default function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
        ...(statusFilter !== "ALL" && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/contacts?${params}`);
      const data = await response.json();

      if (data.success) {
        setContacts(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotal(data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortBy, sortOrder, statusFilter]);

  const handleStatusChange = (contactId, newStatus) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact._id === contactId ? { ...contact, status: newStatus } : contact
      )
    );
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const columns = [
    { key: "name", label: "Full Name", sortable: true },
    { key: "email", label: "Email", sortable: false },
    { key: "phoneNumber", label: "Phone", sortable: false },
    { key: "status", label: "Status", sortable: true },
    { key: "created", label: "Submitted", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderCell = (contact, columnKey) => {
    switch (columnKey) {
      case "name":
        return <div className="font-medium">{contact.name}</div>;
      case "email":
        return <div className="text-sm">{contact.email}</div>;
      case "phoneNumber":
        return <div className="text-sm">{contact.phoneNumber}</div>;
      case "status":
        return <StatusBadge status={contact.status} />;
      case "created":
        return (
          <div className="text-sm text-gray-500">
            {formatDate(contact.created)}
          </div>
        );
      case "actions":
        return (
          <StatusDropdown
            contactId={contact._id}
            currentStatus={contact.status}
            onStatusChange={handleStatusChange}
          />
        );
      default:
        return contact[columnKey];
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Filters Card */}
        <Card className="border border-gray-200 shadow-lg bg-white">
          <CardBody className="p-3">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end flex-1 w-full">
                <div className="w-full sm:w-64">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Status Filter
                  </label>
                  <Select
                    selectedKeys={[statusFilter]}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full"
                    size="md"
                    classNames={{
                      trigger:
                        "bg-white border-2 border-gray-300 hover:border-blue-500 transition-all duration-200 data-[hover=true]:bg-gray-50",
                      value: "text-gray-900 font-medium",
                      listbox: "bg-white",
                      popoverContent:
                        "bg-white shadow-xl border border-gray-200",
                    }}
                  >
                    <SelectItem
                      key="ALL"
                      value="ALL"
                      className="bg-white hover:bg-blue-50"
                    >
                      All Status
                    </SelectItem>
                    <SelectItem
                      key={PENDING_CONTACT_STATUS}
                      value={PENDING_CONTACT_STATUS}
                      className="bg-white hover:bg-blue-50"
                    >
                      Pending
                    </SelectItem>
                    <SelectItem
                      key={ATTENDED_CONTACT_STATUS}
                      value={ATTENDED_CONTACT_STATUS}
                      className="bg-white hover:bg-blue-50"
                    >
                      Attended
                    </SelectItem>
                    <SelectItem
                      key={SPAM_CONTACT_STATUS}
                      value={SPAM_CONTACT_STATUS}
                      className="bg-white hover:bg-blue-50"
                    >
                      Spam
                    </SelectItem>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Per Page
                  </label>
                  <Select
                    selectedKeys={[limit.toString()]}
                    onChange={(e) => {
                      setLimit(parseInt(e.target.value));
                      setPage(1);
                    }}
                    className="w-full"
                    size="md"
                    classNames={{
                      trigger:
                        "bg-white border-2 border-gray-300 hover:border-blue-500 transition-all duration-200 data-[hover=true]:bg-gray-50",
                      value: "text-gray-900 font-medium",
                      listbox: "bg-white",
                      popoverContent:
                        "bg-white shadow-xl border border-gray-200",
                    }}
                  >
                    <SelectItem
                      key="10"
                      value="10"
                      className="bg-white hover:bg-blue-50"
                    >
                      10
                    </SelectItem>
                    <SelectItem
                      key="25"
                      value="25"
                      className="bg-white hover:bg-blue-50"
                    >
                      25
                    </SelectItem>
                    <SelectItem
                      key="50"
                      value="50"
                      className="bg-white hover:bg-blue-50"
                    >
                      50
                    </SelectItem>
                    <SelectItem
                      key="100"
                      value="100"
                      className="bg-white hover:bg-blue-50"
                    >
                      100
                    </SelectItem>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-xl border-2 border-blue-200 shadow-sm min-w-[180px] justify-center">
                <span className="text-sm font-medium text-gray-700">
                  Total:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {total}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Contacts
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl bg-white">
          <Table
            aria-label="Contact requests table"
            classNames={{
              wrapper: "shadow-none rounded-none bg-white p-0",
              th: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm uppercase tracking-wider",
              td: "py-4 border-b border-gray-100",
              tr: "hover:bg-blue-50 transition-colors duration-200",
            }}
          >
            <TableHeader>
              {columns.map((column) => (
                <TableColumn
                  key={column.key}
                  className={
                    column.sortable
                      ? "cursor-pointer select-none hover:bg-blue-700 transition-colors duration-200"
                      : ""
                  }
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortBy === column.key && (
                      <span className="text-base font-bold">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody
              items={contacts}
              isLoading={loading}
              loadingContent={<Spinner size="lg" color="primary" />}
              emptyContent={
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No contacts found</p>
                </div>
              }
            >
              {(item) => (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center py-6">
            <Pagination
              total={totalPages}
              page={page}
              onChange={setPage}
              showControls
              color="primary"
              size="lg"
              classNames={{
                cursor:
                  "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg",
                item: "transition-all duration-200 hover:scale-110 bg-white",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
