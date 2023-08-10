import classNames from "classnames";
import { FC, useContext, useEffect } from "react";
import { FormContext } from "./form";

export interface FormItemProps {
    /** 表单提交的回调 */
    name: string;
    /** 表单提交的回调 */
    label: string;
    /** 表单提交的回调 */
    children: React.ReactNode;
    /** 表单提交的回调 */
    rules?: [];
    /** 表单提交的回调 */
    className?: string;
    /** 表单提交的回调 */
    style?: React.CSSProperties;
}

export const FormItem: FC<FormItemProps> = (props) => {
    const { name, label, children, rules, className, style } = props;
    const { dispatch } = useContext(FormContext)
    const classes = ["viking-form-item", className].filter(Boolean).join(" ");
    const rowClass = classNames("viking-row", {
        "viking-row-no-label": !label,
    });

    useEffect(() => {
        dispatch({ type: 'addField', name, value: { label, name } })
    }, [])


    return (
        <div className={rowClass} style={style}>
            {label && <div className="viking-form-item-label">
                <label htmlFor={name} title={label} className="viking-label-title">{label}</label>
            </div>}
            <div className="viking-form-item">
                {children}
            </div>

        </div>
    );
}

export default FormItem;