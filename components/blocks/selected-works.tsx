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

export const SelectedWorks = ({ data }: { data: PageBlocksFeatured }) => {
  return (
    <Section background={data.background!} className="py-6">
      <div>
        <h2
          className="text-title max-w-xs text-7xl font-semibold mb-8"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h2>
      </div>
      <div className="flex flex-col gap-8">
        {data.featured?.map((featured, key) => (
          <WorkCard key={`${featured!.title}-${key}`} featured={featured!} />
        ))}
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
    <Card className="rounded-none border-none outline-0 p-0 shadow-none w-fit">
      <CardContent className="p-0 gap-2">
        <div className="relative h-64">
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
          <p data-tina-field={tinaField(featured, "date")}>
            {dateFormatter(featured.date!)}
          </p>
        </div>
      </CardContent>
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
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
      ui: {
        defaultItem: "Feautured works",
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
