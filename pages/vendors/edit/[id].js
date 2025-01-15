import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditVendor() {
  const [vendor, setVendor] = useState({
    vendorName: "",
    bankAccountNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/vendors/${id}`)
        .then((res) => res.json())
        .then((data) => setVendor(data))
        .catch((error) => console.error("Error fetching vendor:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/vendors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendor),
    });

    if (res.ok) {
      alert("Vendor updated successfully!");
      router.push("/vendors");
    } else {
      alert("Failed to update vendor.");
    }
  };

  return (
    <div className="container my-5">
      <h1>Edit Vendor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Vendor Name*</label>
          <input
            type="text"
            className="form-control"
            name="vendorName"
            value={vendor.vendorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bank Account No*</label>
          <input
            type="text"
            className="form-control"
            name="bankAccountNo"
            value={vendor.bankAccountNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bank Name*</label>
          <input
            type="text"
            className="form-control"
            name="bankName"
            value={vendor.bankName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address Line 1*</label>
          <input
            type="text"
            className="form-control"
            name="addressLine1"
            value={vendor.addressLine1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address Line 2</label>
          <input
            type="text"
            className="form-control"
            name="addressLine2"
            value={vendor.addressLine2}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={vendor.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={vendor.country}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="zipCode"
            value={vendor.zipCode}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Vendor
        </button>
      </form>
    </div>
  );
}
