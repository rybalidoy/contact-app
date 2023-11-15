import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

/** Components  */
import Button from "./Button";
import Container from "./Container";
import InputModal from "./InputModal";
import Cards from "./Cards";
import Table from "./Table";

import "../App.css";
import "react-toastify/dist/ReactToastify.css";

/** Icons */
import TableIcon from "../assets/icon-view-table.png";
import TileIcon from "../assets/icon-view-tile.png";
import IconButton from "./IconButton";
import CheckIcon from "../assets/check-filled.png";

/** Api */
import { fetchAll, deleteContact } from "../api/api";

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    /** Table or Tile Selector
     *  Load Last Active State
     */
    const [activeButton, setActiveButton] = useState(
        localStorage.getItem("activeButton") || "tileButton"
    );
    const [isGrid, setIsGrid] = useState(activeButton === "tileButton");

    /** Modal Data */
    const [modalData, setModalData] = useState(false);
    const [edit, setEdit] = useState(false);

    /** Save Active State*/
    useEffect(() => {
        setIsGrid(activeButton === "tileButton");
        localStorage.setItem("activeButton", activeButton);
    }, [activeButton]);

    /** Fetch Data from Database using api */
    const fetchData = () => {
        fetchAll()
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    /** Get Data after Component Render */
    useEffect(() => {
        fetchData();
    }, []);

    /** Modal Open & Close */
    const handleOpen = (data, edit) => {
        setModalData(data);
        setEdit(edit);
        setModalIsOpen(true);
    };

    const handleClose = (action) => {
        console.log("Modal:", modalIsOpen);
        setModalIsOpen(false);
        /** Refresh the data after post */
        if (action && action === "edit") {
            showToast("Changes saved");
        } else if (action && action === "create") {
            showToast("Successfully added a new contact");
        }
        fetchData();
    };

    const handleDelete = (id) => {
        deleteContact(id)
            .then(() => {
                fetchData();
            })
            .catch((error) => {
                console.log("There are errors!", error);
            });
        showToast("Successfully deleted a contact");
    };

    /** Toast */
    let toastQueue = [];
    let isToastShowing = false;

    const showToast = (message) => {
        // Push the message into the queue
        toastQueue.push(message);

        // Process the queue if no toast is currently showing
        if (!isToastShowing) {
            processToastQueue();
        }
    };

    const processToastQueue = () => {
        if (toastQueue.length > 0) {
            // Mark that a toast is showing
            isToastShowing = true;

            // Get the next message from the queue
            let message = toastQueue.shift();

            // Show the toast
            toast(
                <div className="flex items-center space-x-2">
                    <img src={CheckIcon} alt="checkicon" />
                    <p>{message}</p>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    className:
                        "Toastify__toast-container bg-green rounded-xl text-black",
                    bodyClassName: "Toastify__toast-body",
                    closeButton: false,
                    onClose: () => {
                        // Mark that no toast is showing
                        isToastShowing = false;

                        // Process the next toast in the queue
                        processToastQueue();
                    },
                }
            );
        }
    };
    return (
        <div className="container xl:w-2/3 mx-auto p-10">
            <h1 className="text-3xl font-black">Contact Information</h1>
            <div className="md:flex lg:justify-between items-center mb-6 mt-6">
                <div className="mb-3 sm:mb-3 md:mb-3">
                    <p className="text-xl">
                        Your list of contacts appear here. To add new contact,
                        click on
                    </p>
                    <p className="text-xl">the Add New Contact button</p>
                </div>
                <Button onClick={handleOpen} isSubmit>
                    Add New Contact
                </Button>
            </div>
            <div className="flex justify-end py-6">
                <IconButton
                    className={
                        activeButton === "tileButton"
                            ? "opacity-100"
                            : "opacity-50"
                    }
                    onClick={() => setActiveButton("tileButton")}
                >
                    <img src={TileIcon} alt="Tile Icon" />
                </IconButton>
                <IconButton
                    className={
                        activeButton === "tableButton"
                            ? "opacity-100"
                            : "opacity-50"
                    }
                    onClick={() => setActiveButton("tableButton")}
                >
                    <img src={TableIcon} alt="Table Icon" />
                </IconButton>
            </div>
            {data && (
                <Container
                    className={
                        isGrid
                            ? "grid md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : ""
                    }
                >
                    {isGrid ? (
                        data.map((items) => (
                            <Cards
                                key={items.id}
                                data={items}
                                handleOpen={handleOpen}
                                handleDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <Table
                            data={data}
                            handleOpen={handleOpen}
                            handleDelete={handleDelete}
                        />
                    )}
                </Container>
            )}
            {modalIsOpen && (
                <InputModal
                    isOpen={modalIsOpen}
                    onRequestClose={handleClose}
                    currentData={modalData}
                    edit={edit}
                />
            )}
            <ToastContainer />
        </div>
    );
}

export default Home;
