import { randomID } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export function getUrlParams(url = window.location.href) {
	const urlStr = url.split("?")[1]; // Changed `let` to `const`
	return new URLSearchParams(urlStr);
}

export default function VideoUIKit() {
	const roomID = getUrlParams().get("roomID") || randomID(5);
	const { user } = useClerk();

	const myMeeting = (element: HTMLDivElement) => { // Changed `let` to `const`
		const initMeeting = async () => {
			try {
				const res = await fetch(`/api/zegocloud?userID=${user?.id}`);
				const { token, appID } = await res.json();

				const username = user?.fullName || user?.emailAddresses[0]?.emailAddress.split("@")[0];

				if (!user?.id) {
					console.error("User ID is undefined");
					return;
				}

				const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID, user.id, username);

				const zp = ZegoUIKitPrebuilt.create(kitToken);
				zp.joinRoom({
					container: element,
					sharedLinks: [
						{
							name: "Personal link",
							url:
								window.location.protocol +
								"//" +
								window.location.host +
								window.location.pathname +
								"?roomID=" +
								roomID,
						},
					],
					scenario: {
						mode: ZegoUIKitPrebuilt.GroupCall,
					},
				});
			} catch (error) {
				console.error("Error during ZegoCloud initialization", error);
			}
		};
		initMeeting();
	};

	return <div className='myCallContainer' ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;
}
