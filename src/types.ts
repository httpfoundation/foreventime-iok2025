import { StructuredTextDocument } from 'react-datocms';

export type DatoSpeaker = {
  id: number;
  name: string;
  bio: string;
  title: string;
  company: string;
  slug: string;
  image?: {
    url: string;
  };
  talk: DatoTalk[];
};

export type DatoTalk = {
  id: number;
  title: string;
  start: Date;
  description: string;
  //speaker?: DatoSpeaker[]
  recordings?: DatoRecording[];
  presentation?: {
    url: string;
  };
  speaker: {
    id: number;
  }[];
  stage?: DatoStage;
};

export type DatoLanguage = {
  id: number;
  name: string;
  slug: string;
  playRecordingText?: string;
  image?: {
    url: string;
  };
  recordingLabel?: string;
  liveLabel?: string;
};

export type DatoStream = {
  id: number;
  name: string;
  youtubeVideoId: string;
  language: DatoLanguage;
  live: boolean;
  recording: boolean;
};

export type DatoRecording = {
  id: number;
  title: string;
  youtubeVideoId: string;
  language: DatoLanguage;
};

export type DatoStaticVideo = {
  name: string;
  url: string;
};

export type DatoStage = {
  id: number;
  name: string;
  pageTitle: string;
  slug: string;
  schedule?: DatoTalk[];
  streams?: DatoStream[];
  staticVideo?: DatoStaticVideo;
};

export type DatoBreakoutRoom = {
  id: number;
  title: string;
  slug: string;
  roomId?: string;
  enabled: boolean;
  img: {
    url: string;
  };
  hoverImg?: {
    url: string;
  };
};

export type DatoStaff = {
  id: number;
  name: string;
  company?: string;
  title?: string;
  slug?: string;
  group?: string;
  image?: {
    url: string;
  };
};

export type Sponsor = {
  id: number;
  name: string;
  url: string;
  logo: {
    url: string;
  };
};

export type SponsorCategory = {
  id: number;
  name: string;
  sponsor: Sponsor[];
};

export type DatoComplex = {
  allStages: DatoStage[];
  allStreams: DatoStream[];
  allBreakoutrooms: DatoBreakoutRoom[];
  liveStaticElement: DatoLiveStaticElement;
  allSpeakers: DatoSpeaker[];
  allMessages: DatoMessage[];
  allStaffs: DatoStaff[];
  allDashboardElements: DashboardElement[];
  allSponsorCategories: SponsorCategory[];
};

export type DatoMessage = {
  id: string;
  title: string;
  message: StructuredTextDocument;
  level: 1 | 2 | 3;
  staff?: DatoStaff;
  createdAt: string;
};

export type DashboardItemType = {
  caption: string;
  title: string;
  corner: 'bl' | 'br' | 'tl' | 'tr' | 'none';
  light: boolean;
  img: string;
  hoverImg?: string;
  link?: string;
  onClick?: () => void;
  mobileOrder: number;
  external?: boolean;
};

export type DatoLiveStaticElement = {
  welcome?: any;
  httpCsapat?: any;
  iokCafe?: any;
  iokCafeInfo?: any;
  iokCafeHandout?: any;
  httpMemberPlus?: any;
  staff?: any;
  junior?: any;
  media?: any;
  sessionLead?: any;
  rating?: any;
  menu?: any;
  handout?: any;
  menuImage?: any;
  closedRating?: any;
  streamNotLive?: any;
  galleryUrl?: string;
  presidentStaffId?: number;
  staffPageTitle?: string;
  webexMeetingDestination?: string;
};

export type DashboardElement = {
  caption: string;
  title: string;
  corner: 'bl' | 'br' | 'tl' | 'tr' | 'none';
  light: boolean;
  img: {
    url: string;
  };
  hoverImg?: {
    url: string;
  };
  link?: string;
  mobileOrder: number;
  onClick?: () => void;
  external?: boolean;
  enabled: boolean;
  dashboardType: 'home' | 'reception' | 'cafe';
};

