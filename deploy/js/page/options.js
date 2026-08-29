'use strict'

//-----------
// Variables
//-----------
const local = {
    'class': { // will hold various classes
        // custom_checkbox
        // custom_clear_or_undo
        // custom_filter
        // custom_select
    },
    'display': { // display information based on local.option.domains and local.option.domain
        'domains': {
            // 'microsoft.com': {
            //     'allow'     : true,  // true or false
            //     'removed'   : false, // true or false
            //     'title'     : '*.microsoft.com',
            //     'title_sort': 'microsoft.com'
            // }
        },
        'domain': {
            // 'www.microsoft.com': {
            //     'allow'     : true,  // true or false
            //     'removed'   : false, // true or false
            //     'title'     : 'www.microsoft.com',
            //     'title_sort': 'microsoft.com'
            // }
        }
    },
    'element': {
        'content'                            : document.getElementById('content'),
        'html'                               : document.getElementById('html'),
        'loading'                            : document.getElementById('loading'),
        'options_title_global'               : document.getElementById('options-title-global'),
        'options_domain'                     : document.getElementById('options-domain'),
        'options_domain_loading'             : document.getElementById('options-domain-loading'),
        'options_domains'                    : document.getElementById('options-domains'),
        'options_domains_loading'            : document.getElementById('options-domains-loading'),
        'options_filter_domain'              : document.getElementById('options-filter-domain'),
        'options_filter_domain_clear'        : document.getElementById('options-filter-domain-clear'),
        'options_filter_domain_text'         : document.getElementById('options-filter-domain-text'),
        'options_filter_domains'             : document.getElementById('options-filter-domains'),
        'options_filter_domains_clear'       : document.getElementById('options-filter-domains-clear'),
        'options_filter_domains_text'        : document.getElementById('options-filter-domains-text'),
        'options_list_area_domain'           : document.getElementById('options-list-area-domain'),
        'options_list_area_domains'          : document.getElementById('options-list-area-domains'),
        'options_paginate_domain'            : document.getElementById('options-paginate-domain'),
        'options_paginate_domains'           : document.getElementById('options-paginate-domains'),
        'options_sort_domain'                : document.getElementById('options-sort-domain'),
        'options_sort_domains'               : document.getElementById('options-sort-domains'),
        'scroll_nav'                         : document.getElementById('scroll-nav'),
        'template_options_domain_no_results' : document.getElementById('template-options-domain-no-results'),
        'template_options_domain_no_rules'   : document.getElementById('template-options-domain-no-rules'),
        'template_options_domain_row'        : document.getElementById('template-options-domain-row'),
        'template_options_domains_no_results': document.getElementById('template-options-domains-no-results'),
        'template_options_domains_no_rules'  : document.getElementById('template-options-domains-no-rules'),
        'template_options_domains_row'       : document.getElementById('template-options-domains-row')
    },
    'filter': { // default filter strings which can be changed by the user
        'domain': '',
        'domains': ''
    },
    'function': { // will hold various functions
        // custom_elements_define

        // listen_filter_clear
        // listen_pagination
        // listener_port_disconnect
        // listener_port_message

        // locale_compare

        // port_connect
        // port_listeners
        // port_message_init_options

        // show_content

        // start
        // start_continue

        // update_display_domain
        // update_display_domains
        // update_display_filter_sort
        // update_display_global
        // update_display_info
        // update_display_paginate
        // update_display_paginate_page
    },
    'option': { // will hold values from background.js
        // domain
        // domains
        // global
    },
    'page': 'options', // the name of this page
    'paginate': { // default settings which can be changed when paging through options
        'display': 10, // items to show per page
        'domain': 1,  // default page number
        'domains': 1, // default page number
        'navigate': {
            'domain': '', // can be set to "first", "next", "previous", or "last"
            'domains': '' // can be set to "first", "next", "previous", or "last"
        }
    },
    'port': null, // will be set by port_connect() and used to communicate with the background service worker
    'preference': { // will hold values from background.js
        // badge_text
        // browser_is_dark
        // global_warn
        // icon_color
        // theme
        // theme_popup
    },
    'setting': {  // will hold values from background.js
        // mandatory_options
        // show_message
    },
    'sort': { // default sort methods which can be changed by the user
        'domain': 'a-z', // "a-z", "z-a", "allow-block", or "block-allow"
        'domains': 'a-z' // "a-z", "z-a", "allow-block", or "block-allow"
    },
    'status': { // will hold values from background.js
        // permissions
    }
} // local

//---------
// Classes
//---------
const custom_checkbox = local.class.custom_checkbox = class custom_checkbox extends HTMLInputElement {
    /*
    Custom checkbox element.
    */

    constructor() {
        super() // setup object inheritance

        const property = this.dataset.optionType // for example, global for local.option.global

        const domain = this.dataset.option

        const value = (this.value === 'true') // convert string to boolean

        this.addEventListener('click', function(e) {
            // listening to click events means we will only get notified about user actions and not our own activity when we set the checked property to true or false
            e.preventDefault()
            e.stopPropagation()

            if (property === 'global') {
                if (value === local.option.global) {
                    // value already set
                    return 'early'
                } // if
            } // if

            switch (property) {
                case 'domain':
                    if (local.option.domain[domain] === value) {
                        // this exact option was already set so a click on this option means to unset it
                        delete local.option.domain[domain]

                        local.display.domain[domain].removed = true

                        log('custom_checkbox -> domain -> removed option for ' + domain)
                    } else {
                        local.option.domain[domain] = value

                        log('custom_checkbox -> domain -> set domain option to ' + value + ' for ' + domain)
                    } // if

                    break
                case 'domains':
                    if (local.option.domains[domain] === value) {
                        // this exact option was already set so a click on this option means to unset it
                        delete local.option.domains[domain]

                        local.display.domains[domain].removed = true

                        log('custom_checkbox -> domains -> removed option for ' + domain)
                    } else {
                        local.option.domains[domain] = value

                        log('custom_checkbox -> domains -> set domains option to ' + value + ' for ' + domain)
                    } // if

                    break
                case 'global':
                    local.option.global = value

                    log('custom_checkbox -> global -> set to ' + value)

                    break
            } // switch

            // for each switch case below, delay for 0 milliseconds to avoid chrome not showing a checkbox as checked or unchecked due to e.preventDefault()
            switch (property) {
                case 'domain':
                    setTimeout(update_display_domain, 0)
                    break
                case 'domains':
                    setTimeout(update_display_domains, 0)
                    break
                case 'global':
                    setTimeout(update_display_global, 0)
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

const custom_clear_or_undo = local.class.custom_clear_or_undo = class custom_clear_or_undo extends HTMLAnchorElement {
    /*
    Custom anchor element.
    */

    constructor() {
        super() // setup object inheritance

        const property = this.dataset.option // "domain" or "domains"

        this.addEventListener('click', function(e) {
            e.preventDefault()

            const action   = this.dataset.action // "clear" or "undo"
            const domain   = this.dataset.option
            const property = this.dataset.optionType // "domain" or "domains"

            log('custom_clear_or_undo -> ' + action + ' for ' + property + ' property -> ' + domain)

            if (action === 'clear') {
                // clear as in remove this display only option
                delete local.display[property][domain]
            } else if (action === 'undo') {
                // restore option by setting it
                local.option[property][domain] = local.display[property][domain].allow

                // set display only option back to normal
                local.display[property][domain].removed = false

                // relay option to background.js
                const message = {
                    'subject': 'option-set',
                    'name'   : property,
                    'value'  : local.option[property]
                } // message

                local.port.postMessage(message)
            } // if

            if (property === 'domain') {
                update_display_domain()
            } else if (property === 'domains') {
                update_display_domains()
            } // if
        })
    } // constructor
} // custom_clear_or_undo

const custom_filter = local.class.custom_filter = class custom_filter extends HTMLInputElement {
    /*
    Custom input text element for filtering *.domain and domain options.
    */

    constructor() {
        super() // setup object inheritance

        const property = this.dataset.option // "domain" or "domains"

        this.addEventListener('input', function(e) {
            e.stopPropagation()

            let value = this.value

            try {
                value = value.trim()

                if (value !== this.value) {
                    // filter had spaces trimmed
                    this.value = value
                } // if

                value = value.toLowerCase()
            } catch (error) {
                // do nothing
            } // try

            // set local filter property so it can persist while this page is open
            local.filter[property] = value

            // reset current page to 1 since filter changed
            local.paginate[property] = 1

            if (value === '') {
                // hide filter clear button
                local.element['options_filter_' + property + '_clear'].classList.add('hidden')
            } else {
                // show filter clear button
                local.element['options_filter_' + property + '_clear'].classList.remove('hidden')
            } // if

            if (property === 'domain') {
                update_display_domain()
            } else if (property === 'domains') {
                update_display_domains()
            } // if
        })
    } // constructor
} // custom_filter

const custom_select = local.class.custom_select = class custom_select extends HTMLSelectElement {
    /*
    Custom select element.
    */

    constructor() {
        super() // setup object inheritance

        const property = this.dataset.option // "domain" or "domains"

        this.addEventListener('change', function(e) {
            e.stopPropagation()

            // reset current page to 1 since sort changed
            local.paginate[property] = 1

            // set local sort property so it can persist while this page is open
            local.sort[property] = this.value || 'a-z'

            if (property === 'domain') {
                update_display_domain()
            } else if (property === 'domains') {
                update_display_domains()
            } // if
        })
    } // constructor
} // custom_select

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

    if (customElements.get('custom-filter') === undefined) {
        // a custom filter element has not been defined yet
        customElements.define('custom-filter', custom_filter, {
            extends: 'input'
        })
    } // if

    if (customElements.get('custom-select') === undefined) {
        // a custom select element has not been defined yet
        customElements.define('custom-select', custom_select, {
            extends: 'select'
        })
    } // if

    if (customElements.get('custom-clear-or-undo') === undefined) {
        // a custom clear or undo anchor element has not been defined yet
        customElements.define('custom-clear-or-undo', custom_clear_or_undo, {
            extends: 'a'
        })
    } // if
} // custom_elements_define

const listen_filter_clear = local.function.listen_filter_clear = function listen_filter_clear() {
    /*
    Listen for click events on the filter clear buttons that are only visible when a *.domain or domain filter is active.
    */

    const elements = document.getElementsByClassName('options-filter-clear')

    for (const item of elements) {
        item.addEventListener('click', function(e) {
            e.preventDefault()

            const property = this.dataset.option

            // clear the filter associated with this clear button
            local.element['options_filter_' + property + '_text'].value = ''

            // clear the filter property since setting the value above does not trigger an "input" event
            local.filter[property] = ''

            // hide this clear button
            this.classList.add('hidden')

            if (property === 'domain') {
                update_display_domain()
            } else if (property === 'domains') {
                update_display_domains()
            } // if
        })
    } // for
} // listen_filter_clear

const listen_pagination = local.function.listen_pagination = function listen_pagination() {
    /*
    Listen for navigation clicks on the "first", "previous", "next", and "last" arrows seen at the bottom of the *.domain and domain listing boxes.
    */

    const elements = document.getElementsByClassName('options-paginate-link')

    for (const item of elements) {
        item.addEventListener('click', function(e) {
            e.preventDefault()

            const property = this.dataset.optionType
            const option   = this.dataset.option

            log('listen_pagination -> ' + property + ' -> ' + option)

            local.paginate.navigate[property] = option

            if (property === 'domain') {
                update_display_domain()
            } else if (property === 'domains') {
                update_display_domains()
            } // if
        })
    } // for
} // listen_pagination

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

    @param  {Object}  obj   Object like {subject:"init-options"}
    @param  {Object}  info  Not used. Object with the properties disconnect, name, onDisconnect, onMessage, postMessage, and sender.
    */

    switch (obj.subject) {
        case 'init-options':
            log('listener_port_message -> init-options')

            local.option     = obj.option
            local.preference = obj.preference
            local.status     = obj.status
            local.setting    = obj.setting

            await start_continue()

            break
        case 'option-set':
            local.option[obj.name] = obj.value

            log('listener_port_message -> option-set -> set local.option.' + obj.name)

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
                    // not used on this page

                    break
                case 'icon_color':
                    theme_and_icon() // from shared.js

                    break
                case 'theme':
                    theme_and_icon() // from shared.js

                    break
                case 'theme_popup':
                    // not used on this page

                    break
            } // switch

            break
        case 'status-permissions':
            log('listener_port_message -> status-permissions -> ' + obj.value)

            local.status.permissions = obj.value

            // show the permissions area, if needed
            permissions_display() // from shared.js

            break
        default:
            log('listener_port_message -> unknown obj.subject', obj)

            break
    } // switch
} // listener_port_message

const locale_compare = local.function.locale_compare = new Intl.Collator('en-US', {
    caseFirst: 'upper',
    ignorePunctuation: false,
    localeMatcher: 'best fit',
    numeric: true,
    sensitivity: 'variant',
    usage: 'sort'
}).compare // alias function

const port_connect = local.function.port_connect = function port_connect() {
    /*
    Connect a port to the background service worker.
    */

    local.port = browser.runtime.connect({
        name: 'options'
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

const port_message_init_options = local.function.port_message_init_options = function port_message_init_options() {
    /*
    Send a message to the background service worker.
    */

    const message = {
        'subject': 'init-options'
    } // message

    local.port.postMessage(message)
} // port_message_init_options

const show_content = local.function.show_content = function show_content() {
    /*
    Hide the loading animation and show the content area.
    */

    local.element.loading.classList.add('hidden')
    local.element.content.classList.remove('hidden')
} // show_content

const start = local.function.start = async function start() {
    /*
    Start the options page.
    */

    await shared_start() // from shared.js

    listen_mouse_events() // from shared.js
    listen_filter_clear()
    listen_pagination()
    listen_scroll_nav() // from shared.js
    listen_show_message_dismiss() // from shared.js
    listen_allow_permissions_button() // from shared.js

    port_connect()
    port_listeners()

    // request data from background.js
    port_message_init_options()

    // startup will continue in start_continue() once listener_port_message() receives an "init-options" message
} // start

const start_continue = local.function.start_continue = function start_continue() {
    /*
    Continue to start the options page.
    */

    show_message() // from shared.js

    theme_and_icon() // from shared.js
    theme_monitor() // from shared.js, will run once and then keep running once every 10 seconds

    // show the permissions area, if needed
    permissions_display() // from shared.js

    custom_elements_define()
    update_display_global()
    update_display_domains()
    update_display_domain()

    show_content()

    scroll_nav() // from shared.js

    location_hash_scroll_to() // from shared.js
} // start_continue

const update_display_domain = local.function.update_display_domain = function update_display_domain() {
    /*
    Update the display of single domains with a list of domain rules or a message on how to create rules if no rules are available.
    */

    // show loading
    local.element.options_domain_loading.classList.remove('hidden')

    // hide options domain area
    local.element.options_domain.classList.add('hidden')

    // clear the options domain area
    local.element.options_domain.textContent = ''

    update_display_info('domain')

    const domains = update_display_filter_sort('domain')

    const domains_length = domains.length

    if (domains_length === 0) {
        // no domains

        const filter = (local.filter.domain !== '') ? true : false

        const property = (filter === true) ? 'template_options_domain_no_results' : 'template_options_domain_no_rules'

        const template = local.element[property].content.cloneNode(true)

        if (filter === false) {
            // hide filter and sort tools
            local.element.options_filter_domain.classList.add('hidden')
            local.element.options_sort_domain.classList.add('hidden')
        } // if

        local.element.options_domain.appendChild(template)

        // hide pagination area
        local.element.options_paginate_domain.classList.add('hidden')

        // remove options-list class
        local.element.options_domain.classList.remove('options-list')
    } else {
        // one or more domains

        // show filter and sort tools
        local.element.options_filter_domain.classList.remove('hidden')
        local.element.options_sort_domain.classList.remove('hidden')

        // pagination
        const max_page = Math.ceil(domains_length / local.paginate.display) // the maximum number of pages

        const page = update_display_paginate_page('domain', domains_length, max_page)

        // update pagination area
        update_display_paginate('domain', domains_length, page, max_page)

        // show pagination area
        local.element.options_paginate_domain.classList.remove('hidden')

        const display_after_index = (page * local.paginate.display) - local.paginate.display

        let index = 0 // keep track of how many domains we have looped through
        let display_count = 0 // keep track of how many domains we have displayed to the user

        for (const domain of domains) {
            index++

            if (index <= display_after_index) {
                continue // for loop
            } // if

            display_count++

            if (display_count > local.paginate.display) {
                break // for loop
            } // if

            const template = local.element.template_options_domain_row.content.cloneNode(true)

            const checkbox_no    = template.querySelector('.checkbox-no')
            const checkbox_yes   = template.querySelector('.checkbox-yes')
            const options_center = template.querySelector('.options-center')
            const options_title  = template.querySelector('.options-title')
            const options_undo   = template.querySelector('.options-undo')

            options_title.textContent = local.display.domain[domain].title

            if (local.display.domain[domain].removed === true) {
                // hide checkboxes
                options_center.classList.add('visibility-hidden')

                // fade options title
                options_title.classList.add('options-title-removed')

                // update clear and undo links
                options_undo.querySelectorAll('a').forEach(function(link) {
                    link.dataset.option = domain
                })

                // show clear and undo links
                options_undo.classList.remove('hidden')
            } else {
                // setup checkboxes
                checkbox_yes.dataset.option = domain
                checkbox_no.dataset.option  = domain

                if (local.display.domain[domain].allow === true) {
                    checkbox_yes.checked = true
                } else {
                    checkbox_no.checked  = true
                }
            } // if

            local.element.options_domain.appendChild(template)
        } // for

        // add options-list class
        local.element.options_domain.classList.add('options-list')
    } // if

    // hide loading
    local.element.options_domain_loading.classList.add('hidden')

    // show options domain area
    local.element.options_domain.classList.remove('hidden')
} // update_display_domain

const update_display_domains = local.function.update_display_domains = function update_display_domains() {
    /*
    Update the display of domains with a list of *.domain rules or a message on how to create rules if no rules are available.
    */

    // show loading
    local.element.options_domains_loading.classList.remove('hidden')

    // hide options domains area
    local.element.options_domains.classList.add('hidden')

    // clear the options domains area
    local.element.options_domains.textContent = ''

    update_display_info('domains')

    const domains = update_display_filter_sort('domains')

    const domains_length = domains.length

    if (domains_length === 0) {
        // no domains

        const filter = (local.filter.domains !== '') ? true : false

        const property = (filter === true) ? 'template_options_domains_no_results' : 'template_options_domains_no_rules'

        const template = local.element[property].content.cloneNode(true)

        if (filter === false) {
            // hide filter and sort tools
            local.element.options_filter_domains.classList.add('hidden')
            local.element.options_sort_domains.classList.add('hidden')
        } // if

        local.element.options_domains.appendChild(template)

        // hide pagination area
        local.element.options_paginate_domains.classList.add('hidden')

        // remove options-list class
        local.element.options_domains.classList.remove('options-list')
    } else {
        // one or more domains

        // show filter and sort tools
        local.element.options_filter_domains.classList.remove('hidden')
        local.element.options_sort_domains.classList.remove('hidden')

        // pagination
        const max_page = Math.ceil(domains_length / local.paginate.display) // the maximum number of pages

        const page = update_display_paginate_page('domains', domains_length, max_page)

        // update pagination area
        update_display_paginate('domains', domains_length, page, max_page)

        // show pagination area
        local.element.options_paginate_domains.classList.remove('hidden')

        const display_after_index = (page * local.paginate.display) - local.paginate.display

        let index = 0 // keep track of how many domains we have looped through
        let display_count = 0 // keep track of how many domains we have displayed to the user

        for (const domain of domains) {
            index++

            if (index <= display_after_index) {
                continue // for loop
            } // if

            display_count++

            if (display_count > local.paginate.display) {
                break // for loop
            } // if

            const template = local.element.template_options_domains_row.content.cloneNode(true)

            const checkbox_no    = template.querySelector('.checkbox-no')
            const checkbox_yes   = template.querySelector('.checkbox-yes')
            const options_center = template.querySelector('.options-center')
            const options_title  = template.querySelector('.options-title')
            const options_undo   = template.querySelector('.options-undo')

            options_title.textContent = local.display.domains[domain].title

            if (local.display.domains[domain].removed === true) {
                // hide checkboxes
                options_center.classList.add('visibility-hidden')

                // style options title
                options_title.classList.add('options-title-removed')

                // update clear and undo links
                options_undo.querySelectorAll('a').forEach(function(link) {
                    link.dataset.option = domain
                })

                // show clear and undo links
                options_undo.classList.remove('hidden')
            } else {
                // setup checkboxes
                checkbox_yes.dataset.option = domain
                checkbox_no.dataset.option  = domain

                if (local.display.domains[domain].allow === true) {
                    checkbox_yes.checked = true
                } else {
                    checkbox_no.checked  = true
                }
            } // if

            local.element.options_domains.appendChild(template)
        } // for

        // add options-list class
        local.element.options_domains.classList.add('options-list')
    } // if

    // hide loading
    local.element.options_domains_loading.classList.add('hidden')

    // show options domains area
    local.element.options_domains.classList.remove('hidden')
} // update_display_domains

const update_display_filter_sort = local.function.update_display_filter_sort = function update_display_filter_sort(property) {
    /*
    Return an optional filtered and definitely sorted list of domain names from local.display.domain or local.display.domain.

    @param   {String}  property  Display property "domain" or "domains".
    @return  {Object}            Array of domain name strings.
    */

    let domains = Object.keys(local.display[property])

    const filter = local.filter[property]

    if (filter !== '') {
        domains = domains.filter(function(domain) {
            return local.display[property][domain].title.includes(filter)
        })
    } // if

    const sort = local.sort[property] || 'a-z' // "a-z", "z-a", "allow-block", or "block-allow"

    switch (sort) {
        case 'allow-block':
            // sort allow-block

            domains.sort(function(a, b) {
                const domain = local.display[property]

                let compare_a = (domain[a].allow === true) ? 0 : 1
                let compare_b = (domain[b].allow === true) ? 0 : 1

                let result = locale_compare(compare_a, compare_b)

                if (result === 0) {
                    // sort strings are equal so sort by sort property instead
                    compare_a = domain[a].title_sort
                    compare_b = domain[b].title_sort

                    result = locale_compare(compare_a, compare_b)
                } // if

                if (result === 0) {
                    // sort strings are equal so sort by title instead
                    compare_a = domain[a].title
                    compare_b = domain[b].title

                    result = locale_compare(compare_a, compare_b)
                } // if

                return result
            }) // sort

            break
        case 'block-allow':
            // sort block-allow

            domains.sort(function(a, b) {
                const domain = local.display[property]

                let compare_a = (domain[a].allow === true) ? 1 : 0
                let compare_b = (domain[b].allow === true) ? 1 : 0

                let result = locale_compare(compare_a, compare_b)

                if (result === 0) {
                    // sort strings are equal so sort by sort property instead
                    compare_a = domain[a].title_sort
                    compare_b = domain[b].title_sort

                    result = locale_compare(compare_a, compare_b)
                } // if

                if (result === 0) {
                    // sort strings are equal so sort by title instead
                    compare_a = domain[a].title
                    compare_b = domain[b].title

                    result = locale_compare(compare_a, compare_b)
                } // if

                return result
            }) // sort

            break
        case 'z-a':
            // sort z-a

            domains.sort(function(a, b) {
                const domain = local.display[property]

                let result = locale_compare(
                    domain[b].title_sort,
                    domain[a].title_sort
                )

                if (result === 0) {
                    // sort strings are equal so sort by title instead
                    result = locale_compare(
                        domain[b].title,
                        domain[a].title
                    )
                } // if

                return result
            }) // sort

            break
        default:
            // sort a-z

            domains.sort(function(a, b) {
                const domain = local.display[property]

                let result = locale_compare(
                    domain[a].title_sort,
                    domain[b].title_sort
                )

                if (result === 0) {
                    // sort strings are equal so sort by title instead
                    result = locale_compare(
                        domain[a].title,
                        domain[b].title
                    )
                } // if

                return result
            }) // sort

            break
    } // switch

    return domains
} // update_display_filter_sort

const update_display_global = local.function.update_display_global = function update_display_global() {
    /*
    Update the checked state of each global option checkbox and the corresponding title describing the current status.
    */

    document.querySelectorAll('[data-option=global]').forEach(function(checkbox) {
        const value = (checkbox.value === 'true')

        if (value === local.option.global) {
            checkbox.checked = true
        } else {
            checkbox.checked = false
        }
    })

    let class_add     = 'options-title-allow' // default
    let class_remove  = 'options-title-block' // default
    let options_title = 'Allowing JavaScript globally.' // default

    if (local.option.global === false) {
        class_add = 'options-title-block'
        class_remove = 'options-title-allow'
        options_title = 'Blocking JavaScript globally.'
    } // if

    local.element.options_title_global.classList.remove(class_remove)
    local.element.options_title_global.classList.add(class_add)

    local.element.options_title_global.textContent = options_title
} // update_display_global

const update_display_info = local.function.update_display_info = function update_display_info(property) {
    /*
    Synchronize a local.display[property] with its corresponding local.option[property] by removing, adding, and updating display objects as needed.

    @param  {String}  property  The property name "domains" or "domain".
    */

    //------------------------
    // Remove Display Objects
    //------------------------
    for (const domain in local.display[property]) {
        if (local.display[property][domain].removed === true) {
            // leave this display only domain as is
        } else if (local.option[property][domain] === undefined) {
            // remove this display property
            delete local.display[property][domain]
        }
    } // for

    //-------------------------------
    // Add or Update Display Objects
    //-------------------------------
    for (const domain in local.option[property]) {
        if (local.setting.mandatory_options[property][domain] !== undefined) {
            // a mandatory option for this domain exists so do not show a user configurable option
            continue // for loop
        } // if

        if (local.display[property][domain] === undefined) {
            // create a display object

            let title = punycode_to_unicode(domain)

            if (property === 'domains') {
                if (/[\u0591-\u07FF]/.test(title) === true) {
                    // arabic or hebrew detected
                    title += '.*'
                } else {
                    // all other languages
                    title = '*.' + title
                } // if
            } // if

            const title_sort = punycode_to_unicode(hostname_to_root_domain(domain))

            local.display[property][domain] = {
                'allow': local.option[property][domain], // true or false
                'title': title,
                'title_sort' : title_sort
            }
        } else {
            // update existing display object
            local.display[property][domain].allow = local.option[property][domain]
        } // if
    } // for
} // update_display_info

const update_display_paginate = local.function.update_display_paginate = function update_display_paginate(property, items, page, max_page) {
    /*
    Update the navigation links and text for a user visible paginate area for either the "domains" or "domain" display. When needed, set a CSS minimum height for the listing area so pagination controls do not jump when less then 10 options are being shown and there are multiple pages.

    @param  {String}  property  The property name "domains" or "domain".
    @param  {Number}  items     Number of items being viewed.
    @param  {Number}  page      The current page being viewed.
    @param  {Number}  max_page  The maximum page number.
    */

    const options_paginate = local.element['options_paginate_' + property]

    //------------------
    // Navigation Links
    //------------------
    options_paginate.querySelectorAll('a').forEach(function(link) {
        if (max_page === 1) {
            // hide all navigation links
            link.classList.add('disable-nav')

            return 'early'
        } // if

        const option = link.dataset.option

        if (option === 'first' || option === 'previous') {
            if (page <= 1) {
                link.classList.add('disable-nav')
            } else {
                link.classList.remove('disable-nav')
            }
        } else if (option === 'next' || option === 'last') {
            if (page >= max_page) {
                link.classList.add('disable-nav')
            } else {
                link.classList.remove('disable-nav')
            }
        } // if
    })

    //--------------
    // Display Text
    //--------------
    let to = page * local.paginate.display

    const from = to - local.paginate.display + 1

    if (to > items) {
        to = items
    } // if

    options_paginate.querySelector('.text-numbers').textContent = from + '-' + to + ' of ' + items

    //------------------
    // List Area Height
    //------------------
    let height = '0px' // default

    if (max_page > 1) {
        height = (local.paginate.display * 65 - 22) + 'px'
    } // if

    const options_list_area = local.element['options_list_area_' + property]

    if (options_list_area.style.minHeight !== height) {
        options_list_area.style.minHeight = height
    } // if
} // update_display_paginate

const update_display_paginate_page = local.function.update_display_paginate_page = function update_display_paginate_page(property, items, max_page) {
    /*
    Figure out the current pagination page based on the number of items to display, the current page, and any navigation requests from a user. Return the current page number for the display property "domains" or "domain".

    @param  {String}  property  The property name "domains" or "domain".
    @param  {Number}  items     Number of items to paginate.
    @param  {Number}  max_page  The maximum page number.
    */

    let page = local.paginate[property]
    let navigate = local.paginate.navigate[property]

    if (navigate !== '') {
        // navigation request from user
        switch (navigate) {
            case 'first':
                page = local.paginate[property] = 1

                break
            case 'previous':
                if (page > 1) {
                    page = --local.paginate[property]
                } // if

                break
            case 'next':
                if (page < max_page) {
                    page = ++local.paginate[property]
                } // if

                break
            case 'last':
                page = local.paginate[property] = max_page

                break
        } // switch

        // clear navigation request
        local.paginate.navigate[property] = ''
    } // if

    // pagination sanity check
    if (page < 1) {
        // page too low, reset to first page
        page = local.paginate.navigate[property] = 1
    } else if (page > max_page) {
        // page too high, reset to max page
        page = local.paginate.navigate[property] = max_page
    } // if

    return page
} // update_display_paginate_page

//-------
// Start
//-------
start()