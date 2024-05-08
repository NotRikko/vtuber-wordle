import Style from './UserCard.module.css'
import { useState } from 'react'
import { useUser } from '../UserProvder'


function UserCard () {
    const [editingField, setEditingField] = useState(null);
    const [apiURL, setApiURL] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState('');
    const { user, setUser, handleLogout } = useUser();

    const handleEdit = (field, fieldApiURL) => {
        setIsEditing(true);
        setEditingField(field);
        setApiURL(fieldApiURL);
        setFormData(null);
    }

    const handleFormData = (e) => {
        setFormData(e.target.value);
    }

    const handleFileData = (e) => {
        setFormData(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = formData;
        if (newData) {
            if (editingField === 'Profile Picture') {
                await handleFileSubmit(newData);
            } else {
                await handleTextSubmit(newData);
            }
        } else {
            console.log('No new data');
        }
    }

    const handleTextSubmit = async (newData) => {
        const response = await fetch(apiURL, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.user_name,
                newData: newData
            })
        });
        if (response.status === 200) {
            const updatedUser = await response.json();
            setUser(updatedUser);
            handleLogout();
        } else {
            console.log('Failed to update');
        }
    }

    const handleFileSubmit = async (newFile) => {
        const formData = new FormData();
        formData.append('image', newFile);
        formData.append('username', user.user_name);

        const response = await fetch(apiURL, {
            method: 'PUT',
            mode: 'cors',
            body: formData
        });

        if (response.status === 200) {
            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing(false);
        } else {
            console.log('Failed to update profile picture');
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {isEditing ? 
            <form id={Style.user_card_edit} onSubmit={handleSubmit}>
                <label for={editingField}>Change {editingField}</label>
                {editingField === 'Profile Picture' ?  <input
                    type='file'
                    accept='image/*'
                    name={editingField}
                    onChange={handleFileData}
                />
                :
                <input
                    type="text"
                    name={editingField}
                    value={formData}
                    onChange={handleFormData}
                />
                }
                <button type='submit'>Submit</button>
            </form>
        :
        <div id={Style.user_card}>
                <img src={user.image} />
                <div>
                    <h1>{user.user_name}</h1>
                    <h2>High Score: {user.high_score}</h2>
                    <h2>Current Score: {user.current_score}</h2>
                </div>
                <div style={{ fontSize: '1rem', marginTop: '10%'}}>
                    <h2 onClick={() => handleEdit('Profile Picture', 'http://localhost:3100/user/change_picture')}>Change profile picture</h2>
                    <h2 onClick={() => handleEdit('Username', 'http://localhost:3100/user/change_username')}>Change username</h2>
                    <h2 onClick={() => handleEdit('Password', 'http://localhost:3100/user/change_password')}>Change password</h2>
                    <h2 onClick={handleLogout}>Log out</h2>
                </div>
            </div>
        }
        </div>
    )
}

export default UserCard