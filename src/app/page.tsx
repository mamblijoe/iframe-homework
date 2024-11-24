'use client'
import React, { useEffect } from 'react'

export default function Home() {
    const catchMessageFromIframeWithPostMessage = () => {
        const iframe = document.querySelector('#iframe')
        iframe?.contentWindow.postMessage('init', '*')
        window.addEventListener('message', function (event) {
            if (event.origin !== window.location.origin) {
                console.error('Неизвестный источник')
                return
            }
            console.log('Отловил нажатие кнопки в iframe через postMessage')
        })
    }

    const catchMessageFromIframeWithDefault = () => {
        setTimeout(() => {
            const iframe =
                document?.querySelector('#iframe')?.contentWindow?.document
            const button = iframe?.querySelector('#button_default')
            button?.addEventListener('click', function () {
                console.log('Отловил нажатие кнопки в iframe через default')
            })
        }, 1000)
    }
    const postMessageToIframe = (event: unknown) => {
        event.preventDefault()
        const iframe = document.querySelector('#iframe')
        iframe?.contentWindow?.postMessage('click', '*')
    }

    useEffect(catchMessageFromIframeWithDefault, [])
    useEffect(catchMessageFromIframeWithPostMessage, [])

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <button
                onClick={postMessageToIframe}
                id="#button"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Parent Button
            </button>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full h-full">
                <iframe
                    id="iframe"
                    className={'w-full h-full border-r-emerald-800 border-2'}
                    src="./iframe"
                ></iframe>
            </main>
        </div>
    )
}
