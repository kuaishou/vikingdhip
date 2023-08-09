import React, { FC, useRef, useState } from 'react'
import { Button } from '../Button/button';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: 'ready' | 'uploading' | 'success' | 'error';
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}


const UploadList: FC<UploadListProps> = (props) => {
    const {
        fileList,
        onRemove
    } = props
    return (
        <ul className="viking-upload-list">
            {
                fileList.map(item => {
                    return (
                        <li className="viking-upload-list-item" key={item.uid}>
                            <span className={`file-name file-name-${item.status}`}>
                                {item.name} 
                            </span>
                            <span className="file-status">
                                {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
                                {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                                {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
                            </span>
                            <span className="file-actions">
                                <Icon icon="times" onClick={() => { onRemove(item) }} />
                            </span>
                            {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UploadList