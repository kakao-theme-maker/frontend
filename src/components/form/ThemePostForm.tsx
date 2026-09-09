// src/components/community/ThemePostForm.tsx
import Input from "@/components/common/Input";

export interface PostInfoValues {
  themeName: string;
  author: string;
  title: string;
  content: string;
}

interface ThemePostFormProps {
  values: PostInfoValues;
  onChange: (values: PostInfoValues) => void;
}

export default function ThemePostForm({ values, onChange }: ThemePostFormProps) {
  const handleField =
    (field: keyof PostInfoValues) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange({ ...values, [field]: e.target.value });
      };

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8">
      <h2 className="text-base font-bold sm:text-lg">게시글 정보</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-800">
            테마 이름
          </label>
          <Input
            value={values.themeName}
            onChange={handleField("themeName")}
            className="mt-2 rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-800">
            제작자
          </label>
          <Input
            value={values.author}
            onChange={handleField("author")}
            className="mt-2 rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold text-slate-800">
          게시글 제목
        </label>
        <Input
          value={values.title}
          onChange={handleField("title")}
          className="mt-2 rounded-lg border border-slate-200 bg-slate-50"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold text-slate-800">
          본문쓰기
        </label>
        <textarea
          value={values.content}
          onChange={handleField("content")}
          rows={5}
          className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
        />
      </div>
    </div>
  );
}