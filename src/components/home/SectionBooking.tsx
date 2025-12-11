import Logo from "../logo";

const SectionBooking: React.FC = () => {
  return (
    <section
      id="section-about-us"
      className="relative pt-[100px] pb-[80px] bg-white"
    >
      <div className="container">
        <div className="px-[75px] flex items-center gap-16">
          <div className="max-w-[380px] w-full">
            <Logo width={108} height={52} />
            <h2 className="display-2 font-bold text-brown mt-3 mb-6">
              Sourcing from Southeast Asia made easy
            </h2>
            <button className="btn btn-secondary">Book a call with us</button>
          </div>
          <div className="flex-1 w-full body-1 text-gray-900 space-y-3">
            <p>Tropify believes in bridging and optimizing connections.</p>
            <p>
              We connect buyers with quality tropical commodities responsibly
              sourced from Vietnam, Indonesia, and beyond. We work closely with
              farmers, cooperatives, and processors to bring products such as
              green coffee and frozen tropical fruits to regional and global
              markets.
            </p>
            <p>
              Our approach is rooted in transparency, expertise, and respect for
              the people and environments that make these products possible.
            </p>
            <p>
              We focus on building reliable, long-term relationships and
              supporting better market access through consistent quality and
              clear communication. By understanding local contexts and global
              demand, we aim to create steady opportunities for producers while
              supplying partners with products they can trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionBooking;
