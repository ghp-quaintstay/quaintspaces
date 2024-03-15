import React, { useState } from 'react'
import Heading from '../elements/Heading'
import Button from '../elements/Button'
export default function Security() {

    const [formData, setFormData] = useState({
        new_password: "",
        confirm_password: "",
        current_password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setFormData({
            new_password: "",
            confirm_password: "",
            cuurent_Password: '',
        });
    };

    return (
        <div>
            <div className="container mx-auto">
            <div className="pt-12">
                <Heading text={"Security "} />
                </div>
            </div>
            <div className="container mx-auto">
                <div className="my-12 profile-text">
                    <h1 >
                        Update Password
                    </h1>
                    <p>
                        Increase the security of your account by updating password etc.
                    </p>
                </div>
            </div>
            <div className=" container mx-auto">
            <div className="w-3/5">
                <form onSubmit={handleSubmit} className="mr-3"  >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-700 "
                        >
                            Current password
                        </label>
                        <input
                            type="password"
                            id="email"
                            name="current_password"
                            value={formData.current_password}
                            onChange={handleChange}
                            className="mt-1 p-4 border rounded-full w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-700"
                        >
                            New password
                        </label>
                        <input
                            type="password"
                            id="email"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                            className="mt-1 p-4 border rounded-full w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-700"
                        >
                            Confirm password
                        </label>
                        <input
                            type="password"
                            id="email"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="mt-1 p-4 border rounded-full w-full"
                            required
                        />
                    </div>
                    <Button text={"Update Password"} 
                    design={"font-inter font-lg leading-tight update-btn text-center text-black-400 w-96 bg-orange-300  border-0 p-4 rounded-full mt-10 mb-12"} 
                    />
                </form>
                <div className='border-b-2 border-solid border-zinc-300'></div>
                <div className="mt-12 profile-text">
                    <h1 className="text-lg ">
                        Deactivate Account
                    </h1>
                    <div className="flex flex-wrap justify-between">
                        <p>
                            Deactivate your account here
                        </p>
                        <p  className="edit-color underline " >
                            Deactivate
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
