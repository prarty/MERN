import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {app} from "../firebase.js";
import {ref, getStorage, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {
    deleteUserError,
    deleteUserStart, deleteUserSuccess,
    updateUserError,
    updateUserStart,
    updateUserSuccess
} from "../redux/user/userSlice.js";

// firebase storage
//
// allow read;
// allow write: if
//     request.resource.size < 2 * 1024 * 1024 &&
//     request.resource.contentType.matches('image/.*');
export default function Profile() {
    const fileRef = useRef(null)
    const {currentUser, loading, error  } = useSelector(state => state.user.user)
    const [file, setFile] = useState(undefined)
    const [filePer, setFilePer] = useState(0);
    const[fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const dispatch = useDispatch();
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const filename = new Date().getTime() + file.name;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
            (snapshot) => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setFilePer(Math.round(progress))
            },
            (error) => {
            setFileUploadError(true);
            },
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL)=>{
                    setFormData({...formData, avatar: downloadURL});
            })
            }
        )
    }

    useEffect(() => {
        if(file) {
            handleFileUpload(file)
        }
    }, [file]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data  = await res.json()
            console.log(data);
            if(data.success === false) {
                dispatch(updateUserError(data.errorMessage));
                return;
            }
            dispatch(updateUserSuccess(data))
            setUpdateSuccess(true)
        }catch (error) {
            updateUserError(error.message)
        }
    }

    const handleDeleteUser = async() => {
        try {
        dispatch(deleteUserStart())
         const response = await fetch(`/api/user/delete/${currentUser._id}`, {
             method: 'DELETE',
         })
            const data = response.json()
         if(data.success === false) {
             dispatch(deleteUserError(data.errorMessage))
             return;
         }
           dispatch(deleteUserSuccess(data))
        }catch (e) {
            dispatch(deleteUserError(e.message));
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input onChange={(e) => setFile(e.target.files[0])}
                       type={'file'}
                       ref={fileRef}
                       hidden
                       accept='image/*'/>
                <img onClick={() => fileRef.current.click()}
                    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                     src={formData.avatar || currentUser.avatar}
                     alt={'profile'}/>
                <p className='text-sm self-center'>
                    {fileUploadError?
                        <span className='text-red-700'>Error File Image Upload</span>:
                        filePer>0 && filePer <100 ?
                            <span className='text-slate-700'>{`Uploading ${filePer}%`}</span>:
                                filePer === 100 && !fileUploadError ?
                                    <span className='text-green-700'>Image Uploaded Successfully!</span>:""
                    }
                </p>
                <input id='username' type='text' placeholder='username'
                       className='border p-3 rounded-lg'
                       defaultValue={currentUser.username}
                onChange={handleChange}
                />
                <input id='email' type='email' placeholder='email'
                       className='border p-3 rounded-lg'
                       defaultValue={currentUser.email}
                onChange={handleChange}
                />
                <input id='password' type='password' placeholder='password'
                       className='border p-3 rounded-lg'
                onChange={handleChange}
                />
                <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading? 'Loading...': 'update'}
                </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-green-700 cursor-pointer'>Sign Out</span>
            </div>
            <p className='text-red-700 mt-5'>{error? error : ''}</p>
            <p className='text-green-700 mt-5'>{updateSuccess? 'User Updated Successfully!!' : ''}</p>
        </div>
    )
}
