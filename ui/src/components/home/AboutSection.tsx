export default function AboutSection() {
  return (
    <div className="flex w-full flex-col gap-2">
      <p>
        Eagle Eye Advisory LLC is an advisory services company which provides
        financial planning and analysis (FP&A) tools for business professionals.
      </p>
      <ul className="list-disc list-outside pl-4 gap-2 flex flex-col">
        <li>
          Development of client-tailored business models which address the more
          challenging aspects of sizing and designing a warehouse, distribution
          center, or manufacturing operation
        </li>
        <li>
          <p>
            <b>EEA - Financial Planning and Analysis (FP&A) Toolkit TM</b> -
            Fact based, financial approach and "simple" models which can be used
            to determine critical design inputs such as inventory holding
            requirements, building throughput capacity, labor and operating
            expenses, and capital equipment - See library for full listing
          </p>
        </li>
      </ul>
    </div>
  );
}
