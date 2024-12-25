import Link from "next/link";

const TermsAndServices = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-3xl font-bold mb-5">Terms and Services</h1>
        <p className="text-gray-700 mb-5">
          Welcome to our Terms and Services page! Please take a moment to read
          through our policies before using our website. By accessing our
          services, you agree to the following terms:
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By using our services, you acknowledge and accept all the terms
            outlined in this agreement. If you don&apos;t agree... well, we
            still hope you&apos;ll stick around. It&apos;s lonely without you!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Use of Services</h2>
          <p className="text-gray-600">
            Our services are intended for lawful purposes only. Please refrain
            from using our platform to plan a world domination scheme. (Unless
            you&apos;re sharing the cookies.)
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Privacy Policy</h2>
          <p className="text-gray-600">
            We value your privacy and are committed to protecting your personal
            data. However, we do store some cookies (the digital kind,
            unfortunately). If you&apos;re looking for chocolate chip cookies,
            try your kitchen instead!
          </p>
        </section>

        <footer className="mt-10 text-center text-gray-500">
          <p className="mb-5">
            Now that you&apos;ve wasted your time reading this, why not get back
            to what really matters? Seriously, is anyone actually reading this?
            What a waste of time—just go back and shop already! Oh, and
            don&apos;t worry, we&apos;d only sell your info to the highest
            bidder. Priorities, right?
          </p>
          <Link href="/">
            <button className="bg-gray-800 hover:bg-blue-800 text-white py-2 px-4 rounded-lg">
              Go back and shop already!
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndServices;
