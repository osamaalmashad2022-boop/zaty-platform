import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="orchid-card p-8 text-center space-y-4 max-w-lg mx-auto my-10">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E5F1EE] text-[#006E5A] flex items-center justify-center">
        <Compass className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-bold text-[#163A3A]">
        الصفحة غير موجودة
      </h1>
      <p className="text-sm text-[#3B5A58]">
        يبدو أن الرابط غير مكتمل أو تم نقله. يمكنك العودة إلى المسار الرئيسي
        ومتابعة المذاكرة من مكان ما وقفت.
      </p>
      <div className="pt-2">
        <Link href="/" className="orchid-btn-primary">
          <ArrowRight className="w-4 h-4 shrink-0" />
          <span>العودة للرئيسية</span>
        </Link>
      </div>
    </div>
  );
}
