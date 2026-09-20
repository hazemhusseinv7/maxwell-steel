import { cn } from "@/lib/utils";

interface RealEstateCoverSvgProps {
  className?: string;
  variant?: "default" | "series";
}

export function RealEstateCoverSvg({
  className,
  variant = "default",
}: RealEstateCoverSvgProps) {
  const isSeries = variant === "series";
  const idPrefix = isSeries ? "ser" : "pst";

  // Blog posts: Architectural bronze and gold with warm desert sand undertones
  // Series: Visual identity navy accent palette (var(--accent) and var(--accent-hover))
  const primaryStroke = isSeries ? "var(--accent)" : "#845f20";
  const secondaryStroke = isSeries
    ? "color-mix(in oklab, var(--accent) 80%, white)"
    : "#c59b27";

  return (
    <svg
      viewBox="0 0 800 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn("pointer-events-none size-full select-none", className)}
    >
      <defs>
        {/* Sky Background Gradient: Brand accent-soft wash for series, warm sand palette for posts */}
        <linearGradient
          id={`${idPrefix}SandSkyGrad`}
          x1="400"
          y1="0"
          x2="400"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          {isSeries ? (
            <>
              <stop
                offset="0%"
                stopColor="color-mix(in oklab, var(--accent) 6%, var(--background))"
              />
              <stop
                offset="35%"
                stopColor="color-mix(in oklab, var(--accent) 10%, var(--background))"
              />
              <stop
                offset="70%"
                stopColor="color-mix(in oklab, var(--accent) 15%, var(--background))"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in oklab, var(--accent) 20%, var(--background))"
              />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#f3ebd9" />
              <stop offset="35%" stopColor="#ede0c7" />
              <stop offset="70%" stopColor="#e5d4b5" />
              <stop offset="100%" stopColor="#dcbe96" />
            </>
          )}
        </linearGradient>

        {/* Ambient Radial Lighting: Brand accent radial glow for series, gold/bronze for posts */}
        <radialGradient
          id={`${idPrefix}BrandAccentGlow`}
          cx="400"
          cy="200"
          r="260"
          gradientUnits="userSpaceOnUse"
        >
          {isSeries ? (
            <>
              <stop
                offset="0%"
                stopColor="color-mix(in oklab, var(--accent) 22%, transparent)"
              />
              <stop
                offset="50%"
                stopColor="color-mix(in oklab, var(--accent) 12%, transparent)"
              />
              <stop
                offset="85%"
                stopColor="color-mix(in oklab, var(--accent) 4%, transparent)"
              />
              <stop offset="100%" stopColor="transparent" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#c59b27" stopOpacity="0.38" />
              <stop offset="45%" stopColor="#845f20" stopOpacity="0.22" />
              <stop offset="85%" stopColor="#845f20" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#845f20" stopOpacity="0" />
            </>
          )}
        </radialGradient>

        <radialGradient
          id={`${idPrefix}CenterPaperGlow`}
          cx="400"
          cy="200"
          r="190"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={
              isSeries
                ? "color-mix(in oklab, var(--accent) 8%, var(--surface))"
                : "#fdfbf6"
            }
            stopOpacity="0.75"
          />
          <stop
            offset="70%"
            stopColor={
              isSeries
                ? "color-mix(in oklab, var(--accent) 4%, var(--surface))"
                : "#f7efe0"
            }
            stopOpacity="0.3"
          />
          <stop
            offset="100%"
            stopColor={
              isSeries
                ? "color-mix(in oklab, var(--accent) 12%, var(--background))"
                : "#ede1cd"
            }
            stopOpacity="0"
          />
        </radialGradient>

        {/* Skyline Fills */}
        <linearGradient
          id={`${idPrefix}BgSkylineGrad`}
          x1="0"
          y1="130"
          x2="0"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          {isSeries ? (
            <>
              <stop
                offset="0%"
                stopColor="color-mix(in oklab, var(--accent) 18%, var(--background))"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in oklab, var(--accent) 26%, var(--background))"
              />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#d9c8a9" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#cbb38d" stopOpacity="0.9" />
            </>
          )}
        </linearGradient>

        <linearGradient
          id={`${idPrefix}MidTowerGrad1`}
          x1="0"
          y1="100"
          x2="0"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          {isSeries ? (
            <>
              <stop
                offset="0%"
                stopColor="color-mix(in oklab, var(--accent) 12%, var(--surface))"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in oklab, var(--accent) 22%, var(--background))"
              />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#eddab8" />
              <stop offset="100%" stopColor="#d9be94" />
            </>
          )}
        </linearGradient>

        <linearGradient
          id={`${idPrefix}MidTowerGrad2`}
          x1="0"
          y1="140"
          x2="0"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          {isSeries ? (
            <>
              <stop
                offset="0%"
                stopColor="color-mix(in oklab, var(--accent) 10%, var(--surface))"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in oklab, var(--accent) 20%, var(--background))"
              />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#e8d5b1" />
              <stop offset="100%" stopColor="#d1b686" />
            </>
          )}
        </linearGradient>

        <linearGradient
          id={`${idPrefix}VillaGrad`}
          x1="0"
          y1="210"
          x2="0"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          {isSeries ? (
            <>
              <stop
                offset="0%"
                stopColor="color-mix(in oklab, var(--accent) 6%, var(--surface))"
              />
              <stop
                offset="50%"
                stopColor="color-mix(in oklab, var(--accent) 12%, var(--surface))"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in oklab, var(--accent) 18%, var(--background))"
              />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#faf4e8" />
              <stop offset="50%" stopColor="#eddab8" />
              <stop offset="100%" stopColor="#e1c89f" />
            </>
          )}
        </linearGradient>

        <linearGradient
          id={`${idPrefix}DividerGrad`}
          x1="0"
          y1="0"
          x2="800"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          {isSeries ? (
            <>
              <stop offset="0%" stopColor="transparent" />
              <stop offset="25%" stopColor="var(--accent)" />
              <stop
                offset="50%"
                stopColor="color-mix(in oklab, var(--accent) 80%, white)"
              />
              <stop offset="75%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="transparent" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#845f20" stopOpacity="0" />
              <stop offset="20%" stopColor="#c59b27" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#e5be58" stopOpacity="1" />
              <stop offset="80%" stopColor="#c59b27" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#845f20" stopOpacity="0" />
            </>
          )}
        </linearGradient>

        <linearGradient
          id={`${idPrefix}GroundGrad`}
          x1="400"
          y1="380"
          x2="400"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          {isSeries ? (
            <>
              <stop
                offset="0%"
                stopColor="color-mix(in oklab, var(--accent) 22%, var(--background))"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in oklab, var(--accent) 28%, var(--background))"
              />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#d3b98c" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#c2a26f" stopOpacity="1" />
            </>
          )}
        </linearGradient>

        {/* Blueprint CAD Grid */}
        <pattern
          id={`${idPrefix}CadGrid`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={isSeries ? "var(--accent)" : "#845f20"}
            strokeWidth="0.5"
            strokeOpacity={isSeries ? 0.18 : 0.22}
          />
          <circle
            cx="0"
            cy="0"
            r="0.8"
            fill={isSeries ? "var(--accent)" : "#c59b27"}
            fillOpacity={isSeries ? 0.3 : 0.3}
          />
        </pattern>

        {/* Isometric Grid */}
        <pattern
          id={`${idPrefix}IsoGrid`}
          width="60"
          height="34.64"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 17.32 L 30 0 L 60 17.32 L 30 34.64 Z"
            fill="none"
            stroke={isSeries ? "var(--accent)" : "#845f20"}
            strokeWidth="0.5"
            strokeOpacity={isSeries ? 0.14 : 0.18}
          />
        </pattern>
      </defs>

      {/* Base Sky & Brand Accent Glows */}
      <rect width="800" height="450" fill={`url(#${idPrefix}SandSkyGrad)`} />
      <rect
        width="800"
        height="450"
        fill={`url(#${idPrefix}BrandAccentGlow)`}
      />
      <rect
        width="800"
        height="450"
        fill={`url(#${idPrefix}CenterPaperGlow)`}
      />

      {/* Blueprint Grid & Technical Drafting Underlay */}
      <rect width="800" height="450" fill={`url(#${idPrefix}CadGrid)`} />
      <rect
        y="170"
        width="800"
        height="280"
        fill={`url(#${idPrefix}IsoGrid)`}
      />

      {/* Brand Logo Watermark Emblem floating in open sky */}
      <svg
        x="350"
        y="28"
        width="100"
        height="85"
        viewBox="0 0 135.47 115.1"
        aria-hidden="true"
      >
        <g fill={isSeries ? "var(--accent)" : "#845f20"} fillOpacity={0.2}>
          <path d="M27.798 0h18.206l19.38 21.729-18.793 18.206v22.904h-18.793z" />
          <path d="M107.669 0h-18.206l-19.381 21.729 18.793 18.206v22.904h18.794z" />
          <path d="M63.094 63.309v-14.565q0-1.175 1.174-1.174h8.457q1.175 0 1.175 1.174v14.565z" />
          <path d="M0.109 110.959c0.169-0.392 3.101-7.796 3.607-9.107 0.234-0.598 0.762-1.948 1.17-2.992 0.408-1.045 0.985-2.519 1.278-3.287 0.294-0.762 0.86-2.225 1.262-3.247 1.589-4.053 3.145-8.019 3.33-8.52l0.206-0.533 3.422-0.017c1.882-0.006 3.574-0.016 3.765-0.022h0.348l1.371 3.504c0.751 1.926 1.877 4.804 2.498 6.387 0.615 1.583 1.98 5.065 3.03 7.736 1.045 2.671 2.182 5.576 2.524 6.458 0.348 0.881 0.827 2.095 1.061 2.688 0.234 0.598 0.43 1.115 0.43 1.153 0 0.038-1.643 0.065-4.189 0.066h-4.189l-3.096-9.32c-2.187-6.588-3.134-9.336-3.21-9.352-0.114-0.022-0.506 1.061-2.91 8.161-0.724 2.144-1.817 5.386-2.432 7.186l-1.116 3.286-4.14 0.022-4.129 0.017 0.114-0.272z" />
          <path d="M49.992 113.124c-0.985-1.181-1.692-1.969-1.768-1.969-0.071 0-0.256 0.049-0.403 0.109-0.446 0.174-1.605 0.452-2.464 0.593-1.11 0.185-3.34 0.185-4.45 0-3.319-0.539-6.05-1.817-8.254-3.868-3.199-2.97-4.913-7.377-4.57-11.703 0.19-2.334 0.811-4.374 1.926-6.311 2.182-3.819 5.827-6.311 10.424-7.143 1.191-0.218 3.797-0.272 4.973-0.103 6.866 0.963 11.73 5.642 12.883 12.409 0.185 1.028 0.185 3.291 0 4.38-0.359 2.203-1.17 4.292-2.312 5.99-0.424 0.626-1.289 1.681-1.774 2.143-0.185 0.174-0.337 0.348-0.337 0.386 0 0.038 0.305 0.43 0.68 0.882 0.365 0.452 1.132 1.393 1.692 2.089 0.56 0.691 1.512 1.855 2.111 2.584 0.598 0.724 1.115 1.366 1.158 1.415 0.049 0.065-0.74 0.087-3.906 0.087h-3.971z m-4.782-8.639c1.268-0.381 2.334-1.006 3.204-1.899 2.399-2.459 2.818-6.224 1.012-9.27-0.484-0.811-1.67-2.002-2.475-2.465-3.096-1.812-7.219-1.061-9.417 1.714-1.094 1.387-1.638 2.965-1.638 4.76 0 3.569 2.356 6.501 5.838 7.269 0.936 0.207 2.568 0.152 3.465-0.109z" />
          <path d="M62.092 111.166c-0.065-0.234-0.022-27.735 0.038-27.801 0.038-0.027 3.019-0.06 6.642-0.06h6.583l0.936 0.207c4.037 0.87 6.501 2.911 7.649 6.344 0.511 1.523 0.664 3.411 0.392 4.912-0.446 2.486-1.866 4.662-3.917 6.001-0.277 0.174-0.495 0.348-0.495 0.381 0 0.049 1.006 1.888 4.662 8.509l0.882 1.605-4.211 0.022-4.217 0.016-0.108-0.152c-0.06-0.087-0.903-1.714-1.883-3.618-0.979-1.899-1.926-3.743-2.116-4.097l-0.343-0.636-1.24-0.022c-0.685-0.006-1.311 0-1.404 0.022l-0.168 0.038v4.232 4.233h-3.825c-3.618 0-3.825-0.006-3.852-0.131z m12.202-14.885c0.647-0.239 1.012-0.452 1.393-0.805 1.083-1.006 1.24-2.862 0.359-4.141-0.277-0.413-0.658-0.691-1.235-0.914-0.468-0.174-0.539-0.185-2.758-0.212l-2.285-0.027v3.156 3.155l2.067-0.027c1.839-0.027 2.1-0.049 2.459-0.185z" />
          <path d="M85.904 111.16c0-0.038 0.392-1.045 0.871-2.247 1.001-2.513 2.666-6.708 3.678-9.292 2.247-5.723 2.465-6.289 4.194-10.658 0.571-1.425 1.306-3.297 1.649-4.162l0.62-1.566h3.781 3.781l0.702 1.79c0.386 0.985 1.311 3.33 2.056 5.217 2.002 5.065 5.103 12.943 5.707 14.488 0.658 1.681 2.323 5.854 2.476 6.224l0.114 0.272h-4.173-4.183l-0.838-2.443-0.838-2.443-4.837 0.017c-4.151 0.022-4.847 0.038-4.907 0.13-0.049 0.082-0.914 2.503-1.61 4.51l-0.082 0.234h-4.08c-2.372 0-4.08-0.027-4.081-0.065z m17.644-10.641c-0.022-0.071-0.468-1.344-0.985-2.835-0.528-1.48-1.148-3.253-1.387-3.938-0.424-1.213-0.582-1.469-0.708-1.154-0.087 0.218-2.737 7.987-2.736 8.019 0 0.016 1.322 0.027 2.927 0.027 2.758 0 2.927-0.006 2.889-0.125z" />
          <path d="M120.353 100.905c0-5.712-0.022-10.446-0.043-10.511-0.038-0.103-0.424-0.114-3.613-0.114h-3.569l0.017-3.52 0.021-3.525 11.153-0.022 11.148-0.017v3.542 3.542h-3.673c-2.758 0-3.694 0.022-3.759 0.087-0.065 0.065-0.087 2.503-0.087 10.511v10.423h-3.797-3.798v-10.391z" />
        </g>
      </svg>

      {/* Vanishing Guidelines */}
      <g
        stroke={isSeries ? "var(--accent)" : "#845f20"}
        strokeWidth="0.6"
        strokeOpacity={isSeries ? 0.25 : 0.35}
        strokeDasharray="3 4"
      >
        <line x1="400" y1="230" x2="0" y2="450" />
        <line x1="400" y1="230" x2="160" y2="450" />
        <line x1="400" y1="230" x2="640" y2="450" />
        <line x1="400" y1="230" x2="800" y2="450" />
        <line x1="400" y1="230" x2="0" y2="350" />
        <line x1="400" y1="230" x2="800" y2="350" />
      </g>

      {/* Background Skyline Tier */}
      <g
        fill={`url(#${idPrefix}BgSkylineGrad)`}
        stroke={primaryStroke}
        strokeWidth="0.6"
        strokeOpacity={isSeries ? 0.5 : 0.4}
      >
        {/* Iconic Landmark Tower (Kingdom Skybridge Parabolic Silhouette) */}
        <g>
          {/* Main Tower Soaring Mass with Continuous Graceful Inward Curve */}
          <path d="M 58 450 V 250 C 58 195 62 165 65 142 H 85 C 88 165 92 195 92 250 V 450 Z" />
          {/* Inverted Parabolic Arch Opening Cutout revealing Sky */}
          <path
            d="M 68 150 H 82 C 80 174 78 196 75 212 C 72 196 70 174 68 150 Z"
            fill={`url(#${idPrefix}SandSkyGrad)`}
            stroke={primaryStroke}
            strokeWidth="0.8"
          />
          {/* Top Skybridge Structure */}
          <rect
            x="65"
            y="142"
            width="20"
            height="8"
            fill={secondaryStroke}
            fillOpacity="0.35"
            stroke={secondaryStroke}
            strokeWidth="0.8"
          />
          <line
            x1="64"
            y1="142"
            x2="86"
            y2="142"
            stroke={secondaryStroke}
            strokeWidth="1.5"
          />
          {/* Skybridge Illuminated Observation Window */}
          <rect
            x="68"
            y="144"
            width="14"
            height="4"
            fill={secondaryStroke}
            fillOpacity={0.75}
          />
          {/* Vertical Glass Curtain Wall Mullions running along the flanks */}
          <line
            x1="62"
            y1="250"
            x2="62"
            y2="450"
            stroke={primaryStroke}
            strokeWidth="0.6"
            strokeOpacity="0.4"
          />
          <line
            x1="88"
            y1="250"
            x2="88"
            y2="450"
            stroke={primaryStroke}
            strokeWidth="0.6"
            strokeOpacity="0.4"
          />
          {/* Central Structural Spine below Arch */}
          <line
            x1="75"
            y1="212"
            x2="75"
            y2="450"
            stroke={primaryStroke}
            strokeWidth="0.6"
            strokeOpacity="0.3"
            strokeDasharray="4 3"
          />
          {/* Subtle Horizontal Floor Line Accents */}
          <line
            x1="58"
            y1="270"
            x2="92"
            y2="270"
            stroke={primaryStroke}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <line
            x1="58"
            y1="310"
            x2="92"
            y2="310"
            stroke={primaryStroke}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <line
            x1="58"
            y1="350"
            x2="92"
            y2="350"
            stroke={primaryStroke}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <line
            x1="58"
            y1="390"
            x2="92"
            y2="390"
            stroke={primaryStroke}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        </g>

        {/* Distant Tower 2 */}
        <rect x="105" y="195" width="48" height="255" />
        {/* Stepped Highrise */}
        <path d="M 170 450 V 210 H 185 V 175 H 205 V 150 H 220 V 450 Z" />
        {/* Center-Left Slanted Tower */}
        <path d="M 240 450 V 160 L 290 195 V 450 Z" />
        {/* Far Center Tower with Spire */}
        <path d="M 365 450 V 140 H 435 V 450 Z" />
        <line
          x1="400"
          y1="140"
          x2="400"
          y2="120"
          stroke={secondaryStroke}
          strokeWidth="1"
          strokeOpacity="0.7"
        />
        {/* Center-Right Tower with Crown */}
        <path d="M 480 450 V 170 L 515 145 L 550 170 V 450 Z" />
        {/* Distant Right Towers */}
        <rect x="580" y="200" width="55" height="250" />
        <path d="M 655 450 V 180 H 685 V 155 H 710 V 450 Z" />
        <path d="M 725 450 V 215 L 750 190 V 450 Z" />
      </g>

      {/* Midground Layer: Modern Commercial & Office Towers */}
      <g>
        {/* Left Mid-Rise Tower */}
        <rect
          x="30"
          y="250"
          width="85"
          height="200"
          fill={`url(#${idPrefix}MidTowerGrad1)`}
          stroke={primaryStroke}
          strokeWidth="1"
          strokeOpacity={isSeries ? 0.7 : 0.65}
        />
        {/* Window Grid */}
        <g fill={primaryStroke} fillOpacity={0.25}>
          <rect x="42" y="270" width="12" height="6" />
          <rect x="62" y="270" width="12" height="6" />
          <rect x="82" y="270" width="12" height="6" />
          <rect x="42" y="286" width="12" height="6" />
          <rect
            x="62"
            y="286"
            width="12"
            height="6"
            fill={secondaryStroke}
            fillOpacity={0.5}
          />
          <rect x="82" y="286" width="12" height="6" />
          <rect x="42" y="302" width="12" height="6" />
          <rect x="62" y="302" width="12" height="6" />
          <rect
            x="82"
            y="302"
            width="12"
            height="6"
            fill={secondaryStroke}
            fillOpacity={0.5}
          />
          <rect x="42" y="318" width="12" height="6" />
          <rect x="62" y="318" width="12" height="6" />
          <rect x="82" y="318" width="12" height="6" />
        </g>

        {/* Left Architectural Cantilever High-Rise */}
        <path
          d="M 130 450 V 230 H 215 V 275 H 225 V 450 Z"
          fill={`url(#${idPrefix}MidTowerGrad2)`}
          stroke={primaryStroke}
          strokeWidth="1.1"
          strokeOpacity={isSeries ? 0.75 : 0.75}
        />
        {/* Glass Curtain Wall Vertical Mullions */}
        <g stroke={primaryStroke} strokeWidth="0.75" strokeOpacity="0.45">
          <line x1="145" y1="230" x2="145" y2="450" />
          <line x1="160" y1="230" x2="160" y2="450" />
          <line x1="175" y1="230" x2="175" y2="450" />
          <line x1="190" y1="230" x2="190" y2="450" />
          <line x1="205" y1="230" x2="205" y2="450" />
        </g>

        {/* Right High-Rise Modern Office Complex */}
        <path
          d="M 590 450 V 220 H 680 V 450 Z"
          fill={`url(#${idPrefix}MidTowerGrad1)`}
          stroke={primaryStroke}
          strokeWidth="1"
          strokeOpacity={isSeries ? 0.7 : 0.65}
        />
        {/* Right Complex Window Grid */}
        <g fill={primaryStroke} fillOpacity={0.28}>
          <rect
            x="605"
            y="240"
            width="15"
            height="8"
            fill={secondaryStroke}
            fillOpacity={0.5}
          />
          <rect x="630" y="240" width="15" height="8" />
          <rect x="655" y="240" width="15" height="8" />
          <rect x="605" y="260" width="15" height="8" />
          <rect
            x="630"
            y="260"
            width="15"
            height="8"
            fill={secondaryStroke}
            fillOpacity={0.5}
          />
          <rect x="655" y="260" width="15" height="8" />
          <rect x="605" y="280" width="15" height="8" />
          <rect x="630" y="280" width="15" height="8" />
          <rect
            x="655"
            y="280"
            width="15"
            height="8"
            fill={secondaryStroke}
            fillOpacity={0.5}
          />
        </g>

        {/* Far Right Corner Building */}
        <path
          d="M 700 450 V 260 H 775 V 450 Z"
          fill={`url(#${idPrefix}MidTowerGrad2)`}
          stroke={primaryStroke}
          strokeWidth="1"
          strokeOpacity={isSeries ? 0.7 : 0.65}
        />
      </g>

      {/* Foreground Centerpiece: Luxury Contemporary Architecture */}
      <g>
        {/* Villa Upper Floor Cantilevered Volume */}
        <polygon
          points="250,290 550,290 550,335 250,335"
          fill={`url(#${idPrefix}VillaGrad)`}
          stroke={primaryStroke}
          strokeWidth="1.5"
        />

        {/* Roofline Parapet Accent Line */}
        <line
          x1="240"
          y1="290"
          x2="560"
          y2="290"
          stroke={secondaryStroke}
          strokeWidth="2"
        />

        {/* Balcony Railing Glass */}
        <rect
          x="260"
          y="300"
          width="280"
          height="28"
          fill={primaryStroke}
          fillOpacity={isSeries ? 0.12 : 0.14}
          stroke={primaryStroke}
          strokeWidth="0.85"
        />

        {/* Villa Balcony Vertical Louvers */}
        <g stroke={primaryStroke} strokeWidth="0.8" strokeOpacity="0.7">
          <line x1="295" y1="300" x2="295" y2="328" />
          <line x1="330" y1="300" x2="330" y2="328" />
          <line x1="365" y1="300" x2="365" y2="328" />
          <line x1="400" y1="300" x2="400" y2="328" />
          <line x1="435" y1="300" x2="435" y2="328" />
          <line x1="470" y1="300" x2="470" y2="328" />
          <line x1="505" y1="300" x2="505" y2="328" />
        </g>

        {/* Interior Warm Illumination through Floor-to-Ceiling Glass */}
        <rect
          x="270"
          y="304"
          width="38"
          height="20"
          fill={secondaryStroke}
          fillOpacity="0.55"
        />
        <rect
          x="420"
          y="304"
          width="48"
          height="20"
          fill={secondaryStroke}
          fillOpacity="0.6"
        />
        <rect
          x="490"
          y="304"
          width="35"
          height="20"
          fill={secondaryStroke}
          fillOpacity="0.45"
        />

        {/* Villa Ground Floor Structure */}
        <polygon
          points="220,335 580,335 580,410 220,410"
          fill={
            isSeries
              ? "color-mix(in oklab, var(--accent) 14%, var(--background))"
              : "#ebd8b6"
          }
          stroke={primaryStroke}
          strokeWidth="1.25"
        />

        {/* Entrance Portal */}
        <rect
          x="360"
          y="335"
          width="80"
          height="75"
          fill={
            isSeries
              ? "color-mix(in oklab, var(--accent) 18%, var(--background))"
              : "#dec8a2"
          }
          stroke={primaryStroke}
          strokeWidth="1"
        />
        {/* Doorway Warm Glow */}
        <rect
          x="382"
          y="352"
          width="36"
          height="58"
          fill={secondaryStroke}
          fillOpacity="0.45"
          stroke={secondaryStroke}
          strokeWidth="1"
        />

        {/* Ground Floor Large Windows */}
        <rect
          x="240"
          y="348"
          width="100"
          height="52"
          fill={primaryStroke}
          fillOpacity="0.1"
          stroke={primaryStroke}
          strokeWidth="0.8"
        />
        <rect
          x="252"
          y="356"
          width="38"
          height="36"
          fill={secondaryStroke}
          fillOpacity="0.45"
        />
        <rect
          x="460"
          y="348"
          width="100"
          height="52"
          fill={primaryStroke}
          fillOpacity="0.1"
          stroke={primaryStroke}
          strokeWidth="0.8"
        />
        <rect
          x="475"
          y="356"
          width="45"
          height="36"
          fill={secondaryStroke}
          fillOpacity="0.5"
        />
      </g>

      {/* Ground Podium & Base */}
      <rect
        y="405"
        width="800"
        height="45"
        fill={`url(#${idPrefix}GroundGrad)`}
        stroke={primaryStroke}
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="405"
        x2="800"
        y2="405"
        stroke={`url(#${idPrefix}DividerGrad)`}
        strokeWidth="2"
      />
      <line
        x1="0"
        y1="418"
        x2="800"
        y2="418"
        stroke={primaryStroke}
        strokeWidth="0.75"
        strokeOpacity="0.45"
      />

      {/* Technical Surveying & Appraisal Blueprint Details */}
      <g stroke={primaryStroke} strokeWidth="0.85">
        {/* Top-Left Coordinate & Elevation Symbol */}
        <path d="M 40 35 H 85" />
        <path d="M 40 35 V 80" />
        <circle cx="40" cy="35" r="3" fill={primaryStroke} />
        {/* Top-Right Coordinate Marker */}
        <path d="M 760 35 H 715" />
        <path d="M 760 35 V 80" />
        <circle cx="760" cy="35" r="3" fill={primaryStroke} />

        {/* Architectural Crosshairs */}
        <g strokeWidth="1" stroke={primaryStroke}>
          {/* Left Crosshair */}
          <line x1="120" y1="90" x2="134" y2="90" />
          <line x1="127" y1="83" x2="127" y2="97" />
          {/* Right Crosshair */}
          <line x1="670" y1="90" x2="684" y2="90" />
          <line x1="677" y1="83" x2="677" y2="97" />
        </g>

        {/* Technical Elevation Dimension Line on Left */}
        <g stroke={primaryStroke} strokeOpacity="0.65" strokeWidth="0.75">
          <line x1="20" y1="210" x2="20" y2="405" />
          <line x1="14" y1="210" x2="26" y2="210" />
          <line x1="14" y1="405" x2="26" y2="405" />
          <line x1="16" y1="307" x2="24" y2="307" />
        </g>

        {/* Technical Dimension Line on Right */}
        <g stroke={primaryStroke} strokeOpacity="0.65" strokeWidth="0.75">
          <line x1="780" y1="180" x2="780" y2="405" />
          <line x1="774" y1="180" x2="786" y2="180" />
          <line x1="774" y1="405" x2="786" y2="405" />
        </g>

        {/* Technical Cadastral Arc */}
        <path
          d="M 680 340 A 40 40 0 0 0 720 380"
          fill="none"
          stroke={secondaryStroke}
          strokeDasharray="2 3"
          strokeWidth="0.8"
        />
        <circle cx="680" cy="340" r="1.8" fill={secondaryStroke} />
        <circle cx="720" cy="380" r="1.8" fill={secondaryStroke} />
      </g>

      {/* Corner Framing Markers */}
      <g stroke={primaryStroke} strokeWidth="1.25">
        <path d="M 30 420 H 60" />
        <path d="M 770 420 H 740" />
      </g>
    </svg>
  );
}
