import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useState } from "react";
import CPlayModal from "../PlayModal";
import { toast } from "react-toastify";

interface Props {
    data: {
        _id: string;
        doctorName: string;
        patientName: string;
        dateOfRecording: string;
        patientAge: string;
        audioId: string;
    }[]
}

const CTable = (props : Props) => {
    // const [data, setData] = useState<
    //     {
    //         _id: string;
    //         doctorName: string;
    //         patientName: string;
    //         dateOfRecording: string;
    //         patientAge: string;
    //         audioId: string;
    //     }[]
    // >([]);

    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const fetchAudio = async (id : string) => {
        try {
            setAudioUrl(null)
            const response = await axios.get(`http://localhost:8000/v1/audio/stream/${id}`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        } catch (error) {
            toast.error("Something went wrong while fetching audio!")
            console.error("Error fetching audio:", error);
        }
    };

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const data = await axios.get("http://localhost:8000/v1/audio");
    //             setData(data.data);
    //         } catch (error) {
    //             toast.error("Something went wrong while fetching records!")
    //             setData([]);
    //         }
    //     }
    //     fetchData();
    // }, []);

    return (
        <>
            <h2 className="text-lg font-semibold mt-5">Uploaded Recordings</h2>
            <Table>
                <TableCaption>A list of all recorings.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Date of Recording</TableHead>
                        <TableHead>Doctor's Name</TableHead>
                        <TableHead>Patient's Name</TableHead>
                        <TableHead>Patient's Age</TableHead>
                        <TableHead className="text-right">Audio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.data.map((item) => {
                        return (
                            <TableRow key={item._id}>
                                <TableCell className="font-medium">
                                    {item.dateOfRecording.split("00")[0]}
                                </TableCell>
                                <TableCell>{item.doctorName}</TableCell>
                                <TableCell>{item.patientName}</TableCell>
                                <TableCell>{item.patientAge}</TableCell>
                                <TableCell className="text-right">
                                    <div onClick={() => fetchAudio(item.audioId)}>
                                        <CPlayModal audioUrl={audioUrl} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
};

export default CTable;
