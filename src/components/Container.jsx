function Container({ className, children }) {
    return (
        <div className={`container bg-slate-200 mx-auto gap-4 ${className}`}>
            {children}
        </div>
    );
}

export default Container;
