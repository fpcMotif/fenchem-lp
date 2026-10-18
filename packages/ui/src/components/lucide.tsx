import { createMemo, omit, type Component } from "solid-js";
import type { JSX } from "@solidjs/web";
import * as icons from "lucide";
import type { IconNode } from "lucide";

export type LucideProps = Omit<JSX.SvgSVGAttributes<SVGSVGElement>, "color"> & {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
};
export type LucideIcon = Component<LucideProps>;

const VIEWBOX_SIZE = 24;
const DEFAULT_STROKE_WIDTH = 2;
const OWN_PROPS = [
  "size",
  "color",
  "strokeWidth",
  "absoluteStrokeWidth",
  "nonScalingStroke",
  "class",
  "children",
] as const;

const escapeAttribute = (value: unknown) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const kebab = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Za-z])(\d)/g, "$1-$2")
    .toLowerCase();

function childMarkup(node: IconNode, nonScalingStroke: boolean) {
  return node
    .map(([tag, attrs]) => {
      const all = nonScalingStroke ? { "vector-effect": "non-scaling-stroke", ...attrs } : attrs;
      const serialized = Object.entries(all)
        .map(([name, value]) => ` ${name}="${escapeAttribute(value)}"`)
        .join("");
      return `<${tag}${serialized}></${tag}>`;
    })
    .join("");
}

const hasA11yProp = (props: object) =>
  Object.keys(props).some(
    (name) => name.startsWith("aria-") || name === "role" || name === "title",
  );

function createIcon(name: string, node: IconNode): LucideIcon {
  const iconClasses = ["lucide", `lucide-${kebab(name)}`];
  return (props) => {
    const rest = omit(props, ...OWN_PROPS);
    const size = () => props.size ?? VIEWBOX_SIZE;
    const strokeWidth = () =>
      props.absoluteStrokeWidth
        ? (Number(props.strokeWidth ?? DEFAULT_STROKE_WIDTH) * VIEWBOX_SIZE) / Number(size())
        : (props.strokeWidth ?? DEFAULT_STROKE_WIDTH);
    const children = createMemo(() => childMarkup(node, props.nonScalingStroke ?? false));
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size()}
        height={size()}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        fill="none"
        stroke={props.color ?? "currentColor"}
        stroke-width={strokeWidth()}
        stroke-linecap="round"
        stroke-linejoin="round"
        class={[...iconClasses, props.class]}
        aria-hidden={hasA11yProp(rest) || props.children ? undefined : "true"}
        {...rest}
        innerHTML={children()}
      />
    );
  };
}

export const ArrowDown = createIcon("ArrowDown", icons.ArrowDown);
export const ArrowDownRight = createIcon("ArrowDownRight", icons.ArrowDownRight);
export const ArrowLeft = createIcon("ArrowLeft", icons.ArrowLeft);
export const ArrowLeftRight = createIcon("ArrowLeftRight", icons.ArrowLeftRight);
export const ArrowRight = createIcon("ArrowRight", icons.ArrowRight);
export const ArrowUp = createIcon("ArrowUp", icons.ArrowUp);
export const ArrowUpRight = createIcon("ArrowUpRight", icons.ArrowUpRight);
export const Award = createIcon("Award", icons.Award);
export const Check = createIcon("Check", icons.Check);
export const CheckCircle2 = createIcon("CircleCheck", icons.CircleCheck);
export const ChevronDown = createIcon("ChevronDown", icons.ChevronDown);
export const ChevronLeft = createIcon("ChevronLeft", icons.ChevronLeft);
export const ChevronRight = createIcon("ChevronRight", icons.ChevronRight);
export const ChevronUp = createIcon("ChevronUp", icons.ChevronUp);
export const ChevronsDown = createIcon("ChevronsDown", icons.ChevronsDown);
export const ChevronsDownUp = createIcon("ChevronsDownUp", icons.ChevronsDownUp);
export const ChevronsUpDown = createIcon("ChevronsUpDown", icons.ChevronsUpDown);
export const CircleCheck = CheckCircle2;
export const Clock = createIcon("Clock", icons.Clock);
export const Copy = createIcon("Copy", icons.Copy);
export const CornerDownRight = createIcon("CornerDownRight", icons.CornerDownRight);
export const Download = createIcon("Download", icons.Download);
export const Factory = createIcon("Factory", icons.Factory);
export const FileDown = createIcon("FileDown", icons.FileDown);
export const FlaskConical = createIcon("FlaskConical", icons.FlaskConical);
export const Globe = createIcon("Globe", icons.Globe);
export const Globe2 = createIcon("Earth", icons.Earth);
export const Info = createIcon("Info", icons.Info);
export const Leaf = createIcon("Leaf", icons.Leaf);
export const Lightbulb = createIcon("Lightbulb", icons.Lightbulb);
export const ListFilter = createIcon("ListFilter", icons.ListFilter);
export const ListTree = createIcon("ListTree", icons.ListTree);
export const Loader2 = createIcon("LoaderCircle", icons.LoaderCircle);
export const Mail = createIcon("Mail", icons.Mail);
export const MapPin = createIcon("MapPin", icons.MapPin);
export const Menu = createIcon("Menu", icons.Menu);
export const Minus = createIcon("Minus", icons.Minus);
export const OctagonX = createIcon("OctagonX", icons.OctagonX);
export const Pause = createIcon("Pause", icons.Pause);
export const Phone = createIcon("Phone", icons.Phone);
export const Play = createIcon("Play", icons.Play);
export const Plus = createIcon("Plus", icons.Plus);
export const Recycle = createIcon("Recycle", icons.Recycle);
export const Search = createIcon("Search", icons.Search);
export const Shield = createIcon("Shield", icons.Shield);
export const ShieldCheck = createIcon("ShieldCheck", icons.ShieldCheck);
export const Sprout = createIcon("Sprout", icons.Sprout);
export const Trash2 = createIcon("Trash2", icons.Trash2);
export const TriangleAlert = createIcon("TriangleAlert", icons.TriangleAlert);
export const Truck = createIcon("Truck", icons.Truck);
export const Users = createIcon("Users", icons.Users);
export const X = createIcon("X", icons.X);
