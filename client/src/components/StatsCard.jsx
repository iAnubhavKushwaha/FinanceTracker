const StatsCard = ({ label, value, color = "bg-blue-600", icon, className = "" }) => {
  const formattedValue = new Intl.NumberFormat("en-IN").format(value);

  return (
    <div
      className={`p-8 rounded-xl shadow-md text-white ${color} hover:brightness-110 transition cursor-default flex items-center space-x-4 ${className}`}
      role="region"
      aria-label={`${label} statistics`}
    >
      {icon && (
        <div className="text-4xl">
          <span aria-hidden="true">{icon}</span>
        </div>
      )}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide">{label}</h4>
        <p className="text-2xl font-bold mt-1">{formattedValue} INR</p>
      </div>
    </div>
  );
};

export default StatsCard;
