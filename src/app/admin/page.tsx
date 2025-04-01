import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <AdminLayout>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the admin panel. Use the navigation to manage content.</p>
      </AdminLayout>
    </div>
  );
}
