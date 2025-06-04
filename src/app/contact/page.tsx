import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-foreground">
        {/* Contact Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12 tracking-tight">
              Get in Touch
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Contact Details
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We’d love to hear from you! Whether you have questions about
                    our safari packages or need assistance, feel free to reach
                    out.
                  </p>
                </div>
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-foreground">
                        Email Us
                      </h3>
                      <p className="text-muted-foreground">
                        <a
                          href="mailto:support@yalasafari.com"
                          className="hover:underline"
                        >
                          support@yalasafari.com
                        </a>
                      </p>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-foreground">
                        Call Us
                      </h3>
                      <p className="text-muted-foreground">+94 778 158 004</p>
                    </div>
                  </div>
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-foreground">
                        Visit Us
                      </h3>
                      <p className="text-muted-foreground">
                        Yala Wildlife, <br />
                        Wickrama Kasingama, <br />
                        Tissamaharama, Sri Lanka.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Map */}
                <LocationMap />
              </div>

              {/* Contact Form */}
              <div className=" p-6 rounded-xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
