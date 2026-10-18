import { createMemo, omit, type Component } from "solid-js";
import type { JSX } from "@solidjs/web";
import {
  ArrowRight as arrowRight,
  ArrowUpRight as arrowUpRight,
  Check as check,
  ChevronDown as chevronDown,
  ChevronRight as chevronRight,
  CircleCheck as circleCheck,
  Clock as clock,
  Globe as globe,
  Lightbulb as lightbulb,
  Mail as mail,
  MapPin as mapPin,
  Menu as menu,
  Phone as phone,
  Plus as plus,
  Search as search,
  Shield as shield,
  Users as users,
  X as x,
  type IconNode,
} from "lucide";

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

function createIcon(name: string, node: IconNode, aliases: string[] = []): LucideIcon {
  const iconClasses = ["lucide", `lucide-${name}`, ...aliases.map((alias) => `lucide-${alias}`)];
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
        class={[...iconClasses, "lucide-icon", props.class]}
        aria-hidden={hasA11yProp(rest) || props.children ? undefined : "true"}
        {...rest}
        innerHTML={children()}
      />
    );
  };
}

export const ArrowRight = createIcon("arrow-right", arrowRight);
export const ArrowUpRight = createIcon("arrow-up-right", arrowUpRight);
export const Check = createIcon("check", check);
export const CheckCircle2 = createIcon("circle-check", circleCheck, ["check-circle-2"]);
export const ChevronDown = createIcon("chevron-down", chevronDown);
export const ChevronRight = createIcon("chevron-right", chevronRight);
export const Clock = createIcon("clock", clock);
export const Globe = createIcon("globe", globe);
export const Lightbulb = createIcon("lightbulb", lightbulb);
export const Mail = createIcon("mail", mail);
export const MapPin = createIcon("map-pin", mapPin);
export const Menu = createIcon("menu", menu);
export const Phone = createIcon("phone", phone);
export const Plus = createIcon("plus", plus);
export const Search = createIcon("search", search);
export const Shield = createIcon("shield", shield);
export const Users = createIcon("users", users);
export const X = createIcon("x", x);
