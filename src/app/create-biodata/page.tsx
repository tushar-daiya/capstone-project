import { PDFPreviewer } from "@/components/pdf/PDFPreviewer";
import ResumeBuilder from "@/components/ResumeBuilder";

export default function page() {
  return (
    <div className="flex md:h-[calc(100vh-4rem)] md:flex-row flex-col">
      <div className="flex-1 m-2 border rounded-lg shadow-lg p-4 overflow-y-auto">
        <ResumeBuilder />
      </div>
      <div className="flex-1 max-w-[800px] border rounded-lg shadow-lg m-2 overflow-hidden">
        <PDFPreviewer />
      </div>
    </div>
  );
}
