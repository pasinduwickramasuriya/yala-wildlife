import Header from "@/components/Header";
import GetCustomerReviews from "@/components/GetCustomerReviews";
import ShowReviews from "@/components/ShowReviews";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";

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

      <AutoSEOWrapper
        pageTitle="Yala Safari Reviews | 4.9★ Rating from 1000+ Travelers"
        pageDescription="Read authentic reviews from travelers who experienced Yala Wildlife Safari. 4.9-star rating on TripAdvisor, Google, and Facebook. Book with confidence!"
        pageType="other"
      >
        <div className="container mx-auto px-4 py-8">
          <h1>Yala Safari Reviews</h1>

          <p>
            Dont just take our word for it - read authentic reviews from thousands of
            satisfied travelers who experienced unforgettable wildlife adventures with
            Yala Wildlife Safari. With an outstanding 4.9-star average rating, were
            proud to be one of Sri Lankas top-rated safari operators.
          </p>

          <p>
            Our commitment to excellence has earned us over 1,000 five-star reviews from
            guests worldwide. Travelers consistently praise our expert guides knowledge,
            punctuality, professionalism, and genuine passion for wildlife conservation
            and environmental education.
          </p>

          <p>
            Families love our child-friendly safari tours designed for safe, educational
            wildlife encounters. Parents appreciate our experienced guides who engage
            children with fascinating animal facts and interactive wildlife spotting games
            suitable for all ages.
          </p>

          <p>
            Photography enthusiasts consistently rate our specialized wildlife photography
            safaris as exceptional. Guests praise our guides understanding of lighting,
            composition, and optimal positioning for stunning wildlife shots including
            leopards, elephants, and colorful bird species.
          </p>

          <p>
            When you choose Yala Wildlife Safari, youre choosing a proven, reliable tour
            operator with an outstanding track record. Our reviews demonstrate our dedication
            to creating magical wildlife experiences while maintaining highest safety standards
            and exceeding guest expectations every day.
          </p>
        </div>
      </AutoSEOWrapper>


    </>
  );
}
