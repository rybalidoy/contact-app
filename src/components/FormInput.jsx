import { useFormContext } from "react-hook-form";

function FormInput({ label, name, textarea, validationRules }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const classes =
        "w-full border rounded-md mb-2 p-2 bg-stone-200 text-stone-600 focus:outline-none focus:none";

    return (
        <div className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold text-stone-500">{label}</label>
            {textarea ? (
                <textarea
                    className={classes + " resize-none"}
                    {...register(name, validationRules)}
                />
            ) : (
                <input
                    className={
                        classes +
                        " " +
                        (errors[name] ? "border-red" : "border-gray ")
                    }
                    {...register(name, validationRules)}
                />
            )}
            <p className="md:h-3 p text-red">
                {errors[name] && errors[name].message}
            </p>
        </div>
    );
}
export default FormInput;
