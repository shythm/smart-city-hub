"use client";;
import { use } from "react";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const GeneralArticleEditorPage = dynamic(() => import("@pages/general-article-editor-page"), {
  ssr: false,
});

export default function BoardArticleEditor(props: { params: Promise<{ kind: string }> }) {
  const params = use(props.params);
  const router = useRouter();

  return (
    <GeneralArticleEditorPage
      kind={params.kind}
      afterSubmit={(article) => {
        router.push(`/news/${article.kind}/${article.id}`);
      }}
      afterDelete={(article) => {
        router.push(`/news/${article.kind}`);
      }}
    />
  );
}
