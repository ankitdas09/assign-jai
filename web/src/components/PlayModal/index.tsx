import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
    audioUrl: string | null;
}

const CPlayModal = (props: Props) => {
    return (
        <Dialog>
            <DialogTrigger>Play Audio</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.audioUrl ? "Play audio" : "Loading..."}</DialogTitle>
                    <DialogDescription>
                        {props.audioUrl && <audio controls src={props.audioUrl}></audio>}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CPlayModal;
