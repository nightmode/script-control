'use strict'

//-------
// Notes
//-------
/*
    The window object is safe to use because our script will be injected and isolated from any existing scripts.
*/

//--------------------------------
// This script will only run once
//--------------------------------
if (window.local === undefined) {
    //-----------
    // Variables
    //-----------
    window.local = {
        'browser': {
            'firefox': navigator.userAgent.toLowerCase().indexOf('firefox/') > 1,
        },
        'elements': {
            'noscript'       : document.getElementsByTagName('noscript'),
            'noscript_body'  : null, // will be set by noscript_body()
            'noscript_custom': null, // will be set by noscript_body()
            'noscript_head'  : null  // will be set by noscript_head()
        },
        'function': { // will hold various functions
            // add_listeners
            // delay
            // javascript_disabled
            // noscript_body
            // noscript_display_setting
            // noscript_head
            // noscript_style
            // service_workers
            // start
        },
        'setting': {
            'noscript_display': 'block' // default, only used if firefox reports undefined or "none" as the display value for a noscript element, can be set by noscript_display_setting()
        }
    } // local

    //-----------
    // Functions
    //-----------
    window.add_listeners = local.function.add_listeners = function add_listeners() {
        /*
        Add event listeners.
        */

        window.addEventListener("orientationchange", noscript_style)
        window.addEventListener('resize',  noscript_style, { passive: true })
    } // add_listeners

    window.delay = local.function.delay = function delay(ms) {
        /*
        Promise that will delay a desired number of milliseconds before resolving.

        @param   {Number}   ms  Number of milliseconds to delay.
        @return  {Promise}
        */

        return new Promise(resolve => setTimeout(resolve, ms))
    } // delay

    window.javascript_disabled = local.function.javascript_disabled = function javascript_disabled() {
        /*
        Return true if JavaScript can be confirmed disabled, otherwise false.
        */

        const len = local.elements.noscript.length

        for (let i = 0; i < len; i++) {
            const noscript = local.elements.noscript[i]
            const noscript_elements = noscript.getElementsByTagName('*')

            if (noscript_elements.length > 0) {
                // the browser is blocking scripts on a system level
                return true
            }
        } // for

        // at this point in the code, it is possible the browser is blocking scripts on a system level but we can not tell because there are either zero noscript elements or because none of the noscript elements have children
        return false
    } // javascript_disabled

    window.noscript_body = local.function.noscript_body = function noscript_body() {
        /*
        Clone each noscript_body element to a custom element and then hide the original element.
        */

        local.elements.noscript_body = document.querySelectorAll('body noscript')

        const len = local.elements.noscript_body.length

        for (let i = 0; i < len; i++) {
            const noscript = local.elements.noscript_body[i]

            const custom_element = document.createElement('script_control_noscript')
            custom_element.classList     = noscript.classList
            custom_element.id            = noscript.id
            custom_element.innerHTML     = noscript.innerHTML
            custom_element.style.cssText = 'display: none;' // hide until noscript_style() runs

            // insert custom element after noscript element
            noscript.parentNode.insertBefore(custom_element, noscript.nextSibling)

            const div = document.createElement('div')
            div.style.cssText = 'display:none !important;'

            // insert div before noscript element
            noscript.parentNode.insertBefore(div, noscript)

            // move noscript element into div
            div.appendChild(noscript)
        } // for

        local.elements.noscript_custom = document.getElementsByTagName('script_control_noscript')
    } // noscript_body

    window.noscript_display_setting = local.function.noscript_display_setting = function noscript_display_setting() {
        /*
        Loop though each stylesheet and css rule to try to find a more likely display value for noscript elements in firefox. More likely than the "none" value firefox reports by default.
        */

        if (local.browser.firefox === false) {
            // this function is only needed by firefox
            return 'early'
        } // if

        try {
            for (const css of document.styleSheets) {
                for (const rule of css.rules) {
                    // a rule like like ".p{font-size:normal}"
                    if (rule.selectorText) {
                        // selector is not undefined
                        if (rule.selectorText.indexOf('noscript') >= 0) {
                            const display_value = rule.style.display

                            if (display_value === '' ||
                                display_value === 'none' ||
                                display_value === undefined) {
                                // ignore this rule
                            } else {
                                local.setting.noscript_display = display_value
                            } // if
                        } // if
                    } // if
                } // for
            } // for
        } catch (error) {
            console.log('Script Control -> Noscript Display Setting ->', error.message)
        } // try
    } // noscript_display_setting

    window.noscript_head = local.function.noscript_head = function noscript_head() {
        /*
        For noscript elements within a head tag, move noscript child elements to be direct children of the head tag.
        */

        local.elements.noscript_head = document.querySelectorAll('head noscript')

        const len = local.elements.noscript_head.length

        for (let i = 0; i < len; i++) {
            const temp_element = document.createElement('div')
            temp_element.innerHTML = local.elements.noscript_head[i].innerHTML

            while (temp_element.children.length > 0) {
                // move elements to the head
                document.head.appendChild(temp_element.children[0])
            }
        } // for
    } // noscript_head

    window.noscript_style = local.function.noscript_style = function noscript_style() {
        /*
        Clone styles from each noscript_body element to its corresponding custom element.
        */

        const len = local.elements.noscript_body.length

        for (let i = 0; i < len; i++) {
            const source = local.elements.noscript_body[i]
            const dest   = local.elements.noscript_custom[i]

            const source_styles = window.getComputedStyle(source)
            const dest_styles   = window.getComputedStyle(dest)

            for (const key in source_styles) {
                if (key === 'cssText') {
                    continue
                } // if

                if (source_styles[key] !== dest_styles[key]) {
                    // difference between computed styles
                    if (source_styles[key] !== dest.style[key]) {
                        // difference between computed source style and dest style
                        dest.style[key] = source_styles[key]
                    } // if
                } // if
            } // for

            if (local.browser.firefox === true) {
                // firefox 119 will report that a noscript element has a style of "display: none" even if that element has css rules that should apply another display value
                // the logic is probably because the browser itself is NOT disabling javascript so those noscript elements are considered invisible
                // unlike firefox, chrome and edge report expected display values like "block", "flex", "inline", and so forth

                if (dest.style.display === 'none' ||
                    dest.style.display === undefined) {
                    dest.style.display = local.setting.noscript_display
                } // if
            } // if
        } // for
    } // noscript_style

    window.service_workers = local.function.service_workers = async function service_workers() {
        /*
        Figure out if any service workers are still registered for this page. If a service worker is detected, send a message to our extension server worker for assistance.
        */

        try {
            if (navigator.serviceWorker === undefined) {
                return 'early'
            } // if

            const registrations = await navigator.serviceWorker.getRegistrations()

            if (registrations.length > 0) {
                if (local.browser.firefox) {
                    for (const registration of registrations) {
                        try {
                            registration.unregister()
                        } catch (error) {
                            console.log('Script Control -> Service Workers -> Unregister ->', error.message)
                        } // try
                    } // for
                } // if

                let port = chrome.runtime.connect()

                port.postMessage({
                    'subject': 'service-worker-reload',
                    'hostname': location.hostname
                })

                port.disconnect()

                // Delay resuming subsequent code by 3 seconds since our extension service worker will probably send us to a loading page page in just a moment.
                // After a short delay on the loading page, our extension service worker will send us back to the current URL of this tab.
                await delay(3000)
            } // if
        } catch (error) {
            if (error.message.includes('context is sandboxed')) {
                // iframe is sandboxed so ignore this expected error
            } else if (error.message.includes('document is in an invalid state')) {
                // iframe may be pointing to "about:blank" or possible chromium bug
            } else {
                console.log('Script Control -> Service Workers ->', error.message)
            } // if
        } // try
    } // service_workers

    window.start = local.function.start = async function start() {
        /*
        Start.
        */

        await service_workers()

        if (local.elements.noscript.length === 0) {
            // zero noscript elements to worry about
            return 'early'
        } // if

        if (javascript_disabled()) {
            // noscript elements are already active
            return 'early'
        } // if

        noscript_head()
        noscript_body()
        noscript_display_setting()

        add_listeners()

        // noscript_style() relies on window.getComputedStyle which may not always return the most up to date styles so call it repeatedly over time with a while loop

        let wait = 50 // milliseconds

        while (wait < 7000) {
            noscript_style()

            await delay(wait)

            // wait 50, 100, 200, 400, etc... milliseconds
            wait = wait * 2
        } // while
    } // start

    //-------
    // Start
    //-------
    start()
} // if