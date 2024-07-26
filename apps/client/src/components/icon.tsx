import ReactLogo from "@/assets/react.svg";
import ViteLogo from "/public/vite.svg";

const ICON = {
  ReactLogo: ReactLogo,
  ViteLogo: ViteLogo,
} as const satisfies Record<string, React.FC<React.SVGProps<SVGElement>>>;

type Name = keyof typeof ICON;

type Props = {
  name: Name;
} & Omit<React.SVGProps<SVGElement>, "aria-label"> &
  Required<Pick<React.SVGProps<SVGElement>, "aria-label">>;

const DEFAULT_SIZE = 24;

export function Icon({
  name,
  height = DEFAULT_SIZE,
  width = DEFAULT_SIZE,
  ...rest
}: Props) {
  const SvgComponent = ICON[name];

  return <SvgComponent height={height} width={width} {...rest} />;
}
