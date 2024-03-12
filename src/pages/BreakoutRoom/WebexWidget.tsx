import { WebexMeetingsWidget } from '@webex/widgets';
import '@webex/widgets/dist/css/webex-widgets.css';
import { useBreakoutRooms, useRegistration } from '../../Store';

enum MeetingControl {
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

type WebexWidgetProps = {
  title?: string;
  destination: string | null;
};

export const WebexWidget = (props: WebexWidgetProps) => {
  const inMeetingControls: MeetingControl[] = [
    MeetingControl.EXIT,
    MeetingControl.AUDIO,
    MeetingControl.VIDEO,
    MeetingControl.SETTINGS,
  ];
  const outOfMeetingControls: MeetingControl[] = [
    MeetingControl.SETTINGS,
    MeetingControl.AUDIO,
    MeetingControl.VIDEO,
    MeetingControl.JOIN,
  ];
  const breakoutRooms = useBreakoutRooms();
  const [registration] = useRegistration();

  if (!props.destination) return null;

  return (
    <>
      <style>
        {`.wxc-meeting-info:after {
				content: "${props.title || ''}";
			 }
			 .wxc-button--join:after {
				content: "Csatlakozás a beszélgetéshez";
				font-family: 'Spartan', sans-serif;
				padding: 0 8px;
				transform: translateY(2px);
			 }	
			`}
      </style>
      {registration?.webex_access_token && (
        <WebexMeetingsWidget
          style={{ width: '100%', height: '100%', maxHeight: '100%' }}
          accessToken={registration.webex_access_token}
          meetingDestination={props.destination}
          controls={(inMeeting: boolean) => (inMeeting ? inMeetingControls : outOfMeetingControls)}
        />
      )}
    </>
  );
};

export default WebexWidget;
