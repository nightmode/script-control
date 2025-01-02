'use strict' // not technically needed since this file will be included in another file that will specify 'use strict' first

//-------
// Notes
//-------
/*
    This background JavaScript file is only meant to be included in the root level service worker.

    Script Control uses snake case (underscores) for variables.

    Priority 1 rules are ONLY for allowing globally.
    Priority 2 rules are ONLY for blocking globally.

    Priority 3 rules are ONLY for *.domain requests.
    Priority 4 rules are ONLY for *.domain requests.
    Priority 5 rules are ONLY for *.domain requests.

    Priority 6 rules are ONLY for domain requests.
*/

//-----------
// Variables
//-----------
const local = {
    'function': { // will hold various functions
        // all_from_storage

        // badge_set
        // badge_set_all_tabs
        // badge_set_background_color
        // badge_set_one_tab

        // browser_allow_script

        // browser_remove_service_workers

        // browser_rules_get
        // browser_rules_highest_id
        // browser_rules_remove
        // browser_rules_sync
        // browser_rules_sync_domain
        // browser_rules_sync_domains
        // browser_rules_sync_global
        // browser_rules_update

        // convert_from_regex_filter
        // convert_from_url_filter
        // convert_to_regex_filter
        // convert_to_url_filter

        // extension_page

        // icon_set
        // icon_set_all_tabs
        // icon_set_one_tab

        // install_or_upgrade

        // listener_permissions
        // listener_port_connect
        // listener_port_disconnect
        // listener_port_message
        // listener_rule_debug
        // listener_service_worker_install
        // listener_tab_activated
        // listener_tab_removed
        // listener_tab_updated

        // mandatory_options

        // option_to_storage

        // permissions_check
        // permissions_check_and_icons

        // popup_set

        // port_message_all
        // port_message_all_except
        // port_message_popups

        // preference_icon_color
        // preference_theme
        // preference_theme_popup
        // preference_to_storage

        // service_worker_reload

        // setting_to_storage

        // show_extension_page_if_needed

        // show_message_relayed

        // start
        // start_done

        // storage_get
        // storage_remove
        // storage_set

        // tabs_reload
        // tabs_reload_after_permissions
        // tabs_reload_as_needed
        // tabs_status_init

        // test

        // url_setup

        // version_from_storage
        // version_less_than
        // version_to_storage
    },
    'option': { // defaults for user customizable values which may get replaced with values from storage
        'domain': { // allow or disallow scripts for one specific domain
            // 'www.microsoft.com': false
        },
        'domains': { // allow or disallow scripts for a root domain and ALL sub domains
            // 'microsoft.com': true
        },
        'global': true // allow or disallow scripts globally
    },
    'port': [], // array of port objects used to communicate with other scripts
    'preference': { // defaults for customizable values which may get replaced with values from storage
        'badge_text'     : 'show',      // "show" or "hide"
        'browser_is_dark': false,       // true or false
        'global_warn'    : 'hide',      // "show" or "hide"
        'icon_color'     : 'automatic', // "automatic", "blue", "dark", or "light"
        'theme'          : 'light',     // "automatic", "dark", or "light"
        'theme_popup'    : 'automatic'  // "automatic", "dark", or "light"
    },
    'rules': [], // array of browser rules currently in use
    'setting': { // settings used internally, not customizable by the user
        'empty_csp': (shared.browser.firefox) ? ';' : '', // firefox requires a non-empty string
        'header_csp': "frame-src 'none'; script-src 'none'; script-src-elem 'none'; worker-src 'none';", // content security policy
        'mandatory_options': { // mandatory options that the user can not see or modify
            'domain': { // allow or disallow scripts for one specific domain
                'addons.mozilla.org'         : true,
                'chrome.google.com'          : true,
                'microsoftedge.microsoft.com': true
            },
            'domains': { // allow or disallow scripts for a root domain and ALL sub domains
                'ko-fi.com'   : true,
                'nightmode.fm': true,
                'paypal.com'  : true,
                'stripe.com'  : true
            }
        },
        'resource_types': [
            'main_frame'
        ], // resource types for web requests
        // more info at https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
        'rule_id': 5000, // number which may get replaced with a value from storage, incremented to generate unique numbers when setting up dynamic rules in the browser
        'rule_id_default': 5000, // default number used for resetting rule_id
        'show_extension': false, // can be set true by install_or_upgrade()
        'show_message': { // properties which can be set true by install_or_upgrade()
            'chrome_extensions_toolbar' : false,
            'edge_extensions_toolbar'   : false,
            'firefox_extensions_toolbar': false,
            'upgrade_complete'          : false,
            'upgrade_free'              : false
        }
    },
    'status': {
        'browser_rules_sync_queue': 0, // used by browser_rules_sync() to keep track of requests that come in while it is busy
        'permissions': true, // false if origin permissions are needed in firefox
        'service_worker_reload': { // keep track of which hostnames are going through the temporary loading process to allow unregistered service workers to disappear once they are no longer in use
            // 'www.microsoft.com': true
        },
        'start_activated': false, // true if the start function has ever been called
        'start_done': false, // true once the start function is completely done
        'tab': { // last known status of a tab including if it was allowed to run scripts and the URL it was viewing
            /*
            1: {
                allow        : true, // boolean or undefined
                browser_allow: true, // boolean or undefined
                hostname     : 'www.microsoft.com',
                id           : 1,
                root_domain  : 'microsoft.com',
                url          : 'https://www.microsoft.com',
                warning      : true, // boolean or undefined
                warnings     : ['domain_credentials']
            }
            */
        }
    },
    'test': { // functions for "await test()"
        // functions which will be set by "-background-test.js".
    },
    'troubleshoot': null, // generic troubleshooting placeholder
    'url': { // will be populated by url_setup()
        // the first level will contain theme properties "dark" and "light"
        // the second level will contain icon color properties "blue", "dark", and "light"
        // the third level will contain page file names like "options.html"
    },
    'version': browser.runtime.getManifest().version // getManifest is not a promise
} // local

//-----------
// Functions
//-----------
const all_from_storage = local.function.all_from_storage = async function all_from_storage() {
    /*
    Load options, preferences, and settings from storage.
    */

    let storage = {}

    try {
        storage = await browser.storage.local.get(null)
    } catch (error) {
        log('all_from_storage -> error ->', error.message)
    } // try

    // options
    for (const property in local.option) {
        const storage_option = storage['option_' + property]

        if (storage_option !== undefined) {
            local.option[property] = storage_option
        } // if
    } // for

    // preferences
    for (const property in local.preference) {
        const storage_preference = storage['preference_' + property]

        if (storage_preference !== undefined) {
            local.preference[property] = storage_preference
        } // if
    } // for

    // settings
    // only the "rule_id" setting is being saved to and retrieved from storage
    const property = 'rule_id'

    const storage_setting = storage['setting_' + property]

    if (storage_setting !== undefined) {
        local.setting[property] = storage_setting
    } // if

    // set mandatory options
    mandatory_options()
} // all_from_storage

const mandatory_options = local.function.mandatory_options = function () {
    /*
    Set mandatory options.
    */

    // mandatory domain options
    for (const property in local.setting.mandatory_options.domain) {
        local.option.domain[property] = local.setting.mandatory_options.domain[property]
    } // for

    // mandatory *.domain options
    for (const property in local.setting.mandatory_options.domains) {
        local.option.domains[property] = local.setting.mandatory_options.domains[property]
    } // for
} // mandatory_options

const badge_set = local.function.badge_set = async function badge_set(text, tab_id) {
    /*
    Set the browser action badge text for one or all tabs.

    @param  {String}  [text]    Optional. Defaults to "allow".
    @param  {Number}  [tab_id]  Optional. Tab ID to update otherwise set badges globally.
    */

    text   = text || 'allow'
    tab_id = tab_id || 0

    // badge preference
    if (local.preference.badge_text === 'hide') {
        // hide badge text
        text = ''
    } // if

    const details = {
        // tabId: 1,
        'text': text
    } // details

    if (tab_id > 0) {
        details.tabId = tab_id
    } // if

    try {
        await browser.action.setBadgeText(details)
    } catch (error) {
        if (error.message.toLowerCase().indexOf('no tab with id') === 0) {
            // ignore "No tab with id" errors since a tab can be closed before we get a chance to update it
        } else {
            log('badge_set -> error ->', error.message)
        } // if
    } // try
} // badge_set

const badge_set_all_tabs = local.function.badge_set_all_tabs = async function badge_set_all_tabs() {
    /*
    Loop through local.status.tab and call badge_set_one_tab() for each tab ID.
    */

    const promises = []

    for (const property in local.status.tab) {
        const tab = local.status.tab[property]

        promises.push(
            badge_set_one_tab(tab.id)
        )
    } // for

    await Promise.allSettled(promises)
} // badge_set_all_tabs

const badge_set_background_color = local.function.badge_set_background_color = async function badge_set_background_color(color) {
    /*
    Set the browser action badge background color for all badges.

    @param  {String, Object}  [color]  Optional. Defaults to "#35363a". Array like [255,0,0,255] or string like "#ff0000".
    */

    color = color || '#35363a'

    // the background color below will become the default color for both current and future tabs
    try {
        await browser.action.setBadgeBackgroundColor({ 'color': color })
    } catch (error) {
        log('badge_set_background_color -> error ->', error.message)
    } // try
} // badge_set_background_color

const badge_set_one_tab = local.function.badge_set_one_tab = async function badge_set_one_tab(tab_id) {
    /*
    Set a browser action badge for one tab.

    @param  {Number}  tab_id  Number of the tab ID to set a badge for.
    */

    const tab = local.status.tab[tab_id]

    if (tab === undefined) {
        // the requested tab no longer exists
        return 'early'
    } // if

    let text = 'block' // default

    if (tab.allow === true) {
        text = 'allow'
    } // if

    if (tab.warning === true) {
        if (local.preference.global_warn === 'hide' && tab.warnings.toString() === 'global_warn') {
            // user does not need to be notified about global warnings
        } else if (always_allow(tab.hostname, tab.root_domain) === true) {
            // no warning needed for a hostname or root domain that is always allowed
        } else {
            text = 'warn'
        } // if
    } // if

    await badge_set(text, tab_id)
} // badge_set_one_tab

const browser_allow_script = local.function.browser_allow_script = async function browser_allow_script(hostname, root_domain) {
    /*
    Figure out if the browser is currently allowing a hostname.

    @param   {String}   hostname     Hostname like "listen.tidal.com"
    @param   {String}   root_domain  Root domain like "tidal.com"
    @return  {Boolean}  allow        True or false.
    */

    let allow = null // default which will be set to a boolean

    if (always_allow(hostname, root_domain) === true) {
        allow = true
    } else {
        if (local.rules.length === 0) {
            // get browser rules
            local.rules = await browser_rules_get()
        } // if

        //--------
        // Global
        //--------
        // priority 2 rules are ONLY for blocking globally
        const global_rule_allow = local.rules.filter(rule => rule.priority === 2).length === 0

        //----------
        // *.domain
        //----------
        const root_domain_url_filter = convert_to_url_filter(root_domain)

        // priority 3 rules are ONLY for *.domain requests
        const domains_rules = local.rules.filter(rule => rule.priority === 3).filter(rule => rule.condition.urlFilter === root_domain_url_filter)

        let domains_rule_allow = global_rule_allow // default inheritance

        if (domains_rules.length > 0) {
            domains_rule_allow = (domains_rules[0].action.responseHeaders[0].operation === 'append' ? true : false)
        } // if

        //--------
        // Domain
        //--------
        const hostname_url_filter = convert_to_url_filter(hostname)

        // priority 6 rules are ONLY for domain requests
        const domain_rules = local.rules.filter(rule => rule.priority === 6).filter(rule => rule.condition.urlFilter === hostname_url_filter)

        let domain_rule_allow = domains_rule_allow // default inheritance

        if (domain_rules.length > 0) {
            domain_rule_allow = (domain_rules[0].action.responseHeaders[0].operation === 'append' ? true : false)
        } // if

        //--------------------------------------------------------------------
        // Result which includes inheriting allow or block settings as needed
        //--------------------------------------------------------------------
        allow = domain_rule_allow
    } // if

    return allow
} // browser_allow_script

const browser_remove_service_workers = local.function.browser_remove_service_workers = async function browser_remove_service_workers(origins) {
    /*
    Remove one, multiple, or all service workers.

    @param  {Object}  [origins]  Optional array of hostnames to remove service workers from. If not provided, remove all service workers.
    */

    if (shared.browser.firefox) {
        // firefox 119 does not yet support browser.browsingData.removeServiceWorkers() so return early
        // firefox specific code in "/js/noscript.js" will try to remove service workers in an alternate way
        return 'early'
    } // if

    const options = {
        // origins: ['https://www.microsoft.com']
        originTypes: {
            // protectedWeb: true,
            unprotectedWeb: true
        },
        since: 0
    } // options

    if (Array.isArray(origins)) {
        if (origins.length > 0) {
            // add an origins array to our options object
            options.origins = []

            origins.forEach(function(item) {
                // normal service worker
                options.origins.push('https://' + item)

                // rare service worker like "localhost" which is being allowed over HTTP
                options.origins.push('http://' + item)
            })

            // also remove protected web origins since we are targeting specific hostnames
            options.originTypes.protectedWeb = true
        } // if
    } // if

    log('browser_remove_service_workers -> options.origins', options.origins)

    try {
        await browser.browsingData.removeServiceWorkers(options)

        if (options.origins) {
            log('browser_remove_service_workers -> service workers removed for', options.origins)
        } else {
            log('browser_remove_service_workers -> all service workers removed')
        } // if
    } catch (error) {
        log('browser_remove_service_workers -> error ->', error.message)
    } // try
} // browser_remove_service_workers

const browser_rules_get = local.function.browser_rules_get = async function browser_rules_get() {
    /*
    Get the currently enabled dynamic rules for this browser.

    @return  {Array}  An array of browser rules if successful. An empty array if there was an error.
    */

    let rules = [] // default

    try {
        rules = await browser.declarativeNetRequest.getDynamicRules()
    } catch (error) {
        log('browser_rules_get -> error ->', error.message)
    } // try

    return rules
} // browser_rules_get

const browser_rules_highest_id = local.function.browser_rules_highest_id = function browser_rules_highest_id(rules) {
    /*
    Find and return the highest browser rule ID number currently in use. Return the number 1 if there are no browser rules.

    @param  {Array}  rules  Array of browser rule objects.
    */

    const rule_ids = [] // will contain any browser rule ID numbers we find

    for (const rule of rules) {
        rule_ids.push(rule.id)
    } // for

    // return the highest rule ID number or 1 if no rules exist
    const result = rule_ids.sort().slice(-1)[0] || 1

    return result
} // browser_rules_highest_id

const browser_rules_remove = local.function.browser_rules_remove = async function browser_rules_remove() {
    /*
    Remove all currently enabled dynamic rules for this browser.
    */

    // get a list of all currently enabled rules
    const rules = await browser_rules_get()

    if (rules.length === 0) {
        // no rules to remove
        log('browser_rules_remove -> no rules to remove')
    } else {
        const rule_ids = []

        for (const rule of rules) {
            rule_ids.push(rule.id)
        } // for

        log('browser_rules_remove -> remove rule ids', rule_ids)

        const options = {
            removeRuleIds: rule_ids
        } // options

        await browser_rules_update(options)
    } // if

    // reset local.rules to its default since no browser rules currently exist
    local.rules = []

    // reset local.setting.rule_id to its default value since no browser rules currently exist
    local.setting.rule_id = local.setting.rule_id_default

    // save local.setting.rule_id to storage
    await setting_to_storage('rule_id')
} // browser_rules_remove

const browser_rules_sync = local.function.browser_rules_sync = async function browser_rules_sync(reset_queue) {
    /*
    Sync browser and extension rules since they both use different systems for keeping track of everything. Also reload tabs as needed. This function also uses a queue system so only one instance of it can sync rules at a time.

    @param  {Boolean}  [reset_queue]  Optional. True or False. If True, the queue system will be reset in order to run this function recursively. Defaults to false.
    */

    reset_queue = reset_queue || false

    //---------------
    // Queue - Begin
    //---------------
    if (reset_queue === true || local.status.browser_rules_sync_queue === 0) {
        // set the queue to 1 to indicate we are busy
        local.status.browser_rules_sync_queue = 1
    } else {
        // increment the queue to indicate a queued request
        local.status.browser_rules_sync_queue++

        return 'early'
    } // if

    //---------------
    // Current Rules
    //---------------
    if (local.rules.length === 0) {
        local.rules = await browser_rules_get()
    } // if

    //-----------------------
    // Reusable Rules Object
    //-----------------------
    let rules = {
        add_rules    : [],           // array of rule objects
        current_rules: local.rules,  // alias
        remove_rules : []            // array of rule objects
    } // rules

    //------------------------
    // Highest Rule ID Number
    //------------------------
    const highest_id = browser_rules_highest_id(local.rules)

    if (local.setting.rule_id < highest_id) {
        // local.setting.rule_id should always be equal to or higher than any browser rule ID number

        local.setting.rule_id = highest_id

        // no need to save local.setting.rule_id to disk here since it will be saved to disk if any rules are added later in this function
    } // if

    //--------------
    // Global Rules
    //--------------
    rules = browser_rules_sync_global(rules)

    //----------------
    // *.Domain Rules
    //----------------
    rules = browser_rules_sync_domains(rules)

    //--------------
    // Domain Rules
    //--------------
    rules = browser_rules_sync_domain(rules)

    //--------------------
    // Have Rules Changed
    //--------------------
    const rules_have_changed = rules.add_rules.length > 0 || rules.remove_rules.length > 0

    //----------------------
    // Update Browser Rules
    //----------------------
    if (rules_have_changed) {
        const options = {}

        // add rules
        if (rules.add_rules.length > 0) {
            options.addRules = rules.add_rules

            // additions will be processed by chrome after any rules are removed using an options.removeRuleIds array of rule IDs

            // save local.setting.rule_id to storage since we incremented that number by adding more rules
            await setting_to_storage('rule_id')
        } // if

        // remove rules
        if (rules.remove_rules.length > 0) {
            const rule_ids = []

            for (const rule of rules.remove_rules) {
                rule_ids.push(rule.id)
            } // for

            options.removeRuleIds = rule_ids

            // removals will be processed first by chrome, even if an options.addRules array of rule objects exists
        } // if

        await browser_rules_update(options)

        // update local.rules with the updated browser rules
        local.rules = await browser_rules_get()
    } // if

    //------------------------
    // Reload Tabs, As Needed
    //------------------------
    await tabs_reload_as_needed()

    //-------------
    // Queue - End
    //-------------
    if (local.status.browser_rules_sync_queue === 1) {
        // reset the queue back to 0
        local.status.browser_rules_sync_queue = 0
    } else {
        // queue is greater than 1
        log('browser_rules_sync -> recursing since queue is', local.status.browser_rules_sync_queue)

        await browser_rules_sync(true) // true means reset the queue and run again
    } // if
} // browser_rules_sync

const browser_rules_sync_domain = local.function.browser_rules_sync_domain = function browser_rules_sync_domain(rules) {
    /*
    Sync domain rules by comparing the current browser rules with our extension options. If needed, remove and/or recreate browser rules.

    @param   {Object}  rules  Rules object with an "active" boolean and "add_rules", "current_rules", and "remove_rules" arrays. Each array can have zero or more rule objects.
    @return  {Object}         Rules object.
    */

    const option_global = local.option.global // alias

    // check for domain browser rules that should be removed
    for (const rule of rules.current_rules) {
        if (rule.priority !== 6) {
            // we are only interested in priority 6 rules for domain requests
            continue
        } // if

        let remove_this_rule = false // default

        const hostname = convert_from_url_filter(rule.condition.urlFilter)
        const root_domain = hostname_to_root_domain(hostname)

        const option_domain  = local.option.domain[hostname]
        const option_domains = local.option.domains[root_domain]

        if (local.option.domain[hostname] === undefined) {
            // a domain rule does NOT exist
            remove_this_rule = true
        } else {
            // a domain rule exists

            let parent_rules_same_outcome = false // will be set to true if the global option, optional *.domain option, and domain option have the same boolean value

            if (option_domains === undefined) {
                // a *.domain rule that can affect this hostname does NOT exist
                if (option_domain === option_global) {
                    parent_rules_same_outcome = true
                } // if
            } else {
                // a *.domain rule that can affect this hostname exists
                if (option_domain === option_domains) {
                    parent_rules_same_outcome = true
                } // if
            } // if

            if (parent_rules_same_outcome === true) {
                // a *.domain or global rule will take of this domain so we do not need to have a domain rule for this hostname
                remove_this_rule = true
            } else {
                // the setting for this domain differs from either a *.domain or global rule so we need to check this domain rule a bit more closely
                const desired_operation = (option_domain === true) ? 'append' : 'set'

                if (rule.action.responseHeaders[0].operation !== desired_operation) {
                    // this is an outdated rule that is doing the opposite of what it should
                    remove_this_rule = true
                } // if
            } // if
        } // if

        if (remove_this_rule) {
            // remove from current_rules
            rules.current_rules = rules.current_rules.filter(keep => keep.id !== rule.id)

            // add to remove_rules
            rules.remove_rules.push(rule)
        } // if
    } // for

    // check for domain browser rules that should be added
    for (const domain in local.option.domain) {
        const hostname = domain
        const root_domain = hostname_to_root_domain(hostname)

        const option_domain  = local.option.domain[hostname]
        const option_domains = local.option.domains[root_domain]

        let parent_rules_same_outcome = false // will be set to true if the global option, optional *.domain option, and optional domain option all have the same boolean value

        if (option_domains === undefined) {
            // a *.domain rule that can affect this hostname does NOT exist
            if (option_domain === option_global) {
                parent_rules_same_outcome = true
            } // if
        } else {
            // a *.domain rule that can affect this hostname exists
            if (option_domain === option_domains) {
                parent_rules_same_outcome = true
            } // if
        } // if

        if (parent_rules_same_outcome === false) {
            // the setting for this domain differs from either a *.domain or global rule so a domain rule is needed

            const domain_url_filter = convert_to_url_filter(hostname)

            // priority 6 rules are ONLY for domain requests
            const existing_rules = rules.current_rules.filter(rule => rule.priority === 6).filter(rule => rule.condition.urlFilter === domain_url_filter)

            if (existing_rules.length === 0) {
                // we are missing a rule for this domain

                const header_csp = (option_domain === true) ? local.setting.empty_csp : local.setting.header_csp

                const header_operation = (option_domain === true) ? 'append' : 'set'

                // add a rule that works ONLY if the requested URL is from our domain
                const new_priority_6_rule = {
                    'action': {
                        'responseHeaders': [{
                            'header': 'Content-Security-Policy',
                            'operation': header_operation,
                            'value': header_csp
                        }],
                        'type': 'modifyHeaders'
                    },
                    'condition': {
                        'isUrlFilterCaseSensitive': false,
                        'resourceTypes': local.setting.resource_types,
                        'urlFilter': domain_url_filter
                    },
                    'id': ++local.setting.rule_id, // ++ increments rule_id in place before using it
                    'priority': 6 // priority 6 rules are ONLY for domain requests
                } // new_priority_6_rule

                // add new rules to "add_rules"
                rules.add_rules.push(new_priority_6_rule)

                // add new rules to "current_rules"
                rules.current_rules.push(new_priority_6_rule)
            } // if
        } // if
    } // for

    return rules
} // browser_rules_sync_domain

const browser_rules_sync_domains = local.function.browser_rules_sync_domains = function browser_rules_sync_domains(rules) {
    /*
    Sync *.domain rules by comparing the current browser rules with our extension options. If needed, remove and/or recreate browser rules.

    @param   {Object}  rules  Rules object with an "active" boolean and "add_rules", "current_rules", and "remove_rules" arrays. Each array can have zero or more rule objects.
    @return  {Object}         Rules object.
    */

    const header_csp = (local.option.global === true) ? local.setting.header_csp : local.setting.empty_csp // if global is true, only blocking csp header rules should exist, if global is false, only empty csp header rules should exist

    const header_operation = (local.option.global === true) ? 'set' : 'append' // if global is true, we only want to have rules that set the csp header, if global is false, we only want to have rules that append to the csp header

    // check for *.domain browser rules that should be removed
    for (const rule of rules.current_rules) {
        let remove_this_rule = false // default

        // priority 3, 4, and 5 rules are ONLY for *.domain requests
        if (rule.priority === 3 || rule.priority === 4 || rule.priority === 5) {
            if (rule.action.responseHeaders[0].value !== header_csp) {
                // remove this rule which is only valid when option.global is the opposite boolean value to what it is now
                remove_this_rule = true
            } else {
                // check rule for this *.domain
                let domain = ''

                if (rule.priority === 3 || rule.priority === 4) {
                    domain = convert_from_url_filter(rule.condition.urlFilter)
                } else {
                    // priority 5
                    domain = convert_from_regex_filter(rule.condition.regexFilter)
                } // if

                if (local.option.domains[domain] === undefined) {
                    // there should be no rule for this *.domain
                    remove_this_rule = true
                } else if (local.option.domains[domain] === local.option.global) {
                    // *.domain already being allowed or blocked globally so remove this unneeded rule
                    remove_this_rule = true
                } // if
            } // if
        } // if

        if (remove_this_rule) {
            // remove from current_rules
            rules.current_rules = rules.current_rules.filter(keep => keep.id !== rule.id)

            // add to remove_rules
            rules.remove_rules.push(rule)
        } // if
    } // for

    // check for *.domain browser rules that should be added
    for (const domain in local.option.domains) {
        if (local.option.domains[domain] === local.option.global) {
            // rule not needed since the current global setting will take care of this *.domain
            continue
        } // if

        const domain_url_filter = convert_to_url_filter(domain)

        // priority 3 rules are ONLY for *.domain requests
        const existing_rules = rules.current_rules.filter(rule => rule.priority === 3).filter(rule => rule.condition.urlFilter === domain_url_filter)

        if (existing_rules.length === 0) {
            // we are missing rules for this domain

            // add a rule that works ONLY if the requested URL is the root host of our *.domain
            const new_priority_3_rule = {
                'action': {
                    'responseHeaders': [{
                        'header': 'Content-Security-Policy',
                        'operation': header_operation,
                        'value': header_csp
                    }],
                    'type': 'modifyHeaders'
                },
                'condition': {
                    'isUrlFilterCaseSensitive': false,
                    'resourceTypes': local.setting.resource_types,
                    'urlFilter': convert_to_url_filter(domain)
                },
                'id': ++local.setting.rule_id, // ++ increments rule_id in place before using it
                'priority': 3 // priority 3 rules are ONLY for *.domain requests
            } // new_priority_3_rule

            // add a rule that works ONLY if the requested URL is the exact root host of our *.domain and it is using a protocol/port other than HTTP/80 or HTTPS/443
            const new_priority_4_rule = {
                'action': {
                    'responseHeaders': [{
                        'header': 'Content-Security-Policy',
                        'operation': header_operation,
                        'value': header_csp
                    }],
                    'type': 'modifyHeaders'
                },
                'condition': {
                    'isUrlFilterCaseSensitive': false,
                    'resourceTypes': local.setting.resource_types,
                    'urlFilter': convert_to_url_filter(domain, true) // true meaning return a port variant version of a "urlFilter" that ends with a ":" character
                },
                'id': ++local.setting.rule_id, // ++ increments rule_id in place before using it
                'priority': 4 // priority 4 rules are ONLY for *.domain requests
            } // new_priority_4_rule

            // add a rule that works ONLY if the requested URL is from our *.domain
            const new_priority_5_rule = {
                'action': {
                    'responseHeaders': [{
                        'header': 'Content-Security-Policy',
                        'operation': header_operation,
                        'value': header_csp
                    }],
                    'type': 'modifyHeaders'
                },
                'condition': {
                    'isUrlFilterCaseSensitive': false,
                    'regexFilter': convert_to_regex_filter(domain),
                    'resourceTypes': local.setting.resource_types
                },
                'id': ++local.setting.rule_id, // ++ increments rule_id in place before using it
                'priority': 5 // priority 5 rules are ONLY for *.domain requests
            } // new_priority_5_rule

            // add new rules to "add_rules"
            rules.add_rules.push(new_priority_3_rule)
            rules.add_rules.push(new_priority_4_rule)
            rules.add_rules.push(new_priority_5_rule)

            // add new rules to "current_rules"
            rules.current_rules.push(new_priority_3_rule)
            rules.current_rules.push(new_priority_4_rule)
            rules.current_rules.push(new_priority_5_rule)
        } // if
    } // for

    return rules
} // browser_rules_sync_domains

const browser_rules_sync_global = local.function.browser_rules_sync_global = function browser_rules_sync_global(rules) {
    /*
    Sync global rules by comparing the current browser rules with our extension options. If needed, remove and recreate browser rules.

    @param   {Object}  rules  Rules object with an "active" boolean and "add_rules", "current_rules", and "remove_rules" arrays. Each array can have zero or more rule objects.
    @return  {Object}         Rules object.
    */

    // if rules are not active, javascript should always be allowed globally
    const extension_global_allow = local.option.global

    // priority 2 rules are ONLY for blocking globally
    const browser_global_allow = rules.current_rules.filter(rule => rule.priority === 2).length === 0

    const browser_default_rule_missing = rules.current_rules.filter(rule => rule.priority === 1 || rule.priority === 2).length === 0

    if (browser_global_allow !== extension_global_allow || browser_default_rule_missing) {
        // the browser is using an outdated ruleset or missing a default rule

        if (rules.current_rules.length > 0) {
            log('browser_rules_sync_global -> remove all rules')

            for (const rule of rules.current_rules) {
                rules.remove_rules.push(rule)
            } // for

            // set current rules to empty
            rules.current_rules = []
        } // if

        // reset local.setting.rule_id to its default value since no browser rules currently exist
        local.setting.rule_id = local.setting.rule_id_default

        const header_csp = (extension_global_allow === true) ? local.setting.empty_csp : local.setting.header_csp

        const header_operation = (extension_global_allow === true) ? 'append' : 'set'

        // priority 1 rules are ONLY for allowing globally
        // priority 2 rules are ONLY for blocking globally
        const priority = (extension_global_allow === true) ? 1 : 2

        const new_priority_rule = {
            'action': {
                'responseHeaders': [{
                    'header': 'Content-Security-Policy',
                    'operation': header_operation,
                    'value': header_csp
                }],
                'type': 'modifyHeaders'
            },
            'condition': {
                'resourceTypes': local.setting.resource_types
            },
            'id': 1, // leave ID as 1 since only one default allow or block rule should exist at a time
            'priority': priority // 1 or 2
        } // new_priority_rule

        // add new rule to "add_rules"
        rules.add_rules.push(new_priority_rule)

        // add new rule to "current_rules"
        rules.current_rules.push(new_priority_rule)

        if (extension_global_allow === true) {
            log('browser_rules_sync_global -> default allow rule set')
        } else {
            log('browser_rules_sync_global -> default block rule set')
        } // if
    } // if

    return rules
} // browser_rules_sync_global

const browser_rules_update = local.function.browser_rules_update = async function browser_rules_update(options) {
    /*
    Update dynamic rules. Depending on the options object passed in, add, update, or remove rules.

    @param  {Object}  options  Options object with an addRules and/or removeRuleIds array.
    */

    log('browser_rules_update ->', options)

    try {
        await browser.declarativeNetRequest.updateDynamicRules(options)
    } catch (error) {
        log('browser_rules_update -> error ->', error.message)
    } // try
} // browser_rules_update

const convert_from_regex_filter = local.function.convert_from_regex_filter = function convert_from_regex_filter(regex_filter) {
    /*
    Convert a browser rule "regexFilter" to a hostname.

    @param   {String}  regex_filter  String like "^.*://[^/]*(@|\.)microsoft\.com(:|/)".
    @return  {String}                String like "microsoft.com".
    */

    return regex_filter.slice(17, -5).replaceAll('\\.', '.')
} // convert_from_regex_filter

const convert_from_url_filter = local.function.convert_from_url_filter = function convert_from_url_filter(url_filter) {
    /*
    Convert a browser rule "urlFilter" to a hostname.

    @param   {String}  url_filter  String like "|*://microsoft.com/" or "|*://microsoft.com:".
    @return  {String}              String like "microsoft.com"
    */

    return url_filter.slice(5, -1)
} // convert_from_url_filter

const convert_to_regex_filter = local.function.convert_to_regex_filter = function convert_to_regex_filter(hostname) {
    /*
    Convert a hostname to a browser rule "regexFilter".

    @param   {String}  hostname  String like "microsoft.com".
    @return  {String}            String like "^.*://[^/]*(@|\.)microsoft\.com(:|/)".
    */

    return '^.*://[^/]*(@|\\.)' + hostname.replaceAll('.', '\\.') + '(:|/)'
} // convert_to_regex_filter

const convert_to_url_filter = local.function.convert_to_url_filter = function convert_to_url_filter(hostname, port_variant) {
    /*
    Convert a hostname to a browser rule "urlFilter".

    @param   {String}   hostname        String like "microsoft.com".
    @param   {Boolean}  [port_variant]  Optional. If true, return a URL filter that ends with a ":" instead of a "/" to support ports other than 80 or 433.
    @return  {String}                   String like "|*://microsoft.com/" or "|*://microsoft.com:".
    */

    const last_character = (port_variant === true) ? ':' : '/'

    return '|*://' + hostname + last_character
} // convert_to_url_filter

const extension_page = local.function.extension_page = async function extension_page(page, hash) {
    /*
    Focus an already open extension page or open a new extension page.

    @param  {String}  [page]  Optional. Page like "about". Defaults to "options".
    @param  {String}  [hash]  Optional. Hash ID to scroll to like "change-log".
    */

    page = page || 'options'
    hash = hash || ''

    const theme = preference_theme()
    const icon_color = preference_icon_color()

    let url = local.url[theme][icon_color][page]

    if (hash !== '') {
        url += '#' + hash
    } // if

    let open_new_page = true // default

    const non_popup_ports = local.port.filter(port => port.name !== 'popup')

    if (non_popup_ports.length > 0) {
        // focus an existing page that is not a popup
        const tab = non_popup_ports[0].sender.tab

        try {
            await browser.windows.update(tab.windowId, { focused: true })
            await browser.tabs.update(tab.id, { active: true, url: url })

            open_new_page = false
        } catch (error) {
            log('extension_page -> error', error.message)
        } // try
    } // if

    if (open_new_page) {
        // open a new page
        try {
            await browser.tabs.create({ url: url })
        } catch (error) {
            log('extension_page -> tab create error', error.message)
        } // try
    } // if
} // extension_page

const icon_set = local.function.icon_set = async function icon_set(color, tab_id) {
    /*
    Set the browser action icon for one or all tabs.

    @param  {String}  [color]   An available icon color like "pink". Defaults to "blue".
    @param  {Number}  [tab_id]  Optional tab ID to set. If not specified, all tabs will be set.
    */

    color = color || 'blue'
    tab_id = tab_id || 0

    const details = {
        'path': {
            '16':  'images/icon/status/status-' + color + '-16.png',
            '24':  'images/icon/status/status-' + color + '-24.png',
            '32':  'images/icon/status/status-' + color + '-32.png',
            '48':  'images/icon/status/status-' + color + '-48.png',
            '64':  'images/icon/status/status-' + color + '-64.png',
            '96':  'images/icon/status/status-' + color + '-96.png',
            '128': 'images/icon/status/status-' + color + '-128.png'
        },
        'tabId': (tab_id > 0) ? tab_id : null // null will set all tabs
    } // details

    try {
        await browser.action.setIcon(details)
    } catch (error) {
        log('icon_set -> error ->', error.message)
    } // try
} // icon_set

const icon_set_all_tabs = local.function.icon_set_all_tabs = async function icon_set_all_tabs() {
    /*
    Loop through local.status.tab and call icon_set_one_tab() for each tab ID.
    */

    const promises = []

    for (const property in local.status.tab) {
        const tab = local.status.tab[property]

        promises.push(
            icon_set_one_tab(tab.id)
        )
    } // for

    await Promise.allSettled(promises)
} // icon_set_all_tabs

const icon_set_one_tab = local.function.icon_set_one_tab = async function icon_set_one_tab (tab_id) {
    /*
    Set one tab icon to the correct color.

    @param  {Number}  tab_id  Number of the tab ID to set.
    */

    const tab = local.status.tab[tab_id]

    if (tab === undefined) {
        // the requested tab no longer exists
        return 'early'
    } // if

    let color = 'pink' // default

    if (tab.allow === true) {
        color = 'blue'
    } // if

    if (local.status.permissions === false) {
        color = 'orange'
    } else if (tab.warning === true) {
        if (local.preference.global_warn === 'hide' && tab.warnings.toString() === 'global_warn') {
            // user does not need to be notified about global warnings
        } else if (always_allow(tab.hostname, tab.root_domain) === true) {
            // no warning needed for a hostname or root domain that is always allowed
        } else {
            color = 'orange'
        } // if
    } // if

    await icon_set(color, tab_id)
} // icon_set_one_tab

const install_or_upgrade = local.function.install_or_upgrade = async function install_or_upgrade() {
    /*
    If needed, run any install or upgrade tasks.
    */

    const version_in_storage = await version_from_storage()

    if (local.version !== version_in_storage) {
        // manifest version does not match the version in storage so this is a first install or upgrade

        if (version_in_storage === '') {
            // first install
            log('install_or_upgrade -> first install')

            // save default options to storage
            for (const property in local.option) {
                await option_to_storage(property)
            } // for

            if (shared.browser.firefox) {
                // hide badge text by default
                local.preference.badge_text = 'hide'
            } // if

            // save default preferences to storage
            for (const property in local.preference) {
                await preference_to_storage(property)
            } // for

            // show extension page
            local.setting.show_extension = true

            if (shared.browser.chrome === true) {
                // show a one-time message about the chrome extensions toolbar menu and how it likes to hide icons by default
                local.setting.show_message.chrome_extensions_toolbar = true
            } else if (shared.browser.edge === true) {
                // show a one-time message about the edge extensions toolbar menu and how it likes to hide icons by default
                local.setting.show_message.edge_extensions_toolbar = true
            } else if (shared.browser.firefox === true) {
                // show a one-time message about the firefox extensions toolbar menu and how it likes to hide icons by default
                local.setting.show_message.firefox_extensions_toolbar = true
            } // if
        } else {
            // upgrade
            log('install_or_upgrade -> upgrade')

            let check_version = ''
            const message_upgrade = 'install_or_upgrade -> upgrade for version less than '

            check_version = '2021.4.6.0'
            if (version_less_than(version_in_storage, check_version)) {
                // version_in_storage is less than check_version
                log(message_upgrade + check_version)

                await preference_to_storage('theme_popup')
            } // if

            check_version = '2022.7.2.0'
            if (version_less_than(version_in_storage, check_version)) {
                // version_in_storage is less than check_version
                log(message_upgrade + check_version)

                const remove_patreon_items = [
                    'demo',
                    'full_name',
                    'id',
                    'last_updated',
                    'lifetime_support_cents',
                    'multipass',
                    'patron_status'
                ] // remove_patreon_items

                for (const property of remove_patreon_items) {
                    // remove patreon items from storage
                    await storage_remove('patreon_' + property)
                } // for

                // show extension page
                local.setting.show_extension = true

                // show a one-time message
                local.setting.show_message.upgrade_free = true
            } // if

            check_version = '2022.11.24.0'
            if (version_less_than(version_in_storage, check_version)) {
                // version_in_storage is less than check_version
                log(message_upgrade + check_version)

                await preference_to_storage('global_warn')
            } // if

            /*
            // show a one-time message
            local.setting.show_message.upgrade_complete = true

            // show extension page
            local.setting.show_extension = true
            */
        } // upgrade

        if (local.setting.show_extension === true) {
            log('install_or_upgrade -> show extension')
        } // if

        // save the current version to storage
        await version_to_storage()
    } // if
} // install_or_upgrade

const listener_permissions = local.function.listener_permissions = async function listener_permissions() {
    /*
    Listener for browser.permissions.onAdded and browser.permissions.onRemoved events.
    */

    await permissions_check_and_icons()

    // send a notification to all ports
    port_message_all({
        'subject': 'status-permissions',
        'value'  : local.status.permissions
    })

    await tabs_reload_after_permissions()
} // listener_permissions

const listener_port_connect = local.function.listener_port_connect = function listener_port_connect(port) {
    /*
    Listener for browser.runtime.onConnect events.

    @param  {Object}  port  Object with the properties onDisconnect, name, sender, onMessage, disconnect, and postMessage.
    */

    // log('listener_port_connect -> port connected')

    local.port.push(port)

    port.onDisconnect.addListener(listener_port_disconnect)

    port.onMessage.addListener(listener_port_message)
} // listener_port_connect

const listener_port_disconnect = local.function.listener_port_disconnect = function listener_port_disconnect(port) {
    /*
    Listener for port.onDisconnect events.

    @param  {Object}  port  Object with the properties onDisconnect, name, sender, onMessage, disconnect, and postMessage.
    */

    // log('listener_port_disconnect -> disconnected')

    local.port = local.port.filter(keep => keep !== port)
} // listener_port_disconnect

const listener_port_message = local.function.listener_port_message = async function listener_port_message(obj, port) {
    /*
    Listener for port.onMessage events.

    @param  {Object}  obj   Object like {subject:"option-set"}
    @param  {Object}  port  Object with the properties onDisconnect, name, sender, onMessage, disconnect, and postMessage.
    */

    // manifest version 3 service workers must register their listeners early, so early that start() may not have had a chance to finish yet
    try {
        await start_done()
    } catch (error) {
        log('listener_port_message -> error ->', error)

        return 'early'
    } // try

    switch (obj.subject) {
        case 'init-about':
            // log('listener_port_message -> init-about')

            port.postMessage({
                'subject'   : 'init-about',
                'option'    : local.option,
                'preference': local.preference,
                'status'    : {
                    'permissions': local.status.permissions
                },
                'version'   : local.version
            })

            break
        case 'init-options':
            // log('listener_port_message -> init-options')

            port.postMessage({
                'subject'   : 'init-options',
                'option'    : local.option,
                'preference': local.preference,
                'setting'   : {
                    'mandatory_options': local.setting.mandatory_options,
                    'show_message'     : local.setting.show_message
                },
                'status'    : {
                    'permissions': local.status.permissions
                }
            })

            show_message_relayed()

            break
        case 'init-popup':
            // log('listener_port_message -> init-popup')

            port.postMessage({
                'subject'   : 'init-popup',
                'option'    : local.option,
                'preference': local.preference,
                'status'    : {
                    'permissions': local.status.permissions
                }
            })

            break
        case 'init-preferences':
            // log('listener_port_message -> init-preferences')

            port.postMessage({
                'subject'   : 'init-preferences',
                'preference': local.preference,
                'status'    : {
                    'permissions': local.status.permissions
                }
            })

            break
        case 'option-set': {
            log('listener_port_message -> option-set -> ' + obj.name, obj.value)

            if (local.option[obj.name] === undefined) {
                // option does not exist
                log('listener_port_message -> option-set -> option "' + obj.name + '" does not exist')

                break
            } // if

            let sync_rules = false // default

            switch (obj.name) {
                case 'global':
                    sync_rules = true

                    break
                case 'domains':
                    sync_rules = true

                    break
                case 'domain':
                    sync_rules = true

                    break
            } // switch

            // save option
            local.option[obj.name] = obj.value

            // save option to storage
            await option_to_storage(obj.name)

            if (sync_rules === true) {
                // sync extension and browser rules
                await browser_rules_sync()
            } // if

            // send updated option to all ports except the port that originally messaged us
            port_message_all_except(port, {
                'subject': 'option-set',
                'name'   : obj.name,
                'value'  : obj.value
            })

            // update badge and icons for each tab, in case an option has affected the display of the "global_warn" preference
            await badge_set_all_tabs()
            await icon_set_all_tabs()

            break
        } // case
        case 'page-options':
            // log('listener_port_message -> page-options')

            // focus or open a new options page
            await extension_page('options')

            break
        case 'preference-set':
            log('listener_port_message -> preference-set -> ' + obj.name, obj.value)

            if (local.preference[obj.name] === undefined) {
                // preference does not exist
                log('listener_port_message -> preference-set -> preference "' + obj.name + '" does not exist')

                break
            } // if

            if (local.preference[obj.name] === obj.value) {
                // preference value has not changed
                break
            } // if

            // save preference
            local.preference[obj.name] = obj.value

            // save preference to storage
            await preference_to_storage(obj.name)

            switch (obj.name) {
                case 'badge_text':
                    await badge_set_all_tabs()

                    break
                case 'browser_is_dark':
                    await popup_set()

                    break
                case 'global_warn':
                    await badge_set_all_tabs()
                    await icon_set_all_tabs()

                    break
                case 'icon_color':
                    await popup_set()

                    break
                case 'theme':
                    // do nothing

                    break
                case 'theme_popup':
                    await popup_set()

                    break
            } // switch

            // send updated preference to all ports except for the port that originally messaged us
            port_message_all_except(port, {
                'subject': 'preference-set',
                'name'   : obj.name,
                'value'  : obj.value
            })

            break
        case 'service-worker-reload':
            // message from a "noscript.js" file which was injected into the main frame of a tab

            log('listener_port_message -> service-worker-reload', obj.hostname)

            await service_worker_reload(obj.hostname)

            break
        default:
            log('listener_port_message -> unknown obj.subject', obj)

            break
    } // switch
} // listener_port_message

const listener_rule_debug = local.function.listener_rule_debug = function listener_rule_debug(info) {
    /*
    Listener for browser.declarativeNetRequest.onRuleMatchedDebug events. Log information about matched browser rules for debugging purposes.

    @param  {Object}  info  Object with information about a URL and one or more rules which were matched.
    */

    log(info)
} // listener_rule_debug

const listener_service_worker_install = local.function.listener_service_worker_install = function listener_service_worker_install(event) {
    /*
    Listener for service worker install events.

    @param  {Object}  event  Object with a type property that should be "install".
    */

    log('listener_service_worker_install -> event.type ->', event.type)

    self.skipWaiting() // a promise we do not need to wait for

    log('listener_service_worker_install -> skipped waiting')
} // listener_service_worker_install

const listener_tab_activated = local.function.listener_tab_activated = async function listener_tab_activated(info) {
    /*
    Listener function for browser.tabs.onActivated events.

    @param  {Object}  info  Object which contains the properties "previousTabId", "tabId", and "windowId". More info at https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onActivated#activeinfo
    */

    const tab_id = info.tabId

    log('listener_tab_activated ->', tab_id)

    // send a notification to all popup ports
    port_message_popups({
        'subject': 'popup-tab-activated',
        'value'  : tab_id
    })
} // listener_tab_activated

const listener_tab_removed = local.function.listener_tab_removed = async function listener_tab_removed(tab_id, remove_info) {
    /*
    Listener function for browser.tabs.onRemoved events.

    @param  {Number}  tab_id       ID of the tab that was removed.
    @param  {Object}  remove_info  Not used.
    */

    log('listener_tab_removed ->', tab_id)

    // manifest version 3 service workers must register their listeners early, so early that start() may not have had a chance to finish yet
    try {
        await start_done()
    } catch (error) {
        log('listener_tab_removed -> error ->', error)

        return 'early'
    } // try

    delete local.status.tab[tab_id]
} // listener_tab_removed

const listener_tab_updated = local.function.listener_tab_updated = async function listener_tab_updated(tab_id, change_info, tab) {
    /*
    Listener function for browser.tabs.onUpdated events.

    @param  {Number}  tab_id       ID of the tab that was updated.
    @param  {Object}  change_info  Various change information. More info at
        https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated#changeInfo
    @param  {Object}  tab          Various tab information. More info at
        https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab
    */

    // manifest version 3 service workers must register their listeners early, so early that start() may not have had a chance to finish yet
    try {
        await start_done()
    } catch (error) {
        log('listener_tab_updated -> error ->', error)

        return 'early'
    } // try

    if (change_info.status === 'loading' || change_info.status === 'complete') {
        let tab_url = tab.url.toLowerCase()

        const new_tab = (tab_url === 'about://newtab' ||
                         tab_url === 'chrome://newtab/' ||
                         tab_url === 'edge://newtab/')

        if (new_tab === true) {
            // log('listener_tab_updated -> new tab detected')
            tab_url = await new_tab_url(tab_url, tab_id)
        } // if

        if (tab_url.indexOf('http:') === 0 || tab_url.indexOf('https:') === 0) {
            log('listener_tab_updated ->', tab_id, change_info.status, tab_url)
        } // if

        let previous_allow = null
        let previous_browser_allow = null
        let previous_hostname = null

        if (local.status.tab[tab_id] !== undefined) {
            previous_allow         = local.status.tab[tab_id].allow
            previous_browser_allow = local.status.tab[tab_id].browser_allow
            previous_hostname      = local.status.tab[tab_id].hostname
        } // if

        const hostname = url_to_hostname(tab_url)
        const root_domain = hostname_to_root_domain(hostname)

        local.status.tab[tab_id] = {
            allow        : undefined, // will be set to true or false
            browser_allow: undefined, // will be set to true or false
            hostname     : hostname,
            id           : tab_id,
            root_domain  : root_domain,
            url          : tab_url,
            warning      : undefined, // will be set to true or false
            warnings     : undefined  // will be set to an array with zero or more strings
        }

        // compare browser rules and the current URL to figure out if the user needs to be warned about something
        const warnings = browser_rules_warnings(hostname, root_domain, tab_url)
        const warning = warnings.length > 0 // true or false

        local.status.tab[tab_id].warning = warning
        local.status.tab[tab_id].warnings = warnings

        if (previous_hostname === hostname) {
            // hostname has not changed so it is safe to reuse the previous allow values
            local.status.tab[tab_id].allow = previous_allow
            local.status.tab[tab_id].browser_allow = previous_browser_allow
        } else {
            local.status.tab[tab_id].allow = allow_script(hostname, root_domain)
            local.status.tab[tab_id].browser_allow = await browser_allow_script(hostname, root_domain)
        } // if

        const allow_tab = local.status.tab[tab_id].allow

        if (allow_tab === false && hostname !== '' && change_info.status === 'complete' && new_tab === false && warning === false) {
            const details = {
                files: ['/js/noscript.js'],
                target: {
                    'allFrames': true,
                    'tabId': tab_id
                }
            } // details

            try {
                await browser.scripting.executeScript(details)

                log('listener_tab_updated -> noscript inject tab', tab_id)
            } catch (error) {
                let log_error = true // default

                if (shared.browser.firefox) {
                    if (error.message === 'An unexpected error occurred') {
                        // this is most likely firefox attempting to inject a tab that has since redirected or navigated to a new location
                        log_error = false
                    } // if
                } // if

                if (log_error) {
                    log('listener_tab_updated -> noscript inject error ->', error.message)
                } // if
            } // try
        } // if

        await icon_set_one_tab(tab_id)
        await badge_set_one_tab(tab_id)
    } // if
} // listener_tab_updated

const option_to_storage = local.function.option_to_storage = async function option_to_storage(property) {
    /*
    Save a single local option to storage.

    @param  {String}  property  Property name like "global".
    */

    await storage_set({
        ['option_' + property]: local.option[property]
    })
} // option_to_storage

const permissions_check = local.function.permissions_check = async function permissions_check() {
    /*
    Check permissions to make sure the "host_permissions" array in our manifest file is being honored.

    @return  {Boolean}  result  True or false.
    */

    let result = true // default

    if (shared.browser.firefox === true) {
        result = await browser.permissions.contains(shared.permissions)
    } // if

    return result
} // permissions_check

const permissions_check_and_icons = local.function.permissions_check_and_icons = async function permissions_check_and_icons(update_icons) {
    /*
    Check permissions, update the local.status.permissions boolean, and optionally update all tab status icons, if needed.

    @param  {Boolean}  [update_icons]  Optional. If true, update all tab status icons, if needed. Defaults to true.
    */

    if (shared.browser.firefox === false) {
        return 'early'
    } // if

    update_icons = (update_icons === false) ? false : true

    const previous_permissions = local.status.permissions

    local.status.permissions = await permissions_check()

    if (update_icons === true) {
        if (local.status.permissions !== previous_permissions) {
            await icon_set_all_tabs()
        } // if
    } // if
} // permissions_check_and_icons

const popup_set = local.function.popup_set = async function popup_set() {
    /*
    Set the popup location using the current popup theme and icon color.
    */

    const theme = preference_theme_popup()
    const icon_color = preference_icon_color()
    const popup = '/page/' + theme + '/' + icon_color + '/popup.html'

    try {
        log('popup_set -> ' + popup)

        await browser.action.setPopup({
            popup: popup
        })
    } catch (error) {
        log('popup_set -> error ->', error.message)
    } // try
} // popup_set

const port_message_all = local.function.port_message_all = function port_message_all(obj) {
    /*
    Send an object to all connected ports.

    @param  {Object}  obj  An object.
    */

    for (const port of local.port) {
        port.postMessage(obj)
    } // for
} // port_message_all

const port_message_all_except = local.function.port_message_all_except = function port_message_all_except(port, obj) {
    /*
    Send an object to all connected ports except one.

    @param  {Object}  port  A port object that should not have anything sent to it.
    @param  {Object}  obj   An object to send.
    */

    for (let i = 0; i < local.port.length; i++) {
        if (local.port[i] !== port) {
            local.port[i].postMessage(obj)
        } // if
    } // for
} // port_message_all_except

const port_message_popups = local.function.port_message_popups = function port_message_popups(obj) {
    /*
    Send an object to all connected ports that are popup pages.

    @param  {Object}  obj  An object.
    */

    const popup_ports = local.port.filter(port => port.name === 'popup')

    for (const port of popup_ports) {
        port.postMessage(obj)
    } // for
} // port_message_popups

const preference_icon_color = local.function.preference_icon_color = function preference_icon_color() {
    /*
    Return the current icon color preference, with a value like "automatic" translated to the correct "dark" or "light" variant.

    @return  {String}  Icon color like "blue", "dark", or "light".
    */

    let icon_color = local.preference.icon_color

    if (icon_color === 'automatic') {
        if (local.preference.browser_is_dark) {
            icon_color = 'light'
        } else {
            icon_color = 'dark'
        } // if
    } // if

    return icon_color
} // preference_icon_color

const preference_theme = local.function.preference_theme = function preference_theme() {
    /*
    Return the current theme preference, with a value like "automatic" translated to the correct "dark" or "light" variant.

    @return  {String}  Theme like "dark" or "light".
    */

    let theme = local.preference.theme

    if (theme === 'automatic') {
        if (local.preference.browser_is_dark) {
            theme = 'dark'
        } else {
            theme = 'light'
        } // if
    } // if

    return theme
} // preference_theme

const preference_theme_popup = local.function.preference_theme_popup = function preference_theme_popup() {
    /*
    Return the current popup theme preference, with a value like "automatic" translated to the correct "dark" or "light" variant.

    @return  {String}  Theme like "dark" or "light".
    */

    let theme = local.preference.theme_popup

    if (theme === 'automatic') {
        if (local.preference.browser_is_dark) {
            theme = 'dark'
        } else {
            theme = 'light'
        } // if
    } // if

    return theme
} // preference_theme_popup

const preference_to_storage = local.function.preference_to_storage = async function preference_to_storage(property) {
    /*
    Save a single local preference to storage.

    @param  {String}  property  Property name like "theme".
    */

    await storage_set({
        ['preference_' + property]: local.preference[property]
    })
} // preference_to_storage

const service_worker_reload = local.function.service_worker_reload = async function service_worker_reload(hostname) {
    /*
    Use a special procedure to send all current tabs visiting the provided hostname to a temporary loading URL so their service workers can stop after being unregistered. Then after a short delay, return those tabs to their original URLs.

    @param  {String}  hostname  Hostname like "www.microsoft.com".
    */

    hostname = hostname || ''

    if (typeof hostname !== 'string') {
        // hostname must be a string
        log('service_worker_reload -> error -> hostname must be a string')

        return 'early'
    } // if

    if (hostname.length === 0) {
        // hostname is empty
        log('service_worker_reload -> error -> hostname is empty')

        return 'early'
    } // if

    if (local.status.service_worker_reload[hostname] === true) {
        // we are already reloading one or more tabs for this hostname
        return 'early'
    } // if

    // set this hostname to true to indicate that we are already reloading one or more tabs for this hostname
    local.status.service_worker_reload[hostname] = true

    await browser_remove_service_workers([hostname])

    // Even though the service worker was unregistered, it can still run while one of its pages are still open. Even if that page is reloaded.

    // For example, an unregistered service worker using setInterval may never go idle.

    // The solution, display a temporary loading page on a different hostname in order to give the browser time to stop any unregistered service workers associated with the original hostname. Then after a short delay, load the URL of the original hostname.

    // Keep track of tab IDs and their original URLs so we can return those tabs to their original locations after they hang out on a loading page for awhile.
    const tabs = [
        // [1, 'https://www.microsoft.com/en-us/']
    ] // tabs

    //----------------------------------
    // Find all tabs with this hostname
    //----------------------------------
    const query_options = {
        populate: true,
        windowTypes: ['normal']
    } // query_options

    try {
        const windows = await browser.windows.getAll(query_options)

        for (const one_window of windows) {
            for (const tab of one_window.tabs) {
                if (hostname === url_to_hostname(tab.url)) {
                    // we need to do the loading and restore procedure for this tab
                    tabs.push([tab.id, tab.url])
                } // if
            } // for
        } // for
    } catch (error) {
        log('service_worker_reload -> error', error.message)
    } // try

    //-------------
    // Loading URL
    //-------------
    const theme = preference_theme()
    const icon_color = preference_icon_color()

    const loading_url = local.url[theme][icon_color].loading

    const loading_promises = []

    for (const tab of tabs) {
        // tab is an array like [1,"https://www.microsoft.com/en-us/"]

        loading_promises.push(
            browser.tabs.update(tab[0], {
                url: loading_url + '?url=' + encodeURIComponent(tab[1])
            })
        )
    } // for

    // wait for all tab updates to resolve or reject
    await Promise.allSettled(loading_promises)

    try {
        // check if all promises were successful
        await Promise.all(loading_promises)
    } catch (error) {
        log('service_worker_reload -> loading promises error ->', error)
    } // try

    //-------
    // Delay
    //-------
    await delay(6000) // 6 seconds

    //-------------
    // Restore URL
    //-------------
    const restore_promises = []

    for (const tab of tabs) {
        // tab is an array like [1,"https://www.microsoft.com/en-us/"]
        restore_promises.push(
            browser.tabs.update(tab[0], { url: tab[1] })
        )
    } // for

    // wait for all tab updates to resolve or reject
    await Promise.allSettled(restore_promises)

    try {
        // check if all promises were successful
        await Promise.all(restore_promises)
    } catch (error) {
        log('service_worker_reload -> restore promises error ->', error)
    } // try

    //--------
    // Finish
    //--------
    // remove our hostname from the "service_worker_reload" object to indicate that we are done reloading one or more tabs for this hostname
    delete local.status.service_worker_reload[hostname]
} // service_worker_reload

const setting_to_storage = local.function.setting_to_storage = async function setting_to_storage(property) {
    /*
    Save a single local setting to storage.

    @param  {String}  property  Property name like "rule_id".
    */

    await storage_set({
        ['setting_' + property]: local.setting[property]
    })
} // setting_to_storage

const show_extension_page_if_needed = local.function.show_extension_page_if_needed = async function show_extension_page_if_needed() {
    /*
    Open the options page, if needed.
    */

    if (local.setting.show_extension === true) {
        local.setting.show_extension = false

        await extension_page('options')
    } // if
} // show_extension_page_if_needed

const show_message_relayed = local.function.show_message_relayed = function show_message_relayed() {
    /*
    Set all local.setting.show_message properties to false, if needed.
    */

    for (const property in local.setting.show_message) {
        if (local.setting.show_message[property] === true) {
            // set property to false since a client page has already received this information from a port.postMessage call
            local.setting.show_message[property] = false
        } // if
    } // for
} // show_message_relayed

const start = local.function.start = async function start() {
    /*
    Start the background service worker.
    */

    if (local.status.start_activated === true) {
        // start should only be run once
        return 'early'
    } // if

    local.status.start_activated = true

    await shared_start() // from shared.js

    url_setup()

    await install_or_upgrade()

    await all_from_storage() // this will also call mandatory_options()

    await tabs_status_init()

    // sync extension and browser rules
    await browser_rules_sync()

    await popup_set()

    await permissions_check_and_icons(false) // false meaning do not update icon colors for individual tabs

    await badge_set_background_color()

    // set the default badge for all new tabs
    await badge_set()

    // set specific badges for individual tabs
    await badge_set_all_tabs()

    // set specific action icon colors for individual tabs
    await icon_set_all_tabs()

    await show_extension_page_if_needed()

    local.status.start_done = true

    log('start -> done')
} // start

const start_done = local.function.start_done = function start_done() {
    /*
    Wait until the "start" function is done before returning.

    @return  {Promise}
    */

    if (local.status.start_done === true) {
        return 'early'
    } // if

    let timer = '' // will become a setInterval timer that will be cleared after we no longer need it

    let count = 0 // keep track of how many times we have checked to see if the "start" function is done

    return new Promise(function(resolve, reject) {
        // check every every 5 milliseconds to see if the "start" function is done
        timer = setInterval(function() {
            count++

            if (local.status.start_done === true) {
                clearInterval(timer)

                resolve()
            } else if (count > 25000) { // 25 seconds
                // start should have finished a long time ago
                clearInterval(timer)

                reject('timeout waiting for start')
            } // if
        }, 5)
    }) // promise
} // start_done

const storage_get = local.function.storage_get = async function storage_get(key) {
    /*
    Get a value from storage by providing a named key.

    @param   {String}  key  String like "option_global".
    @return  {*}            Boolean, Object, Number, or String.
    */

    let obj = {} // default

    try {
        obj = await browser.storage.local.get(key)
    } catch (error) {
        log('storage_get -> error ->', error.message)
    } // try

    return obj[key] // may return undefined if the key does not exist for this object
} // storage_get

const storage_remove = local.function.storage_remove = async function storage_remove(key) {
    /*
    Remove an object from storage by providing a named key.

    @param  {String}  key  String like "option_defunct".
    */

    await browser.storage.local.remove(key)
} // storage_remove

const storage_set = local.function.storage_set = async function storage_set(obj) {
    /*
    Save an object to storage.

    @param  {Object}  obj  Object like {option_global:true}
    */

    try {
        await browser.storage.local.set(obj)
    } catch (error) {
        log('storage_set -> error ->', error.message)
    } // try
} // storage_set

const tabs_reload = local.function.tabs_reload = async function tabs_reload(tab_ids) {
    /*
    Reload one or more tabs specified by their tab IDs.

    @param  {Object}  tab_ids  Array of tab IDs like [31,82]
    */

    const reload_tabs = []

    for (const tab_id of tab_ids) {
        if (local.status.tab[tab_id] === undefined) {
            // this tab no longer exists in our status tab object
            continue
        } // if

        reload_tabs.push(tab_id)
    } // for

    if (reload_tabs.length > 0) {
        // reload each tab as a promise so multiple tabs can reload at the same time
        const reload_options = { bypassCache: true }
        const reload_promises = []

        for (const tab_id of reload_tabs) {
            try {
                const hostname = local.status.tab[tab_id].hostname

                reload_promises.push(
                    browser.tabs.reload(tab_id, reload_options)
                )
            } catch (error) {
                log('tabs_reload -> error ->', error)
            } // try
        } // for

        log('tabs_reload -> reload tabs', reload_tabs.join(' '))

        // wait for all reloads to resolve or reject
        await Promise.allSettled(reload_promises)

        try {
            // check if all tab reload promises were successful
            await Promise.all(reload_promises)
        } catch (error) {
            log('tabs_reload -> reload tabs -> promise all error ->', error)
        } // try
    } // if
} // tabs_reload

const tabs_reload_after_permissions = local.function.tabs_reload_after_permissions = async function tabs_reload_after_permissions() {
    /*
    Reload tabs that may have been affected by a recent permissions change.
    */

    const tab_ids = []

    // loop through local.status.tab object to find out which tabs should be reloaded
    for (const property in local.status.tab) {
        const tab = local.status.tab[property]

        if (always_allow(tab.hostname, tab.root_domain) === true) {
            // hostname or root_domain is always allowed so there is no need to reload this tab
        } else {
            // hostname or root_domain may have been affected by a recent permissions change

            log('tabs_reload_after_permissions -> permissions changed', tab.id, tab.hostname)

            tab_ids.push(tab.id)
        } // if
    } // for

    if (tab_ids.length > 0) {
        await tabs_reload(tab_ids)
    } // if
} // tabs_reload_after_permissions

const tabs_reload_as_needed = local.function.tabs_reload_as_needed = async function tabs_reload_as_needed() {
    /*
    Reload tabs, as needed.
    */

    const tab_ids = []

    // loop through local.status.tab object and note if any browser_allow or warning values have changed
    // if values have changed, reload that tab
    for (const property in local.status.tab) {
        const tab = local.status.tab[property]

        const previous_browser_allow = tab.browser_allow
        const previous_warnings = tab.warnings.toString().replace('global_warn', '') // ignore "global_warn" for comparison purposes

        tab.allow = allow_script(tab.hostname, tab.root_domain)
        tab.browser_allow = await browser_allow_script(tab.hostname, tab.root_domain)

        tab.warnings = browser_rules_warnings(tab.hostname, tab.root_domain, tab.url)
        tab.warning = tab.warnings.length > 0 // true or false

        const allow_changed = tab.browser_allow !== previous_browser_allow
        const warnings_changed = previous_warnings !== tab.warnings.toString().replace('global_warn', '') // ignore "global_warn" for comparison purposes

        if (allow_changed || warnings_changed) {
            // reload this tab since the browser rules and/or warnings have changed
            if (allow_changed) {
                log('tabs_reload_as_needed -> browser allow changed', tab.id, tab.hostname)
            } // if

            if (warnings_changed) {
                log('tabs_reload_as_needed -> warnings changed', tab.id, tab.hostname)
            } // if

            tab_ids.push(tab.id)
        } // if
    } // for

    if (tab_ids.length > 0) {
        await tabs_reload(tab_ids)
    } // if
} // tabs_reload_as_needed

const tabs_status_init = local.function.tabs_status_init = async function tabs_status_init() {
    /*
    Populate the local.status.tab object with tab objects that track the last known allow, browser allow, hostname, ID, root domain, and URL values for a tab.
    */

    // reset the current tab object before populating it
    local.status.tab = {}

    const query_options = {
        populate: true,
        windowTypes: ['normal']
    } // query_options

    try {
        const windows = await browser.windows.getAll(query_options)

        for (const one_window of windows) {
            for (const tab of one_window.tabs) {
                let tab_url = tab.url

                if (tab_url === 'about:newtab' ||
                    tab_url === 'chrome://newtab/' ||
                    tab_url === 'edge://newtab/') {
                    // log('tabs_status_init -> new tab detected')
                    tab_url = await new_tab_url(tab_url, tab.id)
                } // if

                const hostname = url_to_hostname(tab_url)
                const root_domain = hostname_to_root_domain(hostname)

                const warnings = browser_rules_warnings(hostname, root_domain, tab_url)
                const warning = warnings.length > 0 // true or false

                local.status.tab[tab.id] = {
                    allow        : allow_script(hostname, root_domain),
                    browser_allow: await browser_allow_script(hostname, root_domain),
                    hostname     : hostname,
                    id           : tab.id,
                    root_domain  : root_domain,
                    url          : tab_url,
                    warning      : warning,
                    warnings     : warnings
                }
            } // for
        } // for
    } catch (error) {
        log('tabs_status_init -> error ->', error.message)
    } // try
} // tabs_status_init

const test = local.function.test = async function test() {
    /*
    Run all tests.
    */

    try {
        for (const property in local.test) {
            try {
                await local.test[property]()
            } catch (error) {
                console.warn('test -> error in local.test.' + property)
                throw error
            } // try
        } // for

        const number_of_tests = Object.keys(local.test).length

        console.log('test -> all ' + number_of_tests + ' tests passed')
    } catch (error) {
        console.error(error)
    } // try
} // test

const url_setup = local.function.url_setup = function url_setup() {
    /*
    Setup the local.url object.
    */

    const root = shared.url.extension

    // each of the following arrays list their elements in alpha order
    const themes = ['dark', 'light']
    const icons  = ['blue', 'dark', 'light']
    const pages  = ['loading', 'options', 'popup'] // not all pages are needed here, only pages that may be opened directly and that will need to know what theme and icon color to initially display

    for (const theme of themes) {
        local.url[theme] = {}

        for (const icon of icons) {
            local.url[theme][icon] = {}

            for (const page of pages) {
                local.url[theme][icon][page] = root + 'page/' + theme + '/' + icon + '/' + page + '.html'
            } // for
        } // for
    } // for
} // url_setup

const version_from_storage = local.function.version_from_storage = async function version_from_storage() {
    /*
    Return the last known version from storage or an empty string.

    @return  {String}  Version string like "2021.1.1.0" or "".
    */

    return await storage_get('version') || ''
} // version_from_storage

const version_less_than = local.function.version_less_than = function version_less_than(version, compare) {
    /*
    Compare a version string to the current version of this extension.

    @param   {String}   version  Version string like "2021.1.1.0".
    @param   {String}   compare  Version string like "2021.1.1.0".
    @return  {Boolean}           True or False.
    */
    let outcome = false // default

    const versionArray = version.split('.').map(string => parseInt(string, 10))
    const compareArray = compare.split('.').map(string => parseInt(string, 10))

    const compareArrayLength = compareArray.length

    for (let index = 0; index < compareArrayLength; index++) {
        const version_number = versionArray[index]
        const compare_number = compareArray[index]

        if (version_number < compare_number) {
            outcome = true
            break // break for loop
        } else if (version_number > compare_number) {
            break // break for loop
        } // if

        // keep looping until we break out of the for loop or run out of array items to compare
    } // for

    return outcome
} // version_less_than

const version_to_storage = local.function.version_to_storage = async function version_to_storage() {
    /*
    Save the current version to storage.
    */

    await storage_set({
        'version': local.version
    })
} // version_to_storage

//-----------------
// Event Listeners
//-----------------
browser.runtime.onConnect.addListener(listener_port_connect)

browser.tabs.onRemoved.addListener(listener_tab_removed)

browser.tabs.onUpdated.addListener(listener_tab_updated)

if (shared.setting.rule_debug === true) {
    // listen for rule matches for debugging purposes
    browser.declarativeNetRequest.onRuleMatchedDebug.addListener(listener_rule_debug)
} // if

if (shared.browser.firefox === true) {
    browser.permissions.onAdded.addListener(listener_permissions)
    browser.permissions.onRemoved.addListener(listener_permissions)
    browser.tabs.onActivated.addListener(listener_tab_activated)
} // if

// listen for service worker install events
self.addEventListener('install', listener_service_worker_install)

log('listeners active')

//-------
// Start
//-------
start()