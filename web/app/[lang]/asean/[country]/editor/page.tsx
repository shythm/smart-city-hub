"use client";;
import { use } from "react";

import { Locale } from "core/model";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const PrimaryArticleEditorPage = dynamic(() => import("@pages/primary-article-editor-page"), {
  ssr: false,
});

export default function AseanEditor(props: { params: Promise<{ lang: Locale; country: string }> }) {
  const params = use(props.params);
  const { lang, country } = params;
  const router = useRouter();

  return (
    <PrimaryArticleEditorPage
      lang={lang}
      kind={`asean-${country}`}
      afterSubmit={() => {
        router.push(`/asean/${country}`);
      }}
    />
  );
}
