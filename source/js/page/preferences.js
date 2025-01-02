'use strict'

//-----------
// Variables
//-----------
const local = {
    'class': { // will hold various classes
        // custom_radio
    },
    'element': {
        'content'   : document.getElementById('content'),
        'html'      : document.getElementById('html'),
        'loading'   : document.getElementById('loading'),
        'scroll_nav': document.getElementById('scroll-nav')
    },
    'function': { // will hold various functions
        // custom_elements_define

        // listen_label

        // listener_port_disconnect
        // listener_port_message

        // port_connect
        // port_listeners
        // port_message_init_preferences

        // show_content

        // start
        // start_continue
    },
    'page': 'preferences', // the name of this page
    'port': null, // will be set by port_connect() and used to communicate with the background service worker
    'preference': { // will hold values from background.js
        // badge_text
        // browser_is_dark
        // global_warn
        // icon_color
        // theme
        // theme_popup
    },
    'status': { // will hold values from background.js
        // permissions
    }
} // local

//---------
// Classes
//---------
const custom_radio = local.class.custom_radio = class custom_radio extends HTMLInputElement {
    /*
    Custom radio element.
    */

    constructor() {
        super() // setup object inheritance

        const property = this.dataset.preference // for example, theme for local.preference.theme

        // set initial state
        if (this.value === local.preference[property]) {
            this.checked = true
        } // if

        this.addEventListener('click', function(e) {
            // listening to click events means we will only get notified about user actions and not our own activity when we set a checked property to true
            e.stopPropagation()

            // set local option
            local.preference[property] = this.value

            if (property === 'theme' || property === 'icon_color') {
                theme_and_icon()
            } // if

            // relay option to background.js
            const message = {
                'subject': 'preference-set',
                'name'   : property,
                'value'  : local.preference[property]
            } // message

            local.port.postMessage(message)
        })
    } // constructor
} // custom_radio

//-----------
// Functions
//-----------
const custom_elements_define = local.function.custom_elements_define = function custom_elements_define() {
    /*
    Define Custom Elements for programmatic use and also upgrade any existing HTML elements with matching "is" properties.
    */

    customElements.define('custom-radio', custom_radio, { extends: 'input' })
} // custom_elements_define

const listen_label = local.function.listen_label = function listen_label() {
    /*
    Listen for click events so mouse users do not get persistent focus effects on a radio button after clicking a label.
    */

    const items = document.getElementsByTagName('label')
    const items_length = items.length

    for (let i = 0; i < items_length; i++) {
        items[i].addEventListener('click', function(e) {
            e.preventDefault()

            // click the corresponding radio button for this label
            document.getElementById(this.htmlFor).click()
        })
    } // for
} // listen_label

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

    @param  {Object}  obj   Object like {subject:"init-preferences"}
    @param  {Object}  info  Not used. Object with the properties disconnect, name, onDisconnect, onMessage, postMessage, and sender.
    */

    switch (obj.subject) {
        case 'init-preferences':
            log('listener_port_message -> init-preferences')

            local.preference = obj.preference
            local.status     = obj.status

            await start_continue()

            break
        case 'option-set':
            // do nothing

            break
        case 'preference-set':
            local.preference[obj.name] = obj.value

            log('listener_port_message -> preference-set -> set local.preference.' + obj.name)

            // find user visible preference elements on this page
            const items = document.querySelectorAll('[data-preference=' + obj.name + ']')
            const items_length = items.length

            // update user visible preference elements on this page
            for (let i = 0; i < items_length; i++) {
                if (items[i].value === obj.value) {
                    items[i].checked = true
                    break
                }
            } // for

            switch (obj.name) {
                case 'badge_text':
                    // already taken care of in the code above

                    break
                case 'browser_is_dark':
                    theme_and_icon() // from shared.js

                    break
                case 'global_warn':
                    // already taken care of in the code above

                    break
                case 'icon_color':
                    theme_and_icon() // from shared.js

                    break
                case 'theme':
                    theme_and_icon() // from shared.js

                    break
                case 'theme_popup':
                    // already taken care of in the code above

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

const port_connect = local.function.port_connect = function port_connect() {
    /*
    Connect a port to the background service worker.
    */

    local.port = browser.runtime.connect({
        name: 'preferences'
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

const port_message_init_preferences = local.function.port_message_init_preferences = function port_message_init_preferences() {
    /*
    Send a message to the background service worker.
    */

    const message = {
        'subject': 'init-preferences'
    } // message

    local.port.postMessage(message)
} // port_message_init_preferences

const show_content = local.function.show_content = function show_content() {
    /*
    Hide the loading animation and show the content area.
    */

    local.element.loading.classList.add('hidden')
    local.element.content.classList.remove('hidden')
} // show_content

const start = local.function.start = async function start() {
    /*
    Start the preferences page.
    */

    await shared_start() // from shared.js

    listen_mouse_events() // from shared.js
    listen_label()
    listen_scroll_nav() // from shared.js
    listen_allow_permissions_button() // from shared.js

    port_connect()
    port_listeners()

    // request data from background.js
    port_message_init_preferences()

    // startup will continue in start_continue() once listener_port_message() receives an "init-preferences" message
} // start

const start_continue = local.function.start_continue = function start_continue() {
    /*
    Continue to start the preferences page.
    */

    theme_and_icon() // from shared.js
    theme_monitor() // from shared.js, will run once and then keep running once every 10 seconds

    // show the permissions area, if needed
    permissions_display() // from shared.js

    custom_elements_define()

    show_content()

    scroll_nav() // from shared.js

    location_hash_scroll_to() // from shared.js
} // start_continue

//-------
// Start
//-------
start()