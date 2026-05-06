"use client";

import { createContext, Dispatch } from "react";

import { Service } from "../types/services.types";

type ServiceState = {
  services: Service[] | null;
  setServices: Dispatch<React.SetStateAction<Service[] | null>>;

  selectedService: Service | null;
  setSelectedService: Dispatch<React.SetStateAction<Service | null>>;

  selectedServicePrev: Service | null;
  setSelectedServicePrev: Dispatch<React.SetStateAction<Service | null>>;

  selectedServiceStatus: boolean;
  setSelectedServiceStatus: Dispatch<React.SetStateAction<boolean>>;

  isUploading: boolean;
  setIsUploading: Dispatch<React.SetStateAction<boolean>>;

  isNewService: boolean;
  setIsNewService: Dispatch<React.SetStateAction<boolean>>;

  error: string;
  setError: Dispatch<React.SetStateAction<string>>;

  fetchServicesError: string;
  setFetchServicesError: Dispatch<React.SetStateAction<string>>;

  isDeleting: boolean;
  setIsDeleting: Dispatch<React.SetStateAction<boolean>>;

  hasServiceChanged: boolean;
  setHasServiceChanged: Dispatch<React.SetStateAction<boolean>>;
};

export const serviceContext = createContext<ServiceState | null>(null);
