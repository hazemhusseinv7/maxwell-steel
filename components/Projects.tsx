import { HoverExpand_001 } from "./ui/skiper-ui/skiper52";
import { HoverExpand_002 } from "./ui/skiper-ui/skiper53";

import { getProjectsData } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { getLocale } from "next-intl/server";

const Projects = async () => {
  const locale = await getLocale();

  const projects: ProjectsType | null = await getProjectsData(locale);

  const images = projects?.images?.map((img) => urlFor(img).url()) || [];

  const title = projects?.title;

  return (
    <section className="bg-linear-to-t from-blue-50 to-blue-100 pt-32 pb-50">
      <h2 className="z-20 mx-auto mb-10 w-fit text-center text-4xl font-semibold text-blue-700 lg:text-7xl">
        {title}
      </h2>

      <div className="mx-auto flex size-full max-w-[90%] items-center justify-center overflow-hidden px-4">
        <HoverExpand_001 className="hidden lg:block" images={images} />
        <HoverExpand_002 className="lg:hidden" images={images} />
      </div>
    </section>
  );
};

export default Projects;
