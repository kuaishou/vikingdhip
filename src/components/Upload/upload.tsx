import React, { FC, useRef, useState } from 'react'
import axios from "axios"
import UploadList from './uploadList'
import { Button } from '../Button/button';


export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;

}

export interface uploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    
}

export const Upload: FC<uploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList||[])
    // const [uploading, setUploading] = useState(false)
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
          return prevList.map(file => {
            if (file.uid === updateFile.uid) {
              return { ...file, ...updateObj }
            } else {
              return file
            }
          })
        })
      }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                console.log(percentage)
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    console.log(fileList)
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            updateFileList(_file, { status: 'success', response: resp.data })
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            updateFileList(_file, { status: 'error', error: err })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {

                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }

    return (
        <div className='viking-upload-component'>
            <Button btnType='primary' onClick={handleClick}>上传文件</Button>
            <input ref={fileInput} type="file" className='viking-file-input' style={{ display: 'none' }} onChange={handleFileChange} />
            <UploadList fileList={fileList} onRemove={handleRemove}/>
        </div>
    )
}

export default Upload