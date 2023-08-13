import { Dispatch, FC, createContext } from "react";
import useStore from "./useStore";

export interface FormProps {
    name: string;
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    className?: string;
    style?: React.CSSProperties;
}

export interface FormState {
    formValue: { [K: string]: any };
    formError: { [K: string]: string[] };
    // formRules: { [K: string]: FormRule[] };
}
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch'|'fields'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = (props) => {
    const { name, children, onSubmit, className, style } = props;
    const { form, fields, dispatch } = useStore();
    const passedContext: IFormContext = {
        dispatch,
        fields
    }
    return (
        <>
            <form
                name={name}
                onSubmit={onSubmit}
                className={className}
                style={style}
            >
                <FormContext.Provider value={passedContext}>
                    {children}
                </FormContext.Provider>

            </form>
            <div>
                <pre>{JSON.stringify(form)}</pre>
                <pre>{JSON.stringify(fields)}</pre>
            </div>
        </>

    );
}

Form.defaultProps = {
    name: "viking-form",
    onSubmit: () => { },
};
export default Form;
