import WarningIcon from "../assets/warning.png";

function ErrorPage() {
    return (
        <div className="container mx-auto mt-20 p-4">
            <img src={WarningIcon} alt="warningIcon" className="h-20 w-20" />
            <h1 className="font-black text-2xl">Oops! Page Not Found</h1>
            <p className="text-md mt-2">
                Sorry, the requested page is not found. Please check URL again.
            </p>
        </div>
    );
}

export default ErrorPage;
