import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AddVendor() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show loading state while checking session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendor),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to add vendor: ${errorData.message || "Unknown error"}`);
        return;
      }
  
      const data = await res.json();
      alert("Vendor added successfully!");
      router.push("/vendors");
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  // Render only for authenticated users
  if (status === "authenticated") {
    return (
      <div className="container my-5">
        <h1 className="mb-4">Add Vendor</h1>
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
            Add Vendor
          </button>
        </form>
      </div>
    );
  }

  return null;
}
