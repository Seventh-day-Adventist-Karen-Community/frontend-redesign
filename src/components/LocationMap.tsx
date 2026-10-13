import { embedUrl, location } from "@/data/location";

const LocationMap = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-gray-200 ${className}`}>
    <iframe
      src={embedUrl}
      title={`Map showing ${location.name}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="absolute inset-0 h-full w-full border-0"
    />
  </div>
);

export default LocationMap;
