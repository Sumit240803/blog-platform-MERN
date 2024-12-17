import Head from 'next/head';

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact us for inquiries, support, or feedback." />
      </Head>

      <main className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-contact">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-100 mb-8">
            We’d love to hear from you. Get in touch with us for inquiries, support, or feedback.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Our Office</h2>
              <p className="text-gray-100 mb-2">123 Main Street, Suite 456</p>
              <p className="text-gray-100 mb-2">City, Country 12345</p>
              <p className="text-gray-100 mb-2">Phone: (123) 456-7890</p>
              <p className="text-gray-100">Email: support@example.com</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Follow Us</h2>
              <p className="text-gray-100 mb-2">Stay connected with us on social media:</p>
              <div className="flex justify-start space-x-6">
                <a href="https://twitter.com" className="text-blue-600 hover:text-blue-800">Twitter</a>
                <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">Facebook</a>
                <a href="https://instagram.com" className="text-blue-600 hover:text-blue-800">Instagram</a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Business Hours</h2>
            <p className="text-gray-100 mb-2">Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p className="text-gray-100">Saturday: Closed</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
