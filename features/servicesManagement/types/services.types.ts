import { AssetLink } from "@global components/layout/fileUploader";

export interface Service {
  _id: string;
  name: string;
  description: string;
  images: AssetLink[];
  status: boolean;
}
