'use strict'

//-------
// Notes
//-------
/*
    This file will provide a "browser" object which will contain aliases to the "chrome" object. More importantly, it will also contain promise based versions of callback functions normally found in the "chrome" object.
*/

//-----------
// Variables
//-----------
const browser = { // will hold various functions
    'action': {
        // setBadgeBackgroundColor
        // setBadgeText
        // setIcon
        // setPopup
    },
    'browsingData': {
        // removeServiceWorkers
    },
    'declarativeNetRequest': {
        // getDynamicRules
        // onRuleMatchedDebug
        // updateDynamicRules
    },
    'permissions': {
        // contains
        // onAdded
        // onRemoved
        // request
    },
    'runtime': {
        // connect
        // getURL
        // onConnect
        // getManifest
    },
    'scripting': {
        // executeScript
    },
    'storage': {
        'local': {
            // get
            // remove
            // set
        }
    },
    'tabs': {
        // create
        // onRemoved
        // onUpdated
        // reload
        // update
    },
    'windows': {
        // getAll
        // getCurrent
        // update
    }
} // browser

//---------
// Aliases
//---------
browser.declarativeNetRequest.onRuleMatchedDebug = chrome.declarativeNetRequest.onRuleMatchedDebug // undefined in firefox 119

browser.permissions.contains  = chrome.permissions.contains
browser.permissions.onAdded   = chrome.permissions.onAdded
browser.permissions.onRemoved = chrome.permissions.onRemoved
browser.permissions.request   = chrome.permissions.request

browser.runtime.connect     = chrome.runtime.connect
browser.runtime.getManifest = chrome.runtime.getManifest
browser.runtime.getURL      = chrome.runtime.getURL
browser.runtime.onConnect   = chrome.runtime.onConnect

browser.tabs.onActivated = chrome.tabs.onActivated
browser.tabs.onRemoved   = chrome.tabs.onRemoved
browser.tabs.onUpdated   = chrome.tabs.onUpdated

//-----------
// Functions
//-----------
browser.action.setBadgeBackgroundColor = function browser_action_setBadgeBackgroundColor(details) {
    /*
    Set the browser action badge background color for all badges.

    @param   {Object}  details  Details object. More info at https://developer.chrome.com/docs/extensions/reference/action/#method-setBadgeBackgroundColor
    @return  {*}                Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.action.setBadgeBackgroundColor(details, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // action.setBadgeBackgroundColor

browser.action.setBadgeText = function browser_action_setBadgeText(details) {
    /*
    Set the browser action badge text for one or all tabs.

    @param   {Object}  details  Details object. More info at https://developer.chrome.com/docs/extensions/reference/action/#method-setBadgeText
    @return  {*}                Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.action.setBadgeText(details, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // action.setBadgeText

browser.action.setIcon = function browser_action_setIcon(details) {
    /*
    Set the browser action icon for one or all tabs.

    @param   {Object}   details  Details object. More info at https://developer.chrome.com/docs/extensions/reference/action/#method-setIcon
    @return  {*}                 Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.action.setIcon(details, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // action.setIcon

browser.action.setPopup = function browser_action_setPopup(details) {
    /*
    Set the browser action popup for one or more tabs.

    @param   {Object}   details  Details object. More info at https://developer.chrome.com/docs/extensions/reference/action/#method-setPopup
    @return  {*}                 Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.action.setPopup(details, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // action.setPopup

browser.browsingData.removeServiceWorkers = function browser_browsingData_removeServiceWorkers(options) {
    /*
    Remove service workers.

    @param   {Object}  options   Options object. More info at https://developer.chrome.com/docs/extensions/reference/browsingData/#method-removeServiceWorkers
    @return  {*}                 Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.browsingData.removeServiceWorkers(options, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // browsingData.removeServiceWorkers

browser.declarativeNetRequest.getDynamicRules = function browser_declarativeNetRequest_getDynamicRules() {
    /*
    Get the current dynamic rules defined in this browser.

    @return  {*}  Promise that returns an array of browser rule objects if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.declarativeNetRequest.getDynamicRules(function(rules) {
                resolve(rules)
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // declarativeNetRequest.getDynamicRules

browser.declarativeNetRequest.updateDynamicRules = function browser_declarativeNetRequest_updateDynamicRules(options) {
    /*
    Update dynamic rules. Depending on the options object passed in, add, update, or remove rules.

    @param   {Object}  options  Options object with an addRules array or rule objects and/or a removeRuleIds array of rule IDs. More info at https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-updateDynamicRules
    @return  {*}                Promise that returns nothing if successful or an error if unsuccessful.
    */

    //-----------------------
    // Limits to be aware of
    //-----------------------
    /*
    chrome.declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_RULES   === 5000
    chrome.declarativeNetRequest.MAX_NUMBER_OF_REGEX_RULES     === 1000
    chrome.declarativeNetRequest.MAX_NUMBER_OF_RULES           === 30000
    chrome.declarativeNetRequest.MAX_NUMBER_OF_STATIC_RULESETS === 10
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.declarativeNetRequest.updateDynamicRules(options, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // declarativeNetRequest.updateDynamicRules

browser.scripting.executeScript = function browser_scripting_executeScript(injection) {
    /*
    Execute a client script in a tab.

    @param   {Object}  injection  Injection object. More info at https://developer.chrome.com/docs/extensions/reference/scripting/#method-executeScript
    @return  {*}                  Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.scripting.executeScript(injection, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // scripting.executeScript

browser.storage.local.get = function browser_storage_local_get(keys) {
    /*
    Gets one or more items from local storage.

    @param   {*}  [keys]  Optional. Items to retrieve from local storage. String, array of strings, or NULL to retrieve all items. More info at https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea
    @return  {*}          Promise that returns on object with any available items requested if successful, or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.storage.local.get(keys, function(items) {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve(items)
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // storage.local.get

browser.storage.local.remove = function browser_storage_local_remove(keys) {
    /*
    Remove one or more items from local storage.

    @param   {*}  keys  A single string like "option_one" or an array of strings like ["option_one","option_two"]
    @return  {*}        Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.storage.local.remove(keys, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // storage.local.remove

browser.storage.local.set = function browser_storage_local_set(items) {
    /*
    Save one or more items to local storage.

    @param   {Object}  items  Object with one or more key value pairs to save to local storage. More info at https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea
    @return  {*}              Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.storage.local.set(items, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // storage.local.set

browser.tabs.create = function browser_tabs_create(createProperties) {
    /*
    Create a tab and return a newly created tab object.

    @param   {Object}  createProperties  Create properties object. More info at https://developer.chrome.com/docs/extensions/reference/tabs/#method-create
    @return  {*}                         Promise that returns a newly created tab object if successful or an error if not.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.tabs.create(createProperties, function(tab) {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve(tab)
                }
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // tabs.create

browser.tabs.reload = function browser_tabs_reload(tabId, reloadProperties) {
    /*
    Reload a tab.

    @param   {Number}  tabId               ID number of the tab to reload.
    @param   {Object}  [reloadProperties]  Optional reload properties object. More info at https://developer.chrome.com/docs/extensions/reference/tabs/#method-reload
    @return  {*}                           Promise that returns nothing if successful or an error if unsuccessful.
    */

    reloadProperties = reloadProperties || {}

    return new Promise(function(resolve, reject) {
        try {
            chrome.tabs.reload(tabId, reloadProperties, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // tabs.reload

browser.tabs.update = function browser_tabs_update(tabId, updateProperties) {
    /*
    Update a tab.

    @param   {Number}  tabId             ID number of the tab to update.
    @param   {Object}  updateProperties  Update properties object. More info at https://developer.chrome.com/docs/extensions/reference/tabs/#method-update
    @return  {*}                         Promise that returns nothing if successful or an error if unsuccessful.
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.tabs.update(tabId, updateProperties, function() {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve()
                } // if
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // tabs.update

browser.windows.getAll = function browser_windows_getAll(queryOptions) {
    /*
    Get all windows.

    @param   {Object}  [queryOptions]  Optional query options object. More info at https://developer.chrome.com/docs/extensions/reference/windows/#method-getAll
    @return  {Object}                  Windows array of objects. More info at https://developer.chrome.com/docs/extensions/reference/windows/#type-Window
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.windows.getAll(queryOptions, function(windows) {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve(windows)
                }
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // windows.getAll

browser.windows.getCurrent = function browser_windows_getCurrent(queryOptions) {
    /*
    Get the current window.

    @param   {Object}  [queryOptions]  Optional query options object. More info at https://developer.chrome.com/docs/extensions/reference/windows/#method-getCurrent
    @return  {Object}                  Window object. More info at https://developer.chrome.com/docs/extensions/reference/windows/#method-getCurrent
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.windows.getCurrent(queryOptions, function(obj) {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve(obj)
                }
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // windows.getCurrent

browser.windows.update = function browser_windows_update(windowId, updateInfo) {
    /*
    Update a window.

    @param   {Number}  windowId    ID of the window to update.
    @param   {Object}  updateInfo  Update object. More info at https://developer.chrome.com/docs/extensions/reference/windows/#method-update
    @return  {Object}              Window object. More info at https://developer.chrome.com/docs/extensions/reference/windows/#type-Window
    */

    return new Promise(function(resolve, reject) {
        try {
            chrome.windows.update(windowId, updateInfo, function(obj) {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve(obj)
                }
            })
        } catch (error) {
            reject(error)
        } // try
    }) // promise
} // windows.update

'use strict'

//-------
// Notes
//-------
/*
    This reference JavaScript file is meant to be shared between different pages. It will also be included in the root level service worker which is built from more than one file.
*/

//-----------
// Variables
//-----------
const reference = {
    'second_level_domains': {
        // Country code second level domains which should NOT have *.domain rules applied to them because that would potentially allow too many sites to be affected.
        'country_code': [
            // Afghanistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.af', 'edu.af', 'gov.af', 'net.af', 'org.af',

            // Aland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .ax domains

            // Albania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.al', 'edu.al', 'gov.al', 'mil.al', 'net.al', 'org.al',

            // Algeria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'art.dz', 'asso.dz', 'com.dz', 'edu.dz', 'gov.dz', 'net.dz', 'org.dz', 'pol.dz', 'soc.dz', 'tm.dz',

            // American Samoa  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.as',

            // Andorra  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'nom.ad',

            // Angola  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.ao', 'ed.ao', 'gv.ao', 'it.ao', 'og.ao', 'pb.ao',

            // Anguilla  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ai', 'net.ai', 'off.ai', 'org.ai',

            // Antarctica  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .aq domains

            // Antigua and Barbuda  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.ag', 'com.ag', 'net.ag', 'nom.ag', 'org.ag',

            // Argentina  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'bet.ar', 'com.ar', 'coop.ar', 'edu.ar', 'gob.ar', 'gov.ar', 'int.ar', 'mil.ar', 'musica.ar', 'mutual.ar', 'net.ar', 'org.ar', 'senasa.ar', 'tur.ar',

            // Armenia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.am', 'com.am', 'commune.am', 'net.am', 'org.am',

            // Aruba  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.aw',

            // Ascension Island  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ac', 'edu.ac', 'gov.ac', 'mil.ac', 'net.ac', 'org.ac',

            // Australia  2023-10-07  https://www.auda.org.au/au-domain-names/au-domain-names
            'act.au', 'asn.au', 'com.au', 'csiro.au', 'edu.au', 'gov.au', 'id.au', 'net.au', 'nsw.au', 'nt.au', 'org.au', 'qld.au', 'sa.au', 'tas.au', 'vic.au', 'wa.au',

            // Austria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat and https://en.wikipedia.org/wiki/.at
            'ac.at', 'co.at', 'gv.at', 'or.at', 'priv.at',

            // Azerbaijan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.az', 'com.az', 'edu.az', 'gov.az', 'info.az', 'int.az', 'mil.az', 'name.az', 'net.az', 'org.az', 'pp.az', 'pro.az',

            // Bahamas  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bs', 'edu.bs', 'gov.bs', 'net.bs', 'org.bs',

            // Bahrain  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bh', 'edu.bh', 'gov.bh', 'net.bh', 'org.bh',

            // Bangladesh  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .bd domains

            // Barbados  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.bb', 'co.bb', 'com.bb', 'edu.bb', 'gov.bb', 'info.bb', 'net.bb', 'org.bb', 'store.bb', 'tv.bb',

            // Belarus  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.by', 'gov.by', 'mil.by',

            // Belgium  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.be',

            // Belize  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bz', 'edu.bz', 'gov.bz', 'net.bz', 'org.bz',

            // Benin  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'agro.bj', 'africa.bj', 'architectes.bj', 'assur.bj', 'avocats.bj', 'co.bj', 'com.bj', 'eco.bj', 'econo.bj', 'edu.bj', 'info.bj', 'loisirs.bj', 'money.bj', 'net.bj', 'org.bj', 'ote.bj', 'restaurant.bj', 'resto.bj', 'tourism.bj', 'univ.bj',

            // Bermuda  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bm', 'edu.bm', 'gov.bm', 'net.bm', 'org.bm',

            // Bhutan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bt', 'edu.bt', 'gov.bt', 'net.bt', 'org.bt',

            // Bolivia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'academia.bo', 'agro.bo', 'arte.bo', 'blog.bo', 'bolivia.bo', 'ciencia.bo', 'com.bo', 'cooperativa.bo', 'democracia.bo', 'deporte.bo', 'ecologia.bo', 'economia.bo', 'edu.bo', 'empresa.bo', 'gob.bo', 'indigena.bo', 'industria.bo', 'info.bo', 'int.bo', 'medicina.bo', 'mil.bo', 'movimiento.bo', 'musica.bo', 'natural.bo', 'net.bo', 'nombre.bo', 'noticias.bo', 'org.bo', 'patria.bo', 'plurinacional.bo', 'politica.bo', 'profesional.bo', 'pueblo.bo', 'revista.bo', 'salud.bo', 'tecnologia.bo', 'tksat.bo', 'transporte.bo', 'tv.bo', 'web.bo', 'wiki.bo',

            // Bosnia and Herzegovina  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ba', 'edu.ba', 'gov.ba', 'mil.ba', 'net.ba', 'org.ba',

            // Botswana  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.bw', 'org.bw',

            // Brazil  2023-10-07  https://registro.br/dominio/categorias/
            '9guacu.br', 'abc.br', 'adm.br', 'adv.br', 'agr.br', 'aju.br', 'am.br', 'anani.br', 'aparecida.br', 'app.br', 'arq.br', 'art.br', 'ato.br', 'b.br', 'barueri.br', 'belem.br', 'bhz.br', 'bib.br', 'bio.br', 'blog.br', 'bmd.br', 'boavista.br', 'bsb.br', 'campinagrande.br', 'campinas.br', 'caxias.br', 'cim.br', 'cng.br', 'cnt.br', 'com.br', 'contagem.br', 'coop.br', 'coz.br', 'cri.br', 'cuiaba.br', 'curitiba.br', 'def.br', 'des.br', 'det.br', 'dev.br', 'ecn.br', 'eco.br', 'edu.br', 'emp.br', 'enf.br', 'eng.br', 'esp.br', 'etc.br', 'eti.br', 'far.br', 'feira.br', 'flog.br', 'floripa.br', 'fm.br', 'fnd.br', 'fortal.br', 'fot.br', 'foz.br', 'fst.br', 'g12.br', 'geo.br', 'ggf.br', 'goiania.br', 'gov.br', 'gru.br', 'imb.br', 'ind.br', 'inf.br', 'jab.br', 'jampa.br', 'jdf.br', 'joinville.br', 'jor.br', 'jus.br', 'leg.br', 'lel.br', 'log.br', 'londrina.br', 'macapa.br', 'maceio.br', 'manaus.br', 'maringa.br', 'mat.br', 'med.br', 'mil.br', 'morena.br', 'mp.br', 'mus.br', 'natal.br', 'net.br', 'niteroi.br', 'nom.br', 'not.br', 'ntr.br', 'odo.br', 'ong.br', 'org.br', 'osasco.br', 'palmas.br', 'poa.br', 'ppg.br', 'pro.br', 'psc.br', 'psi.br', 'pvh.br', 'qsl.br', 'radio.br', 'rec.br', 'recife.br', 'rep.br', 'ribeirao.br', 'rio.br', 'riobranco.br', 'riopreto.br', 'salvador.br', 'sampa.br', 'santamaria.br', 'santoandre.br', 'saobernardo.br', 'saogonca.br', 'seg.br', 'sjc.br', 'slg.br', 'slz.br', 'sorocaba.br', 'srv.br', 'taxi.br', 'tc.br', 'tec.br', 'teo.br', 'the.br', 'tmp.br', 'trd.br', 'tur.br', 'tv.br', 'udi.br', 'vet.br', 'vix.br', 'vlog.br', 'wiki.br', 'zlg.br',

            // British Indian Ocean Territory  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.io',

            // British Virgin Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .vg domains

            // Brunei  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bn', 'edu.bn', 'gov.bn', 'net.bn', 'org.bn',

            // Bulgaria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            '0.bg', '1.bg', '2.bg', '3.bg', '4.bg', '5.bg', '6.bg', '7.bg', '8.bg', '9.bg', 'a.bg', 'b.bg', 'c.bg', 'd.bg', 'e.bg', 'f.bg', 'g.bg', 'h.bg', 'i.bg', 'j.bg', 'k.bg', 'l.bg', 'm.bg', 'n.bg', 'o.bg', 'p.bg', 'q.bg', 'r.bg', 's.bg', 't.bg', 'u.bg', 'v.bg', 'w.bg', 'x.bg', 'y.bg', 'z.bg',

            // Burkina Faso  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.bf',

            // Burundi  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.bi', 'com.bi', 'edu.bi', 'or.bi', 'org.bi',

            // Cambodia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .kh domains

            // Cameroon  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.cm', 'com.cm', 'gov.cm', 'net.cm',

            // Canada  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ab.ca', 'bc.ca', 'gc.ca', 'mb.ca', 'nb.ca', 'nf.ca', 'nl.ca', 'ns.ca', 'nt.ca', 'nu.ca', 'on.ca', 'pe.ca', 'qc.ca', 'sk.ca', 'yk.ca',

            // Cape Verde  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.cv', 'edu.cv', 'int.cv', 'nome.cv', 'org.cv',

            // Cayman Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat and https://en.wikipedia.org/wiki/.ky
            'com.ky', 'edu.ky', 'gov.ky', 'net.ky', 'org.ky',

            // Central African Republic  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .cf domains

            // Chad  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .td domains

            // Chile  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.cl', 'gob.cl', 'gov.cl', 'mil.cl',

            // Christmas Island  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.cx',

            // Cocos (Keeling) Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .cc domains

            // Colombia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'arts.co', 'com.co', 'edu.co', 'firm.co', 'gov.co', 'info.co', 'int.co', 'mil.co', 'net.co', 'nom.co', 'org.co', 'rec.co', 'web.co',

            // Comoros  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ass.km', 'asso.km', 'com.km', 'coop.km', 'edu.km', 'gouv.km', 'gov.km', 'medecin.km', 'mil.km', 'nom.km', 'notaires.km', 'org.km', 'pharmaciens.km', 'prd.km', 'presse.km', 'tm.km', 'veterinaire.km',

            // Cook Islands  2023-10-07  https://en.wikipedia.org/wiki/.ck
            'biz.ck', 'co.ck', 'edu.ck', 'gen.ck', 'gov.ck', 'info.ck', 'net.ck', 'org.ck',

            // Costa Rica  2023-10-07  https://en.wikipedia.org/wiki/.ck
            'ac.cr', 'co.cr', 'ed.cr', 'fi.cr', 'go.cr', 'or.cr', 'sa.cr',

            // Cote d'Ivoire  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ci', 'aéroport.ci', 'asso.ci', 'co.ci', 'com.ci', 'ed.ci', 'edu.ci', 'go.ci', 'gouv.ci', 'int.ci', 'md.ci', 'net.ci', 'or.ci', 'org.ci', 'presse.ci',

            // Croatia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.hr', 'from.hr', 'iz.hr', 'name.hr',

            // Cuba  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.cu', 'edu.cu', 'gov.cu', 'inf.cu', 'net.cu', 'org.cu',

            // Cyprus  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.cy', 'biz.cy', 'com.cy', 'ekloges.cy', 'gov.cy', 'ltd.cy', 'mil.cy', 'net.cy', 'org.cy', 'press.cy', 'pro.cy', 'tm.cy',

            // Czech Republic  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .cz domains

            // Democratic Republic of the Congo  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.cd',

            // Denmark  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .dk domains

            // Djibouti  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .dj domains

            // Dominica  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.dm', 'edu.dm', 'gov.dm', 'net.dm', 'org.dm',

            // Dominican Republic  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'art.do', 'com.do', 'edu.do', 'gob.do', 'gov.do', 'mil.do', 'net.do', 'org.do', 'sld.do', 'web.do',

             // East Timor  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
             'gov.tl',

            // Ecuador  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ec', 'edu.ec', 'fin.ec', 'gob.ec', 'gov.ec', 'info.ec', 'k12.ec', 'med.ec', 'mil.ec', 'net.ec', 'org.ec', 'pro.ec',

            // Egypt  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.eg', 'edu.eg', 'eun.eg', 'gov.eg', 'mil.eg', 'name.eg', 'net.eg', 'org.eg', 'sci.eg',

            // El Salvador  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sv', 'edu.sv', 'gob.sv', 'org.sv', 'red.sv',

            // Equatorial Guinea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gq domains

            // Eritrea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .er domains

            // Estonia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'aip.ee', 'com.ee', 'edu.ee', 'fie.ee', 'gov.ee', 'lib.ee', 'med.ee', 'org.ee', 'pri.ee', 'riik.ee',

            // Eswatini  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.sz', 'co.sz', 'org.sz',

            // Ethiopia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.et', 'com.et', 'edu.et', 'gov.et', 'info.et', 'name.et', 'net.et', 'org.et',

            // European Union  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .eu domains

            // Falkland Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .fk domains

            // Faroe Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .fo domains

            // Federated States of Micronesia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.fm', 'edu.fm', 'net.fm', 'org.fm',

            // Fiji  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.fj', 'biz.fj', 'com.fj', 'gov.fj', 'info.fj', 'mil.fj', 'name.fj', 'net.fj', 'org.fj', 'pro.fj',

            // Finland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .fi domains

            // France  2023-10-07  https://tldprices.gandi.net/pdf/en/tld-prices-FR-EUR-A.pdf
            'aeroport.fr', 'avocat.fr', 'chambagri.fr', 'chirurgiensdentistes.fr', 'expertscomptables.fr', 'geometre-expert.fr', 'medecin.fr', 'notaires.fr', 'pharmacien.fr', 'port.fr', 'veterinaire.fr',

            // French Guiana  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gf domains

            // French Polynesia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.pf', 'edu.pf', 'org.pf',

            // French Southern and Antarctic Lands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tf domains

            // Gabon  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .ga domains

            // Georgia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ge', 'edu.ge', 'gov.ge', 'mil.ge', 'net.ge', 'org.ge', 'pvt.ge',

            // Germany  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .de domains

            // Ghana  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gh', 'edu.gh', 'gov.gh', 'mil.gh', 'org.gh',

            // Gibraltar  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gi', 'edu.gi', 'gov.gi', 'ltd.gi', 'mod.gi', 'org.gi',

            // Greece  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gr', 'edu.gr', 'gov.gr', 'net.gr', 'org.gr',

            // Greenland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.gl', 'com.gl', 'edu.gl', 'net.gl', 'org.gl',

            // Grenada  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'edu.gd', 'gov.gd',

            // Guadeloupe  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asso.gp', 'com.gp', 'edu.gp', 'mobi.gp', 'net.gp', 'org.gp',

            // Guam  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gu', 'edu.gu', 'gov.gu', 'guam.gu', 'info.gu', 'net.gu', 'org.gu', 'web.gu',

            // Guatemala  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gt', 'edu.gt', 'gob.gt', 'ind.gt', 'mil.gt', 'net.gt', 'org.gt',

            // Guernsey  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.gg', 'net.gg', 'org.gg',

            // Guinea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.gn', 'com.gn', 'edu.gn', 'gov.gn', 'net.gn', 'org.gn',

            // Guinea-Bissau  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gw domains

            // Guyana  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.gy', 'com.gy', 'edu.gy', 'gov.gy', 'net.gy', 'org.gy',

            // Haiti  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'adult.ht', 'art.ht', 'asso.ht', 'com.ht', 'coop.ht', 'edu.ht', 'firm.ht', 'gouv.ht', 'info.ht', 'med.ht', 'net.ht', 'org.ht', 'perso.ht', 'pol.ht', 'pro.ht', 'rel.ht', 'shop.ht',

            // Heard Island and McDonald Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .hm domains

            // Honduras  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.hn', 'edu.hn', 'gob.hn', 'mil.hn', 'net.hn', 'org.hn',

            // Hong Kong  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.hk', 'edu.hk', 'gov.hk', 'idv.hk', 'net.hk', 'org.hk',

            // Hungary  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            '2000.hu', 'agrar.hu', 'bolt.hu', 'casino.hu', 'city.hu', 'co.hu', 'erotica.hu', 'erotika.hu', 'film.hu', 'forum.hu', 'games.hu', 'hotel.hu', 'info.hu', 'ingatlan.hu', 'jogasz.hu', 'konyvelo.hu', 'lakas.hu', 'media.hu', 'news.hu', 'org.hu', 'priv.hu', 'reklam.hu', 'sex.hu', 'shop.hu', 'sport.hu', 'suli.hu', 'szex.hu', 'tm.hu', 'tozsde.hu', 'utazas.hu', 'video.hu',

            // Iceland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.is', 'edu.is', 'gov.is', 'int.is', 'net.is', 'org.is',

            // India  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            '5g.in', '6g.in', 'ac.in', 'ai.in', 'am.in', 'bihar.in', 'biz.in', 'business.in', 'ca.in', 'cn.in', 'co.in', 'com.in', 'coop.in', 'cs.in', 'delhi.in', 'dr.in', 'edu.in', 'er.in', 'firm.in', 'gen.in', 'gov.in', 'gujarat.in', 'ind.in', 'info.in', 'int.in', 'internet.in', 'io.in', 'me.in', 'mil.in', 'net.in', 'nic.in', 'org.in', 'pg.in', 'post.in', 'pro.in', 'res.in', 'travel.in', 'tv.in', 'uk.in', 'up.in', 'us.in',

            // Indonesia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.id', 'biz.id', 'co.id', 'desa.id', 'go.id', 'mil.id', 'my.id', 'net.id', 'or.id', 'ponpes.id', 'sch.id', 'web.id',

            // Iran  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ir', 'co.ir', 'gov.ir', 'id.ir', 'net.ir', 'org.ir', 'sch.ir',

            // Iraq  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.iq', 'edu.iq', 'gov.iq', 'mil.iq', 'net.iq', 'org.iq',

            // Ireland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.ie',

            // Isle of Man  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.im', 'co.im', 'com.im', 'ltd.co.im', 'net.im', 'org.im', 'plc.co.im', 'tt.im', 'tv.im',

            // Israel  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.il', 'co.il', 'gov.il', 'idf.il', 'k12.il', 'muni.il', 'net.il', 'org.il',

            // Italy  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'edu.it', 'gov.it',

            // Jamaica  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .jm domains

            // Japan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.jp', 'ad.jp', 'aichi.jp', 'akita.jp', 'aomori.jp', 'chiba.jp', 'co.jp', 'ed.jp', 'ehime.jp', 'fukui.jp', 'fukuoka.jp', 'fukushima.jp', 'gifu.jp', 'go.jp', 'gr.jp', 'gunma.jp', 'hiroshima.jp', 'hokkaido.jp', 'hyogo.jp', 'ibaraki.jp', 'ishikawa.jp', 'iwate.jp', 'kagawa.jp', 'kagoshima.jp', 'kanagawa.jp', 'kochi.jp', 'kumamoto.jp', 'kyoto.jp', 'lg.jp', 'mie.jp', 'miyagi.jp', 'miyazaki.jp', 'nagano.jp', 'nagasaki.jp', 'nara.jp', 'ne.jp', 'niigata.jp', 'oita.jp', 'okayama.jp', 'okinawa.jp', 'or.jp', 'osaka.jp', 'saga.jp', 'saitama.jp', 'shiga.jp', 'shimane.jp', 'shizuoka.jp', 'tochigi.jp', 'tokushima.jp', 'tokyo.jp', 'tottori.jp', 'toyama.jp', 'wakayama.jp', 'yamagata.jp', 'yamaguchi.jp', 'yamanashi.jp',

            // Jersey  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.je', 'net.je', 'org.je',

            // Jordan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.jo', 'edu.jo', 'gov.jo', 'mil.jo', 'name.jo', 'net.jo', 'org.jo', 'sch.jo',

            // Kazakhstan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.kz', 'edu.kz', 'gov.kz', 'mil.kz', 'net.kz', 'org.kz',

            // Kenya  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ke', 'co.ke', 'go.ke', 'info.ke', 'me.ke', 'mobi.ke', 'ne.ke', 'or.ke', 'sc.ke',

            // Kiribati  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.ki', 'com.ki', 'edu.ki', 'gov.ki', 'info.ki', 'net.ki', 'org.ki',

            // Kuwait  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.kw', 'edu.kw', 'emb.kw', 'gov.kw', 'ind.kw', 'net.kw', 'org.kw',

            // Kyrgyzstan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.kg', 'edu.kg', 'gov.kg', 'mil.kg', 'net.kg', 'org.kg',

            // Laos  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.la', 'edu.la', 'gov.la', 'info.la', 'int.la', 'net.la', 'org.la', 'per.la',

            // Latvia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asn.lv', 'com.lv', 'conf.lv', 'edu.lv', 'gov.lv', 'id.lv', 'mil.lv', 'net.lv', 'org.lv',

            // Lebanon  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.lb', 'edu.lb', 'gov.lb', 'net.lb', 'org.lb',

            // Lesotho  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ls', 'biz.ls', 'co.ls', 'edu.ls', 'gov.ls', 'info.ls', 'net.ls', 'org.ls', 'sc.ls',

            // Liberia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.lr', 'edu.lr', 'gov.lr', 'net.lr', 'org.lr',

            // Lithuania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.lt',

            // Libya  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ly', 'edu.ly', 'gov.ly', 'id.ly', 'med.ly', 'net.ly', 'org.ly', 'plc.ly', 'sch.ly',

            // Liechtenstein  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .li domains

            // Luxembourg  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .lu domains

            // Macau  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.mo', 'edu.mo', 'gov.mo', 'net.mo', 'org.mo',

            // Madagascar  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.mg', 'com.mg', 'edu.mg', 'gov.mg', 'mil.mg', 'nom.mg', 'org.mg', 'prd.mg', 'tm.mg',

            // Malaysia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.my', 'com.my', 'edu.my', 'gov.my', 'mil.my', 'name.my', 'net.my', 'org.my',

            // Malawi  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.mw', 'biz.mw', 'co.mw', 'com.mw', 'coop.mw', 'edu.mw', 'gov.mw', 'int.mw', 'museum.mw', 'net.mw', 'org.mw',

            // Maldives  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'aero.mv', 'biz.mv', 'com.mv', 'coop.mv', 'edu.mv', 'gov.mv', 'info.mv', 'int.mv', 'mil.mv', 'museum.mv', 'name.mv', 'net.mv', 'org.mv', 'pro.mv',

            // Mali  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ml', 'edu.ml', 'gouv.ml', 'gov.ml', 'net.ml', 'org.ml', 'presse.ml',

            // Malta  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.mt', 'edu.mt', 'net.mt', 'org.mt',

            // Marshall Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .mh domains

            // Martinique  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .mq domains

            // Mauritania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.mr',

            // Mauritius  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.mu', 'co.mu', 'com.mu', 'gov.mu', 'net.mu', 'or.mu', 'org.mu',

            // Mayotte  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .yt domains

            // Mexico  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.mx', 'edu.mx', 'gob.mx', 'net.mx', 'org.mx',

            // Moldova  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .md domains

            // Monaco  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asso.mc', 'tm.mc',

            // Mongolia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'edu.mn', 'gov.mn', 'org.mn',

            // Montenegro  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.me', 'co.me', 'edu.me', 'gov.me', 'its.me', 'net.me', 'org.me', 'priv.me',

            // Montserrat  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ms', 'edu.ms', 'gov.ms', 'net.ms', 'org.ms',

            // Morocco  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ma', 'co.ma', 'gov.ma', 'net.ma', 'org.ma', 'press.ma',

            // Mozambique  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.mz', 'adv.mz', 'co.mz', 'edu.mz', 'gov.mz', 'mil.mz', 'net.mz', 'org.mz',

            // Myanmar  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .mm domains

            // Namibia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ca.na', 'cc.na', 'co.na', 'com.na', 'dr.na', 'in.na', 'info.na', 'mobi.na', 'mx.na', 'name.na', 'or.na', 'org.na', 'pro.na', 'school.na', 'tv.na', 'us.na', 'ws.na',

            // Nauru  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.nr', 'com.nr', 'edu.nr', 'gov.nr', 'info.nr', 'net.nr', 'org.nr',

            // Nepal  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .np domains

            // Netherlands  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'co.nl',

            // New Caledonia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asso.nc', 'nom.nc',

            // New Zealand  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.nz', 'co.nz', 'cri.nz', 'geek.nz', 'gen.nz', 'govt.nz', 'health.nz', 'iwi.nz', 'kiwi.nz', 'maori.nz', 'māori.nz', 'mil.nz', 'net.nz', 'org.nz', 'parliament.nz', 'school.nz',

            // Nicaragua  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ni', 'biz.ni', 'co.ni', 'com.ni', 'edu.ni', 'gob.ni', 'in.ni', 'info.ni', 'int.ni', 'mil.ni', 'net.ni', 'nom.ni', 'org.ni', 'web.ni',

            // Niger  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .ne domains

            // Nigeria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ng', 'edu.ng', 'gov.ng', 'i.ng', 'mil.ng', 'mobi.ng', 'name.ng', 'net.ng', 'org.ng', 'sch.ng',

            // Niue  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .nu domains

            // Norfolk Island  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'arts.nf', 'com.nf', 'firm.nf', 'info.nf', 'net.nf', 'other.nf', 'per.nf', 'rec.nf', 'store.nf', 'web.nf',

            // North Korea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.kp', 'edu.kp', 'gov.kp', 'org.kp', 'rep.kp', 'tra.kp',

            // Northern Mariana Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .mp domains

            // Norway  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'aa.no', 'ah.no', 'bu.no', 'dep.no', 'fhs.no', 'fm.no', 'folkebibl.no', 'fylkesbibl.no', 'herad.no', 'hl.no', 'hm.no', 'idrett.no', 'jan-mayen.no', 'kommune.no', 'mil.no', 'mr.no', 'museum.no', 'nl.no', 'nt.no', 'of.no', 'ol.no', 'oslo.no', 'priv.no', 'rl.no', 'sf.no', 'st.no', 'stat.no', 'svalbard.no', 'tm.no', 'tr.no', 'va.no', 'vf.no', 'vgs.no',

            // Oman  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.om', 'com.om', 'edu.om', 'gov.om', 'med.om', 'museum.om', 'net.om', 'org.om', 'pro.om',

            // Pakistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.pk', 'com.pk', 'edu.pk', 'fam.pk', 'gob.pk', 'gok.pk', 'gon.pk', 'gop.pk', 'gos.pk', 'gov.pk', 'info.pk', 'net.pk', 'org.pk', 'web.pk',

            // Palau  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'belau.pw', 'co.pw', 'ed.pw', 'go.pw', 'ne.pw', 'or.pw',

            // Palestinian territories  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ps', 'edu.ps', 'gov.ps', 'net.ps', 'org.ps', 'plo.ps', 'sec.ps',

            // Panama  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'abo.pa', 'ac.pa', 'com.pa', 'edu.pa', 'gob.pa', 'ing.pa', 'med.pa', 'net.pa', 'nom.pa', 'org.pa', 'sld.pa',

            // Papua New Guinea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .pg domains

            // Paraguay  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.py', 'coop.py', 'edu.py', 'gov.py', 'mil.py', 'net.py', 'org.py',

            // People's Republic of China  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.cn', 'ah.cn', 'bj.cn', 'com.cn', 'cq.cn', 'edu.cn', 'fj.cn', 'gd.cn', 'gov.cn', 'gs.cn', 'gx.cn', 'gz.cn', 'ha.cn', 'hb.cn', 'he.cn', 'hi.cn', 'hk.cn', 'hl.cn', 'hn.cn', 'jl.cn', 'js.cn', 'jx.cn', 'ln.cn', 'mil.cn', 'mo.cn', 'net.cn', 'nm.cn', 'nx.cn', 'org.cn', 'qh.cn', 'sc.cn', 'sd.cn', 'sh.cn', 'sn.cn', 'sx.cn', 'tj.cn', 'tw.cn', 'xj.cn', 'xz.cn', 'yn.cn', 'zj.cn',

            // Peru  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.pe', 'edu.pe', 'gob.pe', 'mil.pe', 'net.pe', 'nom.pe', 'org.pe',

            // Philippines  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ph', 'edu.ph', 'gov.ph', 'i.ph', 'mil.ph', 'net.ph', 'ngo.ph', 'org.ph',

            // Pitcairn Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.pn', 'edu.pn', 'gov.pn', 'net.pn', 'org.pn',

            // Poland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'agro.pl', 'aid.pl', 'atm.pl', 'auto.pl', 'biz.pl', 'com.pl', 'edu.pl', 'gmina.pl', 'gov.pl', 'gsm.pl', 'info.pl', 'mail.pl', 'media.pl', 'miasta.pl', 'mil.pl', 'net.pl', 'nieruchomosci.pl', 'nom.pl', 'org.pl', 'pc.pl', 'powiat.pl', 'priv.pl', 'realestate.pl', 'rel.pl', 'sex.pl', 'shop.pl', 'sklep.pl', 'sos.pl', 'szkola.pl', 'targi.pl', 'tm.pl', 'tourism.pl', 'travel.pl', 'turystyka.pl',

            // Portugal  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.pt', 'edu.pt', 'gov.pt', 'int.pt', 'net.pt', 'nome.pt', 'org.pt', 'publ.pt',

            // Puerto Rico  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.pr', 'biz.pr', 'com.pr', 'edu.pr', 'est.pr', 'gov.pr', 'info.pr', 'isla.pr', 'name.pr', 'net.pr', 'org.pr', 'pro.pr', 'prof.pr',

            // Qatar  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.qa', 'edu.qa', 'gov.qa', 'mil.qa', 'name.qa', 'net.qa', 'org.qa', 'sch.qa',

            // Republic of China (Taiwan)  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'club.tw', 'com.tw', 'ebiz.tw', 'edu.tw', 'game.tw', 'gov.tw', 'idv.tw', 'mil.tw', 'net.tw', 'org.tw',

            // Republic of the Congo  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .cg domains

            // Republic of Macedonia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.mk', 'edu.mk', 'gov.mk', 'inf.mk', 'name.mk', 'net.mk', 'org.mk',

            // Reunion  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asso.re', 'com.re', 'nom.re',

            // Romania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'arts.ro', 'com.ro', 'firm.ro', 'info.ro', 'nom.ro', 'nt.ro', 'org.ro', 'rec.ro', 'store.ro', 'tm.ro', 'www.ro',

            // Russia  2023-10-07  https://en.wikipedia.org/wiki/.ru#Second-level_domains
            'ac.ru', 'adygeya.ru', 'altai.ru', 'amur.ru', 'amursk.ru', 'arkhangelsk.ru', 'astrakhan.ru', 'baikal.ru', 'bashkiria.ru', 'belgorod.ru', 'bir.ru', 'bryansk.ru', 'buryatia.ru', 'cap.ru', 'cbg.ru', 'chel.ru', 'chelyabinsk.ru', 'chita.ru', 'chukotka.ru', 'cmw.ru', 'com.ru', 'dagestan.ru', 'e-burg.ru', 'edu.ru', 'fareast.ru', 'gov.ru', 'grozny.ru', 'int.ru', 'irkutsk.ru', 'ivanovo.ru', 'izhevsk.ru', 'jamal.ru', 'jar.ru', 'joshkar-ola.ru', 'k-uralsk.ru', 'kalmykia.ru', 'kaluga.ru', 'kamchatka.ru', 'karelia.ru', 'kazan.ru', 'kchr.ru', 'kemerovo.ru', 'khabarovsk.ru', 'khakassia.ru', 'khv.ru', 'kirov.ru', 'kms.ru', 'koenig.ru', 'komi.ru', 'kostroma.ru', 'krasnoyarsk.ru', 'kuban.ru', 'kurgan.ru', 'kursk.ru', 'kustanai.ru', 'kuzbass.ru', 'lipetsk.ru', 'magadan.ru', 'magnitka.ru', 'mari-el.ru', 'mari.ru', 'marine.ru', 'mil.ru', 'mordovia.ru', 'mos.ru', 'mosreg.ru', 'msk.ru', 'murmansk.ru', 'mytis.ru', 'nakhodka.ru', 'nalchik.ru', 'net.ru', 'nkz.ru', 'nnov.ru', 'norilsk.ru', 'nov.ru', 'novosibirsk.ru', 'nsk.ru', 'omsk.ru', 'orenburg.ru', 'org.ru', 'oryol.ru', 'oskol.ru', 'penza.ru', 'perm.ru', 'pp.ru', 'pskov.ru', 'ptz.ru', 'pyatigorsk.ru', 'rnd.ru', 'rubtsovsk.ru', 'ryazan.ru', 'sakhalin.ru', 'samara.ru', 'saratov.ru', 'simbirsk.ru', 'smolensk.ru', 'snz.ru', 'spb.ru', 'stavropol.ru', 'stv.ru', 'surgut.ru', 'syzran.ru', 'tambov.ru', 'tatarstan.ru', 'tlt.ru', 'tom.ru', 'tomsk.ru', 'tsaritsyn.ru', 'tsk.ru', 'tula.ru', 'tuva.ru', 'tver.ru', 'tyumen.ru', 'udm.ru', 'udmurtia.ru', 'ulan-ude.ru', 'vdonsk.ru', 'vladikavkaz.ru', 'vladimir.ru', 'vladivostok.ru', 'volgograd.ru', 'vologda.ru', 'voronezh.ru', 'vrn.ru', 'vyatka.ru', 'yakutia.ru', 'yamal.ru', 'yaroslavl.ru', 'yekaterinburg.ru', 'yuzhno-sakhalinsk.ru',

            // Rwanda  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.rw', 'co.rw', 'coop.rw', 'gov.rw', 'mil.rw', 'net.rw', 'org.rw',

            // Saint Helena  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sh', 'gov.sh', 'mil.sh', 'net.sh', 'org.sh',

            // Saint Kitts and Nevis  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'edu.kn', 'gov.kn', 'net.kn', 'org.kn',

            // Saint Lucia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.lc', 'com.lc', 'edu.lc', 'gov.lc', 'net.lc', 'org.lc',

            // Saint Vincent and the Grenadines  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.vc', 'edu.vc', 'gov.vc', 'mil.vc', 'net.vc', 'org.vc',

            // Saint-Pierre and Miquelon  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .pm domains

            // Samoa  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ws', 'edu.ws', 'gov.ws', 'net.ws', 'org.ws',

            // San Marino  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .sm domains

            // Sao Tome and Principe  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.st', 'com.st', 'consulado.st', 'edu.st', 'embaixada.st', 'mil.st', 'net.st', 'org.st', 'principe.st', 'saotome.st', 'store.st',

            // Saudi Arabia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sa', 'edu.sa', 'gov.sa', 'med.sa', 'net.sa', 'org.sa', 'pub.sa', 'sch.sa',

            // Senegal  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'art.sn', 'com.sn', 'edu.sn', 'gouv.sn', 'org.sn', 'perso.sn', 'univ.sn',

            // Serbia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.rs', 'co.rs', 'edu.rs', 'gov.rs', 'in.rs', 'org.rs',

            // Seychelles  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sc', 'edu.sc', 'gov.sc', 'net.sc', 'org.sc',

            // Sierra Leone  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sl', 'edu.sl', 'gov.sl', 'net.sl', 'org.sl',

            // Singapore  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sg', 'edu.sg', 'gov.sg', 'net.sg', 'org.sg', 'per.sg',

            // Sint Maarten (Dutch)  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.sx',

            // Slovakia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .sk domains

            // Slovenia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .si domains

            // Solomon Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sb', 'edu.sb', 'gov.sb', 'net.sb', 'org.sb',

            // Somalia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.so', 'edu.so', 'gov.so', 'me.so', 'net.so', 'org.so',

            // South Africa  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.za', 'agric.za', 'alt.za', 'co.za', 'edu.za', 'gov.za', 'grondar.za', 'law.za', 'mil.za', 'net.za', 'ngo.za', 'nic.za', 'nis.za', 'nom.za', 'org.za', 'school.za', 'tm.za', 'web.za',

            // South Georgia and the South Sandwich Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gs domains

            // South Korea  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.kr', 'busan.kr', 'chungbuk.kr', 'chungnam.kr', 'co.kr', 'daegu.kr', 'daejeon.kr', 'es.kr', 'gangwon.kr', 'go.kr', 'gwangju.kr', 'gyeongbuk.kr', 'gyeonggi.kr', 'gyeongnam.kr', 'hs.kr', 'incheon.kr', 'jeju.kr', 'jeonbuk.kr', 'jeonnam.kr', 'kg.kr', 'mil.kr', 'ms.kr', 'ne.kr', 'or.kr', 'pe.kr', 're.kr', 'sc.kr', 'seoul.kr', 'ulsan.kr',

            // South Sudan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.ss', 'com.ss', 'edu.ss', 'gov.ss', 'me.ss', 'net.ss', 'org.ss', 'sch.ss',

            // Spain  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'com.es', 'edu.es', 'gob.es', 'nom.es', 'org.es',

            // Sri Lanka  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.lk', 'assn.lk', 'com.lk', 'edu.lk', 'gov.lk', 'grp.lk', 'hotel.lk', 'int.lk', 'ltd.lk', 'net.lk', 'ngo.lk', 'org.lk', 'sch.lk', 'soc.lk', 'web.lk',

            // Sudan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sd', 'edu.sd', 'gov.sd', 'info.sd', 'med.sd', 'net.sd', 'org.sd', 'tv.sd',

            // Suriname  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .sr domains

            // Sweden  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'a.se', 'ac.se', 'b.se', 'bd.se', 'brand.se', 'c.se', 'd.se', 'e.se', 'f.se', 'fh.se', 'fhsk.se', 'fhv.se', 'g.se', 'h.se', 'i.se', 'k.se', 'komforb.se', 'kommunalforbund.se', 'komvux.se', 'l.se', 'lanbib.se', 'm.se', 'n.se', 'naturbruksgymn.se', 'o.se', 'org.se', 'p.se', 'parti.se', 'pp.se', 'press.se', 'r.se', 's.se', 't.se', 'tm.se', 'u.se', 'w.se', 'x.se', 'y.se', 'z.se',

            // Switzerland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .ch domains

            // Syria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sy', 'edu.sy', 'gov.sy', 'mil.sy', 'net.sy', 'org.sy',

            // Tajikistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.tj', 'biz.tj', 'co.tj', 'com.tj', 'edu.tj', 'go.tj', 'gov.tj', 'int.tj', 'mil.tj', 'name.tj', 'net.tj', 'nic.tj', 'org.tj', 'test.tj', 'web.tj',

            // Tanzania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.tz', 'co.tz', 'go.tz', 'hotel.tz', 'info.tz', 'me.tz', 'mil.tz', 'mobi.tz', 'ne.tz', 'or.tz', 'sc.tz', 'tv.tz',

            // Thailand  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.th', 'co.th', 'go.th', 'in.th', 'mi.th', 'net.th', 'or.th',

            // The Gambia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gm domains

            // Togo  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tg domains

            // Tokelau  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tk domains

            // Tonga  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.to', 'edu.to', 'gov.to', 'mil.to', 'net.to', 'org.to',

            // Trinidad and Tobago  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'aero.tt', 'biz.tt', 'co.tt', 'com.tt', 'coop.tt', 'edu.tt', 'gov.tt', 'info.tt', 'int.tt', 'jobs.tt', 'mobi.tt', 'museum.tt', 'name.tt', 'net.tt', 'org.tt', 'pro.tt', 'travel.tt',

            // Tunisia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.tn', 'ens.tn', 'fin.tn', 'gov.tn', 'ind.tn', 'info.tn', 'intl.tn', 'mincom.tn', 'nat.tn', 'net.tn', 'org.tn', 'perso.tn', 'tourism.tn',

            // Turkey  2023-10-07  https://www.nic.tr/
            'av.tr', 'bbs.tr', 'bel.tr', 'biz.tr', 'com.tr', 'dr.tr', 'edu.tr', 'gen.tr', 'gov.tr', 'info.tr', 'k12.tr', 'kep.tr', 'mil.tr', 'name.tr', 'net.tr', 'org.tr', 'pol.tr', 'tel.tr', 'tsk.tr', 'tv.tr', 'web.tr',

            // Turkmenistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.tm', 'com.tm', 'edu.tm', 'gov.tm', 'mil.tm', 'net.tm', 'nom.tm', 'org.tm',

            // Turks and Caicos Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tc domains

            // Tuvalu  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tv domains

            // Uganda  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ug', 'co.ug', 'com.ug', 'go.ug', 'ne.ug', 'or.ug', 'org.ug', 'sc.ug',

            // Ukraine  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'cherkassy.ua', 'cherkasy.ua', 'chernigov.ua', 'chernihiv.ua', 'chernivtsi.ua', 'chernovtsy.ua', 'ck.ua', 'cn.ua', 'com.ua', 'cr.ua', 'crimea.ua', 'cv.ua', 'dn.ua', 'dnepropetrovsk.ua', 'dnipropetrovsk.ua', 'donetsk.ua', 'dp.ua', 'edu.ua', 'gov.ua', 'if.ua', 'in.ua', 'ivano-frankivsk.ua', 'kh.ua', 'kharkiv.ua', 'kharkov.ua', 'kherson.ua', 'khmelnitskiy.ua', 'khmelnytskyi.ua', 'kiev.ua', 'kirovograd.ua', 'km.ua', 'kr.ua', 'kropyvnytskyi.ua', 'krym.ua', 'ks.ua', 'kv.ua', 'kyiv.ua', 'lg.ua', 'lt.ua', 'lugansk.ua', 'luhansk.ua', 'lutsk.ua', 'lv.ua', 'lviv.ua', 'mk.ua', 'mykolaiv.ua', 'net.ua', 'nikolaev.ua', 'od.ua', 'odesa.ua', 'odessa.ua', 'org.ua', 'pl.ua', 'poltava.ua', 'rivne.ua', 'rovno.ua', 'rv.ua', 'sb.ua', 'sebastopol.ua', 'sevastopol.ua', 'sm.ua', 'sumy.ua', 'te.ua', 'ternopil.ua', 'uz.ua', 'uzhgorod.ua', 'uzhhorod.ua', 'vinnica.ua', 'vinnytsia.ua', 'vn.ua', 'volyn.ua', 'yalta.ua', 'zakarpattia.ua', 'zaporizhzhe.ua', 'zaporizhzhia.ua', 'zhitomir.ua', 'zhytomyr.ua', 'zp.ua', 'zt.ua',

            // United Arab Emirates  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ae', 'co.ae', 'gov.ae', 'mil.ae', 'net.ae', 'org.ae', 'sch.ae',

            // United Kingdom  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.uk', 'bl.uk', 'co.uk', 'gov.uk', 'judiciary.uk', 'ltd.uk', 'me.uk', 'mil.uk', 'mod.uk', 'net.uk', 'nhs.uk', 'nic.uk', 'org.uk', 'parliament.uk', 'plc.uk', 'police.uk', 'rct.uk', 'royal.uk', 'sch.uk', 'ukaea.uk',

            // United States of America  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ak.us', 'al.us', 'ar.us', 'as.us', 'az.us', 'ca.us', 'co.us', 'ct.us', 'dc.us', 'de.us', 'dni.us', 'fed.us', 'fl.us', 'ga.us', 'gu.us', 'hi.us', 'ia.us', 'id.us', 'il.us', 'in.us', 'isa.us', 'kids.us', 'ks.us', 'ky.us', 'la.us', 'ma.us', 'md.us', 'me.us', 'mi.us', 'mn.us', 'mo.us', 'ms.us', 'mt.us', 'nc.us', 'nd.us', 'ne.us', 'nh.us', 'nj.us', 'nm.us', 'nsn.us', 'nv.us', 'ny.us', 'oh.us', 'ok.us', 'or.us', 'pa.us', 'pr.us', 'ri.us', 'sc.us', 'sd.us', 'tn.us', 'tx.us', 'ut.us', 'va.us', 'vi.us', 'vt.us', 'wa.us', 'wi.us', 'wv.us', 'wy.us',

            // University of Curacao  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.cw', 'edu.cw', 'net.cw', 'org.cw',

            // Uruguay  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.uy', 'edu.uy', 'gub.uy', 'mil.uy', 'net.uy', 'org.uy',

            // U.S. Virgin Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.vi', 'com.vi', 'k12.vi', 'net.vi', 'org.vi',

            // Uzbekistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.uz', 'com.uz', 'net.uz', 'org.uz',

            // Vanuatu  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.vu', 'edu.vu', 'net.vu', 'org.vu',

            // Vatican City  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .va domains

            // Venezuela  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'arts.ve', 'bib.ve', 'co.ve', 'com.ve', 'e12.ve', 'edu.ve', 'firm.ve', 'gob.ve', 'gov.ve', 'info.ve', 'int.ve', 'mil.ve', 'net.ve', 'nom.ve', 'org.ve', 'rar.ve', 'rec.ve', 'store.ve', 'tec.ve', 'web.ve',

            // Vietnam  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.vn', 'ai.vn', 'biz.vn', 'com.vn', 'edu.vn', 'gov.vn', 'health.vn', 'id.vn', 'info.vn', 'int.vn', 'io.vn', 'name.vn', 'net.vn', 'org.vn', 'pro.vn',

            // Wallis and Futuna  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .wf domains

            // Yemen  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ye', 'edu.ye', 'gov.ye', 'mil.ye', 'net.ye', 'org.ye',

            // Zambia  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.zm', 'biz.zm', 'co.zm', 'com.zm', 'edu.zm', 'gov.zm', 'info.zm', 'mil.zm', 'net.zm', 'org.zm', 'sch.zm',

            // Zimbabwe  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.zw', 'co.zw', 'gov.zw', 'mil.zw', 'org.zw',
        ] // country_code
    } // second_level_domains
} // reference

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
        'log': false, // verbose logging for development, make sure this is false when publishing for end users
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

'use strict'

//-------
// Notes
//-------
/*
    This file is a highly edited version of the public domain code originally found at...
        https://stackoverflow.com/questions/183485/converting-punycode-with-dash-character-to-unicode/
*/

// Javascript Punycode converter derived from example in RFC3492.
var punycode = new function Punycode() {
    // This object converts to and from puny-code used in IDN
    //
    // punycode.to_unicode (domain)
    //
    // Converts a puny-coded domain name to unicode.
    // It only converts the puny-coded parts of the domain name.
    // It does not matter if you call it on a string
    // that already has been converted to unicode.
    //
    this.utf16 = {
        // The utf16-class is necessary to convert from a javascript internal character representation to unicode.
        encode: function(input) {
            // this function is needed by decode()
            var output = []
            var i = 0
            var len = input.length
            var value

            while (i < len) {
                value = input[i++]

                if ((value & 0xF800) === 0xD800) {
                    throw new RangeError('UTF-16(encode): Illegal UTF-16 value')
                } // if

                if (value > 0xFFFF) {
                    value -= 0x10000
                    output.push(String.fromCharCode(((value >>>10) & 0x3FF) | 0xD800))
                    value = 0xDC00 | (value & 0x3FF)
                } // if

                output.push(String.fromCharCode(value))
            } // while

            return output.join('')
        } // encode
    } // utf16

    //Default parameters
    var initial_n = 0x80
    var initial_bias = 72
    var delimiter = '\x2D'
    var base = 36
    var damp = 700
    var tmin = 1
    var tmax = 26
    var skew = 38
    var maxint = 0x7FFFFFFF

    function decode_digit(cp) {
        // this function is needed by decode()

        // decode_digit(cp) returns the numeric value of a basic code
        // point (for use in representing integers) in the range 0 to
        // base-1, or base if cp is does not represent a value.

        return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base
    } // decode_digit

    function adapt(delta, numpoints, firsttime) {
        // this function is needed by decode()

        // Bias adaptation function

        var k

        delta = firsttime ? Math.floor(delta / damp) : (delta >> 1)
        delta += Math.floor(delta / numpoints)

        for (k = 0; delta > (((base - tmin) * tmax) >> 1); k += base) {
            delta = Math.floor(delta / (base - tmin))
        } // for

        return Math.floor(k + (base - tmin + 1) * delta / (delta + skew))
    } // adapt

    // Main decode
    this.decode = function(input, preserveCase) {
        // this function is needed by to_unicode()

        // Dont use utf16
        var output = []
        var case_flags = []
        var input_length = input.length

        var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len

        // Initialize the state:

        n = initial_n
        i = 0
        bias = initial_bias

        // Handle the basic code points: Let basic be the number of input code
        // points before the last delimiter, or 0 if there is none, then
        // copy the first basic code points to the output.

        basic = input.lastIndexOf(delimiter)

        if (basic < 0) {
            basic = 0
        } // if

        for (j = 0; j < basic; ++j) {
            if (preserveCase) {
                case_flags[output.length] = (input.charCodeAt(j) -65 < 26)
            } // if

            if (input.charCodeAt(j) >= 0x80) {
                throw new RangeError('Illegal input >= 0x80')
            } // if

            output.push(input.charCodeAt(j))
        } // for

        // Main decoding loop: Start just after the last delimiter if any
        // basic code points were copied; start at the beginning otherwise.

        for (ic = basic > 0 ? basic + 1 : 0; ic < input_length;) {
            // ic is the index of the next character to be consumed,

            // Decode a generalized variable-length integer into delta,
            // which gets added to i. The overflow checking is easier
            // if we increase i as we go, then subtract off its starting
            // value at the end to obtain delta.
            for (oldi = i, w = 1, k = base; ; k += base) {
                if (ic >= input_length) {
                    throw RangeError ('punycode_bad_input(1)')
                } // if

                digit = decode_digit(input.charCodeAt(ic++))

                if (digit >= base) {
                    throw RangeError('punycode_bad_input(2)')
                } // if

                if (digit > Math.floor((maxint - i) / w)) {
                    throw RangeError ('punycode_overflow(1)')
                } // if

                i += digit * w
                t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias

                if (digit < t) {
                    break
                } // if

                if (w > Math.floor(maxint / (base - t))) {
                    throw RangeError('punycode_overflow(2)')
                } // if

                w *= (base - t)
            } // for

            out = output.length + 1
            bias = adapt(i - oldi, out, oldi === 0)

            // i was supposed to wrap around from out to 0,
            // incrementing n each time, so we'll fix that now:
            if (Math.floor(i / out) > maxint - n) {
                throw RangeError('punycode_overflow(3)')
            } // if

            n += Math.floor(i / out)
            i %= out

            // Insert n at position i of the output:
            // Case of last character determines uppercase flag:
            if (preserveCase) {
                case_flags.splice(i, 0, input.charCodeAt(ic -1) -65 < 26)
            } // if

            output.splice(i, 0, n)

            i++
        } // for

        if (preserveCase) {
            for (i = 0, len = output.length; i < len; i++) {
                if (case_flags[i]) {
                    output[i] = (String.fromCharCode(output[i]).toUpperCase()).charCodeAt(0)
                } // if
            } // for
        } // if

        return this.utf16.encode(output)
    } // decode

    this.to_unicode = function(domain) {
        var domain_array = domain.split('.')
        var out = []

        for (var i = 0; i < domain_array.length; ++i) {
            var s = domain_array[i]
            out.push(
                s.match(/^xn--/) ? punycode.decode(s.slice(4)) : s
            )
        } // for

        return out.join('.')
    } // to_unicode
}();

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

            check_version = '2026.8.28.0'
            if (version_less_than(version_in_storage, check_version)) {
                // version_in_storage is less than check_version
                log(message_upgrade + check_version)

                // show a one-time message
                local.setting.show_message.upgrade_complete = true

                // show extension page
                local.setting.show_extension = true
            } // if
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