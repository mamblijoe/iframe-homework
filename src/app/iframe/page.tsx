'use client'
import React, { useEffect } from 'react'

const IframePage = () => {
    const sendMessageToParent = (event: unknown) => {
        console.log('sendMessageToParent')
        event?.preventDefault()
        window.parent.postMessage('click', '*')
    }

    const catchMessageFromParent = () => {
        window.addEventListener('message', function (event) {
            console.log('catchMessageFromParent')
            if (event.origin !== window.location.origin) {
                console.error('Сообщение пришло с неизвестного источника')
                return
            }

            if (event.data === 'click') {
                console.log('Кнопка в родительском окне была нажата')
            }
        })
    }

    useEffect(catchMessageFromParent, [])

    return (
        <form className="max-w-sm mx-auto">
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
        </form>
    )
}

export default IframePage
