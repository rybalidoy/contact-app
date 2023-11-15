function IconButton({ children, className, ...props }) {
    return (
        <button
            className={`focus:outline-2 focus:outline-black py px-2 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default IconButton;
