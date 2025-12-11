import { CardNetwork } from "../cards/CardNetwork";

type NetworkItem = {
  number?: string;
  headerSymbol?: string;
  footerSymbol?: string;
  title?: string;
};

type NetworkCardItem = {
  image: {
    url: string;
    alt: string;
  };
  icon?: any;
  title?: string;
  description?: string;
};

type SectionNetworkProps = {
  items: NetworkItem[];
  cards: NetworkCardItem[];
};

const SectionNetwork: React.FC<SectionNetworkProps> = ({ items, cards }) => {
  return (
    <section className="md:py-[80px] py-12 xl:py-[120px] bg-white">
      <div className="container">
        <div className="xl:px-[72px] flex md:flex-row flex-col md:space-y-0 space-y-5 items-start justify-between">
          <div className="self-start md:min-w-60 md:w-[460px] max-md:max-w-full space-y-6 md:space-y-16">
            <h2 className="display-2 font-bold text-brown">
              A network of local experts to support your business.
            </h2>
            <div className="flex md:flex-row flex-col gap-4 md:gap-8 items-start w-full max-md:max-w-full">
              {items.map((itemNetwork, indexNetwork) => {
                return (
                  <div
                    key={indexNetwork}
                    className={`space-y-1 md:space-y-4 ${
                      indexNetwork === 0 ? "w-[226px]" : "flex-1 shrink basis-0"
                    }`}
                  >
                    <div className="display-1 font-bold text-orange-400">
                      {itemNetwork.number}
                      {itemNetwork.footerSymbol}
                    </div>
                    <p className="title-3 font-medium text-gray-700 uppercase">
                      {itemNetwork.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 md:gap-6 md:items-start h-full bg-white min-w-full md:min-w-60 max-md:max-w-full">
            {cards.map((itemCard, indexCard) => {
              return <CardNetwork key={indexCard} item={itemCard} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionNetwork;
