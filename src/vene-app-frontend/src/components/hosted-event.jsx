import { MapPin, Scan, Users } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { approveRegistration } from "../services/EventService";

const HostedEvent = ({ events }) => {
  return events?.ok.map((event, index) => {
    const date = new Date(parseInt(event.eventDate) / 1000000);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.toLocaleString("en-US", { day: "numeric" });

    const eventParticipant = [];

    const scanQRCode = async (video) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        console.log("Found QR code:", code.data);

        const res = approveRegistration(event.eventId, code.data);

        return code.data;
      }

      // Continue scanning if no QR code found
      requestAnimationFrame(() => scanQRCode(video));
    };

    return (
      <div className="flex gap-4">
        <div className="relative w-1/3">
          <img
            src={event.coverPhoto}
            alt={event.eventName}
            className="w-full h-auto object-cover rounded-2xl aspect-[4/3]"
          />
          <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 text-center">
            <div className="text-xs font-semibold">{month}</div>
            <div className="font-bold">{day}</div>
          </div>
        </div>
        <div className="pt-4 flex-1">
          <h3 className="font-semibold mb-2">{event.eventName}</h3>
          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="w-5 h-5" />
            <p className="text-sm">{event.location}</p>
          </div>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="custom">
                  <Scan />
                  Scan Participant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Scan participants QR code</DialogTitle>
                  <DialogDescription>
                    Scan the QR code shown by the participant to verify their
                    registration and mark their attendance for this event.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full aspect-square bg-muted rounded-lg overflow-hidden">
                    <video
                      id="qr-video"
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        navigator.mediaDevices
                          .getUserMedia({
                            video: { facingMode: "environment" },
                          })
                          .then(function (stream) {
                            const video = document.getElementById("qr-video");
                            video.srcObject = stream;
                            video.onloadedmetadata = () => {
                              video.play();
                              scanQRCode(video);
                            };
                          })
                          .catch(function (err) {
                            console.log("Error accessing camera: " + err);
                          });
                      }}
                      variant="default"
                    >
                      Start Camera
                    </Button>
                    <Button
                      onClick={() => {
                        const video = document.getElementById("qr-video");
                        const stream = video.srcObject;
                        if (stream) {
                          const tracks = stream.getTracks();
                          tracks.forEach((track) => track.stop());
                          video.srcObject = null;
                        }
                      }}
                      variant="outline"
                    >
                      Stop Camera
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Users />
              See registered
            </Button>
          </div>
          {/* {eventParticipant?.ok?.length > 0 && (
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {eventParticipant.ok.map((user, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                    >
                      <img
                        src={generateAvatarImage(user.userId.toString())}
                        alt="Avatar"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {eventParticipant.ok.length}+ attendees
                </span>
              </div>
            )} */}
        </div>
      </div>
    );
  });
};

export default HostedEvent;
