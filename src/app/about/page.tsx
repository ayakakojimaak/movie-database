import Link from "next/link";

export default function About() {
  return (
    <div>
      <img src="https://via.placeholder.com/800x400" alt="Platform Screenshot" className="w-full h-auto" />
      {/* Storyline Section */}
      <div className="my-8">
        <section className="p-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Our platform is designed for those who love to share their thoughts and experiences about the
              entertainment world. Whether it is a movie, TV show, or anime, you can:
              <ul className="list-disc list-inside mt-4 text-left text-lg mx-auto max-w-3xl">
                <li>Review and rate your favorite works.</li>
                <li>Add your favorite movies, TV shows, and anime to your personal list.</li>
                <li>Share your thoughts and communicate with others through discussions and comments.</li>
              </ul>
            </p>
          </div>
        </section>

        {/* Get in Touch Section */}
        <section className="p-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Have any questions or feedback? We’d love to hear from you. Get in touch with our team below to learn more
              about the platform or share your ideas for improvement.
            </p>
            <Link href="/" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
