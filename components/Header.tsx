// Copyright 2022 the Deno authors. All rights reserved. MIT license.

/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";

import { apply, css, tw } from "@twind";
import * as Icons from "./Icons.tsx";
import { Head } from "$fresh/src/runtime/head.ts";

const entries = [
  { href: "/manual", content: "Manual" },
  {
    href: "https://doc.deno.land/deno/stable",
    content: "API",
  },
  { href: "/std", content: "Standard Library" },
  { href: "/x", content: "Third Party Modules" },
  { href: "https://deno.com/blog", content: "Blog" },
] as const;

export function Header({
  selected,
  main,
}: {
  selected?: (typeof entries)[number]["content"];
  main?: boolean;
}) {
  return (
    <div
      class={tw(
        !main
          ? "bg-primary border-b border-light-border backdrop-blur-3xl"
          : "",
      )}
    >
      <div class={tw`section-x-inset-xl py-5.5`}>
        <nav class={tw`flex justify-between flex-col lg:flex-row`}>
          <input
            type="checkbox"
            id="menuToggle"
            class={tw
              `hidden checked:siblings:flex checked:sibling:children:last-child:children:(first-child:hidden last-child:block)`}
            autoComplete="off"
          />

          <div
            class={tw
              `h-9 flex items-center justify-between select-none w-full lg:w-auto gap-3 md:gap-6 lg:gap-8`}
          >
            <a
              href="/"
              class={tw`h-8 w-8 block ${
                css({
                  "flex-shrink": "0",
                })
              }`}
            >
              <img class={tw`h-full w-full`} src="/logo.svg" alt="Deno Logo" />
            </a>

            {!main && <Search />}

            <label
              class={tw`lg:hidden checked:bg-red-100`}
              for="menuToggle"
            >
              <Icons.Menu />
              <Icons.Cross class={tw`hidden`} />
            </label>
          </div>

          <div
            class={tw
              `hidden flex-col mx-2 mt-5 gap-y-4 lg:(flex flex-row items-center mx-0 mt-0) font-medium`}
          >
            {entries.map(({ href, content }) => {
              return (
                <a
                  href={href}
                  class={tw
                    `lg:ml-4 px-2 rounded-md leading-loose hover:(bg-gray-100 text-main) ${apply
                      `${
                        content === selected
                          ? css({
                            "text-decoration-line": "underline",
                            "text-underline-offset": "6px",
                            "text-decoration-thickness": "2px",
                          })
                          : ""
                      } ${
                        content === selected ? "text-black" : "text-gray-500"
                      }`}`}
                >
                  {content}
                </a>
              );
            })}

            <a
              href="https://deno.com/deploy"
              class={tw
                `h-9 lg:ml-5 bg-secondary rounded-md px-4 flex items-center hover:bg-[#D5D7DB]`}
            >
              Deploy
            </a>

            <a
              href="https://github.com/denoland"
              class={tw`lg:ml-5 my-auto hidden lg:block`}
            >
              <span class={tw`sr-only`}>GitHub</span>
              <Icons.GitHub class="inline" />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

function Search() {
  // TODO: implement this properly with an island
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://DMFING7U5D-dsn.algolia.net"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
        />
      </Head>
      <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3" />
      <div id="search" class={tw`hidden`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        docsearch({
          container: "#search",
          appId: "DMFING7U5D",
          indexName: "deno_manual",
          apiKey: "577997f9f7a4b0100d359afde8065583",
          searchParameters: {
            distinct: 1,
          },
        });
      `,
        }}
      />

      <button
        class={tw
          `pl-4 w-80 bg-[#F3F3F3] flex-auto lg:flex-none rounded-md text-light focus:outline-none`}
        // @ts-ignore onClick does support strings
        onClick="document.querySelector('#search button').click()"
      >
        <div class={tw`flex items-center pointer-events-none`}>
          <Icons.MagnifyingGlass />
          {/*<input class={tw`ml-1.5 py-2.5 h-9 flex-auto bg-transparent placeholder:text-light text-default text-sm leading-4 font-medium appearance-none`} type="text" placeholder="Search..." />*/}
          <div
            class={tw
              `ml-1.5 py-2.5 h-9 flex-auto text-light text-sm leading-4 font-medium text-left`}
          >
            Search...
          </div>
          <div class={tw`mx-4`}>
            ⌘K
          </div>
        </div>
      </button>
    </>
  );
}
