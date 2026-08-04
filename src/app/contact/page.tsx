"use client";

// import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactRegistrationSection from "./components/contact-registration";

// Note: metadata cannot be exported in client component
// Will need to create metadata in server component or convert to server component

// const contactInfo = [
//   {
//     icon: MapPin,
//     title: "Address",
//     content: "123 ABC Street, District 1, HCMC",
//     color: "blue",
//   },
//   {
//     icon: Phone,
//     title: "Phone",
//     content: "(028) 1234 5678",
//     color: "green",
//   },
//   {
//     icon: Mail,
//     title: "Email",
//     content: "contact@smeq.vn",
//     color: "purple",
//   },
//   {
//     icon: Clock,
//     title: "Working hours",
//     content: "Monday - Friday: 8:00 - 17:30",
//     color: "orange",
//   },
// ];

// const colorClasses = {
//   blue: "bg-blue-100 text-blue-600",
//   green: "bg-green-100 text-green-600",
//   purple: "bg-purple-100 text-purple-600",
//   orange: "bg-orange-100 text-orange-600",
// };

export default function ContactPage() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   company: "",
  //   subject: "",
  //   message: "",
  // });

  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitStatus, setSubmitStatus] = useState<
  //   "idle" | "success" | "error"
  // >("idle");

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  //   setIsSubmitting(false);
  //   setSubmitStatus("success");

  //   // Reset form
  //   setFormData({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     company: "",
  //     subject: "",
  //     message: "",
  //   });

  //   // Reset success message after 5s
  //   setTimeout(() => setSubmitStatus("idle"), 5000);
  // };

  return (
    <div className="bg-white">
      <ContactRegistrationSection />

      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We are always ready to support you
            </p>
          </div>
        </div>
      </section> */}

      {/* Contact Info */}
      {/* <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                >
                  <div
                    className={`w-12 h-12 ${
                      colorClasses[info.color as keyof typeof colorClasses]
                    } rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Contact Form */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12"> */}
      {/* Form */}
      {/* <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                  Thank you for contacting us! We will respond as soon as
                  possible.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ABC Company"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select subject</option>
                    <option value="tu-van">Service consultation</option>
                    <option value="bao-gia">Quotation</option>
                    <option value="hop-tac">Business partnership</option>
                    <option value="khac">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter your message content..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            </div> */}

      {/* Map & Additional Info */}
      {/* <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Find us
              </h2> */}

      {/* Map placeholder */}
      {/* <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Map will be integrated here</p>
                </div>
              </div> */}

      {/* FAQ */}
      {/* <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Frequently asked questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Response time?
                    </h4>
                    <p className="text-sm text-gray-600">
                      We respond within 24 business hours
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Is there a free consultation?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Yes, the first consultation is completely free
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Online support?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Support available via Zalo, email, and phone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
