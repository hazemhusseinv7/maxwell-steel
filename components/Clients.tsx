import { getClientsData } from "@/lib/sanity/queries";
import { LogoCloud } from "./logo-cloud";
import { urlFor } from "@/lib/sanity/image";

const Clients = async () => {
  const clients: ClientsType | null = await getClientsData();

  if (!clients?.logos?.length) return null;

  let logos =
    clients?.logos?.map((clientLogo) => ({
      url: urlFor(clientLogo).url(),
    })) || [];

  logos = [...logos, ...logos];

  return (
    <section className="py-20">
      <LogoCloud logos={logos} />
    </section>
  );
};

export default Clients;
