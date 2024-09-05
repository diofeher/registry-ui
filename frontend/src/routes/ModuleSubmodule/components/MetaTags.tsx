import { useSuspenseQuery } from "@tanstack/react-query";

import { MetaTags } from "@/components/MetaTags";
import { useModuleSubmoduleParams } from "../hooks/useModuleSubmoduleParams";
import { getModuleDataQuery } from "@/routes/Module/query";
import { Suspense } from "react";

interface ModuleMetaTagsProps {
  page?: string;
}

export function ModuleSubmoduleMetaTagsContent({ page }: ModuleMetaTagsProps) {
  const { namespace, name, target, version, isLatest, submodule } =
    useModuleSubmoduleParams();

  const { data } = useSuspenseQuery(
    getModuleDataQuery(namespace, name, target),
  );

  let title = `Submodule: ${submodule} - ${data.addr.namespace}/${data.addr.name}/${data.addr.target}`;

  if (!isLatest) {
    title = `${version} - ${title}`;
  }

  if (page) {
    title = `${page} - ${title}`;
  }

  return <MetaTags title={title} description={data.description} />;
}

export function ModuleSubmoduleMetaTags({ page }: ModuleMetaTagsProps) {
  return (
    <Suspense fallback={null}>
      <ModuleSubmoduleMetaTagsContent page={page} />
    </Suspense>
  );
}