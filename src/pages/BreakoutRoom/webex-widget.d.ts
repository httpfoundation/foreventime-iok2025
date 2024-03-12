declare module '@webex/widgets' {
  export enum MeetingControl {
    JOIN = 'join-meeting',
    EXIT = 'leave-meeting',
    AUDIO = 'mute-audio',
    VIDEO = 'mute-video',
    SHARE = 'share-screen',
    ROSTER = 'member-roster',
    SETTINGS = 'settings',
    SWITCH_CAMERA = 'switch-camera',
    SWITCH_MICROPHONE = 'switch-microphone',
    SWITCH_SPEAKER = 'switch-speaker',
  }
  export type WebexMeetingsWidgetProps = {
    style: Record<string, any>;
    accessToken: string;
    meetingDestination?: string;
    controls: (inMeeting: boolean) => MeetingControl[];
  };
  export function WebexMeetingsWidget(props: WebexMeetingsWidgetProps): JSX.Element;
}
