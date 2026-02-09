"use client";
import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksHero } from "../../tina/__generated__/types";
import { Section, sectionBlockSchemaField } from "../layout/section";
import { TextEffect } from "../motion-primitives/text-effect";
import { Transition } from "motion/react";

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
      <div className="lg:mr-auto px-6 md:px-10 lg:px-14 h-[90vh] flex flex-col justify-center w-full">
        {data.title && (
          <div data-tina-field={tinaField(data, "title")}>
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 11rem)",
                letterSpacing: "-0.03em",
                lineHeight: "0.92",
              }}
              className="mt-8 sm:mb-10 mb-4 font-semibold md:mb-16 max-w-5xl "
            >
              {data.title!}
            </TextEffect>
          </div>
        )}
        {data.tagline && (
          <div data-tina-field={tinaField(data, "tagline")}>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="max-w-2xl text-gray-500 text-lg font-normal text-balance "
              style={{
                letterSpacing: "0.01em",
                lineHeight: "1.6",
              }}
            >
              {data.tagline!}
            </TextEffect>
          </div>
        )}
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
      tagline:
        "Exploring the intersection of form, void, and material consciousness",
      title: "ALpheus Mabetlela",
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
  ],
};
