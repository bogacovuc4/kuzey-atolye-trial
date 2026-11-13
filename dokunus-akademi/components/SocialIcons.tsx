import type { site } from "@/content/site";

type K = keyof typeof site.social;

export const socialLabels: Record<K, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  facebook: "Facebook",
  x: "X",
  linkedin: "LinkedIn",
  spotify: "Spotify",
};

const icons: Record<K, React.ReactNode> = {
  instagram: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></>),
  youtube: (<><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></>),
  tiktok: (<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 4.6" />),
  facebook: (<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />),
  x: (<path d="M4 4l16 16M20 4L4 20" />),
  linkedin: (<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>),
  spotify: (<><circle cx="12" cy="12" r="9" /><path d="M7 10c3.5-1 7-.6 10 1M7.5 13c3-.7 5.8-.4 8.2.9M8 16c2.4-.5 4.6-.3 6.5.7" /></>),
};

export function SocialIcon({ name }: { name: K }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
