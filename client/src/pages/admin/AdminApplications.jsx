import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Button from "../../components/ui/Button";

export default function AdminApplications() {
  const [apps, setApps] = useState([]);

  const loadApps = async () => {
    const { data } = await API.get("/stalls/admin/all");
    setApps(data.applications || []);
  };

  useEffect(() => {
    loadApps();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/stalls/admin/${id}/status`, { status });
      toast.success(`Application ${status}`);
      loadApps();
    } catch {
      toast.error("Failed to update");
    }
  };

  const updatePayment = async (id, paymentStatus) => {
    try {
      await API.patch(`/stalls/admin/${id}/payment`, { paymentStatus });
      toast.success("Payment updated");
      loadApps();
    } catch {
      toast.error("Failed to update payment");
    }
  };

  return (
    <div>
      <p className="font-bold text-emerald-600">Applications</p>
      <h1 className="mt-2 text-4xl font-black">Stall applications</h1>

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4">Business</th>
                <th className="p-4">Applicant</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {apps.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="p-4 font-bold">{app.businessName}</td>
                  <td className="p-4">
                    <p>{app.applicantName}</p>
                    <p className="text-sm text-slate-500">{app.email}</p>
                  </td>
                  <td className="p-4 capitalize">{app.stallType}</td>
                  <td className="p-4 capitalize">{app.status}</td>
                  <td className="p-4 capitalize">{app.paymentStatus}</td>
                  <td className="flex flex-wrap gap-2 p-4">
                    <Button
                      className="px-4 py-2"
                      onClick={() => updateStatus(app._id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      className="px-4 py-2"
                      variant="outline"
                      onClick={() => updateStatus(app._id, "rejected")}
                    >
                      Reject
                    </Button>
                    <Button
                      className="px-4 py-2"
                      variant="dark"
                      onClick={() => updatePayment(app._id, "paid")}
                    >
                      Mark Paid
                    </Button>
                  </td>
                </tr>
              ))}

              {apps.length === 0 && (
                <tr>
                  <td className="p-6 text-slate-500" colSpan="6">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
