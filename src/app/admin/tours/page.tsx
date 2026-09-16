import AddTour from "@/components/admin/AddTour";
import AdminLayout from "@/components/admin/AdminLayout";

export default function ToursAdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminLayout>
        <AddTour />
      </AdminLayout>
    </div>
  );
}
