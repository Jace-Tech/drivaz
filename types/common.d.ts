interface IDriver {
  _id: string;
  driverIdentificationNumber: string;
  name: string;
  image?: string;
  licenseNumber: string;
  address?: string;
  phone?: string;
  gender?: string;
  __v?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IUpload {
  url: string;
  type: string;
  width: string | number;
  height: string | number;
  size: string;
}

interface IUploadType { type: string, uri: string; name: string }
