"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  FaFileInvoice,
  FaDownload,
  FaEye,
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFileAlt,
} from "react-icons/fa";

export default function Invoices() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch("/api/user/subscription");
      const data = await response.json();

      if (response.ok) {
        setBusinesses(data.businesses || []);
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
      case "paid":
        return <FaCheckCircle />;
      case "pending":
        return <FaClock />;
      case "failed":
        return <FaTimesCircle />;
      default:
        return <FaFileAlt />;
    }
  };

  // Get all payments from all businesses
  const allPayments = businesses.flatMap((business) =>
    (business.payments || []).map((payment) => ({
      ...payment,
      businessName: business.businessName,
      planType: business.subscription?.planType,
      duration: business.subscription?.duration,
    }))
  );

  const filteredPayments = allPayments.filter((payment) => {
    const matchesSearch =
      payment.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.orderId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (orderId) => {
    console.log("Downloading invoice:", orderId);
    alert(`Invoice download functionality will be implemented for ${orderId}`);
  };

  const handleView = (orderId) => {
    console.log("Viewing invoice:", orderId);
    alert(`Invoice view functionality will be implemented for ${orderId}`);
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-white/80">Loading invoices...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="light"
            className="text-white/70 hover:text-white mb-4"
            startContent={<FaArrowLeft />}
            onPress={() => router.push("/user/dashboard")}
          >
            Back to Dashboard
          </Button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Invoices & Billing
              </h1>
              <p className="text-white/60 text-lg">
                View and download your payment history
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaFileInvoice className="text-blue-400 text-3xl" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
            <CardBody className="p-4">
              <p className="text-white/60 text-sm mb-1">Total Invoices</p>
              <p className="text-2xl font-bold text-white">
                {allPayments.length}
              </p>
            </CardBody>
          </Card>
          <Card className="bg-slate-900/50 border border-green-500/20 backdrop-blur-xl">
            <CardBody className="p-4">
              <p className="text-white/60 text-sm mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-400">
                {allPayments.filter((p) => p.status === "completed").length}
              </p>
            </CardBody>
          </Card>
          <Card className="bg-slate-900/50 border border-yellow-500/20 backdrop-blur-xl">
            <CardBody className="p-4">
              <p className="text-white/60 text-sm mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">
                {allPayments.filter((p) => p.status === "pending").length}
              </p>
            </CardBody>
          </Card>
          <Card className="bg-slate-900/50 border border-blue-500/20 backdrop-blur-xl">
            <CardBody className="p-4">
              <p className="text-white/60 text-sm mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-white">
                ₹
                {allPayments
                  .filter((p) => p.status === "completed")
                  .reduce((sum, p) => sum + (p.amount || 0), 0)
                  .toLocaleString()}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl mb-6">
          <CardBody className="p-6">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search by order ID or business name..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<FaSearch className="text-white/50" />}
                className="max-w-md"
                classNames={{
                  input: "bg-transparent text-white",
                  inputWrapper: "bg-white/5 border border-white/10",
                }}
              />
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="bg-white/5 text-white border border-white/10"
                    startContent={<FaFilter />}
                  >
                    Filter: {filterStatus === "all" ? "All" : filterStatus}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Filter status"
                  onAction={(key) => setFilterStatus(key)}
                >
                  <DropdownItem key="all">All Status</DropdownItem>
                  <DropdownItem key="completed">Completed</DropdownItem>
                  <DropdownItem key="pending">Pending</DropdownItem>
                  <DropdownItem key="failed">Failed</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardBody>
        </Card>

        {/* Invoices Table */}
        <Card className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
          <CardBody className="p-6">
            {allPayments.length === 0 ? (
              <div className="text-center py-12">
                <FaFileInvoice className="text-white/30 text-5xl mx-auto mb-4" />
                <p className="text-white/60 text-lg">No invoices found</p>
                <p className="text-white/40 text-sm mt-2">
                  Your payment history will appear here
                </p>
              </div>
            ) : (
              <Table
                aria-label="Invoices table"
                classNames={{
                  wrapper: "bg-transparent",
                  th: "bg-white/5 text-white/80 font-semibold",
                  td: "text-white/90",
                }}
              >
                <TableHeader>
                  <TableColumn>ORDER ID</TableColumn>
                  <TableColumn>BUSINESS</TableColumn>
                  <TableColumn>PLAN</TableColumn>
                  <TableColumn>AMOUNT</TableColumn>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No invoices found">
                  {filteredPayments.map((payment, index) => (
                    <TableRow key={payment.orderId || index}>
                      <TableCell>
                        <span className="font-mono text-xs">
                          {payment.orderId?.slice(-15)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {payment.businessName}
                          </div>
                          <div className="text-xs text-white/50">
                            {payment.duration === "monthly"
                              ? "Monthly"
                              : payment.duration === "6-months"
                              ? "6 Months"
                              : "Yearly"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm" variant="flat" color="primary">
                          {payment.planType}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          ₹{payment.amount?.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        {formatDate(payment.createdAt || payment.date)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="sm"
                          color={getStatusColor(payment.status)}
                          variant="flat"
                          startContent={getStatusIcon(payment.status)}
                        >
                          {payment.status?.toUpperCase()}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            isIconOnly
                            variant="flat"
                            className="bg-white/5 text-white"
                            onPress={() => handleView(payment.orderId)}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            size="sm"
                            isIconOnly
                            variant="flat"
                            className="bg-white/5 text-white"
                            onPress={() => handleDownload(payment.orderId)}
                          >
                            <FaDownload />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
