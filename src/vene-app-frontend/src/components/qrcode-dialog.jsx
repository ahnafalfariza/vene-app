import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "./auth";

const QRCodeDialog = ({ showQRCode, setShowQRCode, eventId }) => {
  const { user } = useAuth();

  return (
    <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
      <DialogContent className="w-[320px]">
        <DialogHeader>
          <DialogTitle>Your Event Ticket</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center">
          <QRCodeSVG
            value={`${user?.key}-${eventId}`}
            size={256}
            level="H"
            includeMargin
          />
          <p className="mt-4 text-sm text-gray-600">
            Show this QR code at the event entrance
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
