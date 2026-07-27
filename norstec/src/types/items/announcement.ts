export interface Announcement {
  enabled?: boolean;
  isActive?: boolean;
  text: string;
  url: string;
  showIcon?: boolean;
  icon?: string;
  showArrow?: boolean;
  startsAt?: string;
  endsAt?: string;
}
