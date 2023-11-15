import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import IconButton from "./IconButton";

import "../App.css";

/** Icons */
import trashBin from "../assets/trash_outline.png";
import editIcon from "../assets/edit_icon.png";

import { formatPhoneNumber } from "../api/api";

function Table({ data, handleOpen, handleDelete }) {
    const keys = Object.keys(data[0]);
    return (
        <table className="container table">
            <thead>
                <tr>
                    {keys.slice(0, -1).map((key, index) => (
                        <th key={index} className="table-color">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                    ))}
                    <th className="table-color">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((items, index) => (
                    <tr key={index}>
                        <td className="underline">
                            <Link to={`/details/${items.id}`}>
                                {items.name}
                            </Link>
                        </td>
                        <td>{formatPhoneNumber(items.phone)}</td>
                        <td>{items.email}</td>
                        <td className="text-center">
                            <div className="inline-block mt-1.5">
                                <IconButton
                                    onClick={() => {
                                        handleOpen(items, true);
                                        console.log(items);
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
                                        handleDelete(items.id);
                                    }}
                                >
                                    <img
                                        src={trashBin}
                                        alt="trashBinIcon"
                                        className="cursor-pointer"
                                    />
                                </IconButton>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            email: PropTypes.string,
            phone: PropTypes.string,
        })
    ).isRequired,
    grid: PropTypes.bool,
};

export default Table;
