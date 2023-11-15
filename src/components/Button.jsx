import "../App.css";

function Button({ isSubmit, children, onClick, type, className, ...props }) {
    /**
     * Add conditionals
     *
     */
    return (
        <button
            type={type}
            onClick={onClick}
            className={`cbutton px-5 py-2  ${
                isSubmit
                    ? "bg-purple"
                    : "bg-white border-purple border text-black"
            } ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
