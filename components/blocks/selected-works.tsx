import React from "react";
import { Template } from "tinacms";
import { Section, sectionBlockSchemaField } from "../layout/section";
import {
  PageBlocksFeatured,
  PageBlocksFeaturedFeatured,
} from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { dateFormatter } from "@/lib/utils";
import Link from "next/dist/client/link";

export const SelectedWorks = ({ data }: { data: PageBlocksFeatured }) => {
  return (
    <Section
      background={data.background!}
      className="py-32 border-t border-foreground/10"
    >
      <div className="max-w-7xl">
        <div className="mb-20">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-medium"
            data-tina-field={tinaField(data, "section")}
          >
            Selection
          </p>
          <h2
            className="text-3xl md:text-4xl tracking-tight font-medium"
            data-tina-field={tinaField(data, "title")}
          >
            Recent Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {data.featured &&
            data.featured.map((artwork, index) => (
              <WorkCard key={index} featured={artwork!} />
            ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/gallery"
            className="inline-block border border-foreground/30 px-12 py-5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all hover:border-foreground"
          >
            View All Works
          </Link>
        </div>
      </div>
    </Section>
  );
};

export const WorkCard = ({
  featured,
}: {
  featured: PageBlocksFeaturedFeatured;
}) => {
  return (
    <Card className="rounded-none border-none outline-0 p-0 shadow-none w-full">
      <Link href={`/artwork/${featured.title}`} className="group block">
        <CardContent className="p-0 gap-2 m-0">
          <div className="relative h-80">
            <Image
              alt={featured.title!}
              src={featured.avatar!}
              loading="lazy"
              fill
              className="object-none"
              data-tina-field={tinaField(featured, "avatar")}
            ></Image>
          </div>
          <div className="flex justify-between gap-4 mt-4">
            <div className="">
              <h3 data-tina-field={tinaField(featured, "title")}>
                {featured.title}
              </h3>
              <p
                className="text-sm max-w-sm line-clamp-2 text-ellipsis text-muted-foreground"
                data-tina-field={tinaField(featured, "description")}
              >
                {featured.description}
              </p>
            </div>
            <p
              data-tina-field={tinaField(featured, "date")}
              className="text-sm text-muted-foreground"
            >
              {dateFormatter(featured.date!)}
            </p>
          </div>
        </CardContent>{" "}
      </Link>
    </Card>
  );
};

const defaultWork = {
  title: "Untitled (Reduction)",
  description: "this id some cool art work i made fun likes.",
  date: "2020",
  image: {
    src: "https://res.cloudinary.com/dza7lstvk/image/upload/v1700000000/lees-art-gallery/selected-works/untitled-reduction.jpg",
    alt: "Untitled (Reduction) by Alpheus Mabetlela",
  },
};

export const SelectedWorksSchema: Template = {
  name: "featured",
  label: "Featured",
  ui: {
    previewSrc: "/blocks/selected-works.png",
    defaultItem: {
      title: "ALpheus Mabetlela",
      section: "selection",
      featured: [defaultWork, defaultWork, defaultWork],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
      ui: {
        defaultItem: "Featured Works",
      },
    },
    {
      type: "string",
      label: "Section",
      name: "section",
      ui: {
        defaultItem: "Featured Works",
      },
    },
    {
      type: "object",
      label: "Feature Items",
      name: "featured",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultWork,
        },
      },
      fields: [
        {
          type: "string",
          label: "title",
          name: "title",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
        {
          type: "datetime",
          label: "Date",
          name: "date",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
          // @ts-ignore
          uploadDir: () => "work",
        },
      ],
    },
  ],
};
