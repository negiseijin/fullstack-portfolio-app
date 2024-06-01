import ReactLogo from "@/assets/react.svg";
import ViteLogo from "/public/vite.svg";

const ICON = {
  ReactLogo: ReactLogo,
  ViteLogo: ViteLogo,
} as const satisfies Record<string, React.FC<React.SVGProps<SVGElement>>>;

type Name = keyof typeof ICON;

type Props = {
  name: Name;
  size?: number;
  className?: string;
  ariaLabel: string;
};

const DEFAULT_SIZE = 24;

export function Icon({
  name,
  size = DEFAULT_SIZE,
  className,
  ariaLabel,
}: Props) {
  const SvgComponent = ICON[name];

  return (
    <SvgComponent
      style={{ height: `${size}px`, width: `${size}px` }}
      className={className}
      aria-label={ariaLabel}
    />
  );
}
