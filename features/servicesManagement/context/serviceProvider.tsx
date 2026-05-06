"use client";

import { useState } from "react";
import { serviceContext } from "./serviceContext";
import { Service } from "../types/services.types";

export default function ServiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [services, setServices] = useState<Service[] | null>([]);

  const [selectedServicePrev, setSelectedServicePrev] =
    useState<Service | null>(null);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [selectedServiceStatus, setSelectedServiceStatus] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const [isNewService, setIsNewService] = useState(false);

  const [error, setError] = useState("");

  const [fetchServicesError, setFetchServicesError] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  const [hasServiceChanged, setHasServiceChanged] = useState(false);

  return (
    <serviceContext.Provider
      value={{
        services,
        setServices,
        selectedServicePrev,
        setSelectedServicePrev,
        selectedService,
        setSelectedService,
        selectedServiceStatus,
        setSelectedServiceStatus,
        isUploading,
        setIsUploading,
        isNewService,
        setIsNewService,
        error,
        setError,
        fetchServicesError,
        setFetchServicesError,
        isDeleting,
        setIsDeleting,
        hasServiceChanged,
        setHasServiceChanged,
      }}
    >
      {children}
    </serviceContext.Provider>
  );
}
