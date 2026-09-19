import { cn } from "@/lib/utils";

export const LogoPattern = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-0 z-0 overflow-hidden",
      className,
    )}
  >
    <div
      className="h-full w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='56.7' viewBox='0 0 204.5 161' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(34.5,27.2)'%3E%3Cg fill='%23c4b294' fill-opacity='0.5'%3E%3Cpath d='M0 0H30.878L63.75 36.856 31.874 67.736V106.585H0Z'/%3E%3Cpath d='M135.472 0H104.592L71.718 36.856 103.594 67.736v38.849h31.878z'/%3E%3Cpath d='M59.866 107.382V82.678q0-1.993 1.991-1.992h14.344q1.993 0 1.993 1.992v24.704z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "72px 56.7px",
        backgroundRepeat: "repeat",
      }}
    />
  </div>
);
