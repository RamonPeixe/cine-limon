import type { Movie } from "@/types/Movie";
import type { ReactNode } from "react";

export interface MovieFormProps {
  initialValues?: Partial<Movie>;
  onFinish: (values: Partial<Movie>) => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  children?: ReactNode;
}
