import classNames from "classnames";
import { FC, useRef, useState } from "react";


interface DraggerProps {
    onFile: (files: FileList) => void;
    children?: React.ReactNode; // define children as an optional prop
}

export const Dragger: FC<DraggerProps> = (props) => {
    const {
        onFile,
        children
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [dragOver, setDragOver] = useState(false)
    const classes = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    })
    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }
    const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }
    return (
        <div
            className={classes}
            onDragOver={e => { handleDrag(e, true) }}
            onDragLeave={e => { handleDrag(e, false) }}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger;
