export type SocialPlugServiceCategory = {
  platform: string;
  summary: string;
  services: string[];
};

export const socialPlugServiceCategories: SocialPlugServiceCategory[] = [
  {
    platform: "X / Twitter",
    summary:
      "Followers, likes, comments, repost-style engagement, impressions, spaces listeners, and other visibility signals sold as paid growth.",
    services: [
      "Followers",
      "USA followers",
      "Likes",
      "Comments",
      "Retweets",
      "Views",
      "Impressions",
      "Spaces listeners",
      "Poll votes",
      "Bookmarks",
      "Mentions",
      "Crypto followers",
      "Crypto likes",
      "Crypto retweets",
      "Crypto comments",
      "Crypto auto engagement packages",
    ],
  },
  {
    platform: "Instagram",
    summary:
      "Follower growth, likes, reels, stories, comments, saves, shares, visits, and other engagement sold as purchasable metrics.",
    services: [
      "Followers",
      "Likes",
      "Auto likes",
      "Views",
      "Comments",
      "Comment likes",
      "Reel views",
      "Reel likes",
      "Live views",
      "Impressions",
      "Saves",
      "Shares",
      "Channel members",
      "Story poll votes",
      "Story views",
      "Comment replies",
      "Custom comments",
      "Profile visits",
    ],
  },
  {
    platform: "TikTok",
    summary:
      "Followers, likes, views, comment activity, shares, saves, live viewers, and even coins packaged as instant growth.",
    services: [
      "Followers",
      "Likes",
      "Views",
      "Comments",
      "Custom comments",
      "Live views",
      "Saves",
      "Comment replies",
      "Shares",
      "Coins",
    ],
  },
  {
    platform: "YouTube",
    summary:
      "Subscribers, watch hours, views, likes, comments, live stream views, and poll votes sold as purchasable audience signals.",
    services: [
      "Views",
      "Likes",
      "Comments",
      "Favorites",
      "Shares",
      "Comment replies",
      "Subscribers",
      "Watch hours",
      "Dislikes",
      "Community poll votes",
      "Live stream views",
    ],
  },
  {
    platform: "Spotify",
    summary:
      "Plays, monthly listeners, followers, playlist followers, and saves sold as music growth packages.",
    services: [
      "Plays",
      "Monthly listeners",
      "Followers",
      "Playlist followers",
      "Saves",
    ],
  },
  {
    platform: "LinkedIn",
    summary:
      "Connections, followers, likes, comments, reactions, endorsements, employee counts, and group members positioned as professional growth.",
    services: [
      "Connections",
      "Followers",
      "Likes",
      "Comments",
      "Views",
      "Reactions",
      "Shares",
      "Endorsements",
      "Employees",
      "Group members",
    ],
  },
  {
    platform: "Community and messaging platforms",
    summary:
      "Telegram, Discord, Reddit, Twitch, Kick, WhatsApp, Threads, Bluesky, and similar communities are included in the broader catalog.",
    services: [
      "Telegram members",
      "Discord members",
      "Reddit upvotes",
      "Reddit followers",
      "Twitch followers",
      "Twitch viewers",
      "Kick followers",
      "Threads followers",
      "Bluesky followers",
      "WhatsApp channel members",
    ],
  },
  {
    platform: "Creator, music, and marketplace profiles",
    summary:
      "The catalog also reaches into SoundCloud, Apple Music, Deezer, Audiomack, Mixcloud, OnlyFans, Product Hunt, OpenSea, GitHub, and other trust-sensitive profiles.",
    services: [
      "SoundCloud plays",
      "SoundCloud followers",
      "Apple Music plays",
      "Deezer plays",
      "Audiomack plays",
      "Mixcloud plays",
      "OnlyFans likes",
      "OnlyFans followers",
      "Product Hunt upvotes",
      "OpenSea favorites",
      "GitHub stars",
      "GitHub followers",
    ],
  },
];

export const socialPlugPlatformFootprint = [
  "Twitter (X)",
  "Instagram",
  "TikTok",
  "YouTube",
  "Spotify",
  "LinkedIn",
  "Facebook",
  "Telegram",
  "Reddit",
  "Discord",
  "Twitch",
  "Kick",
  "Medium",
  "SoundCloud",
  "Threads",
  "Tumblr",
  "Quora",
  "WhatsApp",
  "Mixcloud",
  "Rumble",
  "Pinterest",
  "VK",
  "Apple Music",
  "Snapchat",
  "Product Hunt",
  "Datpiff",
  "Vimeo",
  "Likee",
  "Audiomack",
  "Deezer",
  "Shazam",
  "Dailymotion",
  "OnlyFans",
  "Clubhouse",
  "Kwai",
  "Napster",
  "Tidal",
  "OpenSea",
  "Shopee",
  "ReverbNation",
  "iOS",
  "Android",
  "Bigo",
  "Dribbble",
  "Bluesky",
  "GitHub",
  "Truth Social",
];

export const socialPlugRiskReasons = [
  {
    title: "You are buying fragile numbers, not durable audience value",
    body:
      "Purchased followers, likes, views, stars, votes, or listeners can appear fast, but they do not create earned trust, repeat attention, or platform-safe growth. If the metric drops or gets filtered, the buyer is left with no durable asset.",
  },
  {
    title: "The service directly conflicts with how trust signals are supposed to work",
    body:
      "GitHub stars, LinkedIn reactions, Twitter likes, Instagram followers, YouTube subscribers, Reddit upvotes, and Product Hunt votes are meant to reflect independent user choice. Paying for them turns a reputation signal into a purchasable display number.",
  },
  {
    title: "The downside is asymmetric",
    body:
      "If delivery is partial, temporary, low quality, or disputed, the seller still has the payment while the buyer carries the platform risk, the credibility risk, and the time cost of chasing support or filing a chargeback.",
  },
  {
    title: "A broad catalog does not reduce the core risk",
    body:
      "Expanding into dozens of platforms does not change the basic structure of the transaction. The same model is still selling synthetic engagement across ecosystems where authenticity and policy compliance matter.",
  },
];

export function flattenSocialPlugServices() {
  return socialPlugServiceCategories.flatMap((category) =>
    category.services.map((service) => `${category.platform} ${service}`),
  );
}
