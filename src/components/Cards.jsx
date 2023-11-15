import PropTypes from "prop-types";
import "../App.css";
import { Link } from "react-router-dom";
/** Icons */
import trashBin from "../assets/trash_outline.png";
import editIcon from "../assets/edit_icon.png";
import IconButton from "./IconButton";

import { formatPhoneNumber } from "../api/api";

function Cards({ data, handleOpen, handleDelete, ...props }) {
    return (
        <div
            key={data.id}
            className="cards bg-white border border-gray rounded-lg flex px-6 py-4 justify-between items-start max-h-fit"
            {...props}
        >
            <div className="space-y-1 overflow-hidden">
                <h2 className="text-xl font-bold text-gray-600 hover:underline whitespace-nowrap overflow-ellipsis overflow-hidden">
                    <Link
                        to={`/details/${data.id}`}
                        className="focus:outline-none focus:underline"
                    >
                        {data.name}
                    </Link>
                </h2>
                <p>{data.email}</p>
                <p>{formatPhoneNumber(data.phone)}</p>
            </div>
            <div className="flex space-x-0 md:mt-1.5 min-w-fit">
                <IconButton
                    onClick={() => {
                        handleOpen(data, true);
                    }}
                >
                    <img
                        src={editIcon}
                        alt="editIcon"
                        className="cursor-pointer"
                    />
                </IconButton>
                <IconButton
                    onClick={() => {
                        handleDelete(data.id);
                    }}
                >
                    <img
                        src={trashBin}
                        alt="trashBinIcon"
                        className="cursor-pointer"
                    />
                </IconButton>
            </div>
        </div>
    );
}

/** For Props Validation */
Cards.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
    }).isRequired,
};

export default Cards;
