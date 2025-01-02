'use strict' // not technically needed since this file will be included in another file that will specify 'use strict' first

//-------
// Notes
//-------
/*
    Functions in this file get added to local.test object in the background service worker.

    Run all tests by calling "await test()" from the background service worker.

    Tests cover the objects "browser", "local", "reference", and "shared" that the background service worker has access to.
*/

//---------------------
// Functions - Browser
//---------------------
local.test.browser = function test_browser() {
    /*
    The browser variable should be a non-empty object with an expected amount of keys.
    */

    expect(typeof browser === 'object',
        'Expected browser to be an object.'
    )

    expect(Object.keys(browser).length === 9,
        'Expected browser to have 9 keys.'
    )
} // test_browser

//-------------------
// Functions - Local
//-------------------
local.test.local_function_all_from_storage = async function test_local_function_all_from_storage() {
    /*
    Make sure all_from_storage() updates our local options, preferences, and settings objects correctly.
    */

    try {
        const local_option_string     = JSON.stringify(local.option)
        const local_preference_string = JSON.stringify(local.preference)
        const local_settings_string   = JSON.stringify(local.setting)

        await all_from_storage()

        const previous_option = JSON.parse(local_option_string)

        // saving to and reading from storage can sort our single domain and *.domain options
        // compare new and previous single domain and *.domain options individually instead of using a JSON compare

        // new single domain options
        for (const property in local.option.domain) {
            expect(local.option.domain[property] === previous_option.domain[property],
                'Expected new and previous single domain options to match for "' + property + '".'
            )
        } // for

        // previous single domain options
        for (const property in previous_option.domain) {
            expect(previous_option.domain[property] === local.option.domain[property],
                'Expected previous and new single domain options to match for "' + property + '".'
            )
        } // for

        // new *.domain options
        for (const property in local.option.domains) {
            expect(local.option.domains[property] === previous_option.domains[property],
                'Expected new and previous *.domain options to match for "' + property + '".'
            )
        } // for

        // previous *.domain options
        for (const property in previous_option.domains) {
            expect(previous_option.domains[property] === local.option.domains[property],
                'Expected previous and new *.domain options to match for "' + property + '".'
            )
        } // for

        expect(local.option.global === previous_option.global,
            'Expected "local.option.global" to equal "previous_option.global".'
        )

        expect(JSON.stringify(local.preference) === local_preference_string,
            'Expected "local.preference" to equal "local_preference_string".'
        )

        expect(JSON.stringify(local.setting) === local_settings_string,
            'Expected "local.setting" to equal "local_settings_string".'
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_all_from_storage

local.test.local_function_badge_set = async function test_local_function_badge_set() {
    /*
    Make sure badge_set() does not return an error.
    */

    try {
        await badge_set()
    } catch (error) {
        throw error
    } // try
} // test_local_function_badge_set

local.test.local_function_badge_set_all_tabs = async function test_local_function_badge_set_all_tabs() {
    /*
    Make sure badge_set_all_tabs() does not return an error.
    */

    try {
        await badge_set_all_tabs()
    } catch (error) {
        throw error
    } // try
} // test_local_function_badge_set_all_tabs

local.test.local_function_badge_set_background_color = async function test_local_function_badge_set_background_color() {
    /*
    Make sure badge_set_background_color() does not return an error.
    */

    try {
        await badge_set_background_color()
    } catch (error) {
        throw error
    } // try
} // test_local_function_badge_set_background_color

local.test.local_function_badge_set_one_tab = async function test_local_function_badge_set_one_tab() {
    /*
    Make sure badge_set_one_tab() does not return an error.
    */

    try {
        const tab_id = Object.keys(local.status.tab)[0].id // get the first known tab id

        await badge_set_one_tab(tab_id)
    } catch (error) {
        throw error
    } // try
} // test_local_function_badge_set_one_tab

local.test.local_function_browser_allow_script = async function test_local_function_browser_allow_script() {
    /*
    Make sure browser_allow_script() returns expected values.
    */

    expect(await browser_allow_script('addons.mozilla.org') === true,
        'Expected browser_allow_script("addons.mozilla.org") to be true.'
    )

    expect(await browser_allow_script('chrome.google.com') === true,
        'Expected browser_allow_script("chrome.google.com") to be true.'
    )

    expect(await browser_allow_script('microsoftedge.microsoft.com') === true,
        'Expected browser_allow_script("microsoftedge.microsoft.com") to be true.'
    )

    expect(await browser_allow_script('', 'ko-fi.com') === true,
        'Expected browser_allow_script("", "ko-fi.com") to be true.'
    )

    expect(await browser_allow_script('', 'nightmode.fm') === true,
        'Expected browser_allow_script("", "nightmode.fm") to be true.'
    )

    expect(await browser_allow_script('', 'paypal.com') === true,
        'Expected browser_allow_script("", "paypal.com") to be true.'
    )

    expect(await browser_allow_script('', 'stripe.com') === true,
        'Expected browser_allow_script("", "stripe.com") to be true.'
    )

    expect(await browser_allow_script('') === true,
        'Expected browser_allow_script("") to be true.'
    )
} // test_local_function_browser_allow_script

local.test.local_function_browser_remove_service_workers = function test_local_function_browser_remove_service_workers() {
    /*
    Do not test browser_remove_service_workers() since it affects service workers.
    */
} // test_local_function_browser_remove_service_workers

local.test.local_function_browser_rules_get = async function test_local_function_browser_rules_get() {
    /*
    Make sure browser_rules_get() returns an array with one or more rule objects.
    */

    try {
        const rules = await browser_rules_get()

        expect(Array.isArray(rules) === true,
            'Expected rules to be an array.'
        )

        expect(rules.length > 0,
            'Expected the rules array to have at least one rule.'
        )

        expect(typeof rules[0] === 'object',
            'Expected the first rules array item to be an object.'
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_browser_rules_get

local.test.local_function_browser_rules_highest_id = function test_local_function_browser_rules_highest_id() {
    /*
    Make sure browser_rules_highest_id() returns an integer greater than 0.
    */

    const highest_id = browser_rules_highest_id(local.rules)

    expect(Number.isInteger(highest_id) === true,
        'Expected highest_id to be a number.'
    )

    expect(highest_id > 0,
        'Expected highest_id to be greater than 0.'
    )
} // test_local_function_browser_rules_highest_id

local.test.local_function_browser_rules_remove = function test_local_function_browser_rules_remove() {
    /*
    Do not test browser_rules_remove() since it would remove actual browser rules.
    */
} // test_local_function_browser_rules_remove

local.test.local_function_browser_rules_sync = async function test_local_function_browser_rules_sync() {
    /*
    Make sure browser_rules_sync() does not return an error.
    */

    try {
        await browser_rules_sync()
    } catch (error) {
        throw error
    } // try
} // test_local_function_browser_rules_sync

local.test.local_function_browser_rules_sync_domain = function test_local_function_browser_rules_sync_domain() {
    /*
    Do not test browser_rules_sync_domain() since it is tested by calling browser_rules_sync().
    */
} // test_local_function_browser_rules_sync_domain

local.test.local_function_browser_rules_sync_domains = function test_local_function_browser_rules_sync_domains() {
    /*
    Do not test browser_rules_sync_domains() since it is tested by calling browser_rules_sync().
    */
} // test_local_function_browser_rules_sync_domains

local.test.local_function_browser_rules_sync_global = function test_local_function_browser_rules_sync_global() {
    /*
    Do not test browser_rules_sync_global() since it is tested by calling browser_rules_sync().
    */
} // test_local_function_browser_rules_sync_global

local.test.local_function_browser_rules_update = function test_local_function_browser_rules_update() {
    /*
    Do not test browser_rules_update() since it would affect real rules.
    */
} // test_local_function_browser_rules_update

local.test.local_function_convert_from_regex_filter = function test_local_function_convert_from_regex_filter() {
    /*
    Make sure convert_from_regex_filter() returns an expected value.
    */

    try {
        const regex = convert_to_regex_filter('microsoft.com')

        const hostname = convert_from_regex_filter(regex)

        expect(hostname === 'microsoft.com',
            'Expected result to equal "microsoft.com".'
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_convert_from_regex_filter

local.test.local_function_convert_from_url_filter = function test_local_function_convert_from_url_filter() {
    /*
    Make sure convert_from_url_filter() returns an expected value.
    */

    try {
        const url_filter = convert_to_url_filter('microsoft.com')

        const hostname = convert_from_url_filter(url_filter)

        expect(hostname === 'microsoft.com',
            'Expected result to equal "microsoft.com".'
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_convert_from_url_filter

local.test.local_function_convert_to_regex_filter = function test_local_function_convert_to_regex_filter() {
    /*
    Make sure convert_to_regex_filter() returns an expected value.
    */

    try {
        const regex = convert_to_regex_filter('microsoft.com')

        const regex_desired = '^.*://[^/]*(@|\\.)microsoft\\.com(:|/)'

        expect(regex === regex_desired,
            'Expected regex to equal "' + regex_desired + '".'
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_convert_to_regex_filter

local.test.local_function_convert_to_url_filter = function test_local_function_convert_to_url_filter() {
    /*
    Make sure convert_to_url_filter() returns expected values.
    */

    try {
        const url_filter = convert_to_url_filter('microsoft.com')
        const url_filter_port = convert_to_url_filter('microsoft.com', true)

        expect(url_filter === '|*://microsoft.com/',
            'Expected url_filter to equal "|*://microsoft.com/".'
        )

        expect(url_filter_port === '|*://microsoft.com:',
            'Expected url_filter_port to equal "|*://microsoft.com:".'
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_convert_to_url_filter

local.test.local_function_extension_page = function test_local_function_extension_page() {
    /*
    Do not test extension_page() since it may affect the user.
    */
} // test_local_function_extension_page

local.test.local_function_icon_set = async function test_local_function_icon_set() {
    /*
    Make sure icon_set() does not return an error.
    */

    try {
        const tab_id = Object.keys(local.status.tab)[0].id // get the first known tab id

        // set one tab
        await icon_set('blue', tab_id)

        // set all tabs
        await icon_set()
    } catch (error) {
        throw error
    } // try
} // test_local_function_icon_set

local.test.local_function_icon_set_all_tabs = async function test_local_function_() {
    /*
    Make sure icon_set_all_tabs() does not return an error.
    */

    try {
        await icon_set_all_tabs()
    } catch (error) {
        throw error
    } // try
} // test_local_function_icon_set_all_tabs

local.test.local_function_icon_set_one_tab = async function test_local_function_icon_set_one_tab() {
    /*
    Make sure icon_set_one_tab() does not return an error.
    */

    try {
        const tab_id = Object.keys(local.status.tab)[0].id // get the first known tab id

        await icon_set_one_tab(tab_id)
    } catch (error) {
        throw error
    } // try
} // test_local_function_icon_set_one_tab

local.test.local_function_install_or_upgrade = function test_local_function_install_or_upgrade() {
    /*
    Do not test install_or_upgrade() as it should only be run once during startup.
    */
} // test_local_function_install_or_upgrade

local.test.local_function_listener_permissions = function test_local_function_listener_permissions() {
    /*
    Do not test listener_permissions() since it would also reload any normal tabs.
    */
} // test_local_function_listener_port_connect

local.test.local_function_listener_port_connect = function test_local_function_listener_port_connect() {
    /*
    Do not test listener_port_connect() since it is meant for real ports.
    */
} // test_local_function_listener_port_connect

local.test.local_function_listener_port_disconnect = function test_local_function_listener_port_disconnect() {
    /*
    Do not test listener_port_disconnect() since it is meant for real ports.
    */
} // test_local_function_listener_port_disconnect

local.test.local_function_listener_port_message = async function test_local_function_listener_port_message() {
    /*
    Make sure listener_port_message() saves a theme preference successfully.
    */

    try {
        const info = null
        const local_preference_string = local.preference.theme

        const obj = {
            'subject': 'preference-set',
            'name'   : 'theme',
            'value'  : local.preference.theme
        } // obj

        await listener_port_message(obj, info)

        expect(local.preference.theme === local_preference_string)
    } catch (error) {
        throw error
    } // try
} // test_local_function_listener_port_message

local.test.local_function_listener_rule_debug = function test_local_function_listener_rule_debug() {
    /*
    Do not test listener_rule_debug() since it only logs information.
    */
} // test_local_function_listener_rule_debug

local.test.local_function_listener_service_worker_install = function test_local_function_listener_service_worker_install() {
    /*
    Do not test listener_service_worker_install() since it should only run for real service worker install events.
    */
} // test_local_function_listener_service_worker_install

local.test.local_function_listener_tab_activated = function test_local_function_listener_tab_activated() {
    /*
    Do not test listener_tab_activated() since it should only handle real events.
    */
} // test_local_function_listener_tab_activated

local.test.local_function_listener_tab_removed = function test_local_function_listener_tab_removed() {
    /*
    Do not test listener_tab_removed() since it should only handle real events.
    */
} // test_local_function_listener_tab_removed

local.test.local_function_listener_tab_updated = function test_local_function_listener_tab_updated() {
    /*
    Do not test listener_tab_updated() since it should only handle real events.
    */
} // test_local_function_listener_tab_updated

local.test.local_function_option_to_storage = async function test_local_function_option_to_storage() {
    /*
    Make sure option_to_storage() saves to storage correctly by reading back from storage to compare.
    */

    try {
        const option_before = local.option.global

        await option_to_storage('global')
        await all_from_storage()

        expect(option_before === local.option.global)
    } catch (error) {
        throw error
    } // try
} // test_local_function_option_to_storage

local.test.local_function_permissions_check = async function test_local_function_permissions_check() {
    /*
    Make sure permissions_check() returns a desired value.
    */

    try {
        const permissions = await permissions_check()

        expect(permissions === true || permissions === false)
    } catch (error) {
        throw error
    } // try
} // test_local_function_permissions_check

local.test.local_function_permissions_check_and_icons = async function test_local_function_permissions_check_and_icons() {
    /*
    Make sure permissions_check_and_icons() does not return an error.
    */

    try {
        await permissions_check_and_icons()
    } catch (error) {
        throw error
    } // try
} // test_local_function_permissions_check_and_icons

local.test.local_function_popup_set = async function test_local_function_popup_set() {
    /*
    Make sure popup_set() does not return an error.
    */

    try {
        await popup_set()
    } catch (error) {
        throw error
    } // try
} // test_local_function_popup_set

local.test.local_function_port_message_all = function test_local_function_port_message_all() {
    /*
    Do not test port_message_all() since it is meant for real ports.
    */
} // test_local_function_port_message_all

local.test.local_function_port_message_popups = function test_local_function_port_message_popups() {
    /*
    Do not test port_message_popups() since it is meant for real ports.
    */
} // test_local_function_port_message_popups

local.test.local_function_port_message_all_except = function test_local_function_port_message_all_except() {
    /*
    Do not test port_message_all_except() since it is meant for real ports.
    */
} // test_local_function_port_message_all_except

local.test.local_function_preference_icon_color = function test_local_function_preference_icon_color() {
    /*
    Make sure preference_icon_color() returns a desired value.
    */

    try {
        const color = preference_icon_color()

        expect(color === 'blue' || color === 'dark' || color === 'light',
            'Expected color to be "blue", "dark", or "light" but it was "' + color + "' instead."
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_preference_icon_color

local.test.local_function_preference_theme = function test_local_function_preference_theme() {
    /*
    Make sure preference_theme() returns a desired value.
    */

    try {
        const theme = preference_theme()

        expect(theme === 'dark' || theme === 'light',
            'Expected theme to be "dark" or "light" but it was "' + theme + '" instead.'
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_preference_theme

local.test.local_function_preference_theme_popup = function test_local_function_preference_theme_popup() {
    /*
    Make sure preference_theme_popup() returns a desired value.
    */

    try {
        const theme = preference_theme_popup()

        expect(theme === 'dark' || theme === 'light',
            'Expected theme to be "dark" or "light" but it was "' + theme + '" instead.'
        )
    } catch (error) {
        throw error
    } // try
} // test_local_function_preference_theme_popup

local.test.local_function_preference_to_storage = async function test_local_function_preference_to_storage() {
    /*
    Make sure preference_to_storage() saves to storage correctly by reading back from storage to compare.
    */

    try {
        const preference_before = local.preference.theme

        await preference_to_storage('theme')
        await all_from_storage()

        expect(preference_before === local.preference.theme)
    } catch (error) {
        throw error
    } // try
} // test_local_function_preference_to_storage

local.test.local_function_service_worker_reload = function test_local_function_service_worker_reload() {
    /*
    Do not test service_worker_reload() since it may affect the user.
    */
} // test_local_function_service_worker_reload

local.test.local_function_setting_to_storage = async function test_local_function_setting_to_storage() {
    /*
    Make sure setting_to_storage() saves to storage correctly by reading back from storage to compare.
    */

    try {
        const settings_before = local.setting.rule_id

        await setting_to_storage('rule_id')
        await all_from_storage()

        expect(settings_before === local.setting.rule_id)
    } catch (error) {
        throw error
    } // try
} // test_local_function_setting_to_storage

local.test.local_function_show_extension_page_if_needed = function test_local_function_show_extension_page_if_needed() {
    /*
    Do not test show_extension_page_if_needed() since it may open a new tab.
    */
} // test_local_function_show_extension_page_if_needed

local.test.local_function_show_message_relayed = function test_local_function_show_message_relayed() {
    /*
    Do not test show_message_relayed() since it can set properties to false. Any true properties should remain true until the user is notified by other functions.
    */
} // test_local_function_show_message_relayed

local.test.local_function_start = function test_local_function_start() {
    /*
    Do not test start() since it should only be run once on startup.
    */
} // test_local_function_start

local.test.local_function_start_done = async function test_local_function_start_done() {
    /*
    Make sure start_done() does not return an error.
    */

    try {
        await start_done()
    } catch (error) {
        throw error
    } // try
} // test_local_function_start_done

local.test.local_function_storage_get = async function test_local_function_storage_get() {
    /*
    Make sure storage_get() returns the correct value for a valid key and undefined for a missing key.
    */

    try {
        const version = await storage_get('version')

        expect(typeof version === 'string' && version === local.version)

        const missing_option = await storage_get('option_that_does_not_exist')

        expect(missing_option === undefined)
    } catch (error) {
        throw error
    } // try
} // test_local_function_storage_get

local.test.local_function_storage_set = async function test_local_function_storage_set() {
    /*
    Make sure storage_set() does not return an error.
    */

    try {
        await storage_set({
            'version': local.version
        })
    } catch (error) {
        throw error
    } // try
} // test_local_function_storage_set

local.test.local_function_tabs_reload = function test_local_function_tabs_reload() {
    /*
    Do not test tabs_reload() since it may affect the user by reloading a real tab.
    */
} // test_local_function_tabs_reload

local.test.local_function_tabs_reload_after_permissions = function test_local_function_tabs_reload_after_permissions() {
    /*
    Do not test tabs_reload_after_permissions() since it may affect the user by reloading a real tab.
    */
} // test_local_function_tabs_reload_after_permissions

local.test.local_function_tabs_reload_as_needed = async function test_local_function_tabs_reload_as_needed() {
    /*
    Make sure tabs_reload_as_needed() does not return an error.
    */

    try {
        await tabs_reload_as_needed()
    } catch (error) {
        throw error
    } // try
} // test_local_function_tabs_reload_as_needed

local.test.local_function_tabs_status_init = function test_local_function_tabs_status_init() {
    /*
    Do not test tabs_status_init() since it should only run once on startup.
    */
} // test_local_function_tabs_status_init

local.test.local_function_test = function test_local_function_test() {
    /*
    No need to test test() since we will be running it with "await test()".
    */
} // test_local_function_test

local.test.local_function_url_setup = function test_local_function_url_setup() {
    /*
    Make sure url_setup() does not cause an error.
    */

    try {
        url_setup()
    } catch (error) {
        throw error
    } // try
} // test_local_function_url_setup

local.test.local_function_version_from_storage = async function test_local_function_version_from_storage() {
    /*
    Make sure version_from_storage() returns the same local.version value.
    */

    try {
        const version = await version_from_storage()

        expect(version === local.version)
    } catch (error) {
        throw error
    } // try
} // test_local_function_version_from_storage

local.test.local_function_version_less_than = function test_local_function_version_less_than() {
    /*
    Make sure version_less_than() returns the desired results.
    */

    try {
        expect(version_less_than(local.version, '2000.12.1.35') === false)
        expect(version_less_than(local.version, local.version) === false)
        expect(version_less_than(local.version, '3000.0.0.0') === true)
    } catch (error) {
        throw error
    } // try
} // test_local_function_version_less_than

local.test.local_function_version_to_storage = async function test_local_function_version_to_storage() {
    /*
    Make sure version_to_storage() saves to storage by reading from storage and comparing that value to our local.version value.
    */

    try {
        await version_to_storage(local.version)

        const version = await version_from_storage()

        expect(version === local.version)
    } catch (error) {
        throw error
    } // try
} // test_local_function_version_to_storage

local.test.local_option = function test_local_option() {
    /*
    Each option property should be of a certain type.
    */

    const option_type = {
        'domain' : 'object',
        'domains': 'object',
        'global' : 'boolean'
    } // option_type

    for (const property in local.option) {
        const type = option_type[property]

        expect(typeof local.option[property] === type,
            'Expected local.option.' + property + ' type to be a ' + type + '.'
        )
    } // for
} // test_local_option

local.test.local_port = function test_local_port() {
    /*
    The local.port object should be an array.
    */

    expect(Array.isArray(local.port) === true,
        'Expected local.port to be an array.'
    )
} // test_local_port

local.test.local_preference = function test_local_preference() {
    /*
    Each preference property should be of a certain type and not empty.
    */

    const property_type = {
        'badge_text'     : 'string',
        'browser_is_dark': 'boolean',
        'global_warn'    : 'string',
        'icon_color'     : 'string',
        'theme'          : 'string',
        'theme_popup'    : 'string'
    } // property_type

    for (const property in local.preference) {
        const preference = local.preference[property]
        const type = property_type[property]

        expect(typeof preference === type,
            'Expected local.preference.' + property + ' type to be a ' + type + '.'
        )

        expect(preference !== '',
            'Expected local.preference.' + property + ' to not be empty.'
        )
    } // for
} // test_local_preference

local.test.local_rules = function test_local_rules() {
    /*
    The local.rules object should be an array with one or more rule objects.
    */

    expect(Array.isArray(local.rules) === true,
        'Expected local.rules to be an array.'
    )

    expect(typeof local.rules[0] === 'object',
        'Expected the first local.rules item to be an object.'
    )
} // test_local_rules

local.test.local_setting = function test_local_setting() {
    /*
    Each setting property should be of a certain type and for the show_message sub object, a certain type and value.
    */

    const property_type = {
        'empty_csp'        : 'string',
        'header_csp'       : 'string',
        'mandatory_options': 'object',
        'resource_types'   : 'object',
        'rule_id'          : 'number',
        'rule_id_default'  : 'number',
        'show_extension'   : 'boolean',
        'show_message'     : 'object'
    } // property_type

    for (const property in local.setting) {
        const setting = local.setting[property]
        const type = property_type[property]

        expect(typeof setting === type,
            'Expected local.setting.' + property + ' type to be a ' + type + '.'
        )
    } // for

    for (const property in local.setting.mandatory_options) {
        const options = local.setting.mandatory_options[property]

        expect(typeof options === 'object',
            'Expected local.setting.mandatory_options.' + property + ' type to be an object.'
        )

        for (const domain in options) {
            expect(typeof options[domain] === 'boolean',
                'Expected local.setting.mandatory_options.' + property + '[\'' + domain + '\'] type to be a boolean.'
            )
        } // for
    } // for

    for (const property in local.setting.show_message) {
        const show_message = local.setting.show_message[property]

        expect(typeof show_message === 'boolean',
            'Expected local.setting.show_message.' + property + ' type to be a boolean.'
        )

        expect(show_message === false,
            'Expected local.setting.show_message.' + property + ' to false.'
        )
    } // for
} // test_local_setting

local.test.local_status = function test_local_status() {
    /*
    Each status property should be of a certain type and value.
    */

    const property_type = {
        'browser_rules_sync_queue': 'number',
        'permissions'             : 'boolean',
        'service_worker_reload'   : 'object',
        'start_activated'         : 'boolean',
        'start_done'              : 'boolean',
        'tab'                     : 'object'
    } // property_type

    for (const property in local.status) {
        const type = property_type[property]

        expect(typeof local.status[property] === type,
            'Expected local.status.' + property + ' type to be a ' + type + '.'
        )
    } // for
} // test_local_status

local.test.local_test = function test_local_test() {
    /*
    Each local.test property should be a function.
    */

    for (const property in local.test) {
        expect(typeof local.test[property] === 'function',
            'Expected local.test[' + property + '] to be a function.'
        )
    } // for
} // test_local_test

local.test.local_troubleshoot = function test_local_troubleshoot() {
    /*
    Make sure local.troubleshoot is null as in no errors have replaced the default value.
    */

    expect(local.troubleshoot === null,
        'Expected local.troubleshoot to be null.'
    )
} // test_local_troubleshoot

local.test.local_url = function test_local_url() {
    /*
    Make sure the entire local.url object is perfect by checking each individual page URL.
    */

    const root = shared.url.extension

    // each of the following arrays list their elements in alpha order
    const themes = ['dark', 'light']
    const icons  = ['blue', 'dark', 'light']
    const pages  = ['loading', 'options', 'popup']

    for (const theme of themes) {
        for (const icon of icons) {
            for (const page of pages) {
                const url = root + 'page/' + theme + '/' + icon + '/' + page + '.html'

                expect(local.url[theme][icon][page] === url,
                    'Expected "' + local.url[theme][icon][page] + '" to equal "' + url + '".'
                )
            } // for
        } // for
    } // for
} // test_local_url

local.test.local_version = function test_local_version() {
    /*
    Make sure local.version is a string of numbers and dots.
    */

    const all_integers = local.version.split('.').every(i => parse_integer(i) == i)

    expect(typeof local.version === 'string' && all_integers === true,
        'Expected local.version to be a string of numbers and dots.'
    )
} // test_local_version

//-----------------------
// Functions - Reference
//-----------------------
local.test.reference = function test_reference() {
    /*
    The reference object should be what we expect.
    */

    expect(typeof reference === 'object',
        'Expected reference to be an object.'
    )

    expect(typeof reference.second_level_domains === 'object',
        'Expected reference.second_level_domains to be an object.'
    )

    expect(Array.isArray(reference.second_level_domains.country_code) === true,
        'Expected reference.second_level_domains.country_code to be an array.'
    )

    expect(reference.second_level_domains.country_code.length === 2101,
        'Expected reference.second_level_domains.country_code.length to be 2101.'
    )

    expect(reference.second_level_domains.country_code.filter(domain => typeof domain === 'string').length === 2101,
        'Expected each domain in reference.second_level_domains.country_code to be a string.'
    )
} // test_reference

//--------------------
// Functions - Shared
//--------------------
local.test.shared_browser = function test_shared_browser() {
    /*
    Make sure each browser property is a boolean and that only one of them is currently true.
    */

    let true_value_count = 0 // keep track of how many properties are true

    for (const property in shared.browser) {
        const value = shared.browser[property]

        expect(typeof value === 'boolean',
            'Expected shared.browser.' + property + ' type to be a boolean.'
        )

        if (value === true) {
            true_value_count++
        } // if
    } // for

    expect(true_value_count === 1,
        'Expected one shared.browser property to be true but instead found ' + true_value_count + '.'
    )
} // test_shared_browser

local.test.shared_function_always_allow = function test_shared_function_always_allow() {
    /*
    Make sure always_allow() returns expected values.
    */

    expect(always_allow('addons.mozilla.org') === true,
        'Expected always_allow("addons.mozilla.org") to be true.'
    )

    expect(always_allow('chrome.google.com') === true,
        'Expected always_allow("chrome.google.com") to be true.'
    )

    expect(always_allow('microsoftedge.microsoft.com') === true,
        'Expected always_allow("microsoftedge.microsoft.com") to be true.'
    )

    expect(always_allow('', 'ko-fi.com') === true,
        'Expected always_allow("", "ko-fi.com") to be true.'
    )

    expect(always_allow('', 'nightmode.fm') === true,
        'Expected always_allow("", "nightmode.fm") to be true.'
    )

    expect(always_allow('', 'paypal.com') === true,
        'Expected always_allow("", "paypal.com") to be true.'
    )

    expect(always_allow('', 'stripe.com') === true,
        'Expected always_allow("", "stripe.com") to be true.'
    )

    expect(always_allow('') === true,
        'Expected always_allow("") to be true.'
    )

    expect(always_allow('non-existent.nightmode.fm') === false,
        'Expected always_allow("non-existent.nightmode.fm") to be false.'
    )
} // test_shared_function_always_allow

local.test.shared_function_allow_script = function test_shared_function_allow_script() {
    /*
    Make sure allow_script() returns expected values.
    */

    expect(allow_script('addons.mozilla.org') === true,
        'Expected allow_script("addons.mozilla.org") to be true.'
    )

    expect(allow_script('chrome.google.com') === true,
        'Expected allow_script("chrome.google.com") to be true.'
    )

    expect(allow_script('microsoftedge.microsoft.com') === true,
        'Expected allow_script("microsoftedge.microsoft.com") to be true.'
    )

    expect(allow_script('', 'ko-fi.com') === true,
        'Expected allow_script("", "ko-fi.com") to be true.'
    )

    expect(allow_script('', 'nightmode.fm') === true,
        'Expected allow_script("", "nightmode.fm") to be true.'
    )

    expect(allow_script('', 'paypal.com') === true,
        'Expected allow_script("", "paypal.com") to be true.'
    )

    expect(allow_script('', 'stripe.com') === true,
        'Expected allow_script("", "stripe.com") to be true.'
    )

    expect(allow_script('') === true,
        'Expected allow_script("") to be true.'
    )

    expect(allow_script('non-existent.nightmode.fm') === local.option.global,
        'Expected allow_script("non-existent.nightmode.fm") to be ' + local.option.global + '.'
    )
} // test_shared_function_allow_script

local.test.shared_function_browser_rules_warnings = function test_shared_function_browser_rules_warnings() {
    /*
    Make sure browser_rules_warnings() return an array.
    */

    const result = browser_rules_warnings('www.microsoft.com', 'microsoft.com', 'https://www.microsoft.com/')

    expect(Array.isArray(result) === true,
        'Expected result to be an array.'
    )
} // test_shared_function_browser_rules_warnings

local.test.shared_function_delay = async function test_shared_function_delay() {
    /*
    Make sure delay() does not return before the requested amount of milliseconds.
    */

    try {
        const begin = Date.now()
        const duration = 500 // milliseconds

        await delay(duration)

        const end = Date.now()

        expect(end >= (begin + duration))
    } catch (error) {
        throw error
    } // try
} // test_shared_function_delay

local.test.shared_function_expect = function test_shared_function_expect() {
    /*
    Make sure expect() only throws errors when it encounters results that are not exactly true.
    */

    try {
        expect(true, 'true should not throw an error')
        expect(false, 'false should throw an error')
    } catch (error) {
        if (error.message !== 'false should throw an error') {
            throw error
        } // if
    } // try
} // test_shared_function_expect

local.test.shared_function_hostname_to_root_domain = function test_shared_function_hostname_to_root_domain() {
    /*
    Make sure hostname_to_root_domain() returns the expected values.
    */

    expect(hostname_to_root_domain('www.microsoft.com') === 'microsoft.com',
        'Expected hostname_to_root_domain("www.microsoft.com") to return "microsoft.com".'
    )

    expect(hostname_to_root_domain('microsoft.com') === 'microsoft.com',
        'Expected hostname_to_root_domain("microsoft.com") to return "microsoft.com".'
    )
} // test_shared_function_hostname_to_root_domain

local.test.shared_function_listen_allow_permissions_button = function test_shared_function_listen_allow_permissions_button() {
    /*
    Do not test listen_allow_permissions_button() since it should only run once on pages that use it.
    */
} // test_shared_function_listen_allow_permissions_button

local.test.shared_function_listen_mouse_events = function test_shared_function_listen_mouse_events() {
    /*
    Do not test listen_mouse_events() since it should only run once on pages that use it.
    */
} // test_shared_function_listen_mouse_events

local.test.shared_function_listen_scroll_nav = function test_shared_function_listen_scroll_nav() {
    /*
    Do not test listen_scroll_nav() since it should only run once on pages that use it.
    */
} // test_shared_function_listen_scroll_nav

local.test.shared_function_listen_scroll_to_links = function test_shared_function_listen_scroll_to_links() {
    /*
    Do not test listen_scroll_to_links() since it should only run once on pages with links that use the class name "scroll-to".
    */
} // test_shared_function_listen_scroll_to_links

local.test.shared_function_listen_show_message_dismiss = function test_shared_function_listen_show_message_dismiss() {
    /*
    Do not test listen_show_message_dismiss() since it should only run once on pages with links that use the class name "show-message-dismiss".
    */
} // test_shared_function_listen_show_message_dismiss

local.test.shared_function_location_hash_scroll_to = async function test_shared_function_location_hash_scroll_to() {
    /*
    Do not test location_hash_scroll_to() since it should only run on user visible pages.
    */
} // test_shared_function_location_hash_scroll_to

local.test.shared_function_log = function test_shared_function_log() {
    /*
    No need to test log() since it only console.logs if shared.setting.log is true.
    */
} // test_shared_function_log

local.test.shared_function_new_tab_url = function test_shared_function_new_tab_url() {
    /*
    Do not test new_tab_url() since it is only meant to be used on actual new tab pages.
    */
} // test_shared_function_new_tab_url

local.test.shared_function_parse_integer = function test_shared_function_parse_integer() {
    /*
    Make sure parse_integer() returns a number when given a string or number.
    */

    try {
        expect(parse_integer('10') === 10)
        expect(parse_integer(1) === 1)
    } catch (error) {
        throw error
    } // try
} // test_shared_function_parse_integer

local.test.shared_function_permissions_display = function test_shared_function_permissions_display() {
    /*
    Do not test permissions_display() since it should only run on user visible pages.
    */
} // test_shared_function_permissions_display

local.test.shared_function_permissions_hide = function test_shared_function_permissions_hide() {
    /*
    Do not test permissions_hide() since it should only run on user visible pages.
    */
} // test_shared_function_permissions_hide

local.test.shared_function_permissions_request = function test_shared_function_permissions_request() {
    /*
    Do not test permissions_request() since it should only run on user visible pages.
    */
} // test_shared_function_permissions_request

local.test.shared_function_permissions_show = function test_shared_function_permissions_show() {
    /*
    Do not test permissions_show() since it should only run on user visible pages.
    */
} // test_shared_function_permissions_show

local.test.shared_function_punycode_to_unicode = function test_shared_function_punycode_to_unicode() {
    /*
    Make sure punycode_to_unicode() returns an expected value.
    */

    try {
        expect(punycode_to_unicode('xn--igbid2icr.xn--mgberp4a5d4ar') === 'أهلابك.السعودية',
            'Expected punycode_to_unicode("xn--igbid2icr.xn--mgberp4a5d4ar") to equal "أهلابك.السعودية".'
        )
    } catch (error) {
        throw error
    } // try
} // test_shared_function_punycode_to_unicode

local.test.shared_function_scroll_nav = function test_shared_function_scroll_nav() {
    /*
    Do not test scroll_nav() since it should only run on pages that use it.
    */
} // test_shared_function_scroll_nav

local.test.shared_function_scroll_to = function test_shared_function_scroll_to() {
    /*
    Do not test scroll_to() since it can only be used on user visible pages.
    */
} // test_shared_function_scroll_to

local.test.shared_function_scroll_to_id = function test_shared_function_scroll_to_id() {
    /*
    Do not test scroll_to_id() since it can only be used on user visible pages.
    */
} // test_shared_function_scroll_to_id

local.test.shared_function_shared_start = async function test_shared_function_shared_start() {
    /*
    Make sure shared_start() does not alter the current shared.browser object.
    */

    try {
        const browser_before = JSON.stringify(shared.browser)

        await shared_start()

        const browser_after = JSON.stringify(shared.browser)

        expect(browser_before === browser_after)
    } catch (error) {
        throw error
    } // try
} // test_shared_function_shared_start

local.test.shared_function_show_message = function test_shared_function_show_message() {
    /*
    Do not test show_message() since it is only meant to be used on pages viewed by users. Also do not test show_message() since it can change local.setting.show_message properties from true to false and that should only be done by the "show_message_relayed" function.
    */
} // test_shared_function_show_message

local.test.shared_function_show_message_dismiss = function test_shared_function_show_message_dismiss() {
    /*
    Do not test show_message_dismiss() since it is only meant to be used on HTML elements that are visible to a user.
    */
} // test_shared_function_show_message_dismiss

local.test.shared_function_theme_and_icon = function test_shared_function_theme_and_icon() {
    /*
    No need to test theme_and_icon() since it changes the appearance of visible extension pages for users.
    */
} // test_shared_function_theme_and_icon

local.test.shared_function_theme_monitor = function test_shared_function_theme_monitor() {
    /*
    Do not test theme_monitor() since it is only used on user visible pages.
    */
} // test_shared_function_theme_monitor

local.test.shared_function_url_to_human_title = function test_shared_function_url_to_human_title() {
    /*
    Make sure url_to_human_title() returns the desired values.
    */

    /* test browser specific protocols */

    if (shared.browser.chrome) {
        expect(url_to_human_title('chrome://extensions/') === 'Chrome',
            'Expected url_to_human_title("chrome://extensions/") to return "Chrome".'
        )

        expect(url_to_human_title('chrome://newtab/') === 'New Tab',
            'Expected url_to_human_title("chrome://newtab/") to return "New Tab".'
        )

        expect(url_to_human_title('chrome-extension://name/') === 'Extensions',
            'Expected url_to_human_title("chrome-extension://name/") to return "Extensions".'
        )

        expect(url_to_human_title('chrome-search://search/') === 'New Tab',
            'Expected url_to_human_title("chrome-search://search") to return "New Tab".'
        )
    } // if

    if (shared.browser.edge) {
        expect(url_to_human_title('edge://newtab/') === 'New Tab',
            'Expected url_to_human_title("edge://newtab/") to return "New Tab".'
        )

        expect(url_to_human_title('edge://extensions/') === 'Edge',
            'Expected url_to_human_title("edge://extensions/") to return "Edge".'
        )
    } // if

    if (shared.browser.firefox) {
        expect(url_to_human_title('about:addons') === 'Firefox',
            'Expected url_to_human_title("about:addons") to return "Firefox".'
        )

        expect(url_to_human_title('about:newtab') === 'New Tab',
            'Expected url_to_human_title("about:newtab") to return "New Tab".'
        )

        expect(url_to_human_title('moz-extension://addon/') === 'Add-ons',
            'Expected url_to_human_title("moz-extension://addon/") to return "Add-ons".'
        )
    } // if

    /* test non-browser specific protocols */

    expect(url_to_human_title('file://file/') === 'Files',
        'Expected url_to_human_title("file://file/") to return "Files".'
    )

    expect(url_to_human_title('ftp://server/') === 'File Servers',
        'Expected url_to_human_title("ftp://server/") to return "File Servers".'
    )

    expect(url_to_human_title('http://server/') === '',
        'Expected url_to_human_title("http://server/") to be empty.'
    )

    expect(url_to_human_title('https://server/') === '',
        'Expected url_to_human_title("https://server/") to be empty.'
    )

    expect(url_to_human_title('https://addons.mozilla.org/') === 'Firefox Browser Add-ons',
       'Expected url_to_human_title("https://addons.mozilla.org/") to return "Firefox Browser Add-ons".'
    )

    expect(url_to_human_title('https://chrome.google.com/') === 'Chrome Web Store',
        'Expected url_to_human_title("https://chrome.google.com/") to return "Chrome Web Store".'
    )

    expect(url_to_human_title('https://microsoftedge.microsoft.com/') === 'Microsoft Edge Add-ons',
        'Expected url_to_human_title("https://microsoftedge.microsoft.com/") to return "Microsoft Edge Add-ons".'
    )

    expect(url_to_human_title('https://ko-fi.com/') === 'Ko-fi',
        'Expected url_to_human_title("https://ko-fi.com/") to return "Ko-fi".'
    )

    expect(url_to_human_title('https://www.ko-fi.com/') === 'Ko-fi',
        'Expected url_to_human_title("https://www.ko-fi.com") to return "Ko-fi".'
    )

    expect(url_to_human_title('https://nightmode.fm/') === 'Nightmode FM',
        'Expected url_to_human_title("https://nightmode.fm/") to return "Nightmode FM".'
    )

    expect(url_to_human_title('https://audio.nightmode.fm/') === 'Nightmode FM',
        'Expected url_to_human_title("https://audio.nightmode.fm") to return "Nightmode FM".'
    )

    expect(url_to_human_title('https://paypal.com/') === 'PayPal',
        'Expected url_to_human_title("https://paypal.com/") to return "PayPal".'
    )

    expect(url_to_human_title('https://www.paypal.com/') === 'PayPal',
        'Expected url_to_human_title("https://www.paypal.com/") to return "PayPal".'
    )

    expect(url_to_human_title('https://stripe.com/') === 'Stripe',
        'Expected url_to_human_title("https://stripe.com/") to return "Stripe".'
    )

    expect(url_to_human_title('https://www.stripe.com/') === 'Stripe',
        'Expected url_to_human_title("https://www.stripe.com/") to return "Stripe".'
    )
} // test_shared_function_url_to_human_title

local.test.shared_function_url_to_port = function test_shared_function_url_to_port() {
    /*
    Make sure url_to_port() returns expected values.
    */

    expect(url_to_port('https://microsoft.com') === 443,
        'Expected url_to_port("https://microsoft.com") to return 443.'
    )

    expect(url_to_port('http://microsoft.com') === 80,
        'Expected url_to_port("http://microsoft.com") to return 80.'
    )

    expect(url_to_port('https://microsoft.com:8080') === 8080,
        'Expected url_to_port("https://microsoft.com:8080") to return 8080.'
    )
} // test_shared_function_url_to_port

local.test.shared_function_url_to_user_pass = function test_shared_function_url_to_user_pass() {
    /*
    Make sure url_to_user_pass() returns expected values.
    */

    const with_credentials = url_to_user_pass('https://user:pass@www.microsoft.com')

    expect(typeof with_credentials === 'object',
        'Expected with_credentials to be an object.'
    )

    expect(with_credentials.username === 'user',
        'Expected with_credentials.username to be "user".'
    )

    expect(with_credentials.password === 'pass',
        'Expected with_credentials.password to be "pass".'
    )

    const without_credentials = url_to_user_pass('https://www.microsoft.com')

    expect(typeof without_credentials === 'object',
        'Expected without_credentials to be an object.'
    )

    expect(without_credentials.username === '',
        'Expected without_credentials.username to be empty.'
    )

    expect(without_credentials.password === '',
        'Expected without_credentials.password to be empty.'
    )
} // test_shared_function_url_to_user_pass

local.test.shared_setting = function test_shared_setting() {
    /*
    Each setting property should be of a certain type and false.
    */

    const property_type = {
        'log'       : 'boolean',
        'rule_debug': 'boolean'
    } // property_type

    for (const property in shared.setting) {
        const setting = shared.setting[property]
        const type = property_type[property]

        expect(typeof setting === type,
            'Expected shared.setting.' + property + ' type to be a ' + type + '.'
        )

        if (property === 'log' && setting === true) {
            // warn about the log setting which is probably on for development purposes
            console.warn('Expected shared.setting.log to be false.')
        } // if
    } // for
} // test_shared_setting

local.test.shared_timer = function test_shared_timer() {
    /*
    Make sure local.shared.timer is an object with an empty "theme_monitor" property.
    */

    expect(typeof shared.timer === 'object',
        'Expected shared.timer to be an object.'
    )

    expect(shared.timer.theme_monitor === '',
        'Expected shared.timer.theme_monitor to be empty.'
    )
} // test_shared_timer

local.test.shared_url = function test_shared_url() {
    /*
    Make sure shared.url is an object and shared.url.extension is a string with a correct looking value.
    */

    expect(typeof shared.url === 'object',
        'Expected shared.url to be an object.'
    )

    expect(typeof shared.url.extension === 'string',
        'Expected shared.url.extension to be a string.'
    )

    expect(shared.url.extension.indexOf(':') > 0,
        'Expected shared.url.extension to contain a ":" character.'
    )

    expect(shared.url.extension.slice(-1) === '/',
        'Expected shared.url.extension to end with a "/" character.'
    )
} // test_shared_url