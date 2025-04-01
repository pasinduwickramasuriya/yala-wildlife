import AddBlog from "@/components/admin/AddBlog";
import AdminLayout from "@/components/admin/AdminLayout";

export default function BlogsPage() {
  return (
    <>
      <AdminLayout>
        <AddBlog />
      </AdminLayout>
    </>
  );
}
