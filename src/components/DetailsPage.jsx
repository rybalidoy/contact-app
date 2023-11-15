import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { fetchContact, formatPhoneNumber } from "../api/api";

import IconButton from "./IconButton";
import BackButton from "../assets/arrow_back.png";

function DetailsPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchContact(id)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [id]);

    const goBack = () => {
        navigate(-1);
    };

    /** Repeating div can be converted to components */
    return (
        <div className="container xl:w-2/3 mx-auto p-10">
            <div className="flex space-x-2">
                <IconButton className="mt-1.5" onClick={goBack}>
                    <img className="h-6 w-6" src={BackButton} alt="" />
                </IconButton>
                <h1 className="font-black text-3xl">Customer Information</h1>
            </div>
            <div className="mt-10 bg-white border-gray border rounded-lg container px-6 py-4 justify-between">
                {data && (
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-2 bg-blue-500">
                            <p className="font-semibold text-gray text-sm">
                                Name
                            </p>
                            <h1 className="font-bold text-xl">{data.name}</h1>
                        </div>
                        <div className="col-span-2 bg-red-500">
                            <p className="font-semibold text-gray text-sm">
                                Email Address
                            </p>
                            <h1 className="font-bold text-xl">{data.email}</h1>
                        </div>
                        <div className="col-span-1 bg-green-500">
                            <p className="font-semibold text-gray text-sm">
                                Contact Number
                            </p>
                            <h1 className="font-bold text-xl">
                                {formatPhoneNumber(data.phone)}
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailsPage;
