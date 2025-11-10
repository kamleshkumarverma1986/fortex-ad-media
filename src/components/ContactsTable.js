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
} from "@nextui-org/react";
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
        return <div className="font-medium text-gray-100">{contact.name}</div>;
      case "email":
        return <div className="text-sm text-gray-300">{contact.email}</div>;
      case "phoneNumber":
        return (
          <div className="text-sm text-gray-300">{contact.phoneNumber}</div>
        );
      case "status":
        return <StatusBadge status={contact.status} />;
      case "created":
        return (
          <div className="text-sm text-gray-400">
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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8 mt-12">
          <p className="text-gray-400">
            Manage and track all customer inquiries
          </p>
        </div>

        {/* Filters Card */}
        <Card className="border border-gray-700/50 shadow-2xl bg-gray-800/50 backdrop-blur-xl">
          <CardBody className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end flex-1 w-full">
                <div className="w-full sm:w-64">
                  <label className="block text-xs font-medium text-gray-300 mb-2">
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
                        "bg-gray-700/50 border-2 border-gray-600 hover:border-blue-500 transition-all duration-200 data-[hover=true]:bg-gray-700",
                      value: "text-gray-100 font-medium",
                      listbox: "bg-gray-800",
                      popoverContent:
                        "bg-gray-800 shadow-xl border border-gray-700",
                    }}
                  >
                    <SelectItem
                      key="ALL"
                      value="ALL"
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                    >
                      All Status
                    </SelectItem>
                    <SelectItem
                      key={PENDING_CONTACT_STATUS}
                      value={PENDING_CONTACT_STATUS}
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                    >
                      Pending
                    </SelectItem>
                    <SelectItem
                      key={ATTENDED_CONTACT_STATUS}
                      value={ATTENDED_CONTACT_STATUS}
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                    >
                      Attended
                    </SelectItem>
                    <SelectItem
                      key={SPAM_CONTACT_STATUS}
                      value={SPAM_CONTACT_STATUS}
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                    >
                      Spam
                    </SelectItem>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <label className="block text-xs font-medium text-gray-300 mb-2">
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
                        "bg-gray-700/50 border-2 border-gray-600 hover:border-blue-500 transition-all duration-200 data-[hover=true]:bg-gray-700",
                      value: "text-gray-100 font-medium",
                      listbox: "bg-gray-800",
                      popoverContent:
                        "bg-gray-800 shadow-xl border border-gray-700",
                    }}
                  >
                    <SelectItem
                      key="10"
                      value="10"
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                    >
                      10
                    </SelectItem>
                    <SelectItem
                      key="25"
                      value="25"
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                    >
                      25
                    </SelectItem>
                    <SelectItem
                      key="50"
                      value="50"
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                    >
                      50
                    </SelectItem>
                    <SelectItem
                      key="100"
                      value="100"
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                    >
                      100
                    </SelectItem>
                  </Select>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 rounded-xl border border-gray-700 shadow-xl min-w-[180px] justify-center">
                  <span className="text-sm font-medium text-gray-300">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    {total}
                  </span>
                  <span className="text-sm font-medium text-gray-300">
                    Contacts
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-700/50 shadow-2xl transition-all duration-300 hover:shadow-blue-500/10 bg-gray-800/50 backdrop-blur-xl">
          <Table
            aria-label="Contact requests table"
            classNames={{
              wrapper: "shadow-none rounded-none bg-transparent p-0",
              th: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm uppercase tracking-wider border-b border-gray-700",
              td: "py-4 border-b border-gray-700/50",
              tr: "hover:bg-gray-700/30 transition-colors duration-200",
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
              loadingContent={
                <div className="py-12">
                  <Spinner size="lg" color="primary" />
                </div>
              }
              emptyContent={
                <div className="text-center py-12">
                  <div className="mb-4">
                    <svg
                      className="w-16 h-16 text-gray-600 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg font-medium">
                    No contacts found
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Try adjusting your filters
                  </p>
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
                  "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50",
                item: "transition-all duration-200 hover:scale-110 bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
