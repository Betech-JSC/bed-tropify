const Hamburger: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={22}
    height={20}
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 0.5C0 0.223858 0.223858 0 0.5 0H9.5C9.77614 0 10 0.223858 10 0.5V0.5C10 0.776142 9.77614 1 9.5 1H0.5C0.223858 1 0 0.776142 0 0.5V0.5Z"
      fill="#70BD2D"
    />
    <rect x="2" y="4" width="8" height="1" rx="0.5" fill="#70BD2D" />
    <rect y="8" width="10" height="1" rx="0.5" fill="#70BD2D" />
  </svg>
);

export default Hamburger;
