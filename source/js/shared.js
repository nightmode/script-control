'use strict'

//-------
// Notes
//-------
/*
    This shared JavaScript file is meant to be shared between different pages. It will also be included in the root level service worker which is built from more than one file.
*/

//-----------
// Variables
//-----------
const shared = {
    'browser': {
        'brave'  : false, // default which can be set true by shared_start()
        'chrome' : navigator.userAgent.toLowerCase().indexOf('chrome/')  > 1,
        'edge'   : navigator.userAgent.toLowerCase().indexOf('edg/')     > 1,
        'firefox': navigator.userAgent.toLowerCase().indexOf('firefox/') > 1,
        'opera'  : navigator.userAgent.toLowerCase().indexOf('opr/')     > 1
    },
    'function': { // will hold various functions
        // always_allow

        // allow_script

        // browser_rules_warnings

        // delay

        // expect

        // hostname_to_root_domain

        // listen_allow_permissions_button
        // listen_mouse_events
        // listen_scroll_nav
        // listen_scroll_to_links
        // listen_show_message_dismiss

        // location_hash_scroll_to

        // log

        // new_tab_url

        // parse_integer

        // permissions_display
        // permissions_hide
        // permissions_request
        // permissions_show

        // punycode_to_unicode

        // scroll_nav
        // scroll_to
        // scroll_to_id

        // shared_start

        // show_message
        // show_message_dismiss

        // theme_and_icon
        // theme_monitor

        // url_to_human_title
        // url_to_port
        // url_to_user_pass
    },
    'permissions': { // reference for permission functions
        'origins': [ // mirrored from the "host_permissions" array in our manifest file
            'http://*/*',
            'https://*/*'
        ]
    },
    'setting': { // settings used internally, not customizable by the user
        'log': true, // verbose logging for development, make sure this is false when publishing for end users
        'rule_debug': false // log information about matched declarativeNetRequest rules for development, make sure this is false when publishing for end users, not implemented yet in firefox 119
    },
    'timer': { // setTimeout references
        'theme_monitor': '' // will become a setTimeout call to run theme_monitor() every 10 seconds
    },
    'url': {
        'extension': browser.runtime.getURL('/') // returns a string like "chrome-extension://asdfghjkl/"
    }
} // shared

//-----------
// Functions
//-----------
const always_allow = shared.function.always_allow = function always_allow(hostname, root_domain) {
    /*
    Always allow certain hostnames and root domains.

    @param   {String}   hostname     Hostname like "listen.tidal.com"
    @param   {String}   root_domain  Root domain like "tidal.com"
    @return  {Boolean}  allow        True or false.
    */

    let allow = false // default

    if (hostname === 'addons.mozilla.org') {
        // the firefox browser add-ons site is always allowed
        allow = true
    } else if (hostname === 'chrome.google.com') {
        // the chrome web store is always allowed
        allow = true
    } else if (hostname === 'microsoftedge.microsoft.com') {
        // the microsoft edge add-ons site is always allowed
        allow = true
    } else if (root_domain === 'ko-fi.com' ||
        root_domain === 'nightmode.fm' ||
        root_domain === 'paypal.com' ||
        root_domain === 'stripe.com') {
        // the above root domains are always allowed
        allow = true
    } else if (hostname === '') {
        // non-http pages like "chrome-extension://" are always allowed
        allow = true
    } // if

    return allow
} // always_allow

const allow_script = shared.function.allow_script = function allow_script(hostname, root_domain) {
    /*
    Figure out if the extension is currently allowing a hostname or root domain.

    @param   {String}   hostname     Hostname like "listen.tidal.com"
    @param   {String}   root_domain  Root domain like "tidal.com"
    @return  {Boolean}  allow        True or false.
    */

    let allow = null // default which will be set to a boolean

    if (always_allow(hostname, root_domain) === true) {
        allow = true
    } else if (local.option.domain[hostname] !== undefined) {
        // there is a domain rule for this hostname
        allow = local.option.domain[hostname]
    } else if (local.option.domains[root_domain] !== undefined) {
        // there is a *.domain rule for this root domain
        allow = local.option.domains[root_domain]
    } else {
        // global rule
        allow = local.option.global
    } // if

    return allow
} // allow_script

const browser_rules_warnings = shared.function.browser_rules_warnings = function browser_rules_warnings(hostname, root_domain, url) {
    /*
    Figure out if any warnings are needed for a URL or if warnings are needed for a combination of the current browser rules and a URL.

    @param   {String}   hostname     Host name like "www.microsoft.com".
    @param   {String}   root_domain  Root domain like "microsoft.com".
    @param   {String}   url          URL like "https://www.microsoft.com/en-us/".
    @return  {Array}                 Array of warning strings like ["domain_credentials","domain_ports"] or an empty array.
    */

    const result = [] // default

    let domain_rule_url_check = false // default which can be set to true to do additional checks

    const allow_domain  = local.option.domain[hostname]
    const allow_domains = local.option.domains[root_domain]
    const allow_global  = local.option.global

    if (allow_domain === undefined && allow_domains === undefined && allow_global === true) {
        if (hostname === '') {
            // do not warn the user about this location since is most likely an always allowed location like "chrome://extensions/"
        } else {
            result.push('global_warn')
        } // if
    } // if

    if (allow_domain !== undefined) {
        // domain rule exists
        if (allow_domains !== undefined) {
            // domain rule and *.domains rule exist
            if (allow_domain !== allow_domains) {
                // domain rule and *.domains rule do NOT match
                domain_rule_url_check = true
            } else {
                // domain rule and *.domain rule match
                return result // return early
            } // if
        } else {
            // domain rule exists but a *.domains rule does not
            if (allow_domain !== allow_global) {
                // domain rule and global rule do NOT match
                domain_rule_url_check = true
            } else {
                // domain rule and global rule match
                return result // return early
            } // if
        } // if
    } // if

    if (domain_rule_url_check === true) {
        // a domain rule has been determined to be important and if it does not work because of a known issue, a *.domains or global rule will have the opposite effect of what the user wanted for this domain
        try {
            const obj = new URL(url)

            if (obj.protocol === 'http:' || obj.protocol === 'https:') {
                if (obj.username !== '' || obj.password !== '') {
                    // domain rules in the browser that use the simpler "urlFilter" matching logic can not deal with URLs that have a username or password specified before the hostname

                    result.push('domain_credentials')
                } // if

                if (obj.port !== '') {
                    // domain rules in the browser that use the simpler "urlFilter" matching logic can not deal with URLs that have odd port numbers

                    result.push('domain_ports')
                } // if
            } // if

        } catch (error) {
            log('browser_rules_warnings -> error', error)
        } // try
    } // if

    return result
} // browser_rules_warnings

const delay = shared.function.delay = function delay(ms) {
    /*
    Promise that will delay a desired number of milliseconds before resolving.

    @param   {Number}   ms  Number of milliseconds to delay.
    @return  {Promise}
    */

    return new Promise(resolve => setTimeout(resolve, ms))
} // delay

const expect = shared.function.expect = function expect(result, error_message) {
    /*
    Expect function for testing. Only throw an error if the result is not exactly true.

    @param  {Boolean}  result           True or false.
    @param  {String}   [error_message]  Optional. Error message to throw if result is not exactly true.
    */

    if (result !== true) {
        throw new Error(error_message)
    } // if
} // expect

const hostname_to_root_domain = shared.function.hostname_to_root_domain = function hostname_to_root_domain(hostname) {
    /*
    Return the root domain for a hostname if possible, otherwise an empty string.

    @param   {String}  hostname  Hostname like "www.microsoft.com".
    @return  {String}            Root domain like "microsoft.com".
    */

    let result = '' // default

    const array = hostname.split('.').reverse()

    if (array.length >= 3) {
        const country_code_second_level_domain = reference.second_level_domains.country_code.includes(array[1] + '.' + array[0])

        if (country_code_second_level_domain === true) {
            // country code second level domain detected
            // hostname like "www.amazon.co.uk"
            // root domain like "amazon.co.uk"
            result = array[2] + '.' + array[1] + '.' + array[0]
        } else {
            // hostname like "www.microsoft.com"
            // root domain like "microsoft.com"
            result = array[1] + '.' + array[0]
        } // if
    } else if (array.length === 2) {
        // hostname like "microsoft.com"
        // root domain like "microsoft.com"
        result = array[1] + '.' + array[0]
    } // if

    return result.toLowerCase()
} // hostname_to_root_domain

const listen_allow_permissions_button = shared.function.listen_allow_permissions_button = function listen_allow_permissions_button() {
    /*
    Listen for "Allow Permissions" button click events in order to prompt the user to allow origin permissions for Script Control in their browser.
    */

    const element = document.getElementById('allow-permissions')

    element.addEventListener('click', async function(e) {
        e.preventDefault()

        await permissions_request()
    })
} // listen_allow_permissions_button

const listen_mouse_events = shared.function.listen_mouse_events = function listen_mouse_events() {
    /*
    Listen for mousedown and mouseup events so mouse users do not get persistent focus effects after a click.
    */

    document.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('custom-filter')) {
            return 'early'
        } // if

        const node_name = e.target.nodeName.toLowerCase()

        if (node_name === 'a' || node_name === 'input') {
            e.preventDefault() // prevents focus state for mouse users
        } // if
    })

    document.addEventListener('mouseup', function(e) {
        if (e.target.classList.contains('custom-filter')) {
            return 'early'
        } // if

        const node_name = e.target.nodeName.toLowerCase()

        if (node_name === 'a' || node_name === 'input') {
            // blur anything that has focus since we just had a mouse click
            document.activeElement.blur()
        } // if
    })
} // listen_mouse_events

const listen_scroll_nav = shared.function.listen_scroll_nav = function listen_scroll_nav() {
    /*
    Listener for scroll events, resize events, and scroll nav clicks.
    */

    window.addEventListener('scroll', scroll_nav)

    window.addEventListener('resize', scroll_nav)

    local.element.scroll_nav.addEventListener('click', function(e) {
        e.preventDefault()
        location.hash = 'none' // since an empty hash would instantly jump the user to the top of the page, set a hash that does not exist to allow smooth scrolling to the top of the page
        scroll_to(0)
    })
} // listen_scroll_nav

const listen_scroll_to_links = shared.function.listen_scroll_to_links = function listen_scroll_to_links() {
    /*
    Setup event listeners for links with a "scroll-to" class in order to call scroll_to_id() for an HTML ID when clicked on.
    */

    const elements = document.getElementsByClassName('scroll-to')

    for (const item of elements) {
        item.addEventListener('click', function(e) {
            e.preventDefault()

            scroll_to_id(this.dataset.scrollTo)
        })
    } // for
} // listen_scroll_to_links

const listen_show_message_dismiss = shared.function.listen_show_message_dismiss = function listen_show_message_dismiss() {
    /*
    Setup event listeners for links with a "show-message-dismiss" class in order to call show_message_dismiss() for an HTML ID when clicked on.
    */

    const elements = document.getElementsByClassName('show-message-dismiss')

    for (const item of elements) {
        item.addEventListener('click', function(e) {
            e.preventDefault()

            // set the cursor on this button to the default cursor so a pointer cursor does not remain for anyone hovering over this button when show_message_dismiss() does its fade out and disappear animation
            e.target.classList.add('no-click')

            show_message_dismiss(this.dataset.id)
        })
    } // for
} // listen_show_message_dismiss

const location_hash_scroll_to = shared.function.location_hash_scroll_to = async function location_hash_scroll_to() {
    /*
    If a location hash starts with "#smooth-", scroll to an HTML element ID specified by whatever came after "#smooth-".
    */

    if (location.hash.indexOf('#smooth') === 0) {
        // slight delay so a user can notice a navigation change before scrolling down
        await delay(250)

        scroll_to_id(location.hash.replace('#smooth-', ''))
    } // if
} // location_hash_scroll_to

const log = shared.function.log = function log(...any) {
    /*
    Log to the console, if allowed.

    @param  {*}  any  Any one or more things that can be logged to the console.
    */

    if (shared.setting.log) {
        console.log(...any)
    } // if
} // log

const new_tab_url = shared.function.new_tab_url = async function new_tab_url(tab_url, tab_id) {
    /*
    If possible, return the real URL of a new tab instead of "about://newtab", "chrome://newtab/" or "edge://newtab/".

    @param  {String}  tab_url  Tab URL like "chrome://newtab/".
    @param  {Number}  tab_id   Tab ID number.
    */

    const details = {
        func: function(){},
        target: {
            'allFrames': false,
            'tabId': tab_id
        }
    } // details

    try {
        // expect the following to error which is fine because the error may have the information we need about the new tab
        await browser.scripting.executeScript(details)
    } catch (error) {
        // an expected error

        // firefox may report a "Missing host permission for the tab" for new tabs

        if (error.message.indexOf('Cannot access contents of url "') === 0) {
            tab_url = error.message.split('"')[1]
        } // if
    } // try

    return tab_url
} // new_tab_url

const parse_integer = shared.function.parse_integer = function parse_integer(value) {
    /*
    Return an integer version of a string or number, if possible.

    @param   {*}       value  A string or number.
    @return  {Number}         An integer, if possible.
    */

    return parseInt(value, 10)
} // parse_integer

const permissions_display = shared.function.permissions_display = function permissions_display() {
    /*
    Show or hide the permissions message area with instructions for the user.
    */

    if (shared.browser.firefox === true) {
        if (local.status.permissions === false) {
            permissions_show()
        } else {
            permissions_hide()
        } // if
    } // if
} // permissions_display

const permissions_hide = shared.function.permissions_hide = function permissions_hide() {
    /*
    Hide the permissions message area by using a fade out and disappear animation.
    */

    const element = document.getElementById('permissions')

    if (element.style.animationName === 'fade-out-disappear') {
        // we are already in the process of dismissing this element
        return 'early'
    } // if

    element.style.setProperty('--height', element.offsetHeight + 'px')

    element.style.animationName = 'fade-out-disappear'
} // permissions_hide

const permissions_request = shared.function.permissions_request = async function permissions_request() {
    /*
    Request permissions be set to match the "host_permissions" array in our manifest file.
    */

    // the following code should create a prompt for the user
    await browser.permissions.request(shared.permissions)
} // permissions_request

const permissions_show = shared.function.permissions_show = function permissions_show() {
    /*
    Show the permissions message area.
    */

    const element = document.getElementById('permissions')

    // properties which may have been previously added by permissions_dismiss()
    element.style.removeProperty('--height')
    element.style.removeProperty('animation-name')

    element.classList.remove('hidden')
} // permissions_show

const punycode_to_unicode = shared.function.punycode_to_unicode = function punycode_to_unicode(hostname) {
    /*
    Convert a punycode string to unicode, if needed.

    @param   {String}  hostname  Hostname like "xn--igbid2icr.xn--mgberp4a5d4ar".
    @return  {String}            Hostname like "أهلابك.السعودية".
    */

    let result = hostname // default

    if (hostname.indexOf('xn--') >= 0) {
        try {
            result = punycode.to_unicode(hostname)
        } catch (error) {
            log('punycode_to_unicode -> error ->', error)
        } // try
    } // if

    return result
} // punycode_to_unicode

const scroll_nav = shared.function.scroll_nav = function scroll_nav() {
    /*
    Show or hide the scroll to top navigation link near the scroll bar.
    */

    const element = local.element.html

    if (element.scrollHeight <= element.clientHeight) {
        // no scroll navigation needed
        local.element.scroll_nav.classList.add('hidden')

        return 'early'
    } // if

    if (element.scrollTop === 0) {
        // we are scrolled all the way to the top
        local.element.scroll_nav.classList.remove('fade-in')
        local.element.scroll_nav.classList.add('fade-out')
    } else {
        local.element.scroll_nav.classList.remove('fade-out', 'hidden')
        local.element.scroll_nav.classList.add('fade-in')
    } // if
} // scroll_nav

const scroll_to = shared.function.scroll_to = function scroll_to(offset_top) {
    /*
    Scroll the entire window to a specified pixel value offset from the top.

    @param  {Number}  num  Pixel value like 0 or 400.
    */

    if (typeof offset_top !== 'number') {
        // offset_top must be a number
        return 'early'
    } // if

    if (offset_top < 0) {
        offset_top = 0
    } // if

    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: offset_top
    })
} // scroll_to

const scroll_to_id = shared.function.scroll_to_id = function scroll_to_id(html_id) {
    /*
    Scroll the entire window to a specified ID for an HTML element.

    @param  {String}  html_id  ID of an HTML element to scroll to.
    */

    const element = document.getElementById(html_id)

    if (element === null) {
        // element not found
        return 'early'
    } // if

    let offset_top = element.offsetTop - 32

    if (offset_top < 0) {
        offset_top = 0
    } // if

    scroll_to(offset_top)

    // Setting a smooth prefixed hash will keep the browser from jumping directly to a matching element. It also enables a smooth scroll back to the same element after a reload or after a bookmark to a Script Control page with a location hash is clicked.
    location.hash = 'smooth-' + html_id
} // scroll_to_id

const shared_start = shared.function.shared_start = async function shared_start() {
    /*
    Shared start tasks that need to run before other scripts rely on the shared object. Must be run by other scripts so they can honor any await calls in this function.
    */

    // brave browser
    if (typeof navigator.brave === 'object') {
        if (typeof navigator.brave.isBrave === 'function') {
            shared.browser.brave = (await navigator.brave.isBrave() === true) ? true : false

            if (shared.browser.brave) {
                // set browser.chrome to false since brave looks like chrome when checking its navigator.userAgent string
                shared.browser.chrome = false
            } // if
        } // if
    } // if

    // edge and opera browsers
    if (shared.browser.edge || shared.browser.opera) {
        // set browser.chrome to false since these browsers look like chrome when checking their navigator.userAgent strings
        shared.browser.chrome = false
    } // if
} // shared_start

const show_message = shared.function.show_message = function show_message() {
    /*
    Show one or more messages to the user.
    */

    for (const property in local.setting.show_message) {
        if (local.setting.show_message[property] === true) {
            const html_id = 'show-message-' + property.replace(/_/g, '-')

            // unhide the message
            document.getElementById(html_id).classList.remove('hidden')

            // set the property to false
            local.setting.show_message[property] = false
        } // if
    } // for
} // show_message

const show_message_dismiss = shared.function.show_message_dismiss = function show_message_dismiss(html_id) {
    /*
    Hide an HTML element specified by an ID by using a fade out and disappear animation.

    @param  {String}  html_id  ID of an HTML element to fade out and disappear.
    */

    const element = document.getElementById(html_id)

    if (element.style.animationName === 'fade-out-disappear') {
        // we are already in the process of dismissing this element
        return 'early'
    } // if

    element.style.setProperty('--height', element.offsetHeight + 'px')

    element.style.animationName = 'fade-out-disappear'
} // show_message_dismiss

const theme_and_icon = shared.function.theme_and_icon = function theme_and_icon() {
    /*
    Update navigation links and if needed, change the URL location, body class, and favicon to match the current theme and icon color.
    */

    let browser_is_dark = local.preference.browser_is_dark
    let icon_color      = local.preference.icon_color
    let theme           = local.preference.theme

    if (local.page === 'popup') {
        theme = local.preference.theme_popup
    } // if

    const current_browser_is_dark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (browser_is_dark !== current_browser_is_dark) {
        // update our own local preference
        browser_is_dark = local.preference.browser_is_dark = current_browser_is_dark

        // relay changed information to the background service worker
        const message = {
            'subject': 'preference-set',
            'name'   : 'browser_is_dark',
            'value'  : browser_is_dark
        } // message

        try {
            local.port.postMessage(message)
        } catch (error) {
            log('theme_and_icon -> post message error ->', error)
        } // try
    } // if

    if (theme !== 'automatic' && theme !== 'dark' && theme !== 'light') {
        // set a valid default
        theme = 'automatic'
    } // if

    if (icon_color !== 'automatic' && icon_color !== 'blue' && icon_color !== 'dark' && icon_color !== 'light') {
        // set a valid default
        icon_color = 'automatic'
    } // if

    if (theme === 'automatic') {
        if (browser_is_dark === true) {
            theme = 'dark'
        } else {
            theme = 'light'
        } // if
    } // if

    if (icon_color === 'automatic') {
        if (browser_is_dark === true) {
            icon_color = 'light'
        } else {
            icon_color = 'dark'
        } // if
    } // if

    let theme_or_icon_changed = false // default

    const location_array = location.pathname.split('/') // results in an array like ["", "page", "dark", "light", "options.html"]

    const current_theme      = location_array[2] // dark
    const current_icon_color = location_array[3] // light
    const current_page       = location_array[4] // options.html

    if (theme !== current_theme) {
        // update body class
        document.body.classList.remove('dark', 'light')
        document.body.classList.add(theme)

        theme_or_icon_changed = true
    } // if

    if (icon_color !== current_icon_color) {
        // update favicon
        const favicon = document.querySelector("link[rel=icon]")

        if (favicon === null) {
            // popup pages do not use favicons
        } else {
            // update the favicon
            favicon.href = '/images/icon/logo/logo-' + icon_color + '-32.png?version=2025.1.2.0'
        } // if

        theme_or_icon_changed = true
    } // if

    if (theme_or_icon_changed === true) {
        if (local.page !== 'popup') {
            // update nav links
            const links = document.querySelectorAll('a.page')

            links.forEach(function(link) {
                if (link.href !== '') {
                    const location_array = link.href.replace(location.origin, '').split('/') // results in an array like ["", "page", "dark", "light", "about.html"]

                    // set theme
                    location_array[2] = theme

                    // set icon color
                    location_array[3] = icon_color

                    link.href = location_array.join('/')
                } // if
            })
        } // if

        const new_page_url = shared.url.extension + 'page/' + theme + '/' + icon_color + '/' + current_page + location.hash

        // update the location without affecting the back button
        history.replaceState(undefined, undefined, new_page_url)
    } // if
} // theme_and_icon

const theme_monitor = shared.function.theme_monitor = function theme_monitor() {
    /*
    Monitor the browser preferred color scheme every 10 seconds and call the "theme_and_icon" function as needed.
    */

    clearTimeout(shared.timer.theme_monitor)

    if (local.preference.browser_is_dark !== window.matchMedia('(prefers-color-scheme: dark)').matches) {
        log('theme_monitor -> prefers color scheme change')
        theme_and_icon()
    } // if

    shared.timer.theme_monitor = setTimeout(theme_monitor, 10000) // 10 seconds
} // theme_monitor

const url_to_hostname = shared.function.url_to_hostname = function url_to_hostname(url) {
    /*
    Return the hostname for a HTTP or HTTPS URL if possible, otherwise an empty string.

    @param   {String}  url  URL like "https://www.microsoft.com".
    @return  {String}       Hostname like "www.microsoft.com".
    */

    let result = '' // default

    try {
        const obj = new URL(url)

        if (obj.protocol === 'http:' || obj.protocol === 'https:') {
            result = obj.hostname.replace(/[\[\]]/g, '') // replace ipv6 brackets
        } // if
    } catch (error) {
        // url is probably an empty string
        // log('url_to_hostname -> error', error)
    } // try

    return result
} // url_to_hostname

const url_to_human_title = shared.function.url_to_human_title = function url_to_human_title(url) {
    /*
    Convert a URL to a more human friendly title, if needed.

    @param   {String}  url     URL string like "chrome://extensions/".
    @return  {String}          String like "Chrome Settings", "Special", or an empty string if a human friendly title is not needed.
    */

    let result = 'Special Pages' // default

    try {
        const link = new URL(url)

        switch (link.protocol) {
            case 'about:':
                if (link.pathname === 'newtab') {
                    result = 'New Tab'
                } else {
                    result = 'Firefox'
                } // if
                break
            case 'chrome:':
                if (link.hostname === 'newtab') {
                    result = 'New Tab'
                } else {
                    result = 'Chrome'
                } // if
                break
            case 'edge:':
                if (link.hostname === 'newtab') {
                    result = 'New Tab'
                } else {
                    result = 'Edge'
                } // if
                break
            case 'chrome-extension:':
                result = 'Extensions'
                break
            case 'chrome-search:':
                result = 'New Tab'
                break
            case 'file:':
                result = 'Files'
                break
            case 'ftp:':
                result = 'File Servers'
                break
            case 'http:':
                result = ''
                break
            case 'https:':
                result = ''
                break
            case 'moz-extension:':
                result = 'Add-ons'
                break
        } // switch

        if (link.hostname === 'addons.mozilla.org') {
            result = 'Firefox Browser Add-ons'
        } else if (link.hostname === 'chrome.google.com') {
            result = 'Chrome Web Store'
        } else if (link.hostname === 'microsoftedge.microsoft.com') {
            result = 'Microsoft Edge Add-ons'
        } else if (link.hostname === 'ko-fi.com' ||
            link.hostname.slice(-10) === '.ko-fi.com') {
            result = 'Ko-fi'
        } else if (link.hostname === 'nightmode.fm' ||
            link.hostname.slice(-13) === '.nightmode.fm') {
            result = 'Nightmode FM'
        } else if (link.hostname === 'paypal.com' ||
            link.hostname.slice(-11) === '.paypal.com') {
            result = 'PayPal'
        } else if (link.hostname === 'stripe.com' ||
            link.hostname.slice(-11) === '.stripe.com') {
            result = 'Stripe'
        } // if
    } catch (error) {
        // url is probably an empty string
        // log('url_to_human_title -> error', error)
    } // try

    return result
} // url_to_human_title

const url_to_port = shared.function.url_to_port = function url_to_port(url) {
    /*
    Return the port number for a URL if possible, otherwise 0.

    @param   {String}  url     URL like "https://www.microsoft.com:8080/en-us/".
    @return  {Number}          A valid port number like 8080 or 0 if a port number could not be determined.
    */

    let result = 0 // default

    try {
        const obj = new URL(url)

        if (obj.port !== '') {
            result = parseInt(obj.port, 10)
        } else if (obj.protocol === 'https:') {
            result = 443
        } else if (obj.protocol === 'http:') {
            result = 80
        } // if
    } catch (error) {
        log('url_to_port -> error', error)
    } // try

    return result
} // url_to_port

const url_to_user_pass = shared.function.url_to_user_pass = function url_to_user_pass(url) {
    /*
    Return the username and password for a URL, if possible.

    @param   {String}  url     URL like "https://user:pass@www.microsoft.com".
    @return  {Object}          Object like {username:"user",password:"pass"} or {username:"",password:""} if a username and password could not be determined.
    */

    let result = {
        'username': '',
        'password': ''
    } // result

    try {
        const obj = new URL(url)

        if (obj.username !== '') {
            result.username = obj.username
        } // if

        if (obj.password !== '') {
            result.password = obj.password
        } // if
    } catch (error) {
        log('url_to_user_pass -> error', error)
    } // try

    return result
} // url_to_user_pass