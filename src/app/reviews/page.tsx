import Header from "@/components/Header";
import GetCustomerReviews from "@/components/GetCustomerReviews";
import ShowReviews from "@/components/ShowReviews";

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="py-16 px-4 md:px-6">

          <ShowReviews />
          <div className="flex justify-center mt-8">
            <GetCustomerReviews />
          </div>
        </div>
      </div>
    </>
  );
}
