type IconProps = {
    fill?: string;
    size?: string | number;
    height?: string | number;
    width?: string | number;
    label?: string;
  }
  
  export const ChartIcon: React.FC<IconProps> = ({
    fill,
    size,
    height,
    width,
    ...props
  }) => {
    return (
      <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3H3z">
        </path>
        <path
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.293 14.707a.999.999 0 0 0 1.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a.999.999 0 0 0-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z">
        </path>
      </svg>
    );
  };
