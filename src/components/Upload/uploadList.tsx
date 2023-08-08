import React, { FC, useRef, useState } from 'react'
import { Button } from '../Button/button';

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
                                {(item.status === 'uploading' || item.status === 'ready') && <span>上传中</span>}
                                {item.status === 'success' && <span>上传成功</span>}
                                {item.status === 'error' && <span>上传失败</span>}
                            </span>
                            <span className="file-actions">
                                <Button size="sm" onClick={() => { onRemove(item) }}>删除</Button>
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UploadList