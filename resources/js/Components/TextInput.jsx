import React, { forwardRef, useEffect, useRef } from 'react'

export default forwardRef(function TextInput(
    {
        type = 'text',
        name,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        disabled = false,
    },
    ref,
) {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                disabled={disabled}
                value={value}
                className={
                    `border-gray-300 disabled:!bg-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={e => handleChange(e)}
            />
        </div>
    )
})