import {
  MetadataSidebarBlock,
  MetadataSidebarBlockItem,
} from "@/components/MetadataSidebarBlock";

import { github } from "@/icons/github";
import { document } from "@/icons/document";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProviderVersionDataQuery } from "../query";
import { useProviderParams } from "../hooks/useProviderParams";
import { definitions } from "@/api";

function getLinkLabel(url: string) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);

  if (!match) {
    return null;
  }

  return `${match[1]}/${match[2]}`;
}

interface BlockProps {
  license?: definitions["LicenseList"];
  link?: string | undefined;
}

function Block(props: BlockProps) {
  return (
    <MetadataSidebarBlock title="Repository">
      <MetadataSidebarBlockItem icon={document} title="License">
        {props.license ? (
          props.license.map((license) => (
            <a
              href={license.link}
              key={license.spdx}
              className="underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              {license.spdx}
            </a>
          ))
        ) : (
          <span className="flex h-em w-24 animate-pulse bg-gray-500/25" />
        )}
      </MetadataSidebarBlockItem>
      <MetadataSidebarBlockItem icon={github} title="GitHub">
        {props.link ? (
          <a
            href={props.link}
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            {getLinkLabel(props.link)}
          </a>
        ) : (
          <span className="flex h-em w-32 animate-pulse bg-gray-500/25" />
        )}
      </MetadataSidebarBlockItem>
    </MetadataSidebarBlock>
  );
}

export function ProviderMetadataSidebarBlock() {
  const { namespace, provider, version } = useProviderParams();

  const { data } = useSuspenseQuery(
    getProviderVersionDataQuery(namespace, provider, version),
  );

  return <Block license={data.license} link={data.link} />;
}

export function ProviderMetadataSidebarBlockSkeleton() {
  return <Block />;
}
