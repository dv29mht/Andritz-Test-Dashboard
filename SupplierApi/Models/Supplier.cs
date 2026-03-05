namespace SupplierApi.Models;

public class Supplier
{
    public int Id { get; set; }
    public string MaterialGroup { get; set; } = string.Empty;
    public DateTime RegistrationDate { get; set; }
    public string SupplierName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Telephone { get; set; } = string.Empty;
    public string? Telephone2 { get; set; }
    public string Email { get; set; } = string.Empty;
    public string OrderCurrency { get; set; } = string.Empty;
    public string PaymentTerms { get; set; } = string.Empty;
    public string Incoterms { get; set; } = string.Empty;
    public string ContactPerson { get; set; } = string.Empty;
    public string MobileNo { get; set; } = string.Empty;
    public string GstNo { get; set; } = string.Empty;
    public string PanNo { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public bool IsOneTimeVendor { get; set; }
    public decimal ExpectedYearlyPvo { get; set; }
}
