
import { useEffect, useState } from 'react';
import axios from "axios"
import Upload from './components/Upload/upload';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
// library.add(fas);
function App() {
  const [title, setTitle] = useState('你好邢浩东');

  // useEffect(() => {
  //   axios.get('http://jsonplaceholder.typicode.com/posts/1', {
  //     headers: {
  //       'X-Requested-With': 'XMLHttpRequest'
  //     },
  //     responseType: 'json'
  //   }).then(resp => {
  //     console.log(resp)
  //     setTitle(resp.data.title)
  //   })
  // })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)
      axios.post('http://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(resp => {
        console.log(resp)
      })
    }
  }
  
  return (
    <div className="App">
      <div>
      <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      onProgress={(res)=>{console.log('onProgress',res)}}
      onSuccess={(res)=>{console.log('onSuccess',res)}}
      onError={(res)=>{console.log('onError',res)}}
    />
      </div>
    </div>
  );
}

export default App;
