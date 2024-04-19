import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CTable from "./components/Table";
import { Validation } from "common/dist";
import { toast } from "react-toastify";

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TUploadSchema>({ resolver: zodResolver(Validation.UploadSchema) });

    const fileInputRef = useRef(null);

    type TUploadSchema = z.infer<typeof Validation.UploadSchema>;

    async function onSubmit(data: TUploadSchema) {
        // @ts-expect-error fix later
        const file = fileInputRef.current?.files[0];

        if (file) {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("doctorName", data.doctorName);
            formData.append("patientName", data.patientName);
            // formData.append("patientAge", data.patientAge.toString());
            formData.append("dateOfRecording", data.dateOfRecording.toUTCString());

            try {
                const response = await axios.post("http://localhost:8000/v1/audio/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("File uploaded successfully:", response.data);
                toast.success("Uploaded successfully!")
                reset();
            } catch (error) {
                toast.error("Something went wrong!")
                console.error("Error uploading file:", error);
            }
        }
    }

    return (
        <section>
            <nav className="bg-black">
                <div className="container mx-auto p-2 flex justify-between items-center">
                    <p className="text-md font-bold text-white">Jeeva AI</p>
                    <p className="text-xs text-white">Submitted by Ankit D</p>
                </div>
            </nav>
            <div className="container mx-auto p-2">
                <h2 className="text-lg font-semibold mt-1">Upload new recording</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
                        <Label htmlFor="picture">Doctor's Name</Label>
                        <Input
                            type="text"
                            placeholder="Doctor's Name"
                            {...register("doctorName")}
                            disabled={isSubmitting}
                        />
                        <p className="text-sm text-red-600">
                            {errors && errors.doctorName?.message}
                        </p>
                    </div>
                    <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
                        <Label htmlFor="picture">Patient's Name</Label>
                        <Input
                            type="text"
                            placeholder="Patient's Name"
                            {...register("patientName")}
                            disabled={isSubmitting}
                        />
                        <p className="text-sm text-red-600">
                            {errors && errors.patientName?.message}
                        </p>
                    </div>
                    <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
                        <Label htmlFor="picture">Patient's Age</Label>
                        <Input
                            type="number"
                            placeholder="Patient's Age"
                            {...register("patientAge")}
                            disabled={isSubmitting}
                        />
                        <p className="text-sm text-red-600">
                            {errors && errors.patientAge?.message}
                        </p>
                    </div>
                    <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
                        <Label htmlFor="picture">Date of recording</Label>
                        <Input
                            type="date"
                            placeholder="Date of recording"
                            {...register("dateOfRecording")}
                            disabled={isSubmitting}
                        />
                        <p className="text-sm text-red-600">
                            {errors && errors.dateOfRecording?.message}
                        </p>
                    </div>
                    <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
                        <Label htmlFor="picture">Sound File</Label>
                        <Input
                            id="soundfile"
                            type="file"
                            required
                            disabled={isSubmitting}
                            ref={fileInputRef}
                        />
                    </div>

                    <Button disabled={isSubmitting} className="mt-2">
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? "Uploading" : "Upload"}
                    </Button>
                </form>
                <CTable />
            </div>
        </section>
    );
}

export default App;
