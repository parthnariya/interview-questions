import { CSSProperties } from "react";

export interface CustomStyle extends CSSProperties {
  "--rows": number;
  "--cols": number;
}
