'use strict'

//-----------
// Variables
//-----------
const local = {
    'checkbox': { // will be set to the current boolean checkbox status for each option
        'domain' : null,
        'domains': null,
        'global' : null
    },
    'class': { // will hold various classes
        // custom_checkbox
    },
    'element': {
        'checkbox_special'      : document.getElementById('checkbox-special'),
        'link_options'          : document.getElementById('link-options'),
        'loading'               : document.getElementById('loading'),
        'popup_wrapper'         : document.getElementById('popup-wrapper'),
        'row_domain'            : document.getElementById('popup-options-row-domain'),
        'row_domains'           : document.getElementById('popup-options-row-domains'),
        'row_special'           : document.getElementById('popup-options-row-special'),
        'summary'               : document.getElementById('popup-summary'),
        'title_domain'          : document.getElementById('popup-options-title-domain'),
        'title_domains'         : document.getElementById('popup-options-title-domains'),
        'title_special'         : document.getElementById('popup-options-title-special')
    },
    'function': { // will hold various functions
        // custom_elements_define

        // listen_checkboxes
        // listen_link_option

        // listener_port_disconnect
        // listener_port_message
        // listener_tab_updated

        // port_connect
        // port_listeners
        // port_message_init_popup

        // start
        // start_continue

        // tab_current

        // update_display_domain
        // update_display_domains
        // update_display_global
        // update_display_special
        // update_display_summary
    },
    'option': { // will hold values from background.js
        // domain
        // domains
        // global
    },
    'page': 'popup', // the name of this page
    'port': null, // will be set by port_connect() and used to communicate with the background service worker
    'preference': { // will hold values from background.js
        // badge_text
        // browser_is_dark
        // global_warn
        // icon_color
        // theme
        // theme_popup
    },
    'start_continue': false, // will be set true once the "start_continue" function runs
    'status': { // will hold values from background.js
        // permissions
    },
    'tab': { // will be set by tab_current()
        'hostname'         : '',
        'human_hostname'   : '',
        'human_root_domain': '',
        'human_title'      : '',
        'id'               : 0,
        'root_domain'      : '',
        'url'              : '',
        'warning'          : false,
        'warnings'         : []
    },
    'troubleshoot': null // generic troubleshooting placeholder
} // local

//---------
// Classes
//---------
const custom_checkbox = local.class.custom_checkbox = class custom_checkbox extends HTMLInputElement {
    /*
    Custom Checkbox Element.
    */

    constructor() {
        super() // setup object inheritance

        const property = this.dataset.option // for example, global for local.option.global

        const value = (this.value === 'true') // convert string to boolean

        this.addEventListener('click', function(e) {
            // listening to click events means we will only get notified about user actions and not our own activity when we set the checked property to true or false
            e.preventDefault()
            e.stopPropagation()

            if (property === 'global') {
                if (value === local.option.global) {
                    // value already set
                    return 'early'
                }
            } else if (property === 'none' || property === 'special') {
                // display only options
                return 'early'
            } // if

            const hostname = local.tab.hostname
            const root_domain = local.tab.root_domain

            switch (property) {
                case 'global':
                    local.option.global = value
                    local.checkbox.global = value

                    log('custom_checkbox -> global -> set to ' + value)

                    break
                case 'domains':
                    if (root_domain === '') {
                        // not a valid root domain
                        return 'early'
                    } // if

                    if (local.option.domains[root_domain] === value) {
                        // this exact option was already set so a click on this option means to unset it
                        delete local.option.domains[root_domain]

                        local.checkbox.domains = !value

                        log('custom_checkbox -> domains -> removed option for ' + root_domain)
                    } else {
                        local.option.domains[root_domain] = value
                        local.checkbox.domains = value

                        log('custom_checkbox -> domains -> set domains option to ' + value + ' for ' + root_domain)
                    } // if

                    break
                case 'domain':
                    if (hostname === '') {
                        // not a valid hostname
                        return 'early'
                    } // if

                    if (local.option.domain[hostname] === value) {
                        // this exact option was already set so a click on this option means to unset it
                        delete local.option.domain[hostname]

                        local.checkbox.domain = !value

                        log('custom_checkbox -> domain -> removed option for ' + hostname)
                    } else {
                        local.option.domain[hostname] = value
                        local.checkbox.domain = value

                        log('custom_checkbox -> domain -> set domain option to ' + value + ' for ' + hostname)
                    } // if

                    break
            } // switch

            // update warnings array and warning boolean
            local.tab.warnings = browser_rules_warnings(hostname, root_domain, local.tab.url)
            local.tab.warning = local.tab.warnings.length > 0 // true or false

            // for each switch case below, delay for 0 milliseconds to avoid chrome not showing a checkbox as checked or unchecked due to e.preventDefault()
            switch (property) {
                case 'global':
                    setTimeout(update_display_global, 0)
                    break
                case 'domains':
                    setTimeout(update_display_domains, 0)
                    break
                case 'domain':
                    setTimeout(update_display_domain, 0)
                    break
            } // switch

            // relay option to background.js
            const message = {
                'subject': 'option-set',
                'name'   : property,
                'value'  : local.option[property]
            } // message

            local.port.postMessage(message)
        })
    } // constructor
} // custom_checkbox

//-----------
// Functions
//-----------
const custom_elements_define = local.function.custom_elements_define = function custom_elements_define() {
    /*
    Define Custom Elements for programmatic use and also upgrades any existing HTML elements with matching "is" properties.
    */

    if (customElements.get('custom-checkbox') === undefined) {
        // a custom checkbox element has not been defined yet

        customElements.define('custom-checkbox', custom_checkbox, {
            extends: 'input'
        })
    } // if
} // custom_elements_define

const listen_checkboxes = shared.function.listen_checkboxes = function listen_checkboxes() {
    /*
    Listen for checkbox mousedown and mouseup events so mouse users do not get persistent focus effects after a click.
    */

    const items = document.querySelectorAll('input[type=checkbox]')
    const items_length = items.length

    for (let i = 0; i < items_length; i++) {
        items[i].addEventListener('mousedown', function(e) {
            e.preventDefault() // prevents focus state for mouse users
        })

        items[i].addEventListener('mouseup', function(e) {
            // blur anything that has focus since we just had a mouse click
            document.activeElement.blur()
        })
    } // for
} // listen_checkboxes

const listen_link_option = shared.function.listen_link_option = function listen_link_option() {
    /*
    Listen for option link clicks.
    */

    const event_handler = function(e) {
        e.preventDefault()
        e.stopPropagation()

        try {
            const message = {
                'subject': 'page-options'
            } // message

            local.port.postMessage(message)

            if (shared.browser.firefox) {
                try {
                    window.close()
                } catch (error) {
                    log('listen_link_option -> firefox error ->', error)
                } // try
            } // if
        } catch (error) {
            log('listen_link_option -> error ->', error)
        } // try
    } // event_handler

    local.element.link_options.addEventListener('auxclick', event_handler)
    local.element.link_options.addEventListener('click',    event_handler)
    local.element.link_options.addEventListener('dblClick', event_handler)
} // listen_link_option

const listener_port_disconnect = local.function.listener_port_disconnect = function listener_port_disconnect() {
    /*
    Listener for local.port.onDisconnect events.
    */

    // disconnect events will not happen if a background service worker goes inactive however... local.port remains valid and messages can be sent through it to activate an inactive service worker

    log('listener_port_disconnect -> disconnected')

    local.port = null // default

    setTimeout(function() {
        port_connect()
        port_listeners()
    }, 1000)
} // listener_port_disconnect

const listener_port_message = local.function.listener_port_message = async function listener_port_message(obj, info) {
    /*
    Listener for local.port.onMessage events.

    @param  {Object}  obj   Object like {subject:"init-popup"}
    @param  {Object}  info  Not used. Object with the properties disconnect, name, onDisconnect, onMessage, postMessage, and sender.
    */

    switch (obj.subject) {
        case 'init-popup':
            log('listener_port_message -> init-popup')

            local.option     = obj.option
            local.preference = obj.preference
            local.status     = obj.status

            await start_continue()

            break
        case 'option-set':
            local.option[obj.name] = obj.value

            log('listener_port_message -> option-set -> set local.option.' + obj.name)

            // the "global_warn" warning may have changed due to adding or removing a domain or *.domain option
            local.tab.warnings = browser_rules_warnings(local.tab.hostname, local.tab.root_domain, local.tab.url)
            local.tab.warning = local.tab.warnings.length > 0 // true or false

            switch (obj.name) {
                case 'domain':
                    update_display_domain()
                    break
                case 'domains':
                    update_display_domains()
                    break
                case 'global':
                    update_display_global()
                    break
            } // switch

            break
        case 'popup-tab-activated':
            log('listener_port_message -> popup-tab-activated ->', obj.value)

            if (local.tab.id !== obj.value) {
                try {
                    window.close()
                } catch (error) {
                    log('listener_port_message -> popup-tab-activated -> error ->', error)
                } // try
            } // if

            break
        case 'preference-set':
            local.preference[obj.name] = obj.value

            log('listener_port_message -> preference-set -> set local.preference.' + obj.name)

            switch (obj.name) {
                case 'badge_text':
                    // not used on this page

                    break
                case 'browser_is_dark':
                    theme_and_icon() // from shared.js

                    break
                case 'global_warn':
                    update_display_summary()

                    break
                case 'icon_color':
                    theme_and_icon() // from shared.js

                    break
                case 'theme':
                    // not used on this page

                    break
                case 'theme_popup':
                    theme_and_icon() // from shared.js

                    break
            } // switch

            break
        case 'status-permissions':
            log('listener_port_message -> status-permissions -> ' + obj.value)

            local.status.permissions = obj.value

            update_display_summary()

            break
        default:
            log('listener_port_message -> unknown obj.subject', obj)

            break
    } // switch
} // listener_port_message

const listener_tab_updated = local.function.listener_tab_updated = async function listener_tab_updated(tab_id, change_info, tab) {
    /*
    Listener function for browser.tabs.onUpdated events.

    @param  {Number}  tab_id       ID of the tab that was updated.
    @param  {Object}  change_info  Various change information. More info at
        https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated#changeInfo
    @param  {Object}  tab          Various tab information. More info at
        https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab
    */

    if (tab_id === local.tab.id) {
        // this event is for the tab this popup is associated with

        let tab_changed = false // default

        if (local.tab.hostname === '') {
            if (local.tab.hostname !== url_to_hostname(tab.url)) {
                tab_changed = true
            }
        } else {
            // hostname is empty so compare URL instead
            if (local.tab.url !== tab.url) {
                tab_changed = true
            }
        } // if

        if (tab_changed === false) {
            return 'early'
        } // if

        if (change_info.status === 'loading' || change_info.status === 'complete') {
            local.tab = await tab_current()

            update_display_global() // this will also call update_display_domains(), update_display_domain(), update_display_special(), and update_display_summary()
        } // if
    } // if
} // listener_tab_updated

const port_connect = local.function.port_connect = function port_connect() {
    /*
    Connect a port to the background service worker.
    */

    local.port = browser.runtime.connect({
        name: 'popup'
    })
} // port_connect

const port_listeners = local.function.port_listeners = function port_listeners() {
    /*
    Add port event listeners.
    */

    local.port.onMessage.addListener(listener_port_message)

    local.port.onDisconnect.addListener(listener_port_disconnect)

    log('port_listeners -> active')
} // port_listeners

const port_message_init_popup = local.function.port_message_init_popup = function port_message_init_popup() {
    /*
    Send a message to the background service worker.
    */

    const message = {
        'subject': 'init-popup'
    } // message

    local.port.postMessage(message)
} // port_message_init_popup

const start = local.function.start = function start() {
    /*
    Start the popup page.
    */

    // fade in the loading animation
    local.element.loading.classList.add('fade-in')

    listen_checkboxes()
    listen_link_option()

    port_connect()
    port_listeners()

    // request data from background.js
    port_message_init_popup()

    // startup will continue in start_continue() once listener_port_message() receives an "init-popup" message

    setTimeout(function() {
        if (local.start_continue === false) {
            log('start -> start continue false after 3 seconds -> request init popup again')

            // request data from background.js again
            port_message_init_popup()
        }
    }, 3000)
} // start

const start_continue = local.function.start_continue = async function start_continue() {
    /*
    Continue to start the popup page.
    */

    if (local.start_continue === true) {
        // this function should only run once so return early
        return 'early'
    } // if

    local.start_continue = true

    local.tab = await tab_current()

    theme_and_icon() // from shared.js
    theme_monitor() // from shared.js, will run once and then keep running once every 10 seconds

    custom_elements_define()
    update_display_global() // this will also call update_display_domains(), update_display_domain(), update_display_special(), and update_display_summary()

    // hide the loading animation and show options
    local.element.loading.classList.add('hidden')
    local.element.popup_wrapper.classList.add('visible')

    // listen for tab updates in case the tab associated with this popup changes
    browser.tabs.onUpdated.addListener(listener_tab_updated)
} // start_continue

const tab_current = local.function.tab_current = async function tab_current() {
    /*
    If possible, return the human title, tab id, root domain, and URL of an active tab of an active window.

    @return  {Object}
    */

    // default result to return
    const result = {
        'hostname'         : '',
        'human_hostname'   : '',
        'human_root_domain': '',
        'human_title'      : '',
        'id'               : 0,
        'root_domain'      : '',
        'url'              : '',
        'warning'          : false,
        'warnings'         : []
    } // result

    try {
        const query_options = {
            populate: true,
            windowTypes: ['normal']
        } // query_options

        const one_window = await browser.windows.getCurrent(query_options)

        const tab = one_window.tabs.find(tab => tab.active === true)

        let tab_url = tab.url

        if (tab_url === 'about:newtab' ||
            tab_url === 'chrome://newtab/' ||
            tab_url === 'edge://newtab/') {
            // log('tab_current -> new tab detected')
            tab_url = await new_tab_url(tab_url, tab.id)
        } // if

        const hostname = url_to_hostname(tab_url)
        const root_domain = hostname_to_root_domain(hostname)

        const warnings = browser_rules_warnings(hostname, root_domain, tab_url)
        const warning = warnings.length > 0 // true or false

        result.hostname          = hostname
        result.human_hostname    = punycode_to_unicode(hostname)
        result.human_root_domain = punycode_to_unicode(root_domain)
        result.human_title       = url_to_human_title(tab_url)
        result.id                = tab.id
        result.root_domain       = root_domain
        result.url               = tab_url
        result.warning           = warning
        result.warnings          = warnings
    } catch (error) {
        // an error most likely means there are no windows open
        log('tab_current -> error ->', error.message)
    } // try

    return result
} // tab_current

const update_display_special = local.function.update_display_special = function update_display_special() {
    /*
    Update the display of the special area.
    */

    if (local.checkbox.domains === null && local.checkbox.domain === null) {
        // show this row
        local.element.title_special.textContent = local.tab.human_title

        let add_or_remove = 'remove' // default

        if (local.tab.warning === true) {
            if (local.preference.global_warn === 'hide' && local.tab.warnings.toString() === 'global_warn') {
                // user does not need to be notified about global warnings
            } else if (always_allow(local.tab.hostname, local.tab.root_domain) === true) {
                // no warning needed for a hostname or root domain that is always allowed
            } else {
                add_or_remove = 'add'
            } // if
        } // if

        local.element.checkbox_special.classList[add_or_remove]('checkbox-warning')

        local.element.row_special.classList.remove('hidden')
    } else {
        // hide this row
        local.element.row_special.classList.add('hidden')
    } // if

    // now update the display of the summary area
    update_display_summary()
} // update_display_special

const update_display_domain = local.function.update_display_domain = function update_display_domain() {
    /*
    Update the checked state of each domain option checkbox.
    */

    const hostname = local.tab.hostname

    if (hostname === '' || local.tab.human_title !== '') {
        // hide this option
        local.element.row_domain.classList.add('hidden')
    } else {
        // update and show this option

        local.element.title_domain.textContent = local.tab.human_hostname

        document.querySelectorAll('[data-option=domain]').forEach(function(checkbox) {
            const value = (checkbox.value === 'true')

            checkbox.classList.remove('checkbox-true-default', 'checkbox-false-default', 'checkbox-warning')

            if (local.option.domain[hostname] === undefined) {
                // set default display based on inheritance
                checkbox.checked = false

                let inherit = false // default

                if (local.checkbox.domains === null) {
                    // domains not available so probably an ip address
                    // inherit from global setting instead
                    if (value === local.checkbox.global) {
                        inherit = true
                    } // if
                } else {
                    if (value === local.checkbox.domains) {
                        inherit = true
                    } // if
                } // if

                if (inherit) {
                    local.checkbox.domain = value
                    checkbox.classList.add('checkbox-' + value + '-default')
                } // if
            } else {
                // set display based on domain option
                if (value === local.option.domain[hostname]) {
                    local.checkbox.domain = value

                    checkbox.checked = true

                    if (local.tab.warning === true) {
                        const domain_warning = local.tab.warnings.filter(warning => warning.indexOf('domain_') === 0).length > 0

                        if (domain_warning === true) {
                            checkbox.classList.add('checkbox-warning')
                        } // if
                    } // if
                } else {
                    checkbox.checked = false
                } // if
            } // if
        }) // document.querySelectorAll

        local.element.row_domain.classList.remove('hidden')
    } // if

    // now update the display of the special area
    update_display_special()
} // update_display_domain

const update_display_domains = local.function.update_display_domains = function update_display_domains() {
    /*
    Update the checked state of each domains option checkbox.
    */

    const root_domain = local.tab.root_domain

    if (root_domain === '' || local.tab.human_title !== '') {
        // hide this option
        local.element.row_domains.classList.add('hidden')
    } else {
        // update and show this option

        let title = local.tab.human_root_domain

        if (/[\u0591-\u07FF]/.test(local.tab.human_root_domain) === true) {
            // arabic or hebrew detected
            title += '.*'
        } else {
            // all other languages
            title = '*.' + title
        } // if

        local.element.title_domains.textContent = title

        document.querySelectorAll('[data-option=domains]').forEach(function(checkbox) {
            const value = (checkbox.value === 'true')

            checkbox.classList.remove('checkbox-true-default', 'checkbox-false-default')

            if (local.option.domains[root_domain] === undefined) {
                // set default display based on inheritance
                checkbox.checked = false

                if (value === local.checkbox.global) {
                    local.checkbox.domains = value
                    checkbox.classList.add('checkbox-' + value + '-default')
                } // if
            } else {
                if (value === local.option.domains[root_domain]) {
                    local.checkbox.domains = value
                    checkbox.checked = true
                } else {
                    checkbox.checked = false
                } // if
            } // if
        }) // document.querySelectorAll

        local.element.row_domains.classList.remove('hidden')
    } // if

    // now update the display of the domain row
    update_display_domain()
} // update_display_domains

const update_display_global = local.function.update_display_global = function update_display_global() {
    /*
    Update the checked state of each global option checkbox.
    */

    document.querySelectorAll('[data-option=global]').forEach(function(checkbox) {
        const value = (checkbox.value === 'true')

        if (value === local.option.global) {
            local.checkbox.global = value
            checkbox.checked = true
        } else {
            checkbox.checked = false
        } // if
    })

    // now update the display of the domains row
    update_display_domains()
} // update_display_global

const update_display_summary = local.function.update_display_summary = function update_display_summary() {
    /*
    Update the display of the summary area.
    */

    let summary = undefined // will be set to an actual description
    let summary_style_allow = false // default
    let summary_style_class = 'popup-summary-block' // default

    const human_title = local.tab.human_title

    // allow special case
    if (human_title !== '') {
        summary_style_allow = true

        if (human_title === 'New Tab') {
            summary = 'New Tabs are always allowed.'
        } else if (human_title.slice(-1) === 's') {
            summary = human_title + ' are always allowed.'
        } else {
            const prefix = (human_title === 'Chrome Web Store') ? 'The ' : ''

            summary = prefix + human_title + ' is always allowed.'
        } // if
    } // if

    // domain option
    if (summary === undefined) {
        if (local.option.domain[local.tab.hostname] === true) {
            summary = 'Allowing the ' + local.tab.human_hostname + ' domain.'
            summary_style_allow = true
        } else if (local.option.domain[local.tab.hostname] === false) {
            summary = 'Blocking the ' + local.tab.human_hostname + ' domain.'
        } // if
    } // if

    // domains option
    if (summary === undefined) {
        if (local.option.domains[local.tab.root_domain] === true) {
            summary = 'Allowing all ' + local.tab.human_root_domain + ' domains.'
            summary_style_allow = true
        } else if (local.option.domains[local.tab.root_domain] === false) {
            summary = 'Blocking all ' + local.tab.human_root_domain + ' domains.'
        } // if
    } // if

    // global option
    if (summary === undefined) {
        if (local.option.global === true) {
            summary = 'Allowing globally.'
            summary_style_allow = true
        } else {
            summary = 'Blocking globally.'
        } // if
    } // if

    // warnings
    let show_warning = false // default

    if (local.tab.warning === true) {
        if (local.preference.global_warn === 'hide' && local.tab.warnings.toString() === 'global_warn') {
            // user does not need to be notified about global warnings
        } else if (always_allow(local.tab.hostname, local.tab.root_domain) === true) {
            // no warning needed for a hostname or root domain that is always allowed
        } else {
            show_warning = true
        } // if
    } // if

    if (local.status.permissions === false) {
        summary_style_class = 'popup-summary-warning'

        summary = 'Script Control requires permissions to function. Please visit the options page for more information.'
    } else if (show_warning === true) {
        summary_style_class = 'popup-summary-warning'

        summary = '' // reset for custom warnings

        const line_breaks = `

        ` // two line breaks

        const domains_verb = (local.option.domains[local.tab.root_domain] === undefined) ? 'adding' : 'modifying'

        if (local.tab.warnings.includes('domain_credentials')) {
            const credentials = url_to_user_pass(local.tab.url)

            if (credentials.username === '') {
                credentials.username = 'username'
            } // if

            if (credentials.password === '') {
                credentials.password = 'password'
            } // if

            summary = 'WARNING: Individual domain rules are not complex enough to support embedded credentials like "' + credentials.username + '/' + credentials.password + '".' + line_breaks

            summary += 'Consider ' + domains_verb + ' a *.domain rule to support embedded credentials.'
        } else if (local.tab.warnings.includes('domain_ports')) {
            summary = 'WARNING: Individual domain rules are not complex enough to support custom ports like ' + url_to_port(local.tab.url) + '.' + line_breaks

            summary += 'Consider ' + domains_verb + ' a *.domain rule to support custom ports.'
        } else if (local.tab.warnings.includes('global_warn')) {
            summary = 'WARNING: Global allow is enabled.'
        } // if
    } else {
        if (summary_style_allow === true) {
            summary_style_class = 'popup-summary-allow'
        } // if
    } // if

    local.element.summary.classList.remove('popup-summary-allow', 'popup-summary-block', 'popup-summary-warning')

    local.element.summary.classList.add(summary_style_class)

    local.element.summary.textContent = summary
} // update_display_summary

//-------
// Start
//-------
start()