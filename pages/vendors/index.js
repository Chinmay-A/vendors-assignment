import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VendorsList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    // Redirect to login page if unauthenticated
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch(`/api/vendors?page=${page}&limit=${limit}`);
        if (res.ok) {
          const data = await res.json();
          setVendors(data);
        } else {
          console.error("Failed to fetch vendors:", res.status);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    // Fetch vendors only when authenticated
    if (status === "authenticated") {
      fetchVendors();
    }
  }, [page, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="container my-5">
      <Link href="/vendors/create">
        <button className="btn btn-success mb-4">Create Vendor</button>
      </Link>
      <h1 className="mb-4">Vendors List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Bank Account No</th>
            <th>Bank Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.vendorName}</td>
                <td>{vendor.bankAccountNo}</td>
                <td>{vendor.bankName}</td>
                <td>
                  <Link href={`/vendors/edit/${vendor._id}`}>
                    <button className="btn btn-primary btn-sm">Edit</button>
                  </Link>{" "}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(vendor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No vendors found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

function handleDelete(id) {
  if (confirm("Are you sure you want to delete this vendor?")) {
    fetch(`/api/vendors/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        alert("Vendor deleted!");
        window.location.reload();
      } else {
        alert("Failed to delete vendor.");
      }
    });
  }
}

