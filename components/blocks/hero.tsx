"use client";
import * as React from "react";
import { type Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksHero } from "@/tina/__generated__/types";
import { Section, sectionBlockSchemaField } from "../layout/section";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { iconSchema } from "@/tina/fields/icon";
import { Icon } from "../icon";
import { Button } from "../ui/button";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  // Extract the background style logic into a more readable format
  let gradientStyle: React.CSSProperties | undefined = undefined;
  if (data.background) {
    const colorName = data.background
      .replace(/\/\d{1,2}$/, "")
      .split("-")
      .slice(1)
      .join("-");
    const opacity = data.background.match(/\/(\d{1,3})$/)?.[1] || "100";

    gradientStyle = {
      "--tw-gradient-to": `color-mix(in oklab, var(--color-${colorName}) ${opacity}%, transparent)`,
    } as React.CSSProperties;
  }

  return (
    <Section
      background={data.background!}
      className="m-0 p-0 max-w-full my-0"
      style={gradientStyle}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 md:sticky md:top-32"
          >
            <div className="space-y-8">
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
                Featured / 001
              </span>

              <h1
                data-tina-field={tinaField(data, "artist")}
                className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9] font-medium"
              >
                {data.artist}
              </h1>

              <div className="space-y-4 pt-4">
                <p
                  className="text-[13px] text-muted-foreground leading-relaxed max-w-md"
                  data-tina-field={tinaField(data, "description")}
                >
                  {data.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-8">
              {data.actions?.map((action, index) => {
                return (
                  <Button
                    key={index}
                    data-tina-field={tinaField(action, `label`)}
                    asChild
                    size="lg"
                    variant={action!.type === "link" ? "secondary" : "default"}
                    className="rounded-none p-4 text-base"
                  >
                    <Link href={action!.link!}>
                      {action?.icon && (
                        <Icon
                          data={action?.icon}
                          data-tina-field={tinaField(action, `icon`)}
                        />
                      )}
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] bg-secondary">
              <Image
                src={data.image!}
                alt={data.artist!}
                data-tina-field={tinaField(data, "image")}
                className="w-full h-full object-cover opacity-90"
                fill
              />

              {/* Info Tag */}
              <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm px-4 py-3 border border-foreground/20">
                <p className="text-[10px] tracking-[0.2em] uppercase">
                  <span data-tina-field={tinaField(data, "year")}>
                    {data.year}
                  </span>{" "}
                  /{" "}
                  <span data-tina-field={tinaField(data, "medium")}>
                    {data.medium}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      description:
        "Alpheus Mabetlela is a South African artist whose work explores the intersection of form, void, and material consciousness. Through his practice, Mabetlela delves into the relationship between physicality and spirituality, creating pieces that evoke a sense of introspection and contemplation.",
      artist: "Alpheus Mabetlela",
      year: "2023",
      medium: "Oil on Canvas",
      slug: "alpheus-mabetlela",
      image: "/artworks/alpheus-mabetlela.jpg",
      actions: [
        {
          label: "View Artwork",
          type: "button",
          link: "/artworks/",
        },
        {
          label: "Buy Now",
          type: "link",
          link: "/artworks/purchase",
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Artist",
      name: "artist",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "string",
      label: "Year",
      name: "year",
    },
    {
      type: "string",
      label: "Medium",
      name: "medium",
    },
    {
      type: "image",
      label: "Image",
      name: "image",
    },
    {
      type: "string",
      label: "Slug",
      name: "slug",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: {
            name: "Tina",
            color: "white",
            style: "float",
          },
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        iconSchema as any,
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
