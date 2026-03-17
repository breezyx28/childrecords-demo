import { SlashIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbsProps = {
  pages: { href: string; title: string }[];
};

export function DashBoardBreadcrumbs({ pages }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Map through pages array and create breadcrumbs */}
        {pages.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink
              href={item.href}
              className={
                index < pages.length - 1
                  ? "text-black text-[14px] font-[700] leading-[18.2px]"
                  : undefined
              }
            >
              {item.title}
            </BreadcrumbLink>
            {/* Add separator except for the last item */}
            {index < pages.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function BreadcrumbSeparator({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="">{children}</span>; // Use <span> for valid HTML
  // return <span className="mx-2">{children}</span>; // Use <span> for valid HTML
}
