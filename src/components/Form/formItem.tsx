import classNames from "classnames";
import { FC, useContext, useEffect } from "react";
import { FormContext } from "./form";
import React from "react";

export interface FormItemProps {
    /** 表单提交的回调 */
    name: string;
    /** 表单提交的回调 */
    label: string;
    /** 表单提交的回调 */
    children: React.ReactNode;
    valuePropName?: string;
    trigger?: string;
    getValueFromEvent?: (...args: any[]) => any;
    /** 表单提交的回调 */
    rules?: [];
    /** 表单提交的回调 */
    className?: string;
    /** 表单提交的回调 */
    style?: React.CSSProperties;
}

export const FormItem: FC<FormItemProps> = (props) => {
    const { name, label, children,valuePropName,trigger,getValueFromEvent, rules, className, style } = props;
    const { dispatch ,fields} = useContext(FormContext)
    const classes = ["viking-form-item", className].filter(Boolean).join(" ");
    const rowClass = classNames("viking-row", {
        "viking-row-no-label": !label,
    });

    useEffect(() => {
        dispatch({ type: 'addField', name, value: { label, name ,value:''} })
    }, [])

    const filedState = fields[name]
    const value = filedState?.value

    const controlProps = {
        value,
        onChange: (e: any) => {
            dispatch({ type: 'updateValue', name, value: e.target.value })
        }
    }

    const childList = React.Children.toArray(children)
    const child = childList[0] as React.ReactElement
    const returnChild = React.cloneElement(child as React.ReactElement, {
        ...child.props,
        ...controlProps
    }) 

    return (
        <div className={rowClass} style={style}>
            {label && <div className="viking-form-item-label">
                <label htmlFor={name} title={label} className="viking-label-title">{label}</label>
            </div>}
            <div className="viking-form-item">
                {returnChild}
            </div>

        </div>
    );
}

FormItem.defaultProps = {
    name: "viking-form",
    label: "viking-form",
    valuePropName: 'value',
    trigger: 'onChange',
    getValueFromEvent: (e: any) => e.target.value,
};
export default FormItem;