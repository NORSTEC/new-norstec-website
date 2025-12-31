import type { Image } from "@/types/image/image";

export interface TeamMember {
  _type: "teamMember";
  _id: string;
  name: string;
  photo: Image;
  photoAlt: string;
  phone?: string;
  email?: string;
  linkedin?: string;
}

export interface TeamRole {
  _type: "teamRole";
  _id: string;
  title: string;
}
