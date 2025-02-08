import CountUp from "react-countup";

export const CountUpComponent = ({ value, title }: { value: number, title: string }) => {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="text-primary font-gotham text-[64px] font-[500]">
        <CountUp
          start={0}
          end={value}
          duration={1}
          separator="," />
        +
      </div>
      <span className="text-white font-mont-alter text-[20px] leading-[40px] text-center font-[500] italic">
        {title.split(" ").map((word, index) => (
          <span key={index} className="block break-words">{word}</span>
        ))}
      </span>
    </div>
  );
};


