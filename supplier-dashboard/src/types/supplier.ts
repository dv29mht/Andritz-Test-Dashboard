export interface Supplier {
  id?: number;
  materialGroup: string;
  registrationDate: string;       // ISO date string "YYYY-MM-DD"
  supplierName: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  telephone: string;
  telephone2?: string | null;
  email: string;
  orderCurrency: string;
  paymentTerms: string;
  incoterms: string;
  contactPerson: string;
  mobileNo: string;
  gstNo: string;
  panNo: string;
  reason: string;
  isOneTimeVendor: boolean;
  expectedYearlyPvo: number;
}
