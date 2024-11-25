'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const IframePage = () => {
    const [value, setValue] = useState({
        email: '',
        password: '',
    })

    const validate = (values: { email: string; password: string }) => {
        const emailIsValid = !!values.email.length && values.email.includes('@')
        const passwordIsValid = values.password.length > 3
        if (emailIsValid && passwordIsValid) {
            window.parent.postMessage('filled', '*')
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setValue((prev) => {
            const newValues = { ...prev, [name]: value }
            validate(newValues)
            return newValues
        })
    }

    const sendMessageToParent = (event: unknown) => {
        event?.preventDefault()
        window.parent.postMessage('click', '*')
    }

    const catchMessageFromParent = () => {
        window.addEventListener('message', function (event) {
            if (event.origin !== window.location.origin) {
                toast('Сообщение пришло с неизвестного источника')
                return
            }

            if (event.data === 'click') {
                toast('Кнопка в родительском окне была нажата')
            }
        })
    }

    useEffect(catchMessageFromParent, [])

    return (
        <form className="max-w-sm mx-auto" id="form">
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    onChange={onChange}
                    value={value.email}
                    name="email"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChange}
                    value={value.password}
                    name="password"
                />
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                </div>
                <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Remember me
                </label>
            </div>
            <button
                onClick={sendMessageToParent}
                id="button_post"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Child Post Button
            </button>
            <button
                onClick={(event) => event.preventDefault()}
                id="button_default"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Child Default Button
            </button>
            <ToastContainer />
        </form>
    )
}

export default IframePage
