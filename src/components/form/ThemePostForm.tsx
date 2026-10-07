// src/components/form/ThemePostForm.tsx
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import SectionTitle from "@/components/common/SectionTitle";
import Textarea from "@/components/common/Textarea";
import FormField from "@/components/form/FormField";

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

// 게시글 정보(테마명, 작성자, 제목, 내용) 입력 폼
export default function ThemePostForm({ values, onChange }: ThemePostFormProps) {
  // 필드별 입력값 변경 핸들러 생성
  const handleField =
    (field: keyof PostInfoValues) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange({ ...values, [field]: e.target.value });
      };

  return (
    <Card>
      <SectionTitle size="md">게시글 정보</SectionTitle>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="테마 이름">
          <Input variant="outline" value={values.themeName} onChange={handleField("themeName")} />
        </FormField>

        <FormField label="제작자">
          <Input variant="outline" value={values.author} onChange={handleField("author")} />
        </FormField>
      </div>

      <FormField label="게시글 제목" className="mt-4">
        <Input variant="outline" value={values.title} onChange={handleField("title")} />
      </FormField>

      <FormField label="본문쓰기" className="mt-4">
        <Textarea rows={5} value={values.content} onChange={handleField("content")} />
      </FormField>
    </Card>
  );
}
