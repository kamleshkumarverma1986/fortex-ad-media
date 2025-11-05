export default function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case "PENDING":
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-500",
          border: "border-yellow-500/30",
          label: "Pending",
        };
      case "ATTENDED":
        return {
          bg: "bg-green-500/20",
          text: "text-green-500",
          border: "border-green-500/30",
          label: "Attended",
        };
      case "SPAM":
        return {
          bg: "bg-red-500/20",
          text: "text-red-500",
          border: "border-red-500/30",
          label: "Spam",
        };
      default:
        return {
          bg: "bg-gray-500/20",
          text: "text-gray-500",
          border: "border-gray-500/30",
          label: status,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      {config.label}
    </span>
  );
}
