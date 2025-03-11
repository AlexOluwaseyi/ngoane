import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-900 to-green-900 flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lab-background.jpg"
            alt="Laboratory Equipment"
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 z-10 max-w-4xl">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Precision Diagnostics{" "}
              <span className="text-green-400">You Can Trust</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Millions trust our advanced laboratory for accurate, timely
              medical testing and diagnostics.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
              <Link
                href="/book-test"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Book a Test
              </Link>
              <Link
                href="/services"
                className="border border-white text-white hover:bg-white hover:text-green-900 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-3">
              <div className="text-green-600 text-4xl font-bold">1M+</div>
              <div className="text-gray-700">Tests Completed</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-green-600 text-4xl font-bold">99.8%</div>
              <div className="text-gray-700">Accuracy Rate</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-green-600 text-4xl font-bold">24hr</div>
              <div className="text-gray-700">Result Turnaround</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-green-600 text-4xl font-bold">50+</div>
              <div className="text-gray-700">Certified Scientists</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Equipment Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Advanced Testing Equipment
              </h2>
              <p className="text-gray-600 mb-6">
                Our state-of-the-art laboratory is equipped with the latest
                medical testing technology, ensuring unparalleled accuracy and
                reliability in all our diagnostic procedures.
              </p>
              <p className="text-gray-600 mb-6">
                From molecular diagnostics to advanced imaging, our investment
                in cutting-edge equipment allows us to detect even the most
                subtle health indicators with precision.
              </p>
              <ul className="space-y-2">
                {[
                  "Mass Spectrometry",
                  "Next-Gen Sequencing",
                  "Digital Pathology",
                  "AI-Assisted Diagnostics",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="h-5 w-5 text-green-500 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/lab-equipment.jpg"
                alt="Advanced Laboratory Equipment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Expert Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Chief Pathologist",
                image: "/images/doctor-1.jpg",
              },
              {
                name: "Dr. Michael Chen",
                role: "Laboratory Director",
                image: "/images/doctor-2.jpg",
              },
              {
                name: "Dr. Amina Patel",
                role: "Molecular Biologist",
                image: "/images/doctor-3.jpg",
              },
            ].map((person) => (
              <div
                key={person.name}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl">{person.name}</h3>
                  <p className="text-green-600">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Our Comprehensive Services
            </h2>
            <p className="text-gray-600 mt-4">
              We offer a wide range of diagnostic and testing services to meet
              all your health assessment needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Blood Tests",
                desc: "Complete blood count, metabolic panels, and specialized blood markers",
              },
              {
                title: "Pathology",
                desc: "Tissue examination and cellular analysis for accurate diagnosis",
              },
              {
                title: "Genetic Testing",
                desc: "DNA analysis for hereditary conditions and personalized medicine",
              },
              {
                title: "Microbiology",
                desc: "Identification of infectious agents including bacteria and viruses",
              },
              {
                title: "Imaging Services",
                desc: "Ultrasound, X-ray and advanced imaging diagnostics",
              },
              {
                title: "Health Screenings",
                desc: "Preventative testing packages for comprehensive health monitoring",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500"
              >
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-green-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "The speed and accuracy of the test results were impressive. I received my results within 24 hours, allowing my doctor to start treatment immediately.",
                author: "James Wilson, Patient",
              },
              {
                quote:
                  "As a referring physician, I trust this lab completely. Their detailed reports help me make informed decisions about my patients' care.",
                author: "Dr. Emily Thompson, Cardiologist",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm"
              >
                <div className="text-xl italic mb-4">
                  &quot;
                  <span className="text-green-300">{testimonial.quote}</span>
                  &quot;
                </div>
                <div className="font-semibold">— {testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Get Tested?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and experience the difference that
            our advanced technology and expert team can make in your healthcare
            journey.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              href="/book-test"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Book an Appointment
            </Link>
            <Link
              href="/contact"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
